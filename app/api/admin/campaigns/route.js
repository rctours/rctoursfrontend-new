import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    const campaigns = await db
      .collection("campaigns")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      campaigns,
    });
  } catch (error) {
    console.error("Campaign GET Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch campaigns",
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const client = await clientPromise;
    const db = client.db();

    const campaign = {
      title: body.title,
      description: body.description,
      image: body.image,
      buttonText: body.buttonText || "Book Now",
      buttonLink: body.buttonLink || "/book-cab",
      startDate: body.startDate,
      endDate: body.endDate,
      active: body.active ?? true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("campaigns").insertOne(campaign);

    return NextResponse.json({
      success: true,
      message: "Campaign Created Successfully",
      insertedId: result.insertedId,
    });
  } catch (error) {
    console.error("Campaign POST Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create campaign",
      },
      { status: 500 }
    );
  }
}