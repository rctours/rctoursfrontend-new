import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// ==========================================================
// PATCH METHOD: DIRECT LEDGER SETTLEMENT (MARK AS FULLY PAID)
// ==========================================================
export async function PATCH(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("rctours");

    // 1. Next.js standard params injection extraction
    const resolvedParams = await params;
    const bookingId = resolvedParams?.bookingId;

    if (!bookingId) {
      return NextResponse.json(
        { success: false, message: "Required booking token reference identity missing." },
        { status: 400 }
      );
    }

    // 2. Locate active reservation instance in collection ledger
    const booking = await db.collection("bookings").findOne({
      bookingId: bookingId.trim(),
    });

    if (!booking) {
      return NextResponse.json(
        { success: false, message: "No localized reservation matched specified identity log." },
        { status: 404 }
      );
    }

    // Mathematical safety fallback logic to parse gross target amount
    const dynamicTotalFare = Number(booking.totalFare || booking.fare || 0);

    // 3. Update database flags to reflect closed financial pipeline
    await db.collection("bookings").updateOne(
      { bookingId: bookingId.trim() },
      {
        $set: {
          paymentStatus: "Fully Paid",
          advancePaid: dynamicTotalFare,
          remainingAmount: 0,
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.json({
      success: true,
      message: "Ledger status successfully forced to Fully Paid state.",
    });

  } catch (error) {
    console.error("CRITICAL SETTLEMENT PAYMENT ROUTE FAILED:", error);
    return NextResponse.json(
      { success: false, message: "Internal server payload transaction error." },
      { status: 500 }
    );
  }
}