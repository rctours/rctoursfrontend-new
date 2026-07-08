import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function PATCH(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("rctours");

    const { bookingId } = await params;

    const result = await db.collection("bookings").updateOne(
      { bookingId: bookingId.trim() },
      {
        $set: {
          tripStatus: "Completed",
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({
        success: false,
        message: "Booking not found",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Trip marked as completed",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
      message: "Server Error",
    });
  }
}