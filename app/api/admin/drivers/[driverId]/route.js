import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// ===============================================
// GET SINGLE DRIVER
// ===============================================
export async function GET(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("rctours");

    const { driverId } = await params;

    if (!driverId || !ObjectId.isValid(driverId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Driver ID",
        },
        { status: 400 }
      );
    }

    const driver = await db.collection("drivers").findOne({
      _id: new ObjectId(driverId),
    });


    if (!driver) {
      return NextResponse.json(
        {
          success: false,
          message: "Driver not found",
        },
        { status: 404 }
      );
    }

    // ===============================================
// DRIVER BOOKINGS HISTORY
// ===============================================

const bookings = await db
  .collection("bookings")
  .find({
    driverId: driver.driverId,
  })
  .sort({
    createdAt: -1,
  })
  .toArray();

const totalTrips = bookings.length;

const totalRevenue = bookings.reduce(
  (sum, booking) => sum + Number(booking.totalFare || 0),
  0
);

    return NextResponse.json({
    success: true,
    driver,
    bookings,
    totalTrips,
    totalRevenue,
    });

  } catch (error) {
    console.error("GET DRIVER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch driver.",
      },
      { status: 500 }
    );
  }
}

// ===============================================
// UPDATE DRIVER
// ===============================================
export async function PUT(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("rctours");

    const { driverId } = await params;

    if (!driverId || !ObjectId.isValid(driverId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Driver ID",
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    const updateData = {
      name: body.name?.trim(),
      mobile: body.mobile?.trim(),
      email: body.email?.trim() || "",
      address: body.address?.trim() || "",
      licenseNumber: body.licenseNumber?.trim() || "",
      vehicleAssigned: body.vehicleAssigned?.trim() || "",
      status: body.status || "Active",
      updatedAt: new Date(),
    };

    Object.keys(updateData).forEach((key) => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });

    const result = await db.collection("drivers").updateOne(
      {
        _id: new ObjectId(driverId),
      },
      {
        $set: updateData,
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Driver not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Driver updated successfully.",
    });

  } catch (error) {
    console.error("PUT DRIVER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update driver.",
      },
      { status: 500 }
    );
  }
}

// ===============================================
// DELETE DRIVER
// ===============================================
export async function DELETE(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("rctours");

    const { driverId } = await params;

    if (!driverId || !ObjectId.isValid(driverId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Driver ID",
        },
        { status: 400 }
      );
    }

    const result = await db.collection("drivers").deleteOne({
      _id: new ObjectId(driverId),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Driver not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Driver deleted successfully.",
    });

  } catch (error) {
    console.error("DELETE DRIVER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete driver.",
      },
      { status: 500 }
    );
  }
}