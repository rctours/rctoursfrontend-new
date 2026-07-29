import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

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

    const booking = await db.collection("bookings").findOne({
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
    // UPDATE BOOKING PAYMENT
    // ===============================================

    const result = await db.collection("bookings").updateOne(
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
    // NORMALIZE MOBILE
    // ===============================================

    const customerMobile = String(booking.mobile)
      .replace(/\D/g, "")
      .replace(/^0+/, "")
      .slice(-10);

    // ===============================================
    // CREATE / UPDATE CUSTOMER
    // ===============================================

    const existingCustomer = await db.collection("customers").findOne({
      mobile: customerMobile,
    });

    if (!existingCustomer) {
      await db.collection("customers").insertOne({
        mobile: customerMobile,
        name: booking.name,
        membership: "Bronze",
        loyaltyPoints: 0,
        totalBookings: 1,
        totalSpent: Number(booking.totalFare || 0),

        couponCode: "",
        couponDiscount: 0,
        couponUsed: booking.couponApplied || false,

        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } else {
      await db.collection("customers").updateOne(
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
            totalSpent: Number(booking.totalFare || 0),
          },
        }
      );
    }

    // ===============================================
    // MARK COUPON AS USED
    // ===============================================

    if (booking.couponApplied && booking.couponCode) {
      await db.collection("customers").updateOne(
        {
          mobile: customerMobile,
        },
        {
          $set: {
            couponUsed: true,
            couponUsedAt: new Date(),
            couponCode: "",
            couponDiscount: 0,
          },
        }
      );

      const customer = await db.collection("customers").findOne({
        mobile: customerMobile,
      });

      await db.collection("loyaltyHistory").insertOne({
        customerId: customer?._id || null,
        mobile: customerMobile,
        name: booking.name,
        action: "Coupon Redeemed",
        points: booking.couponDiscount || 0,
        reason: booking.couponCode,
        balancePoints: customer?.loyaltyPoints || 0,
        bookingId: booking.bookingId,
        createdAt: new Date(),
      });
    }

    // ===============================================
    // SUCCESS
    // ===============================================

    return NextResponse.json({
      success: true,
      message: "Payment transaction synchronization successful.",
      modifiedCount: result.modifiedCount,
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