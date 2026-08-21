import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { createNotification } from "@/lib/notifications";
import {
  createCustomerNotification,
} from "@/lib/customerNotifications";
import webpush from "web-push";

// ===============================================
// WEB PUSH CONFIGURATION
// ===============================================

webpush.setVapidDetails(
  process.env.VAPID_SUBJECT,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

// ===============================================
// NORMALIZE MOBILE
// ===============================================

function normalizeMobile(mobile) {
  let value = String(mobile || "")
    .replace(/\D/g, "");

  if (value.length === 10) {
    value = "91" + value;
  }

  return value;
}

// ===============================================
// SEND CUSTOMER PUSH SAFELY
// ===============================================

async function sendCustomerPush({
  db,
  mobile,
  title,
  message,
  url = "/my-profile",
}) {
  try {
    const normalizedMobile =
      normalizeMobile(mobile);

    if (!normalizedMobile) {
      return;
    }

    const subscriptions = await db
      .collection("pushSubscriptions")
      .find({
        mobile: normalizedMobile,
        role: "customer",
      })
      .toArray();

    console.log(
      "CUSTOMER PUSH SUBSCRIPTIONS:",
      subscriptions.length
    );

    if (!subscriptions.length) {
      return;
    }

    const payload = JSON.stringify({
      title,
      body: message,
      url,
      tag: "rc-customer-notification",
    });

    const expiredEndpoints = [];

    for (const item of subscriptions) {
      try {
        await webpush.sendNotification(
          item.subscription,
          payload
        );

        console.log(
          "CUSTOMER PUSH SENT:",
          item.endpoint
        );
      } catch (error) {
        console.error(
          "CUSTOMER PUSH SEND ERROR:",
          error
        );

        if (
          error.statusCode === 404 ||
          error.statusCode === 410
        ) {
          expiredEndpoints.push(
            item.endpoint
          );
        }
      }
    }

    if (expiredEndpoints.length > 0) {
      await db
        .collection("pushSubscriptions")
        .deleteMany({
          endpoint: {
            $in: expiredEndpoints,
          },
        });
    }
  } catch (error) {
    console.error(
      "CUSTOMER PUSH PIPELINE ERROR:",
      error
    );
  }
}

// ===============================================
// GET SINGLE BOOKING
// ===============================================

export async function GET(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("rctours");

    const resolvedParams = await params;
    const bookingId = resolvedParams?.bookingId;

    if (!bookingId) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Required booking token reference identity missing.",
        },
        {
          status: 400,
        }
      );
    }

    const booking =
      await db.collection("bookings").findOne({
        bookingId: bookingId.trim(),
      });

    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          message:
            "No localized reservation matched specified identity log.",
        },
        {
          status: 404,
        }
      );
    }

    const customer =
      await db.collection("customers").findOne({
        mobile: booking.mobile,
      });

    if (customer) {
      booking.loyaltyPoints =
        customer.loyaltyPoints || 0;

      booking.totalBookings =
        customer.totalBookings || 0;

      booking.totalSpent =
        customer.totalSpent || 0;

      booking.membership =
        customer.membership || "Bronze";

      booking.couponCode =
        customer.couponCode || "";

      booking.couponDiscount =
        customer.couponDiscount || 0;

      booking.couponUsed =
        customer.couponUsed || false;
    } else {
      booking.loyaltyPoints = 0;
      booking.totalBookings = 0;
      booking.totalSpent = 0;
      booking.membership = "Bronze";
      booking.couponCode = "";
      booking.couponDiscount = 0;
      booking.couponUsed = false;
    }

    return NextResponse.json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error(
      "GET SINGLE RESERVATION API MODULE EXCEPTION:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Internal ledger processing data exception encountered.",
      },
      {
        status: 500,
      }
    );
  }
}

// ===============================================
// UPDATE BOOKING RECORD
// ===============================================

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
          message:
            "Required booking token reference identity missing.",
        },
        {
          status: 400,
        }
      );
    }

    // ===============================================
    // GET CURRENT BOOKING
    // ===============================================

    const currentBooking =
      await db.collection("bookings").findOne({
        bookingId: bookingId.trim(),
      });

    if (!currentBooking) {
      return NextResponse.json(
        {
          success: false,
          message: "Booking not found.",
        },
        {
          status: 404,
        }
      );
    }

    // ===============================================
    // GET UPDATE DATA
    // ===============================================

    const body = await request.json();

    const allowedFields = [
      "bookingStatus",
      "driverName",
      "driverMobile",
      "driverId",
      "paymentStatus",
      "paymentType",
      "paymentId",
      "orderId",
      "advancePaid",
      "remainingAmount",
      "payableAmount",
      "tripStatus",
      "notes",
      "adminNotes",
      "isNew",
    ];

    const updateData = {};

    allowedFields.forEach((field) => {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    });

    if (
      Object.keys(updateData).length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Payload synchronization rejected. No mutable operations fields defined.",
        },
        {
          status: 400,
        }
      );
    }

    updateData.updatedAt = new Date();

    // ===============================================
    // UPDATE BOOKING
    // ===============================================

    const result =
      await db.collection("bookings").updateOne(
        {
          bookingId:
            bookingId.trim(),
        },
        {
          $set: updateData,
        }
      );

    if (
      result.matchedCount === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Target entity index not located within parameters.",
        },
        {
          status: 404,
        }
      );
    }

    // ===============================================
    // GET UPDATED BOOKING
    // ===============================================

    const updatedBooking =
      await db.collection("bookings").findOne({
        bookingId:
          bookingId.trim(),
      });

    // ===============================================
    // DRIVER ASSIGNMENT DETECTION
    // ===============================================

    const driverWasChanged =
      body.driverId &&
      body.driverId !==
        currentBooking.driverId;

    // ===============================================
    // BOOKING CONFIRMED DETECTION
    // ===============================================

    const bookingWasConfirmed =
      body.bookingStatus === "Confirmed" &&
      currentBooking.bookingStatus !==
        "Confirmed";

    // ===============================================
    // DRIVER ASSIGNED
    // ===============================================

    if (
      driverWasChanged &&
      updatedBooking
    ) {
      // -------------------------------------------
      // ADMIN IN-APP NOTIFICATION
      // -------------------------------------------

      await createNotification({
        title:
          "Driver Assigned",

        message:
          `${updatedBooking.driverName || "A driver"} has been assigned to booking ${updatedBooking.bookingId}.`,

        type:
          "driver",

        link:
          `/admin/bookings/${updatedBooking.bookingId}`,
      });

      // -------------------------------------------
      // CUSTOMER IN-APP NOTIFICATION
      // -------------------------------------------

      const driverMessage =
        updatedBooking.driverMobile
          ? `Your driver ${updatedBooking.driverName || "has been"} has been assigned for your trip. Driver contact: ${updatedBooking.driverMobile}`
          : `Your driver ${updatedBooking.driverName || ""} has been assigned for your trip.`;

      await createCustomerNotification({
        mobile:
          updatedBooking.mobile,

        title:
          "Driver Assigned 🚖",

        message:
          driverMessage,

        type:
          "driver_assigned",

        link:
          "/my-profile",
      });

      // -------------------------------------------
      // CUSTOMER PUSH
      // -------------------------------------------

      await sendCustomerPush({
        db,

        mobile:
          updatedBooking.mobile,

        title:
          "Driver Assigned 🚖",

        message:
          driverMessage,

        url:
          "/my-profile",
      });
    }

    // ===============================================
    // BOOKING CONFIRMED
    // ===============================================

    if (
      bookingWasConfirmed &&
      updatedBooking
    ) {
      // -------------------------------------------
      // ADMIN IN-APP NOTIFICATION
      // -------------------------------------------

      await createNotification({
        title:
          "Booking Confirmed",

        message:
          `Booking ${updatedBooking.bookingId} has been confirmed.`,

        type:
          "booking-confirmed",

        link:
          `/admin/bookings/${updatedBooking.bookingId}`,
      });

      // -------------------------------------------
      // CUSTOMER IN-APP NOTIFICATION
      // -------------------------------------------

      const confirmationMessage =
        `Your booking ${updatedBooking.bookingId} has been confirmed successfully. ` +
        `Your trip is scheduled from ${updatedBooking.pickup} to ${updatedBooking.drop}.`;

      await createCustomerNotification({
        mobile:
          updatedBooking.mobile,

        title:
          "Booking Confirmed 🎉",

        message:
          confirmationMessage,

        type:
          "booking-confirmed",

        link:
          "/my-profile",
      });

      // -------------------------------------------
      // CUSTOMER PUSH
      // -------------------------------------------

      await sendCustomerPush({
        db,

        mobile:
          updatedBooking.mobile,

        title:
          "Booking Confirmed 🎉",

        message:
          confirmationMessage,

        url:
          "/my-profile",
      });
    }

    // ===============================================
    // RETURN UPDATED BOOKING
    // ===============================================

    return NextResponse.json({
      success: true,

      message:
        "Ledger transaction updated successfully inside active state.",

      booking:
        updatedBooking,
    });
  } catch (error) {
    console.error(
      "PATCH RESERVATION DISPATCH PIPELINE EXCEPTION:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Internal data synchronization write pipeline error.",
      },
      {
        status: 500,
      }
    );
  }
}