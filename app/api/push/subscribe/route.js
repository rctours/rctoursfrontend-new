import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

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
// POST - SAVE PUSH SUBSCRIPTION
// ======================================================

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      mobile,
      subscription,
      role = "customer",
    } = body;

    // ==================================================
    // VALIDATION
    // ==================================================

    if (!subscription) {
      return NextResponse.json(
        {
          success: false,
          message: "Push subscription is required.",
        },
        {
          status: 400,
        }
      );
    }

    // Only customer or admin allowed
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
    // MOBILE NUMBER
    // ==================================================

    let normalizedMobile = "";

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

      normalizedMobile =
        normalizeMobile(mobile);

      if (!normalizedMobile) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid mobile number.",
          },
          {
            status: 400,
          }
        );
      }
    }

    // ==================================================
    // ADMIN IDENTIFIER
    // ==================================================

    if (role === "admin") {
      normalizedMobile = "admin";
    }

    // ==================================================
    // CONNECT MONGODB
    // ==================================================

    const client = await clientPromise;
    const db = client.db("rctours");

    // ==================================================
    // CHECK EXISTING DEVICE SUBSCRIPTION
    // ==================================================

    const existingSubscription =
      await db
        .collection("pushSubscriptions")
        .findOne({
          endpoint: subscription.endpoint,
        });

    // ==================================================
    // UPDATE EXISTING SUBSCRIPTION
    // ==================================================

    if (existingSubscription) {
      await db
        .collection("pushSubscriptions")
        .updateOne(
          {
            endpoint: subscription.endpoint,
          },
          {
            $set: {
              mobile: normalizedMobile,
              role,
              subscription,
              updatedAt: new Date(),
            },
          }
        );

      return NextResponse.json({
        success: true,
        message:
          `${role} push subscription updated successfully.`,
      });
    }

    // ==================================================
    // SAVE NEW SUBSCRIPTION
    // ==================================================

    await db
      .collection("pushSubscriptions")
      .insertOne({
        mobile: normalizedMobile,

        role,

        endpoint:
          subscription.endpoint,

        subscription,

        createdAt: new Date(),

        updatedAt: new Date(),
      });

    return NextResponse.json({
      success: true,
      message:
        `${role} push subscription saved successfully.`,
    });

  } catch (error) {
    console.error(
      "PUSH SUBSCRIPTION ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to save push subscription.",
      },
      {
        status: 500,
      }
    );
  }
}