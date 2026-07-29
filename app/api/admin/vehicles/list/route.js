import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// ===================================================
// GET ACTIVE VEHICLES (FETCH FILTERED FLEET FOR DISPATCH)
// ===================================================
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("rctours");

    // Extract only fleet assets available for immediate deployment
    const vehicles = await db
      .collection("vehicles")
      .find({
        status: "Active",
      })
      .sort({
        createdAt: -1,
      })
      .toArray();

    return NextResponse.json({
      success: true,
      vehicles,
    });

  } catch (error) {
    console.error("GET ACTIVE VEHICLES LIST EXCEPTION:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Data extraction exception from active fleet roster logs.",
      },
      {
        status: 500,
      }
    );
  }
}