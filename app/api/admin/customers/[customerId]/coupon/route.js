import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

export async function POST(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("rctours");

    const { customerId } = await params;

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

    if (customer.loyaltyPoints < 300) {
      return NextResponse.json(
        {
          success: false,
          message: "Customer does not have enough loyalty points.",
        },
        { status: 400 }
      );
    }

    if (customer.couponCode && !customer.couponUsed) {
      return NextResponse.json(
        {
          success: false,
          message: "Active coupon already exists.",
        },
        { status: 400 }
      );
    }

    const couponCode = `RC${customer.mobile.slice(-4)}${Date.now()
      .toString()
      .slice(-4)}`;

    await db.collection("customers").updateOne(
      {
        _id: new ObjectId(customerId),
      },
      {
        $set: {
          couponCode,
          couponDiscount: 300,
          couponUsed: false,
          couponGeneratedAt: new Date(),
          updatedAt: new Date(),
        },
      }
    );

    const updatedCustomer = await db.collection("customers").findOne({
      _id: new ObjectId(customerId),
    });

    return NextResponse.json({
      success: true,
      message: "Coupon generated successfully.",
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