import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const { mobile, distance, tripType } = await request.json();

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
    // DISCOUNT CALCULATION
    // ==========================

    let welcomeDiscount = 100;
    let returningDiscount = 100;

    const trip = (tripType || "").toLowerCase();

    // Distance based only for One Way & Outstation
    if (
      trip.includes("one way") ||
      trip.includes("outstation")
    ) {
      welcomeDiscount = Number(distance || 0);

      // New Customer
      if (welcomeDiscount < 300) {
        welcomeDiscount = 300;
      }

      if (welcomeDiscount > 1000) {
        welcomeDiscount = 1000;
      }

      // Returning Customer
      returningDiscount = Math.floor(Number(distance || 0) / 2);

      if (returningDiscount < 300) {
        returningDiscount = 300;
      }

      if (returningDiscount > 500) {
        returningDiscount = 500;
      }
    }

    // ==========================
    // NEW CUSTOMER
    // ==========================

    if (!customer) {
      return NextResponse.json({
        success: true,
        customerType: "new",
        welcomeReward: true,
        customer: {
          mobile: cleanMobile,
          name: "",
          membership: "Bronze",
          loyaltyPoints: 0,
          totalBookings: 0,
          totalSpent: 0,
          couponCode: "WELCOME" + welcomeDiscount,
          couponDiscount: welcomeDiscount,
          couponUsed: false,
          benefitType: "Welcome Customer Offer",
        },
      });
    }

    // ==========================
    // RETURNING CUSTOMER
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
        couponCode: "RCRETURN" + returningDiscount,
        couponDiscount: returningDiscount,
        couponUsed: false,
        benefitType: "Returning Customer Benefit",
      },
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