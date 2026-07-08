import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  try {
    const body = await req.json();

    const bookingId = (body.bookingId || "")
      .trim()
      .toUpperCase();

    const mobile = (body.mobile || "")
      .trim()
      .replace(/\s/g, "");

    const client = await clientPromise;

    const db = client.db("rctours");

    const booking = await db.collection("bookings").findOne({
      bookingId,
      mobile,
    });

    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          message: "Booking not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      booking,
    });

  } catch (error) {
    console.error("TRACK BOOKING ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}