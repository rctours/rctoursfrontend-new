import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    // Current date/time
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
      .sort({
        createdAt: -1,
      })
      .toArray();

    // Public website ko required campaign data bhejenge
    const publicCampaigns = campaigns.map((campaign) => ({
      _id: campaign._id.toString(),

      title: campaign.title || "",

      description: campaign.description || "",

      image: campaign.image || "",

      buttonText: campaign.buttonText || "Book Now",

      buttonLink: campaign.buttonLink || "/book-cab",

      // popup = website open hote hi
      // banner = homepage ke andar
      campaignType:
  String(campaign.campaignType || "")
    .trim()
    .toLowerCase() === "popup"
      ? "popup"
      : "banner",

      startDate: campaign.startDate || null,

      endDate: campaign.endDate || null,
    }));

    return NextResponse.json({
      success: true,
      campaigns: publicCampaigns,
    });
  } catch (error) {
    console.error("Public Campaign GET Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load campaigns",
        campaigns: [],
      },
      {
        status: 500,
      }
    );
  }
}