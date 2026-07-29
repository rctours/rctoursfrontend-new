import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

export async function PATCH(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("rctours");

    const { customerId } = await params;

    const body = await request.json();

    const action = body.action;
    const points = Number(body.points);

    if (!customerId) {
      return NextResponse.json(
        {
          success: false,
          message: "Customer ID is required.",
        },
        { status: 400 }
      );
    }

    if (!["add", "remove"].includes(action)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid action.",
        },
        { status: 400 }
      );
    }

    if (!points || points <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid points.",
        },
        { status: 400 }
      );
    }

    const customer = await db.collection("customers").findOne({
      _id: new ObjectId(customerId),
    });

    if (!customer) {
      return NextResponse.json(
        {
          success: false,
          message: "Customer not found.",
        },
        { status: 404 }
      );
    }

    let loyaltyPoints = Number(customer.loyaltyPoints || 0);

    if (action === "add") {
      loyaltyPoints += points;
    } else {
      loyaltyPoints -= points;

      if (loyaltyPoints < 0) {
        loyaltyPoints = 0;
      }
    }

    let membership = "Bronze";

    if (loyaltyPoints >= 1000) {
      membership = "Platinum";
    } else if (loyaltyPoints >= 700) {
      membership = "Gold";
    } else if (loyaltyPoints >= 400) {
      membership = "Silver";
    }

    await db.collection("customers").updateOne(
      {
        _id: new ObjectId(customerId),
      },
      {
        $set: {
          loyaltyPoints,
          membership,
          updatedAt: new Date(),
        },
      }
    );

    await db.collection("loyaltyHistory").insertOne({
  customerId: customer._id,
  mobile: customer.mobile,
  name: customer.name,

  action: action === "add" ? "Admin Added" : "Admin Removed",

  points,

  reason: "Manual Adjustment",

  balancePoints: loyaltyPoints,

  createdAt: new Date(),
});

    const updatedCustomer = await db.collection("customers").findOne({
      _id: new ObjectId(customerId),
    });

    return NextResponse.json({
      success: true,
      message: `Points ${action}ed successfully.`,
      customer: updatedCustomer,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error.",
      },
      {
        status: 500,
      }
    );
  }
}