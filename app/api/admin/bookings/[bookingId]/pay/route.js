import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { createCustomerNotification } from "@/lib/customerNotifications";
import webpush from "web-push";

// ==========================================================
// VAPID CONFIGURATION
// ==========================================================

webpush.setVapidDetails(
  process.env.VAPID_SUBJECT,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

// ==========================================================
// NORMALIZE MOBILE NUMBER
// ==========================================================

function normalizeMobile(mobile) {
  let value = String(mobile || "")
    .replace(/\D/g, "");

  if (value.length === 10) {
    value = "91" + value;
  }

  return value;
}

// ==========================================================
// SEND CUSTOMER PUSH SAFELY
// ==========================================================

async function sendCustomerPush({
  db,
  mobile,
  title,
  message,
  url = "/my-profile",
}) {
  try {
    const normalizedMobile =
      normalizeMobile(mobile);

    if (!normalizedMobile) {
      return {
        sent: 0,
        failed: 0,
      };
    }

    const subscriptions =
      await db
        .collection("pushSubscriptions")
        .find({
          mobile: normalizedMobile,
          role: "customer",
        })
        .toArray();

    console.log(
      "CUSTOMER PAYMENT PUSH SUBSCRIPTIONS:",
      subscriptions.length
    );

    if (!subscriptions.length) {
      return {
        sent: 0,
        failed: 0,
      };
    }

    const payload = JSON.stringify({
      title,
      body: message,
      url,
      tag: "rc-payment-notification",
    });

    let sent = 0;
    const expiredEndpoints = [];

    for (const item of subscriptions) {
      try {
        await webpush.sendNotification(
          item.subscription,
          payload
        );

        sent++;

        console.log(
          "CUSTOMER PAYMENT PUSH SENT:",
          item.endpoint
        );
      } catch (error) {
        console.error(
          "CUSTOMER PAYMENT PUSH ERROR:",
          error
        );

        if (
          error.statusCode === 404 ||
          error.statusCode === 410
        ) {
          expiredEndpoints.push(
            item.endpoint
          );
        }
      }
    }

    if (expiredEndpoints.length > 0) {
      await db
        .collection("pushSubscriptions")
        .deleteMany({
          endpoint: {
            $in: expiredEndpoints,
          },
        });
    }

    return {
      sent,
      failed:
        subscriptions.length - sent,
    };
  } catch (error) {
    console.error(
      "CUSTOMER PAYMENT PUSH PIPELINE ERROR:",
      error
    );

    return {
      sent: 0,
      failed: 0,
    };
  }
}

// ==========================================================
// PATCH METHOD: DIRECT LEDGER SETTLEMENT
// MARK AS FULLY PAID
// ==========================================================

export async function PATCH(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("rctours");

    // ======================================================
    // GET BOOKING ID
    // ======================================================

    const resolvedParams = await params;

    const bookingId =
      resolvedParams?.bookingId;

    if (!bookingId) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Required booking token reference identity missing.",
        },
        {
          status: 400,
        }
      );
    }

    // ======================================================
    // FIND BOOKING
    // ======================================================

    const booking =
      await db
        .collection("bookings")
        .findOne({
          bookingId:
            bookingId.trim(),
        });

    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          message:
            "No localized reservation matched specified identity log.",
        },
        {
          status: 404,
        }
      );
    }

    // ======================================================
    // CHECK PREVIOUS PAYMENT STATUS
    // Prevent duplicate notification
    // ======================================================

    const wasAlreadyFullyPaid =
      booking.paymentStatus ===
      "Fully Paid";

    // ======================================================
    // CALCULATE TOTAL FARE
    // ======================================================

    const dynamicTotalFare =
      Number(
        booking.totalFare ||
          booking.fare ||
          0
      );

    // ======================================================
    // UPDATE PAYMENT STATUS
    // ======================================================

    await db
      .collection("bookings")
      .updateOne(
        {
          bookingId:
            bookingId.trim(),
        },
        {
          $set: {
            paymentStatus:
              "Fully Paid",

            advancePaid:
              dynamicTotalFare,

            remainingAmount:
              0,

            updatedAt:
              new Date(),
          },
        }
      );

    // ======================================================
    // CUSTOMER NOTIFICATION
    // Only when status actually changes
    // ======================================================

    if (!wasAlreadyFullyPaid) {
      const notificationMessage =
        `Your booking ${booking.bookingId} has been marked as fully paid. ` +
        `Thank you for choosing RC Tours & Travels.`;

      // ================================================
      // CUSTOMER IN-APP NOTIFICATION
      // ================================================

      try {
        await createCustomerNotification({
          mobile:
            booking.mobile,

          title:
            "Payment Completed 💳",

          message:
            notificationMessage,

          type:
            "payment-completed",

          link:
            "/my-profile",
        });

        console.log(
          "CUSTOMER PAYMENT NOTIFICATION CREATED:",
          booking.bookingId
        );
      } catch (notificationError) {
        console.error(
          "CUSTOMER PAYMENT NOTIFICATION ERROR:",
          notificationError
        );
      }

      // ================================================
      // CUSTOMER PUSH NOTIFICATION
      // ================================================

      await sendCustomerPush({
        db,

        mobile:
          booking.mobile,

        title:
          "Payment Completed 💳",

        message:
          notificationMessage,

        url:
          "/my-profile",
      });
    }

    // ======================================================
    // SUCCESS
    // ======================================================

    return NextResponse.json({
      success: true,

      message:
        "Ledger status successfully forced to Fully Paid state.",

      notificationSent:
        !wasAlreadyFullyPaid,
    });

  } catch (error) {
    console.error(
      "CRITICAL SETTLEMENT PAYMENT ROUTE FAILED:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Internal server payload transaction error.",
      },
      {
        status: 500,
      }
    );
  }
}