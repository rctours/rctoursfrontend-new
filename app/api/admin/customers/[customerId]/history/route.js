import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

export async function GET(request, { params }) {
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

    const history = await db
      .collection("loyaltyHistory")
      .find({
        mobile: customer.mobile,
      })
      .sort({
        createdAt: -1,
      })
      .toArray();

    return NextResponse.json({
      success: true,
      total: history.length,
      history,
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