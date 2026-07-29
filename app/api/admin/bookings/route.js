import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { verifyAdmin } from "@/lib/auth";

// ===================================================
// GET MASTER RESERVATIONS (FETCH DISPATCH ENTERPRISES)
// ===================================================
export async function GET() {
  try {
    // 1. Session & Authority Validation Check
    const isAdmin = await verifyAdmin();

    if (!isAdmin) {
      return NextResponse.json(
        {
          success: false,
          message: "Access denied. Operation credentials rejected.",
        },
        { status: 401 }
      );
    }

    // 2. Establish Database Node Stream
    const client = await clientPromise;
    const db = client.db("rctours");

    // 3. Extract Operations Datasets
    const bookings = await db
      .collection("bookings")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error("ADMIN MASTER BOOKINGS API FETCH EXCEPTION:", error);
    
    return NextResponse.json(
      {
        success: false,
        message: "Data extraction exception from internal server grid logs.",
      },
      { status: 500 }
    );
  }
}