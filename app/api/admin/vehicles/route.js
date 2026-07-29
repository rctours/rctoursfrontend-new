import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// ===============================================
// GET ALL VEHICLES (FETCH FLEET ROSTER)
// ===============================================
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("rctours");

    const vehicles = await db
      .collection("vehicles")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      vehicles,
    });

  } catch (error) {
    console.error("GET VEHICLES ENTERPRISE ROSTER ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Data extraction exception from fleet repository logs.",
      },
      { status: 500 }
    );
  }
}

// ===============================================
// ADD NEW VEHICLE (AUTHORIZE NEW FLEET ASSET)
// ===============================================
export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db("rctours");
    const body = await request.json();

    if (!body.vehicleName || !body.vehicleNumber || !body.ratePerKm) {
      return NextResponse.json(
        {
          success: false,
          message: "Operation validation rejected. Name, Number, and Rate are mandatory fields.",
        },
        { status: 400 }
      );
    }

    const vehicleId = `VEH${Date.now()}`;

    const vehicle = {
      vehicleId,
      vehicleName: body.vehicleName.trim(),
      vehicleType: body.vehicleType?.trim() || "",
      vehicleNumber: body.vehicleNumber.trim().toUpperCase(),
      seats: Number(body.seats || 0),
      ratePerKm: Number(body.ratePerKm || 0),
      status: body.status || "Active",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.collection("vehicles").insertOne(vehicle);

    return NextResponse.json({
      success: true,
      message: "New fleet asset successfully registered.",
      vehicle,
    });

  } catch (error) {
    console.error("ADD NEW VEHICLE ROUTE OPERATION FAILED:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server registry transaction write pipeline error.",
      },
      { status: 500 }
    );
  }
}