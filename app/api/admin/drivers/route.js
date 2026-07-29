import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// ===============================================
// GET ALL DRIVERS (FETCH ROSTER FROM DATABASE)
// ===============================================
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("rctours");

    const drivers = await db
      .collection("drivers")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      drivers,
    });

  } catch (error) {
    console.error("GET DRIVERS ENTERPRISE ROSTER ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Data extraction exception from driver repository logs.",
      },
      { status: 500 }
    );
  }
}

// ===============================================
// ADD NEW DRIVER (AUTHORIZE NEW OPERATOR INSTANCE)
// ===============================================
export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db("rctours");
    const body = await request.json();

    if (!body.name || !body.mobile) {
      return NextResponse.json(
        {
          success: false,
          message: "Operation validation rejected. Driver name and mobile indices are required.",
        },
        { status: 400 }
      );
    }

    const driverId = `DRV${Date.now()}`;

    const driver = {
      driverId,
      name: body.name.trim(),
      mobile: body.mobile.trim(),
      email: body.email?.trim() || "",
      address: body.address?.trim() || "",
      licenseNumber: body.licenseNumber?.trim() || "",
      vehicleAssigned: body.vehicleAssigned?.trim() || "",
      status: body.status || "Active",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.collection("drivers").insertOne(driver);

    return NextResponse.json({
      success: true,
      message: "Driver account synchronized and activated successfully.",
      driver,
    });

  } catch (error) {
    console.error("ADD NEW DRIVER ROUTE OPERATION FAILED:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server registry transaction write pipeline error.",
      },
      { status: 500 }
    );
  }
}