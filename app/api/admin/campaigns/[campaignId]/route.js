import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

// ========================================
// GET SINGLE CAMPAIGN
// ========================================

export async function GET(request, { params }) {
  try {
    const { campaignId } = await params;

    if (!ObjectId.isValid(campaignId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid campaign ID",
        },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    const campaign = await db
      .collection("campaigns")
      .findOne({
        _id: new ObjectId(campaignId),
      });

    if (!campaign) {
      return NextResponse.json(
        {
          success: false,
          message: "Campaign not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      campaign,
    });
  } catch (error) {
    console.error("Campaign GET Single Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch campaign",
      },
      { status: 500 }
    );
  }
}

// ========================================
// UPDATE CAMPAIGN
// ========================================

export async function PUT(request, { params }) {
  try {
    const { campaignId } = await params;

    if (!ObjectId.isValid(campaignId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid campaign ID",
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    const {
      title,
      description,
      image,
      buttonText,
      buttonLink,
      startDate,
      endDate,
      active,
    } = body;

    if (!title?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Campaign title is required",
        },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    const result = await db
      .collection("campaigns")
      .updateOne(
        {
          _id: new ObjectId(campaignId),
        },
        {
          $set: {
            title: title.trim(),
            description: description || "",
            image: image || "",
            buttonText: buttonText || "Book Now",
            buttonLink: buttonLink || "/book-cab",
            startDate: startDate || "",
            endDate: endDate || "",
            active: Boolean(active),
            updatedAt: new Date(),
          },
        }
      );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Campaign not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Campaign updated successfully",
    });
  } catch (error) {
    console.error("Campaign UPDATE Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update campaign",
      },
      { status: 500 }
    );
  }
}

// ========================================
// DELETE CAMPAIGN
// ========================================

export async function DELETE(request, { params }) {
  try {
    const { campaignId } = await params;

    if (!ObjectId.isValid(campaignId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid campaign ID",
        },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    const result = await db
      .collection("campaigns")
      .deleteOne({
        _id: new ObjectId(campaignId),
      });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Campaign not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Campaign deleted successfully",
    });
  } catch (error) {
    console.error("Campaign DELETE Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete campaign",
      },
      { status: 500 }
    );
  }
}