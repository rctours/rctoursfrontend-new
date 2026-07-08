import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function PATCH(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("rctours");

    // ✅ STEP 1: bookingId lo (IMPORTANT FIX)
    const { bookingId } = await params;

    const body = await request.json();

    // ✅ STEP 2: pehle booking check karo
    const booking = await db.collection("bookings").findOne({
      bookingId: bookingId.trim(),
    });

    if (!booking) {
      return NextResponse.json({
        success: false,
        message: "Booking not found ❌",
      });
    }

    // ✅ STEP 3: update karo
    await db.collection("bookings").updateOne(
      { bookingId: bookingId.trim() },
      {
        $set: {
          toll: Number(body.toll || 0),
          parking: Number(body.parking || 0),
          stateTax: Number(body.stateTax || 0),
          driverAllowance: Number(body.driverAllowance || 0),
          driverName: body.driverName || "",
          driverMobile: body.driverMobile || "",
        },
      }
    );

    // ✅ STEP 4: updated data wapas lao
    const updatedBooking = await db.collection("bookings").findOne({
      bookingId: bookingId.trim(),
    });

    return NextResponse.json({
      success: true,
      booking: updatedBooking,
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
      message: "Server Error",
    });
  }
}