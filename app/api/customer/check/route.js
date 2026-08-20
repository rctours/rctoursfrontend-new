import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const { mobile, tripType } = await request.json();

    if (!mobile) {
      return NextResponse.json(
        {
          success: false,
          message: "Mobile number is required.",
        },
        {
          status: 400,
        }
      );
    }

    // ==========================
    // MOBILE NORMALIZE
    // ==========================

    let cleanMobile = mobile
      .replace(/\D/g, "")
      .replace(/^0+/, "");

    if (cleanMobile.length > 10) {
      cleanMobile = cleanMobile.slice(-10);
    }

    // Mobile number must be exactly 10 digits
    if (!/^\d{10}$/.test(cleanMobile)) {
      return NextResponse.json({
        success: false,
        message: "Please enter a valid 10 digit mobile number.",
      });
    }

    const client = await clientPromise;
    const db = client.db("rctours");

    // ==========================
    // FIND CUSTOMER
    // ==========================

    const customer = await db.collection("customers").findOne({
      mobile: cleanMobile,
    });

    // ==========================
    // CURRENT TRIP LOYALTY POINTS
    // ==========================

    let tripLoyaltyPoints = 100;

    if (tripType === "Local Rental") {
      tripLoyaltyPoints = 50;
    }

    // ==========================
    // NEW CUSTOMER
    // ==========================

    if (!customer) {
      return NextResponse.json({
        success: true,

        customerType: "new",

        customer: {
          mobile: cleanMobile,
          name: "",
          membership: "Bronze",
          loyaltyPoints: 0,
          totalBookings: 0,
          totalSpent: 0,

          // No coupon for new customer
          couponCode: "",
          couponDiscount: 0,
          couponUsed: true,
        },

        tripLoyaltyPoints,
      });
    }

    // ==========================
    // EXISTING CUSTOMER
    // ==========================

    return NextResponse.json({
      success: true,

      customerType: "returning",

      customer: {
        mobile: cleanMobile,
        name: customer.name || "",
        membership: customer.membership || "Bronze",
        loyaltyPoints: customer.loyaltyPoints || 0,
        totalBookings: customer.totalBookings || 0,
        totalSpent: customer.totalSpent || 0,

        // ==========================
        // LOYALTY COUPON
        // ==========================

        couponCode: customer.couponCode || "",
        couponDiscount: customer.couponDiscount || 0,
        couponUsed: customer.couponUsed ?? true,
      },

      tripLoyaltyPoints,
    });

  } catch (error) {
    console.error("Customer Check Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to check customer.",
      },
      {
        status: 500,
      }
    );
  }
}