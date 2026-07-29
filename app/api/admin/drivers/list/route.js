import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// ===================================================
// GET ACTIVE DRIVERS (FETCH FILTERED ROSTER FOR DISPATCH)
// ===================================================
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("rctours");

    // Extract only operators available for immediate scheduling
    const drivers = await db
      .collection("drivers")
      .find({
        status: "Active",
      })
      .sort({
        createdAt: -1,
      })
      .toArray();

    return NextResponse.json({
      success: true,
      drivers,
    });

  } catch (error) {
    console.error("GET ACTIVE DRIVERS LIST EXCEPTION:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Data extraction exception from active driver roster logs.",
      },
      {
        status: 500,
      }
    );
  }
}