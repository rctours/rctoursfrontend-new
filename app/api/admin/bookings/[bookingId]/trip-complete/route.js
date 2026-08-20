import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { createNotification } from "@/lib/notifications";
import {
  createCustomerNotification,
} from "@/lib/customerNotifications";

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
        { status: 400 }
      );
    }

    // ======================================================
    // GET BOOKING
    // ======================================================

    const booking = await db.collection("bookings").findOne({
      bookingId: bookingId.trim(),
    });

    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          message: "Booking not found.",
        },
        { status: 404 }
      );
    }

    // ======================================================
    // NORMALIZE MOBILE NUMBER
    // ======================================================

    let mobile = String(booking.mobile || "").replace(/\D/g, "");

    if (mobile.length === 10) {
      mobile = "91" + mobile;
    }

    booking.mobile = mobile;

    // ======================================================
    // UPDATE BOOKING AS COMPLETED
    // ======================================================

    await db.collection("bookings").updateOne(
      {
        bookingId: bookingId.trim(),
      },
      {
        $set: {
          tripStatus: "Completed",
          bookingStatus: "Completed",
          invoiceReady: true,
          tripCompletedAt: new Date(),
          updatedAt: new Date(),
        },
      }
    );

    // ======================================================
    // LOYALTY + COUPON SYSTEM
    // ======================================================

    let earnedPoints = 0;
    let updatedCustomer = null;
    let loyaltyProcessedNow = false;

    if (booking.paymentStatus === "Fully Paid") {
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

        await db.collection("customers").updateOne(
          {
            mobile: booking.mobile,
          },
          {
            $set: {
              name: booking.name,
              updatedAt: new Date(),
            },

            $inc: {
              totalBookings: 1,
              totalSpent: Number(booking.totalFare || 0),
              loyaltyPoints: earnedPoints,
            },

            $setOnInsert: {
              membership: "Bronze",
              createdAt: new Date(),
            },
          },
          {
            upsert: true,
          }
        );

        // ==================================================
        // GET UPDATED CUSTOMER
        // ==================================================

        updatedCustomer = await db
          .collection("customers")
          .findOne({
            mobile: booking.mobile,
          });

        if (updatedCustomer) {
          // ================================================
          // MEMBERSHIP UPDATE
          // ================================================

          let membership = "Bronze";

          if (updatedCustomer.loyaltyPoints >= 1000) {
            membership = "Platinum";
          } else if (updatedCustomer.loyaltyPoints >= 700) {
            membership = "Gold";
          } else if (updatedCustomer.loyaltyPoints >= 400) {
            membership = "Silver";
          }

          await db.collection("customers").updateOne(
            {
              mobile: booking.mobile,
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

          if (updatedCustomer.loyaltyPoints >= 300) {
            if (
              !updatedCustomer.couponCode ||
              updatedCustomer.couponUsed
            ) {
              const couponCode =
                `RC${booking.mobile.slice(-4)}${updatedCustomer.loyaltyPoints}`;

              await db.collection("customers").updateOne(
                {
                  mobile: booking.mobile,
                },
                {
                  $set: {
                    couponCode,
                    couponDiscount: 300,
                    couponUsed: false,
                    couponGeneratedAt: new Date(),
                  },
                }
              );

              // ============================================
              // CUSTOMER COUPON NOTIFICATION
              // ============================================

              await createCustomerNotification({
                mobile: booking.mobile,
                title: "New Reward Coupon 🎁",
                message:
                  `Congratulations! You received a ₹300 reward coupon. ` +
                  `Coupon Code: ${couponCode}`,
                type: "coupon",
                link: "/profile-login",
              });
            }
          }

          // ================================================
          // LOYALTY HISTORY
          // ================================================

          await db.collection("loyaltyHistory").insertOne({
            customerId: updatedCustomer._id || null,
            mobile: booking.mobile,
            name: booking.name,

            action: "Trip Reward",

            points: earnedPoints,

            reason: booking.tripType,

            balancePoints: updatedCustomer.loyaltyPoints,

            bookingId: booking.bookingId,

            createdAt: new Date(),
          });
        }

        // ==================================================
        // MARK LOYALTY AS PROCESSED
        // ==================================================

        await db.collection("bookings").updateOne(
          {
            bookingId: booking.bookingId,
          },
          {
            $set: {
              loyaltyProcessed: true,
            },
          }
        );
      }
    }

    // ======================================================
    // DRIVER AVAILABLE
    // ======================================================

    if (booking.driverId) {
      await db.collection("drivers").updateOne(
        {
          driverId: booking.driverId,
        },
        {
          $set: {
            status: "Available",
            updatedAt: new Date(),
          },
        }
      );
    }

    // ======================================================
    // VEHICLE AVAILABLE
    // ======================================================

    if (booking.vehicleId) {
      await db.collection("vehicles").updateOne(
        {
          vehicleId: booking.vehicleId,
        },
        {
          $set: {
            status: "Active",
            updatedAt: new Date(),
          },
        }
      );
    }

    // ======================================================
    // ADMIN NOTIFICATION
    // ======================================================

    await createNotification({
      title: "Trip Completed",
      message:
        `${booking.name}'s trip from ${booking.pickup} ` +
        `to ${booking.drop} has been completed.`,
      type: "trip-completed",
      link: `/admin/bookings/${booking.bookingId}`,
    });

    // ======================================================
    // CUSTOMER TRIP COMPLETED NOTIFICATION
    // ======================================================

    await createCustomerNotification({
      mobile: booking.mobile,
      title: "Trip Completed 🎉",
      message:
        booking.paymentStatus === "Fully Paid"
          ? `Your trip from ${booking.pickup} to ${booking.drop} has been completed successfully. Thank you for travelling with RC Tours & Travels.`
          : `Your trip from ${booking.pickup} to ${booking.drop} has been completed successfully. Please check your booking payment details.`,
      type: "trip-completed",
      link: "/profile-login",
    });

    // ======================================================
    // CUSTOMER LOYALTY POINT NOTIFICATION
    // Only when points were actually added now
    // ======================================================

    if (
      booking.paymentStatus === "Fully Paid" &&
      loyaltyProcessedNow &&
      earnedPoints > 0
    ) {
      await createCustomerNotification({
        mobile: booking.mobile,
        title: "Loyalty Points Added ⭐",
        message:
          `Congratulations! You earned ${earnedPoints} RC Loyalty Points ` +
          `for completing your trip.`,
        type: "loyalty",
        link: "/profile-login",
      });
    }

    // ======================================================
    // GET UPDATED BOOKING
    // ======================================================

    const updatedBooking = await db.collection("bookings").findOne({
      bookingId: bookingId.trim(),
    });

    // ======================================================
    // SUCCESS RESPONSE
    // ======================================================

    return NextResponse.json({
      success: true,
      message: "Trip completed successfully.",
      booking: updatedBooking,
    });

  } catch (error) {
    console.error("TRIP COMPLETE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error.",
      },
      { status: 500 }
    );
  }
}