import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { verifyAdmin } from "@/lib/auth";

export async function GET() {
  try {
    const isAdmin = await verifyAdmin();

    if (!isAdmin) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const client = await clientPromise;

    const db = client.db("rctours");

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
    console.error("ADMIN API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Error fetching bookings",
      },
      { status: 500 }
    );
  }
}