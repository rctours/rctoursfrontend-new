import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { verifyAdmin } from "@/lib/auth";

// ==============================
// GET ALL NOTIFICATIONS
// ==============================
export async function GET() {
  try {
    const admin = await verifyAdmin();

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    // Latest 20 notifications for notification panel
    const notifications = await db
      .collection("notifications")
      .find({})
      .sort({ createdAt: -1 })
      .limit(20)
      .toArray();

    // Count ALL unread notifications from MongoDB
    const unreadCount = await db
      .collection("notifications")
      .countDocuments({
        isRead: false,
      });

    return NextResponse.json({
      success: true,
      notifications,
      unreadCount,
    });
  } catch (error) {
    console.error("Notifications GET Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

// ==============================
// CREATE NOTIFICATION
// ==============================
export async function POST(request) {
  try {
    const admin = await verifyAdmin();

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const { title, message, type } = await request.json();

    if (!title || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Title and message are required.",
        },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    const notification = {
      title,
      message,
      type: type || "info",
      isRead: false,
      createdAt: new Date(),
    };

    const result = await db
      .collection("notifications")
      .insertOne(notification);

    return NextResponse.json({
      success: true,
      notificationId: result.insertedId,
      message: "Notification created successfully.",
    });
  } catch (error) {
    console.error("Notifications POST Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}