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
// POST - SEND TEST PUSH NOTIFICATION
// ======================================================

export async function POST() {
  try {
    console.log("====================================");
    console.log("PUSH TEST NOTIFICATION STARTED");
    console.log("====================================");

    // MongoDB connection
    const client = await clientPromise;
    const db = client.db("rctours");

    // Get latest push subscription
    const pushSubscription = await db
      .collection("pushSubscriptions")
      .findOne(
        {},
        {
          sort: {
            updatedAt: -1,
          },
        }
      );

    // No subscription found
    if (!pushSubscription) {
      console.log("NO PUSH SUBSCRIPTION FOUND");

      return NextResponse.json(
        {
          success: false,
          message:
            "No push subscription found. Please login first and allow notifications.",
        },
        {
          status: 404,
        }
      );
    }

    console.log(
      "PUSH SUBSCRIPTION FOUND FOR MOBILE:",
      pushSubscription.mobile
    );

    // Notification payload
    const payload = JSON.stringify({
      title: "RC Tours & Travels 🚕",
      body: "Test notification is working successfully! 🎉",
      url: "/my-profile",
      tag: "rc-test-notification",
    });

    // Send notification
    await webpush.sendNotification(
      pushSubscription.subscription,
      payload
    );

    console.log("TEST PUSH NOTIFICATION SENT SUCCESSFULLY");

    return NextResponse.json({
      success: true,
      message:
        "Test push notification sent successfully.",
      mobile: pushSubscription.mobile,
    });

  } catch (error) {
    console.error(
      "===================================="
    );

    console.error(
      "PUSH TEST NOTIFICATION ERROR:",
      error
    );

    console.error(
      "===================================="
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to send test push notification.",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}