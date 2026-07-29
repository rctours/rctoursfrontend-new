import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// ===============================================
// GET SINGLE BOOKING DATA (PUBLIC/USER ACCESS)
// ===============================================
export async function GET(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("rctours");

    // Next.js standard asynchronous params injection
    const resolvedParams = await params;
    const bookingId = resolvedParams?.bookingId;

    if (!bookingId) {
      return NextResponse.json(
        {
          success: false,
          message: "Required booking token reference identity missing.",
        },
        { status: 400 }
      );
    }

    // Locate reservation instance in collection
    const booking = await db.collection("bookings").findOne({
      bookingId: bookingId.trim(),
    });

    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          message: "No reservation matched the specified identity log.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      booking,
    });

  } catch (error) {
    console.error("GET PUBLIC BOOKING API MODULE EXCEPTION:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal ledger processing data exception encountered.",
      },
      { status: 500 }
    );
  }
}