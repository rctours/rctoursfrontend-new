import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function PATCH(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("rctours");

    const { bookingId } = await params;

    if (!bookingId) {
      return NextResponse.json(
        { success: false, message: "Booking ID missing" },
        { status: 400 }
      );
    }

    const booking = await db.collection("bookings").findOne({
      bookingId: bookingId.trim(),
    });

    if (!booking) {
      return NextResponse.json(
        { success: false, message: "Booking not found" },
        { status: 404 }
      );
    }

    // UPDATE PAYMENT STATUS
    await db.collection("bookings").updateOne(
      { bookingId: bookingId.trim() },
      {
        $set: {
          paymentStatus: "Fully Paid",
          advancePaid: booking.totalFare,
          remainingAmount: 0,
        },
      }
    );

    return NextResponse.json({
      success: true,
      message: "Payment marked as fully paid",
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}