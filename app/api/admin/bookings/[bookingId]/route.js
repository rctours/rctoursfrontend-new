import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// ===============================================
// GET SINGLE BOOKING
// ===============================================
export async function GET(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("rctours");

    const resolvedParams = await params;
    const bookingId = resolvedParams?.bookingId;

    if (!bookingId) {
      return NextResponse.json(
        {
          success: false,
          message: "Required booking token reference identity missing.",
        },
        { status: 400 }
      );
    }

    // ============================
    // GET BOOKING
    // ============================

    const booking = await db.collection("bookings").findOne({
      bookingId: bookingId.trim(),
    });

    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          message: "No localized reservation matched specified identity log.",
        },
        { status: 404 }
      );
    }

    // ============================
    // GET CUSTOMER REWARD DATA
    // ============================

    const customer = await db.collection("customers").findOne({
      mobile: booking.mobile,
    });

    if (customer) {
      booking.loyaltyPoints = customer.loyaltyPoints || 0;
      booking.totalBookings = customer.totalBookings || 0;
      booking.totalSpent = customer.totalSpent || 0;
      booking.membership = customer.membership || "Bronze";
      booking.couponCode = customer.couponCode || "";
      booking.couponDiscount = customer.couponDiscount || 0;
      booking.couponUsed = customer.couponUsed || false;
    } else {
      booking.loyaltyPoints = 0;
      booking.totalBookings = 0;
      booking.totalSpent = 0;
      booking.membership = "Bronze";
      booking.couponCode = "";
      booking.couponDiscount = 0;
      booking.couponUsed = false;
    }

    return NextResponse.json({
      success: true,
      booking,
    });

  } catch (error) {

    console.error(
      "GET SINGLE RESERVATION API MODULE EXCEPTION:",
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

// ===============================================
// UPDATE BOOKING RECORD
// ===============================================
export async function PATCH(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("rctours");

    const resolvedParams = await params;
    const bookingId = resolvedParams?.bookingId;

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

    const body = await request.json();

    const allowedFields = [
      "bookingStatus",
      "driverName",
      "driverMobile",
      "driverId",
      "paymentStatus",
      "paymentType",
      "paymentId",
      "orderId",
      "advancePaid",
      "remainingAmount",
      "payableAmount",
      "tripStatus",
      "notes",
      "adminNotes",
      "isNew",
    ];

    const updateData = {};

    allowedFields.forEach((field) => {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    });

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Payload synchronization rejected. No mutable operations fields defined.",
        },
        {
          status: 400,
        }
      );
    }

    updateData.updatedAt = new Date();

    const result = await db.collection("bookings").updateOne(
      {
        bookingId: bookingId.trim(),
      },
      {
        $set: updateData,
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Target entity index not located within parameters.",
        },
        {
          status: 404,
        }
      );
    }

    const updatedBooking = await db.collection("bookings").findOne({
      bookingId: bookingId.trim(),
    });

    return NextResponse.json({
      success: true,
      message:
        "Ledger transaction updated successfully inside active state.",
      booking: updatedBooking,
    });

  } catch (error) {

    console.error(
      "PATCH RESERVATION DISPATCH PIPELINE EXCEPTION:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Internal data synchronization write pipeline error.",
      },
      {
        status: 500,
      }
    );
  }
}