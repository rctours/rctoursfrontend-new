import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// ===============================================
// POST METHOD: SUBMIT NEW CUSTOMER BOOKING
// ===============================================
export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db("rctours");
    const body = await request.json();

    // 1. Data Integrity Check (Essential Booking Fields)
    if (!body.name || !body.mobile || !body.pickup) {
      return NextResponse.json(
        {
          success: false,
          message: "Operation rejected. Essential customer contact or location data missing.",
        },
        { status: 400 }
      );
    }

    // 2. Generate Unique Booking Identifier
    const bookingId = `BKG${Date.now().toString().slice(-6)}`;

    // 3. Construct Booking Ledger Document
    const newBooking = {
      ...body,
      bookingId,
      bookingStatus: "Pending", // Default initial state
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // 4. Register Transaction into Database
    const result = await db.collection("bookings").insertOne(newBooking);

    return NextResponse.json({
      success: true,
      message: "Reservation request recorded successfully.",
      bookingId,
      insertedId: result.insertedId,
    });

  } catch (error) {
    console.error("CRITICAL BOOKING SUBMISSION PIPELINE EXCEPTION:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal ledger processing data exception encountered.",
      },
      { status: 500 }
    );
  }
}