import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const body = await request.json();

    const mobile = (body.mobile || "")
      .replace(/\D/g, "")
      .slice(-10);

    if (!mobile) {
      return NextResponse.json(
        {
          success: false,
          message: "Mobile is required",
        },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("rctours");

    console.log("====================================");
    console.log("MY PROFILE API");
    console.log("Requested Mobile :", mobile);

    // ==========================
    // CUSTOMER
    // ==========================

    const allCustomers = await db
      .collection("customers")
      .find({})
      .toArray();

    const customer = allCustomers.find((c) => {
      const customerMobile = (c.mobile || "")
        .replace(/\D/g, "")
        .slice(-10);

      return customerMobile === mobile;
    });

    console.log("CUSTOMER FOUND :", customer);

    if (!customer) {
      return NextResponse.json(
        {
          success: false,
          message: "Customer not found",
        },
        { status: 404 }
      );
    }

    // ==========================
    // BOOKINGS
    // ==========================

    const allBookings = await db
      .collection("bookings")
      .find({})
      .sort({
        createdAt: -1,
      })
      .toArray();

    const bookings = allBookings.filter((booking) => {
      const bookingMobile = (booking.mobile || "")
        .replace(/\D/g, "")
        .slice(-10);

      return bookingMobile === mobile;
    });

    console.log("BOOKINGS FOUND :", bookings.length);
    console.log(bookings);

    console.log("====================================");

    return NextResponse.json({
      success: true,

      customer: {
        ...customer,

        loyalty: {
          points: customer.loyaltyPoints || 0,
          totalBookings: customer.totalBookings || 0,
          totalSpent: customer.totalSpent || 0,
          membership: customer.membership || "Bronze",
          couponCode: customer.couponCode || "",
          couponDiscount: customer.couponDiscount || 0,
          couponUsed: customer.couponUsed || false,
        },
      },

      bookings,
    });

  } catch (error) {
    console.error("MY PROFILE ERROR :", error);

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