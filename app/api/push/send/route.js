import { NextResponse } from "next/server";
import webpush from "web-push";
import clientPromise from "@/lib/mongodb";

// ======================================================
// VAPID CONFIGURATION
// ======================================================

webpush.setVapidDetails(
  process.env.VAPID_SUBJECT,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

// ======================================================
// NORMALIZE MOBILE NUMBER
// ======================================================

function normalizeMobile(mobile) {
  let value = String(mobile || "").replace(/\D/g, "");

  if (value.length === 10) {
    value = "91" + value;
  }

  return value;
}

// ======================================================
// POST - SEND PUSH NOTIFICATION
// ======================================================

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      mobile,
      role = "customer",
      title,
      message,
      url,
    } = body;

    // ==================================================
    // VALIDATE ROLE
    // ==================================================

    if (
      role !== "customer" &&
      role !== "admin"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid notification role.",
        },
        {
          status: 400,
        }
      );
    }

    // ==================================================
    // VALIDATE TITLE AND MESSAGE
    // ==================================================

    if (!title || !message) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Notification title and message are required.",
        },
        {
          status: 400,
        }
      );
    }

    // ==================================================
    // PREPARE SUBSCRIPTION QUERY
    // ==================================================

    let subscriptionQuery = {};

    // CUSTOMER NOTIFICATION
    if (role === "customer") {
      if (!mobile) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Mobile number is required for customer notification.",
          },
          {
            status: 400,
          }
        );
      }

      const normalizedMobile =
        normalizeMobile(mobile);

      subscriptionQuery = {
        mobile: normalizedMobile,
        role: "customer",
      };
    }

    // ADMIN NOTIFICATION
    if (role === "admin") {
      subscriptionQuery = {
        role: "admin",
      };
    }

    // ==================================================
    // CONNECT MONGODB
    // ==================================================

    const client = await clientPromise;
    const db = client.db("rctours");

    // ==================================================
    // FIND PUSH SUBSCRIPTIONS
    // ==================================================

    const subscriptions = await db
      .collection("pushSubscriptions")
      .find(subscriptionQuery)
      .toArray();

    if (!subscriptions.length) {
      return NextResponse.json({
        success: false,
        message:
          `No ${role} push subscription found.`,
        sent: 0,
        failed: 0,
      });
    }

    // ==================================================
    // NOTIFICATION PAYLOAD
    // ==================================================

    const payload = JSON.stringify({
      title,
      body: message,
      url:
        url ||
        (
          role === "admin"
            ? "/admin/bookings"
            : "/my-profile"
        ),
      tag: `rc-${role}-notification`,
    });

    let sent = 0;
    const expiredEndpoints = [];

    // ==================================================
    // SEND TO ALL MATCHING DEVICES
    // ==================================================

    for (const item of subscriptions) {
      try {
        await webpush.sendNotification(
          item.subscription,
          payload
        );

        sent++;

        console.log(
          `PUSH SENT TO ${role.toUpperCase()}:`,
          item.mobile
        );
      } catch (error) {
        console.error(
          "PUSH SEND ERROR:",
          error
        );

        // Subscription expired / invalid
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

    // ==================================================
    // REMOVE EXPIRED SUBSCRIPTIONS
    // ==================================================

    if (expiredEndpoints.length > 0) {
      await db
        .collection("pushSubscriptions")
        .deleteMany({
          endpoint: {
            $in: expiredEndpoints,
          },
        });

      console.log(
        "EXPIRED PUSH SUBSCRIPTIONS REMOVED:",
        expiredEndpoints.length
      );
    }

    // ==================================================
    // SUCCESS RESPONSE
    // ==================================================

    return NextResponse.json({
      success: true,
      message:
        `${role} push notification processed successfully.`,
      sent,
      failed:
        subscriptions.length - sent,
    });

  } catch (error) {
    console.error(
      "PUSH NOTIFICATION API ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to send push notification.",
        error:
          error.message || "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}