import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { createNotification } from "@/lib/notifications";
import {
  createCustomerNotification,
} from "@/lib/customerNotifications";
import webpush from "web-push";

// ======================================================
// WEB PUSH CONFIGURATION
// ======================================================

webpush.setVapidDetails(
  process.env.VAPID_SUBJECT,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

// ======================================================
// SEND PUSH NOTIFICATION SAFELY
// Push fail hone par main process fail nahi hoga
// ======================================================

async function sendPushNotifications(
  db,
  query,
  payload,
  role
) {
  try {
    const subscriptions = await db
      .collection("pushSubscriptions")
      .find(query)
      .toArray();

    console.log(
      `${role.toUpperCase()} PUSH SUBSCRIPTIONS:`,
      subscriptions.length
    );

    if (!subscriptions.length) {
      return {
        sent: 0,
        failed: 0,
      };
    }

    let sent = 0;
    const expiredEndpoints = [];

    for (const item of subscriptions) {
      try {
        await webpush.sendNotification(
          item.subscription,
          JSON.stringify(payload)
        );

        sent++;

        console.log(
          `${role.toUpperCase()} PUSH SENT:`,
          item.endpoint
        );
      } catch (error) {
        console.error(
          `${role.toUpperCase()} PUSH ERROR:`,
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

    // Remove expired subscriptions

    if (expiredEndpoints.length > 0) {
      await db
        .collection("pushSubscriptions")
        .deleteMany({
          endpoint: {
            $in: expiredEndpoints,
          },
        });

      console.log(
        `${role.toUpperCase()} EXPIRED SUBSCRIPTIONS REMOVED:`,
        expiredEndpoints.length
      );
    }

    return {
      sent,
      failed:
        subscriptions.length - sent,
    };
  } catch (error) {
    console.error(
      `${role.toUpperCase()} PUSH PIPELINE ERROR:`,
      error
    );

    return {
      sent: 0,
      failed: 0,
    };
  }
}

// ==========================================================
// PATCH METHOD: MARK TRIP AS COMPLETED
// ==========================================================

export async function PATCH(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("rctours");

    const resolvedParams = await params;
    const bookingId = resolvedParams?.bookingId;

    // ======================================================
    // CHECK BOOKING ID
    // ======================================================

    if (!bookingId) {
      return NextResponse.json(
        {
          success: false,
          message: "Booking ID missing.",
        },
        {
          status: 400,
        }
      );
    }

    // ======================================================
    // GET BOOKING
    // ======================================================

    const booking = await db
      .collection("bookings")
      .findOne({
        bookingId: bookingId.trim(),
      });

    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          message: "Booking not found.",
        },
        {
          status: 404,
        }
      );
    }

    // ======================================================
    // NORMALIZE MOBILE NUMBER
    // ======================================================

    let mobile = String(
      booking.mobile || ""
    ).replace(/\D/g, "");

    if (mobile.length === 10) {
      mobile = "91" + mobile;
    }

    booking.mobile = mobile;

    // ======================================================
    // UPDATE BOOKING AS COMPLETED
    // ======================================================

    await db
      .collection("bookings")
      .updateOne(
        {
          bookingId: bookingId.trim(),
        },
        {
          $set: {
            tripStatus: "Completed",

            bookingStatus: "Completed",

            invoiceReady: true,

            tripCompletedAt:
              new Date(),

            updatedAt:
              new Date(),
          },
        }
      );

    // ======================================================
    // LOYALTY + COUPON SYSTEM
    // ======================================================

    let earnedPoints = 0;

    let updatedCustomer = null;

    let loyaltyProcessedNow = false;

    if (
      booking.paymentStatus === "Fully Paid"
    ) {
      // ====================================================
      // PROCESS LOYALTY ONLY ONCE
      // ====================================================

      if (!booking.loyaltyProcessed) {
        earnedPoints =
          booking.tripType === "Outstation Trip"
            ? 100
            : 50;

        loyaltyProcessedNow = true;

        // ==================================================
        // CREATE OR UPDATE CUSTOMER
        // ==================================================

        await db
          .collection("customers")
          .updateOne(
            {
              mobile:
                booking.mobile,
            },
            {
              $set: {
                name:
                  booking.name,

                updatedAt:
                  new Date(),
              },

              $inc: {
                totalBookings: 1,

                totalSpent:
                  Number(
                    booking.totalFare || 0
                  ),

                loyaltyPoints:
                  earnedPoints,
              },

              $setOnInsert: {
                membership:
                  "Bronze",

                createdAt:
                  new Date(),
              },
            },
            {
              upsert: true,
            }
          );

        // ==================================================
        // GET UPDATED CUSTOMER
        // ==================================================

        updatedCustomer =
          await db
            .collection("customers")
            .findOne({
              mobile:
                booking.mobile,
            });

        if (updatedCustomer) {
          // ================================================
          // MEMBERSHIP UPDATE
          // ================================================

          let membership =
            "Bronze";

          if (
            updatedCustomer.loyaltyPoints >=
            1000
          ) {
            membership =
              "Platinum";
          } else if (
            updatedCustomer.loyaltyPoints >=
            700
          ) {
            membership =
              "Gold";
          } else if (
            updatedCustomer.loyaltyPoints >=
            400
          ) {
            membership =
              "Silver";
          }

          await db
            .collection("customers")
            .updateOne(
              {
                mobile:
                  booking.mobile,
              },
              {
                $set: {
                  membership,
                },
              }
            );

          // ================================================
          // COUPON GENERATE
          // ================================================

          if (
            updatedCustomer.loyaltyPoints >=
            300
          ) {
            if (
              !updatedCustomer.couponCode ||
              updatedCustomer.couponUsed
            ) {
              const couponCode =
                `RC${booking.mobile.slice(
                  -4
                )}${updatedCustomer.loyaltyPoints}`;

              await db
                .collection("customers")
                .updateOne(
                  {
                    mobile:
                      booking.mobile,
                  },
                  {
                    $set: {
                      couponCode,

                      couponDiscount:
                        300,

                      couponUsed:
                        false,

                      couponGeneratedAt:
                        new Date(),
                    },
                  }
                );

              // ============================================
              // CUSTOMER COUPON NOTIFICATION
              // ============================================

              await createCustomerNotification({
                mobile:
                  booking.mobile,

                title:
                  "New Reward Coupon 🎁",

                message:
                  `Congratulations! You received a ₹300 reward coupon. ` +
                  `Coupon Code: ${couponCode}`,

                type:
                  "coupon",

                link:
                  "/profile-login",
              });
            }
          }

          // ================================================
          // LOYALTY HISTORY
          // ================================================

          await db
            .collection("loyaltyHistory")
            .insertOne({
              customerId:
                updatedCustomer._id ||
                null,

              mobile:
                booking.mobile,

              name:
                booking.name,

              action:
                "Trip Reward",

              points:
                earnedPoints,

              reason:
                booking.tripType,

              balancePoints:
                updatedCustomer.loyaltyPoints,

              bookingId:
                booking.bookingId,

              createdAt:
                new Date(),
            });
        }

        // ==================================================
        // MARK LOYALTY AS PROCESSED
        // ==================================================

        await db
          .collection("bookings")
          .updateOne(
            {
              bookingId:
                booking.bookingId,
            },
            {
              $set: {
                loyaltyProcessed:
                  true,
              },
            }
          );
      }
    }

    // ======================================================
    // DRIVER AVAILABLE
    // ======================================================

    if (booking.driverId) {
      await db
        .collection("drivers")
        .updateOne(
          {
            driverId:
              booking.driverId,
          },
          {
            $set: {
              status:
                "Available",

              updatedAt:
                new Date(),
            },
          }
        );
    }

    // ======================================================
    // VEHICLE AVAILABLE
    // ======================================================

    if (booking.vehicleId) {
      await db
        .collection("vehicles")
        .updateOne(
          {
            vehicleId:
              booking.vehicleId,
          },
          {
            $set: {
              status:
                "Active",

              updatedAt:
                new Date(),
            },
          }
        );
    }

    // ======================================================
    // ADMIN PANEL NOTIFICATION
    // ======================================================

    await createNotification({
      title:
        "Trip Completed",

      message:
        `${booking.name}'s trip from ` +
        `${booking.pickup} to ` +
        `${booking.drop} has been completed.`,

      type:
        "trip-completed",

      link:
        `/admin/bookings/${booking.bookingId}`,
    });

    // ======================================================
    // ADMIN PUSH NOTIFICATION
    // ======================================================

    await sendPushNotifications(
      db,
      {
        role: "admin",
      },
      {
        title:
          "Trip Completed 🚕",

        body:
          `${booking.name}'s trip from ` +
          `${booking.pickup} to ` +
          `${booking.drop} has been completed.`,

        url:
          `/admin/bookings/${booking.bookingId}`,
      },
      "admin"
    );

    // ======================================================
    // CUSTOMER TRIP COMPLETED NOTIFICATION
    // ======================================================

    const customerTripMessage =
      booking.paymentStatus ===
      "Fully Paid"
        ? `Your trip from ${booking.pickup} to ${booking.drop} has been completed successfully. Thank you for travelling with RC Tours & Travels.`
        : `Your trip from ${booking.pickup} to ${booking.drop} has been completed successfully. Please check your booking payment details.`;

    await createCustomerNotification({
      mobile:
        booking.mobile,

      title:
        "Trip Completed 🎉",

      message:
        customerTripMessage,

      type:
        "trip-completed",

      link:
        "/profile-login",
    });

    // ======================================================
    // CUSTOMER PUSH NOTIFICATION
    // ======================================================

    await sendPushNotifications(
      db,
      {
        mobile:
          booking.mobile,

        role:
          "customer",
      },
      {
        title:
          "Trip Completed 🎉",

        body:
          customerTripMessage,

        url:
          "/my-profile",
      },
      "customer"
    );

    // ======================================================
    // CUSTOMER LOYALTY POINT NOTIFICATION
    // ======================================================

    if (
      booking.paymentStatus ===
        "Fully Paid" &&
      loyaltyProcessedNow &&
      earnedPoints > 0
    ) {
      const loyaltyMessage =
        `Congratulations! You earned ${earnedPoints} RC Loyalty Points ` +
        `for completing your trip.`;

      await createCustomerNotification({
        mobile:
          booking.mobile,

        title:
          "Loyalty Points Added ⭐",

        message:
          loyaltyMessage,

        type:
          "loyalty",

        link:
          "/profile-login",
      });

      // ==================================================
      // CUSTOMER LOYALTY PUSH NOTIFICATION
      // ==================================================

      await sendPushNotifications(
        db,
        {
          mobile:
            booking.mobile,

          role:
            "customer",
        },
        {
          title:
            "Loyalty Points Added ⭐",

          body:
            loyaltyMessage,

          url:
            "/my-profile",
        },
        "customer"
      );
    }

    // ======================================================
    // GET UPDATED BOOKING
    // ======================================================

    const updatedBooking =
      await db
        .collection("bookings")
        .findOne({
          bookingId:
            bookingId.trim(),
        });

    // ======================================================
    // SUCCESS RESPONSE
    // ======================================================

    return NextResponse.json({
      success: true,

      message:
        "Trip completed successfully.",

      booking:
        updatedBooking,
    });

  } catch (error) {
    console.error(
      "TRIP COMPLETE ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          "Internal server error.",
      },
      {
        status: 500,
      }
    );
  }
}