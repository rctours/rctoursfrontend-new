import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const { couponCode, mobile, fare } = await request.json();

    // ==========================
    // REQUIRED FIELDS
    // ==========================

    if (!couponCode || !mobile) {
      return NextResponse.json({
        success: false,
        message: "Coupon code and mobile number are required.",
      });
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

    // ==========================
    // FIND CUSTOMER
    // ==========================

    const client = await clientPromise;
    const db = client.db("rctours");

    const customers = await db
      .collection("customers")
      .find({})
      .toArray();

    const customer = customers.find((item) => {
      let dbMobile = String(item.mobile || "")
        .replace(/\D/g, "")
        .replace(/^0+/, "");

      if (dbMobile.length > 10) {
        dbMobile = dbMobile.slice(-10);
      }

      return dbMobile === cleanMobile;
    });

    // ==========================
    // CUSTOMER CHECK
    // ==========================

    if (!customer) {
      return NextResponse.json({
        success: false,
        message: "Customer not found.",
      });
    }

    // ==========================
    // COUPON CODE CHECK
    // ==========================

    if (
      !customer.couponCode ||
      customer.couponCode.trim().toUpperCase() !==
        couponCode.trim().toUpperCase()
    ) {
      return NextResponse.json({
        success: false,
        message: "Invalid coupon code.",
      });
    }

    // ==========================
    // COUPON USED CHECK
    // ==========================

    if (customer.couponUsed) {
      return NextResponse.json({
        success: false,
        message: "Coupon already used.",
      });
    }

    // ==========================
    // MINIMUM BOOKING RULE
    // ==========================

    const bookingFare = Number(fare || 0);
    const minimumFare = 4000;

    if (bookingFare < minimumFare) {
      return NextResponse.json({
        success: false,
        message:
          "This loyalty coupon is valid only on bookings above ₹4000.",
      });
    }

    // ==========================
    // FIXED LOYALTY DISCOUNT
    // ==========================

    const discount = Math.min(
      Number(customer.couponDiscount || 300),
      300
    );

    // ==========================
    // SUCCESS
    // ==========================

    return NextResponse.json({
      success: true,

      couponCode: customer.couponCode,

      discount,

      discountType: "vehicleFare",

      applyOn: "vehicleFare",

      minimumFare: 4000,

      message: `Coupon Applied Successfully! You saved ₹${discount}`,
    });

  } catch (error) {
    console.error("Coupon Validate Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}