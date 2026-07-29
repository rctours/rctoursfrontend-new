import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(request, { params }) {
  try {
    const { bookingId } = await params;

    const client = await clientPromise;
    const db = client.db("rctours");

    const booking = await db.collection("bookings").findOne({
      bookingId,
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
    console.log(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}