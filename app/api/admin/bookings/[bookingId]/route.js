import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(request, { params }) {
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

    const booking = await db.collection("bookings").findOne(
      { bookingId: bookingId.trim() },
      {
        projection: {
          _id: 1,
          bookingId: 1,
          vehicle: 1,
          tripType: 1,
          pickup: 1,
          drop: 1,
          pickupDate: 1,
          returnDate: 1,
          pickupTime: 1,
          distance: 1,
          passengers: 1,
          luggage: 1,
          name: 1,
          mobile: 1,
          whatsapp: 1,
          email: 1,
          gender: 1,
          notes: 1,
          paymentType: 1,
          totalFare: 1,
          advancePaid: 1,
          remainingAmount: 1,
          payableAmount: 1,
          paymentStatus: 1,
          tripStatus: 1,
          createdAt: 1
        }
      }
    );

    if (!booking) {
      return NextResponse.json(
        { success: false, message: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      booking
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}