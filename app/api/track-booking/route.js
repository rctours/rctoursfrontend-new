import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// ===============================================
// TRACK BOOKING (Booking ID + Mobile)
// ===============================================

export async function POST(request) {
  try {
    const body = await request.json();

    const bookingId = (body.bookingId || "").trim().toUpperCase();

    const inputMobile = (body.mobile || "").replace(/\D/g, "");
    const mobile = inputMobile.slice(-10);

    if (!bookingId || !mobile) {
      return NextResponse.json(
        {
          success: false,
          message: "Booking ID and Mobile Number are required.",
        },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("rctours");

    console.log("====================================");
    console.log("TRACK BOOKING API");
    console.log("Booking ID :", bookingId);
    console.log("Mobile :", mobile);

    // ==========================================
    // FIND BOOKING
    // ==========================================

    const booking = await db.collection("bookings").findOne({
      bookingId,
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

    // ==========================================
    // MOBILE VERIFY
    // ==========================================

    const bookingMobile = (booking.mobile || "")
      .replace(/\D/g, "")
      .slice(-10);

    if (bookingMobile !== mobile) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Mobile Number.",
        },
        { status: 401 }
      );
    }

    // ==========================================
    // CUSTOMER
    // ==========================================

    let customer = await db.collection("customers").findOne({
      mobile: bookingMobile,
    });

    if (!customer) {
      customer = {
        loyaltyPoints: 0,
        totalBookings: 1,
        totalSpent: booking.totalFare || 0,
        membership: "Bronze",
        couponCode: "",
        couponDiscount: 0,
        couponUsed: false,
      };
    }

    console.log("BOOKING FOUND :", booking.bookingId);
    console.log("CUSTOMER FOUND :", customer);
    console.log("====================================");

    return NextResponse.json({
      success: true,

      bookings: [booking],

      loyalty: {
        points: customer.loyaltyPoints || 0,
        totalBookings: customer.totalBookings || 0,
        totalSpent: customer.totalSpent || 0,
        membership: customer.membership || "Bronze",
        couponCode: customer.couponCode || "",
        couponDiscount: customer.couponDiscount || 0,
        couponUsed: customer.couponUsed || false,
      },
    });

  } catch (error) {
    console.error("TRACK BOOKING ERROR :", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error.",
      },
      { status: 500 }
    );
  }
}