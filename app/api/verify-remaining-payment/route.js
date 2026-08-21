import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import crypto from "crypto";
import { createCustomerNotification } from "@/lib/customerNotifications";

// ===============================================
// NORMALIZE MOBILE NUMBER
// Always return 91XXXXXXXXXX
// ===============================================

function normalizeMobile(mobile) {
  let value = String(mobile || "")
    .replace(/\D/g, "")
    .replace(/^0+/, "");

  if (value.length === 10) {
    value = "91" + value;
  }

  return value;
}

// ===============================================
// POST METHOD: VERIFY AND UPDATE REMAINING PAYMENT
// ===============================================

export async function POST(request) {
  try {
    const {
      bookingId,
      paymentId,
      orderId,
      signature,
      amount,
    } = await request.json();

    // ===============================================
    // VALIDATION
    // ===============================================

    if (
      !bookingId ||
      !paymentId ||
      !orderId ||
      !signature
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Required payment verification details are missing.",
        },
        {
          status: 400,
        }
      );
    }

    // ===============================================
    // SIGNATURE VALIDATION
    // ===============================================

    const razorpaySecret =
      process.env.RAZORPAY_KEY_SECRET;

    const generatedSignature = crypto
      .createHmac(
        "sha256",
        razorpaySecret
      )
      .update(
        orderId + "|" + paymentId
      )
      .digest("hex");

    if (
      generatedSignature !== signature
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Security Alert: Invalid payment signature.",
        },
        {
          status: 401,
        }
      );
    }

    // ===============================================
    // CONNECT DATABASE
    // ===============================================

    const client =
      await clientPromise;

    const db =
      client.db("rctours");

    // ===============================================
    // GET BOOKING BEFORE UPDATE
    // ===============================================

    const booking =
      await db
        .collection("bookings")
        .findOne({
          bookingId: bookingId,
        });

    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Booking record not found.",
        },
        {
          status: 404,
        }
      );
    }

    // ===============================================
    // DUPLICATE PAYMENT PROTECTION
    // ===============================================

    if (
      booking.remainingPaymentStatus ===
      "Paid"
    ) {
      return NextResponse.json({
        success: true,
        message:
          "Remaining payment already processed.",
      });
    }

    // ===============================================
    // NORMALIZE CUSTOMER MOBILE
    // ===============================================

    const customerMobile =
      normalizeMobile(
        booking.mobile
      );

    // ===============================================
    // UPDATE REMAINING PAYMENT
    // ===============================================

    const result =
      await db
        .collection("bookings")
        .updateOne(
          {
            bookingId:
              bookingId,
          },
          {
            $set: {
              paymentStatus:
                "Fully Paid",

              remainingPaymentStatus:
                "Paid",

              remainingPaymentId:
                paymentId,

              remainingOrderId:
                orderId,

              remainingAmount:
                0,

              updatedAt:
                new Date(),
            },

            $inc: {
              paidAmount:
                Number(
                  amount || 0
                ),

              advancePaid:
                Number(
                  amount || 0
                ),
            },
          }
        );

    // ===============================================
    // CREATE CUSTOMER PORTAL NOTIFICATION
    // ===============================================

    try {
      await createCustomerNotification({
        mobile:
          customerMobile,

        title:
          "Remaining Payment Successful 💳",

        message:
          `Your remaining payment of ₹${Number(
            amount || 0
          ).toLocaleString(
            "en-IN"
          )} for booking ${booking.bookingId} ` +
          `has been received successfully. ` +
          `Your booking is now fully paid.`,

        type:
          "remaining-payment-success",

        link:
          "/my-profile",
      });

      console.log(
        "REMAINING PAYMENT CUSTOMER NOTIFICATION CREATED:",
        booking.bookingId
      );
    } catch (
      notificationError
    ) {
      // Notification fail hone par
      // payment fail nahi hoga

      console.error(
        "REMAINING PAYMENT CUSTOMER NOTIFICATION ERROR:",
        notificationError
      );
    }

    // ===============================================
    // SEND CUSTOMER PUSH NOTIFICATION
    // ===============================================

    try {
      const subscriptions =
        await db
          .collection(
            "pushSubscriptions"
          )
          .find({
            mobile:
              customerMobile,

            role:
              "customer",
          })
          .toArray();

      console.log(
        "REMAINING PAYMENT PUSH SUBSCRIPTIONS:",
        subscriptions.length
      );

      if (
        subscriptions.length > 0
      ) {
        const pushResponse =
          await fetch(
            `${request.nextUrl.origin}/api/push/send`,
            {
              method:
                "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify({
                  mobile:
                    customerMobile,

                  role:
                    "customer",

                  title:
                    "Remaining Payment Successful 💳",

                  message:
                    `Your remaining payment of ₹${Number(
                      amount || 0
                    ).toLocaleString(
                      "en-IN"
                    )} for booking ${booking.bookingId} ` +
                    `has been received successfully.`,

                  url:
                    "/my-profile",
                }),
            }
          );

        const pushData =
          await pushResponse.json();

        console.log(
          "REMAINING PAYMENT PUSH RESULT:",
          pushData
        );
      }
    } catch (
      pushError
    ) {
      // Push fail hone par
      // payment process fail nahi hoga

      console.error(
        "REMAINING PAYMENT PUSH ERROR:",
        pushError
      );
    }

    // ===============================================
    // SUCCESS RESPONSE
    // ===============================================

    return NextResponse.json({
      success: true,

      message:
        "Remaining payment settled successfully.",

      modifiedCount:
        result.modifiedCount,
    });

  } catch (error) {
    console.error(
      "REMAINING PAYMENT VERIFICATION EXCEPTION:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          "Internal server error during settlement.",
      },
      {
        status: 500,
      }
    );
  }
}