import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// ========================================
// GET ACTIVE CAMPAIGNS
// ========================================

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    const now = new Date();

    const campaigns = await db
      .collection("campaigns")
      .find({
        active: true,
        $and: [
          {
            $or: [
              { startDate: { $exists: false } },
              { startDate: null },
              { startDate: "" },
              { startDate: { $lte: now } },
            ],
          },
          {
            $or: [
              { endDate: { $exists: false } },
              { endDate: null },
              { endDate: "" },
              { endDate: { $gte: now } },
            ],
          },
        ],
      })
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

// ========================================
// CREATE NEW CAMPAIGN
// ========================================

export async function POST(request) {
  try {
    const body = await request.json();

    const client = await clientPromise;
    const db = client.db();

    const campaign = {
      // Basic Details
      // Title optional rakha hai
      title: body.title?.trim() || "",

      description: body.description?.trim() || "",

      image: body.image?.trim() || "",

      // ========================================
      // CAMPAIGN TYPE
      // popup  = Homepage open hote hi Popup
      // banner = Homepage ke andar Banner
      // ========================================
      campaignType:
        body.campaignType === "popup"
          ? "popup"
          : "banner",

      // Button
      buttonText:
        body.buttonText?.trim() || "Book Now",

      buttonLink:
        body.buttonLink?.trim() || "/book-cab",

      // ========================================
      // CAMPAIGN START DATE
      // ========================================
      startDate: body.startDate
        ? new Date(body.startDate)
        : null,

      // ========================================
      // CAMPAIGN END DATE
      // ========================================
      endDate: body.endDate
        ? new Date(body.endDate)
        : null,

      // Active / Inactive
      active: body.active ?? true,

      // Dates
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // ========================================
    // VALIDATION
    // ========================================

    // Campaign Title optional hai
    // Sirf image required hai

    if (!campaign.image) {
      return NextResponse.json(
        {
          success: false,
          message: "Campaign poster is required",
        },
        { status: 400 }
      );
    }

    // ========================================
    // SAVE TO MONGODB
    // ========================================

    const result = await db
      .collection("campaigns")
      .insertOne(campaign);

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