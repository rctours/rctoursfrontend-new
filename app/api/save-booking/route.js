import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { createNotification } from "@/lib/notifications";
import {
  createCustomerNotification,
} from "@/lib/customerNotifications";

// ===============================================
// POST METHOD: SAVE CUSTOMER RESERVATION
// ===============================================
export async function POST(request) {
  try {
    const body = await request.json();

    // ===============================================
    // NORMALIZE MOBILE NUMBER
    // Always save as 91XXXXXXXXXX
    // ===============================================

    let mobile = String(body.mobile || "").replace(/\D/g, "");

    if (mobile.length === 10) {
      mobile = "91" + mobile;
    }

    body.mobile = mobile;

    // ===============================================
    // DATA VALIDATION
    // ===============================================

    if (!body.name || !body.mobile || !body.pickup || !body.drop) {
      return NextResponse.json(
        {
          success: false,
          message: "Operation rejected: Incomplete booking data.",
        },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("rctours");

    // ===============================================
    // GENERATE BOOKING ID
    // ===============================================

    const today = new Date();

    const yy = today.getFullYear().toString().slice(-2);
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");

    const prefix = `RCT${yy}${mm}${dd}`;

    const lastBooking = await db
      .collection("bookings")
      .find({
        bookingId: {
          $regex: `^${prefix}`,
        },
      })
      .sort({
        bookingId: -1,
      })
      .limit(1)
      .toArray();

    let sequence = 1;

    if (lastBooking.length > 0) {
      const lastId = lastBooking[0].bookingId;
      sequence = Number(lastId.slice(-4)) + 1;
    }

    const bookingId =
      `${prefix}${String(sequence).padStart(4, "0")}`;

    // ===============================================
    // BOOKING OBJECT
    // ===============================================

    const newBooking = {
      ...body,

      bookingId,

      bookingStatus: "Pending",

      paymentStatus:
        Number(body.remainingAmount || 0) === 0
          ? "Fully Paid"
          : "Advance Paid",

      advancePaid: Number(body.advancePaid || 0),

      remainingAmount: Number(body.remainingAmount || 0),

      paidAmount: Number(body.advancePaid || 0),

      tripStatus: "Pending",

      invoiceReady: false,

      isNew: true,

      adminSeen: false,

      createdAt: new Date(),

      updatedAt: new Date(),
    };

    // ===============================================
    // SAVE BOOKING
    // ===============================================

    const result = await db
      .collection("bookings")
      .insertOne(newBooking);

    // ===============================================
    // CREATE ADMIN NOTIFICATION
    // ===============================================

    await createNotification({
      title: "New Booking Received",
      message:
        `${body.name} booked a ride from ` +
        `${body.pickup} to ${body.drop}.`,
      type: "booking",
      link: `/admin/bookings/${bookingId}`,
    });

    // ===============================================
    // CREATE CUSTOMER BOOKING NOTIFICATION
    // ===============================================

    await createCustomerNotification({
      mobile: body.mobile,

      title: "Booking Confirmed 🎉",

      message:
        `Your booking ${bookingId} has been successfully received. ` +
        `Trip: ${body.pickup} to ${body.drop}. ` +
        `You can check your booking details in your Customer Portal.`,

      type: "booking-confirmed",

      link: "/profile-login",
    });

    // ===============================================
    // MARK COUPON AS USED
    // ===============================================

    if (body.couponApplied && body.couponCode) {
      const customer = await db
        .collection("customers")
        .findOne({
          mobile: body.mobile,
        });

      await db.collection("customers").updateOne(
        {
          mobile: body.mobile,
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

      await db.collection("loyaltyHistory").insertOne({
        customerId: customer?._id || null,

        mobile: body.mobile,

        name: body.name,

        action: "Coupon Redeemed",

        points: body.couponDiscount,

        reason: body.couponCode,

        balancePoints:
          customer?.loyaltyPoints || 0,

        bookingId,

        createdAt: new Date(),
      });

      // =============================================
      // CUSTOMER COUPON USED NOTIFICATION
      // =============================================

      await createCustomerNotification({
        mobile: body.mobile,

        title: "Reward Coupon Used 🎁",

        message:
          `Your coupon ${body.couponCode} has been successfully applied ` +
          `to booking ${bookingId}. You saved ₹${body.couponDiscount || 0}.`,

        type: "coupon-used",

        link: "/profile-login",
      });
    }

    // ===============================================
    // SUCCESS RESPONSE
    // ===============================================

    return NextResponse.json({
      success: true,

      message:
        "Reservation recorded successfully within RC Tours & Travels registry.",

      bookingId,

      insertedId: result.insertedId,
    });

  } catch (error) {
    console.error(
      "CRITICAL BOOKING SAVE PIPELINE EXCEPTION:",
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