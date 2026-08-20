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
// POST - SEND PUSH NOTIFICATION
// ======================================================

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      mobile,
      title,
      message,
      url = "/my-profile",
    } = body;

    // ==================================================
    // VALIDATION
    // ==================================================

    if (!mobile) {
      return NextResponse.json(
        {
          success: false,
          message: "Mobile number is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!title || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Notification title and message are required.",
        },
        {
          status: 400,
        }
      );
    }

    // ==================================================
    // NORMALIZE MOBILE NUMBER
    // ==================================================

    let normalizedMobile = String(mobile).replace(/\D/g, "");

    if (normalizedMobile.length === 10) {
      normalizedMobile = "91" + normalizedMobile;
    }

    // ==================================================
    // CONNECT MONGODB
    // ==================================================

    const client = await clientPromise;
    const db = client.db("rctours");

    // ==================================================
    // FIND CUSTOMER PUSH SUBSCRIPTIONS
    // ==================================================

    const subscriptions = await db
      .collection("pushSubscriptions")
      .find({
        mobile: normalizedMobile,
      })
      .toArray();

    if (!subscriptions.length) {
      return NextResponse.json({
        success: false,
        message: "No push subscription found for this customer.",
        sent: 0,
      });
    }

    // ==================================================
    // NOTIFICATION PAYLOAD
    // ==================================================

    const payload = JSON.stringify({
      title,
      message,
      url,
    });

    let sent = 0;
    const expiredEndpoints = [];

    // ==================================================
    // SEND NOTIFICATION TO ALL CUSTOMER DEVICES
    // ==================================================

    for (const item of subscriptions) {
      try {
        await webpush.sendNotification(
          item.subscription,
          payload
        );

        sent++;
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
    }

    // ==================================================
    // RESPONSE
    // ==================================================

    return NextResponse.json({
      success: true,
      message: "Push notification processed.",
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
      },
      {
        status: 500,
      }
    );
  }
}