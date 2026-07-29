import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// ===============================================
// GET METHOD: FETCH SINGLE VEHICLE
// ===============================================
export async function GET(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("rctours");

    const resolvedParams = await params;
    const vehicleId = resolvedParams?.vehicleId;

    if (!vehicleId || !ObjectId.isValid(vehicleId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Vehicle ID",
        },
        { status: 400 }
      );
    }

    const vehicle = await db.collection("vehicles").findOne({
      _id: new ObjectId(vehicleId),
    });

    if (!vehicle) {
      return NextResponse.json(
        {
          success: false,
          message: "Vehicle not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      vehicle,
    });

  } catch (error) {
    console.error("GET VEHICLE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch vehicle.",
      },
      {
        status: 500,
      }
    );
  }
}

// ===============================================
// PUT METHOD: UPDATE VEHICLE
// ===============================================
export async function PUT(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("rctours");

    const resolvedParams = await params;
    const vehicleId = resolvedParams?.vehicleId;

    if (!vehicleId || !ObjectId.isValid(vehicleId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Vehicle ID",
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    const updateData = {
      vehicleName: body.vehicleName?.trim(),
      vehicleType: body.vehicleType?.trim() || "",
      vehicleNumber: body.vehicleNumber?.trim().toUpperCase() || "",
      seats: Number(body.seats || 0),
      ratePerKm: Number(body.ratePerKm || 0),
      status: body.status || "Active",
      updatedAt: new Date(),
    };

    Object.keys(updateData).forEach((key) => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });

    const result = await db.collection("vehicles").updateOne(
      {
        _id: new ObjectId(vehicleId),
      },
      {
        $set: updateData,
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Vehicle not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Vehicle updated successfully.",
    });

  } catch (error) {
    console.error("PUT VEHICLE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update vehicle.",
      },
      {
        status: 500,
      }
    );
  }
}

// ===============================================
// DELETE METHOD: DELETE VEHICLE
// ===============================================
export async function DELETE(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("rctours");

    const resolvedParams = await params;
    const vehicleId = resolvedParams?.vehicleId;

    if (!vehicleId || !ObjectId.isValid(vehicleId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Vehicle ID",
        },
        { status: 400 }
      );
    }

    const result = await db.collection("vehicles").deleteOne({
      _id: new ObjectId(vehicleId),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Vehicle not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Vehicle deleted successfully.",
    });

  } catch (error) {
    console.error("DELETE VEHICLE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete vehicle.",
      },
      {
        status: 500,
      }
    );
  }
}