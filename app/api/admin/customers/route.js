import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db("rctours");

    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search") || "";
    const membership = searchParams.get("membership") || "";
    const sort = searchParams.get("sort") || "latest";

    const filter = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { mobile: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    if (membership && membership !== "All") {
      filter.membership = membership;
    }

    let sortOption = { createdAt: -1 };

    switch (sort) {
      case "points":
        sortOption = { loyaltyPoints: -1 };
        break;

      case "spend":
        sortOption = { totalSpent: -1 };
        break;

      case "bookings":
        sortOption = { totalBookings: -1 };
        break;

      default:
        sortOption = { createdAt: -1 };
    }

    const customers = await db
      .collection("customers")
      .find(filter)
      .sort(sortOption)
      .toArray();

    return NextResponse.json({
      success: true,
      total: customers.length,
      customers,
    });
  } catch (error) {
    console.error("Customers API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch customers.",
      },
      {
        status: 500,
      }
    );
  }
}