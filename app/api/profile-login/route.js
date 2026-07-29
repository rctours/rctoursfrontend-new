import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const body = await request.json();

    const inputMobile = (body.mobile || "").replace(/\D/g, "");
    const mobile = inputMobile.slice(-10);

    const email = (body.email || "").trim().toLowerCase();

    if (!mobile || !email) {
      return NextResponse.json(
        {
          success: false,
          message: "Mobile Number and Email are required.",
        },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("rctours");

    const allBookings = await db
      .collection("bookings")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    const bookings = allBookings.filter((booking) => {
      const bookingMobile = (booking.mobile || "")
        .replace(/\D/g, "")
        .slice(-10);

      return (
        bookingMobile === mobile &&
        (booking.email || "").trim().toLowerCase() === email
      );
    });

    if (bookings.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Booking not found.",
        },
        { status: 404 }
      );
    }

    const customer =
      (await db.collection("customers").findOne({ mobile })) || {
        loyaltyPoints: 0,
        totalBookings: bookings.length,
        totalSpent: bookings.reduce(
          (sum, b) => sum + Number(b.totalFare || 0),
          0
        ),
        membership: "Bronze",
        couponCode: "",
        couponDiscount: 0,
        couponUsed: false,
      };

    return NextResponse.json({
      success: true,
      bookings,
      loyalty: {
        points: customer.loyaltyPoints || 0,
        totalBookings: customer.totalBookings || bookings.length,
        totalSpent: customer.totalSpent || 0,
        membership: customer.membership || "Bronze",
        couponCode: customer.couponCode || "",
        couponDiscount: customer.couponDiscount || 0,
        couponUsed: customer.couponUsed || false,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}