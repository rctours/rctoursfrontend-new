import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// ===================================================
// PATCH METHOD: OVERHAUL COMPLETELY WITH EXTRA CHARGES
// ===================================================
export async function PATCH(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("rctours");

    // 1. Await Params Configuration securely
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

    const body = await request.json();

    // 2. Validate existence index before processing transaction writes
    const booking = await db.collection("bookings").findOne({
      bookingId: bookingId.trim(),
    });

    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          message: "No localized reservation matched specified identity log.",
        },
        { status: 404 }
      );
    }

    // 3. Sync database nodes with advanced payload parameters
    await db.collection("bookings").updateOne(
      { bookingId: bookingId.trim() },
      {
        $set: {
          // Commercial Transit Expenses Matrix
          toll: Number(body.toll || 0),
          parking: Number(body.parking || 0),
          stateTax: Number(body.stateTax || 0),
          driverAllowance: Number(body.driverAllowance || 0),
          distance: Number(body.distance || 0),

          // Operational Status Indicators
          tripStatus: body.tripStatus || "Pending",
          bookingStatus: body.bookingStatus || booking.bookingStatus || "Pending",

          // Customer Identity Indices
          name: body.name || "",
          mobile: body.mobile || "",
          email: body.email || "",

          // Routing Geometry Points
          pickup: body.pickup || "",
          drop: body.drop || "",

          // Chrono Schedules
          journeyDate: body.journeyDate || "",
          journeyTime: body.journeyTime || "",

          // Consolidated Total Fare Matrix
          totalFare: Number(body.totalFare || 0),

          // Operator Allocation Anchors
          driverId: body.driverId || "",
          driverName: body.driverName || "",
          driverMobile: body.driverMobile || "",

          // Vehicle Asset Allocation Anchors
          vehicleId: body.vehicleId || "",
          vehicleName: body.vehicleName || "",
          vehicleNumber: body.vehicleNumber || "",
          
          updatedAt: new Date(),
        },
      }
    );

    // ===============================================
// DRIVER STATUS UPDATE
// ===============================================

if (body.driverId) {
  await db.collection("drivers").updateOne(
    {
      driverId: body.driverId,
    },
    {
      $set: {
        status: "Busy",
        updatedAt: new Date(),
      },
    }
  );
}

// ===============================================
// VEHICLE STATUS UPDATE
// ===============================================

if (body.vehicleId) {
  await db.collection("vehicles").updateOne(
    {
      vehicleId: body.vehicleId,
    },
    {
      $set: {
        status: "Booked",
        updatedAt: new Date(),
      },
    }
  );
}

    // 4. Fetch pristine state post mutation
    const updatedBooking = await db.collection("bookings").findOne({
      bookingId: bookingId.trim(),
    });

    return NextResponse.json({
      success: true,
      message: "Extended operations parameters synced cleanly.",
      booking: updatedBooking,
    });

  } catch (error) {
    console.error("CRITICAL EXTRAS ROUTE OPERATION FAILED:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server payload transaction error.",
      },
      { status: 500 }
    );
  }
}