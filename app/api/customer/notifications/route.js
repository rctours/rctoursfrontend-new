import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// ===============================================
// NORMALIZE MOBILE NUMBER
// ===============================================
function normalizeMobile(mobile) {
  let value = String(mobile || "").replace(/\D/g, "");

  if (value.length === 10) {
    value = "91" + value;
  }

  return value;
}

// ===============================================
// GET CUSTOMER NOTIFICATIONS
// ===============================================
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const mobileParam = searchParams.get("mobile");

    if (!mobileParam) {
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

    const mobile = normalizeMobile(mobileParam);

    const client = await clientPromise;
    const db = client.db("rctours");

    // ===============================================
    // GET LATEST CUSTOMER NOTIFICATIONS
    // ===============================================

    const notifications = await db
      .collection("customerNotifications")
      .find({
        mobile,
      })
      .sort({
        createdAt: -1,
      })
      .limit(30)
      .toArray();

    // ===============================================
    // COUNT UNREAD NOTIFICATIONS
    // ===============================================

    const unreadCount = await db
      .collection("customerNotifications")
      .countDocuments({
        mobile,
        isRead: false,
      });

    return NextResponse.json({
      success: true,
      notifications,
      unreadCount,
    });
  } catch (error) {
    console.error(
      "CUSTOMER NOTIFICATIONS GET ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load notifications.",
      },
      {
        status: 500,
      }
    );
  }
}