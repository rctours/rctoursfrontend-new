import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

const defaultSettings = {
  companyName: "RC Tours & Travels",
  mobile: "",
  email: "",
  website: "",
  address: "",
  gstNumber: "",
  logo: "",
  invoicePrefix: "RC",
  invoiceFooter: "Thank you for choosing RC Tours & Travels.",
  terms: "",
  loyaltyPoints: 100,
  couponAmount: 300,
  driverAllowance: 500,
  whatsapp: "",
  facebook: "",
  instagram: "",
  youtube: "",
  metaTitle: "",
  metaDescription: "",
  analyticsId: "",
};

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("rctours");

    let settings = await db.collection("settings").findOne({});

    if (!settings) {
      await db.collection("settings").insertOne({
        ...defaultSettings,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      settings = await db.collection("settings").findOne({});
    }

    return NextResponse.json({
      success: true,
      settings,
    });
  } catch (error) {
    console.error("GET SETTINGS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load settings.",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const client = await clientPromise;
    const db = client.db("rctours");
    const body = await request.json();

    await db.collection("settings").updateOne(
      {},
      {
        $set: {
          ...body,
          loyaltyPoints: Number(body.loyaltyPoints || 0),
          couponAmount: Number(body.couponAmount || 0),
          driverAllowance: Number(body.driverAllowance || 0),
          updatedAt: new Date(),
        },
        $setOnInsert: {
          createdAt: new Date(),
        },
      },
      { upsert: true }
    );

    return NextResponse.json({
      success: true,
      message: "Settings saved successfully.",
    });
  } catch (error) {
    console.error("UPDATE SETTINGS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to save settings.",
      },
      { status: 500 }
    );
  }
}