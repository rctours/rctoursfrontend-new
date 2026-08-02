import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    // Today's date: YYYY-MM-DD
    const today = new Date().toISOString().split("T")[0];

    const campaigns = await db
      .collection("campaigns")
      .find({
        active: true,

        $and: [
          {
            $or: [
              { startDate: { $lte: today } },
              { startDate: "" },
              { startDate: { $exists: false } },
            ],
          },
          {
            $or: [
              { endDate: { $gte: today } },
              { endDate: "" },
              { endDate: { $exists: false } },
            ],
          },
        ],
      })
      .sort({
        createdAt: -1,
      })
      .toArray();

    // Public page ko sirf required fields bhejenge
    const publicCampaigns = campaigns.map((campaign) => ({
      _id: campaign._id.toString(),
      title: campaign.title || "",
      description: campaign.description || "",
      image: campaign.image || "",
      buttonText: campaign.buttonText || "Book Now",
      buttonLink: campaign.buttonLink || "/book-cab",
      startDate: campaign.startDate || "",
      endDate: campaign.endDate || "",
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