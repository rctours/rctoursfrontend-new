import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

export async function GET(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("rctours");

    const { customerId } = await params;

    // -----------------------------
    // Get Customer
    // -----------------------------
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

    // -----------------------------
    // Get Customer Booking History
    // -----------------------------
    const bookings = await db
      .collection("bookings")
      .find({
        mobile: customer.mobile,
      })
      .sort({ createdAt: -1 })
      .toArray();

    // -----------------------------
    // Stats
    // -----------------------------
    const completedTrips = bookings.filter(
      (b) => b.tripStatus === "Completed"
    ).length;

    const pendingTrips = bookings.filter(
      (b) => b.tripStatus !== "Completed"
    ).length;

    return NextResponse.json({
      success: true,
      customer,
      bookings,
      stats: {
        completedTrips,
        pendingTrips,
      },
    });
  } catch (error) {
    console.error("Customer Details API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch customer details.",
      },
      {
        status: 500,
      }
    );
  }
}