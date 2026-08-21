import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
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
// POST METHOD: VERIFY AND LOG PAYMENT TRANSACTION
// ===============================================

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db("rctours");

    const body = await request.json();

    const {
      bookingId,
      paymentId,
      orderId,
      amount,
    } = body;

    // ===============================================
    // VALIDATION
    // ===============================================

    if (!bookingId || !paymentId) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Operation rejected. Required transaction parameters missing.",
        },
        {
          status: 400,
        }
      );
    }

    // ===============================================
    // GET BOOKING
    // ===============================================

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

    // ===============================================
    // DUPLICATE PAYMENT PROTECTION
    // ===============================================

    if (booking.paymentStatus === "Fully Paid") {
      return NextResponse.json({
        success: true,
        message: "Payment already processed.",
      });
    }

    // ===============================================
    // NORMALIZE CUSTOMER MOBILE
    // ===============================================

    const customerMobile = normalizeMobile(
      booking.mobile
    );

    // ===============================================
    // UPDATE BOOKING PAYMENT
    // ===============================================

    const result = await db
      .collection("bookings")
      .updateOne(
        {
          bookingId: bookingId.trim(),
        },
        {
          $set: {
            paymentId,
            orderId: orderId || "",
            paymentStatus: "Fully Paid",
            advancePaid: Number(amount || 0),
            remainingAmount: 0,
            paidAmount: Number(amount || 0),
            paidAt: new Date(),
            updatedAt: new Date(),
          },
        }
      );

    // ===============================================
    // CREATE / UPDATE CUSTOMER
    // ===============================================

    const existingCustomer = await db
      .collection("customers")
      .findOne({
        mobile: customerMobile,
      });

    if (!existingCustomer) {
      await db
        .collection("customers")
        .insertOne({
          mobile: customerMobile,
          name: booking.name,
          membership: "Bronze",
          loyaltyPoints: 0,
          totalBookings: 1,
          totalSpent: Number(
            booking.totalFare || 0
          ),

          couponCode: "",
          couponDiscount: 0,
          couponUsed:
            booking.couponApplied || false,

          createdAt: new Date(),
          updatedAt: new Date(),
        });
    } else {
      await db
        .collection("customers")
        .updateOne(
          {
            mobile: customerMobile,
          },
          {
            $set: {
              name: booking.name,
              updatedAt: new Date(),
            },

            $inc: {
              totalBookings: 1,

              totalSpent: Number(
                booking.totalFare || 0
              ),
            },
          }
        );
    }

    // ===============================================
    // MARK COUPON AS USED
    // ===============================================

    if (
      booking.couponApplied &&
      booking.couponCode
    ) {
      await db
        .collection("customers")
        .updateOne(
          {
            mobile: customerMobile,
          },
          {
            $set: {
              couponUsed: true,

              couponUsedAt:
                new Date(),

              couponCode: "",

              couponDiscount: 0,
            },
          }
        );

      const customer = await db
        .collection("customers")
        .findOne({
          mobile: customerMobile,
        });

      await db
        .collection("loyaltyHistory")
        .insertOne({
          customerId:
            customer?._id || null,

          mobile:
            customerMobile,

          name:
            booking.name,

          action:
            "Coupon Redeemed",

          points:
            booking.couponDiscount || 0,

          reason:
            booking.couponCode,

          balancePoints:
            customer?.loyaltyPoints || 0,

          bookingId:
            booking.bookingId,

          createdAt:
            new Date(),
        });
    }

    // ===============================================
    // CREATE CUSTOMER PAYMENT NOTIFICATION
    // ===============================================

    try {
      await createCustomerNotification({
        mobile: customerMobile,

        title: "Payment Successful 💳",

        message:
          `Your payment of ₹${Number(
            amount || 0
          ).toLocaleString("en-IN")} for booking ` +
          `${booking.bookingId} has been successfully received. ` +
          `Your booking payment is now fully paid.`,

        type: "payment-success",

        link: "/my-profile",
      });

      console.log(
        "CUSTOMER PAYMENT NOTIFICATION CREATED:",
        booking.bookingId
      );
    } catch (notificationError) {
      // Notification failure should never fail payment
      console.error(
        "CUSTOMER PAYMENT NOTIFICATION ERROR:",
        notificationError
      );
    }

    // ===============================================
    // SEND CUSTOMER PUSH NOTIFICATION
    // ===============================================

    try {
      const subscriptions = await db
        .collection("pushSubscriptions")
        .find({
          mobile: customerMobile,
          role: "customer",
        })
        .toArray();

      console.log(
        "CUSTOMER PUSH SUBSCRIPTIONS:",
        subscriptions.length
      );

      if (subscriptions.length > 0) {
        const pushResponse = await fetch(
          `${request.nextUrl.origin}/api/push/send`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              mobile: customerMobile,

              role: "customer",

              title:
                "Payment Successful 💳",

              message:
                `Your payment of ₹${Number(
                  amount || 0
                ).toLocaleString("en-IN")} for booking ` +
                `${booking.bookingId} was successful.`,

              url: "/my-profile",
            }),
          }
        );

        const pushData =
          await pushResponse.json();

        console.log(
          "CUSTOMER PAYMENT PUSH RESULT:",
          pushData
        );
      }
    } catch (pushError) {
      // Push failure should never fail payment
      console.error(
        "CUSTOMER PAYMENT PUSH ERROR:",
        pushError
      );
    }

    // ===============================================
    // SUCCESS
    // ===============================================

    return NextResponse.json({
      success: true,

      message:
        "Payment transaction synchronization successful.",

      modifiedCount:
        result.modifiedCount,
    });

  } catch (error) {
    console.error(
      "CRITICAL PAYMENT VERIFICATION PIPELINE EXCEPTION:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          "Internal ledger processing data exception encountered.",
      },
      {
        status: 500,
      }
    );
  }
}