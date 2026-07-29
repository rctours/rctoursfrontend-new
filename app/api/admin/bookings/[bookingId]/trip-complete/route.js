import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// ==========================================================
// PATCH METHOD: MARK TRIP AS COMPLETED
// ==========================================================

export async function PATCH(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("rctours");

    const resolvedParams = await params;
    const bookingId = resolvedParams?.bookingId;

    if (!bookingId) {
      return NextResponse.json(
        {
          success: false,
          message: "Booking ID missing.",
        },
        { status: 400 }
      );
    }

    // ==========================
    // GET BOOKING
    // ==========================

    const booking = await db.collection("bookings").findOne({
      bookingId: bookingId.trim(),
    });

    // ======================================
  // NORMALIZE MOBILE NUMBER
  // ======================================

  let mobile = String(booking.mobile || "").replace(/\D/g, "");

if (mobile.length === 10) {
  mobile = "91" + mobile;
}

booking.mobile = mobile;

    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          message: "Booking not found.",
        },
        { status: 404 }
      );
    }

    // ==========================
    // UPDATE BOOKING
    // ==========================

    await db.collection("bookings").updateOne(
      {
        bookingId: bookingId.trim(),
      },
      {
        $set: {
          tripStatus: "Completed",
          bookingStatus: "Completed",
          invoiceReady: true,
          tripCompletedAt: new Date(),
          updatedAt: new Date(),
        },
      }
    );

    // ==========================
    // LOYALTY + COUPON SYSTEM
    // ==========================

    if (booking.paymentStatus === "Fully Paid") {

      if (booking.loyaltyProcessed) {
  const updatedBooking = await db.collection("bookings").findOne({
    bookingId: booking.bookingId,
  });

  return NextResponse.json({
    success: true,
    message: "Loyalty already processed.",
    booking: updatedBooking,
  });
}

      const earnedPoints =
        booking.tripType === "Outstation Trip"
          ? 100
          : 50;

      // Customer update/create
      await db.collection("customers").updateOne(
        {
          mobile: booking.mobile,
        },
        {
          $set: {
            name: booking.name,
            updatedAt: new Date(),
          },

          $inc: {
            totalBookings: 1,
            totalSpent: Number(booking.totalFare || 0),
            loyaltyPoints: earnedPoints,
          },

          $setOnInsert: {
            membership: "Bronze",
            createdAt: new Date(),
          },
        },
        {
          upsert: true,
        }
      );

      // Updated customer
      const customer = await db.collection("customers").findOne({
        mobile: booking.mobile,
      });

      if (customer) {

        // ==========================
        // MEMBERSHIP UPDATE
        // ==========================

        let membership = "Bronze";

        if (customer.loyaltyPoints >= 1000) {
          membership = "Platinum";
        } else if (customer.loyaltyPoints >= 700) {
          membership = "Gold";
        } else if (customer.loyaltyPoints >= 400) {
          membership = "Silver";
        }

        await db.collection("customers").updateOne(
          {
            mobile: booking.mobile,
          },
          {
            $set: {
              membership,
            },
          }
        );

        // ==========================
        // COUPON GENERATE
        // ==========================

        if (customer.loyaltyPoints >= 300) {

  if (
    !customer.couponCode ||
    customer.couponUsed
  ) {

    const couponCode =
      `RC${booking.mobile.slice(-4)}${customer.loyaltyPoints}`;

    await db.collection("customers").updateOne(
      {
        mobile: booking.mobile,
      },
      {
        $set: {
          couponCode,
          couponDiscount: 300,
          couponUsed: false,
          couponGeneratedAt: new Date(),
        },
      }
    );

  }

}
      }
      
    await db.collection("bookings").updateOne(
    {
    bookingId: booking.bookingId,
    },
    {
    $set: {
      loyaltyProcessed: true,
    },
    }
  );

  // ==========================
// LOYALTY HISTORY
// ==========================

await db.collection("loyaltyHistory").insertOne({
  customerId: customer?._id || null,
  mobile: booking.mobile,
  name: booking.name,

  action: "Trip Reward",

  points: earnedPoints,

  reason: booking.tripType,

  balancePoints: customer.loyaltyPoints,

  bookingId: booking.bookingId,

  createdAt: new Date(),
});

}

    // ==========================
    // DRIVER AVAILABLE
    // ==========================

    if (booking.driverId) {
      await db.collection("drivers").updateOne(
        {
          driverId: booking.driverId,
        },
        {
          $set: {
            status: "Available",
            updatedAt: new Date(),
          },
        }
      );
    }

    // ==========================
    // VEHICLE AVAILABLE
    // ==========================

    if (booking.vehicleId) {
      await db.collection("vehicles").updateOne(
        {
          vehicleId: booking.vehicleId,
        },
        {
          $set: {
            status: "Active",
            updatedAt: new Date(),
          },
        }
      );
    }

    // ==========================
    // RETURN UPDATED BOOKING
    // ==========================

    const updatedBooking = await db.collection("bookings").findOne({
      bookingId: bookingId.trim(),
    });

    return NextResponse.json({
      success: true,
      message: "Trip completed successfully.",
      booking: updatedBooking,
    });

  } catch (error) {

    console.error("TRIP COMPLETE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error.",
      },
      { status: 500 }
    );
  }
}