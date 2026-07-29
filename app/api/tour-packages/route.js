import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";


// ================= GET ALL PACKAGES =================

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("rctours");

    const packages = await db
      .collection("tourPackages")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      packages,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server error",
      },
      {
        status: 500,
      }
    );
  }
}


// ================= CREATE PACKAGE =================

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db("rctours");

    const body = await request.json();

    const newPackage = {
      title: body.title,
      slug: body.slug,
      image: body.image || "",
      description: body.description || "",
      price: body.price || "",
      duration: body.duration || "",
      location: body.location || "",
      status: body.status || "Draft",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.collection("tourPackages").insertOne(newPackage);

    return NextResponse.json({
      success: true,
      message: "Tour package created successfully",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create package",
      },
      {
        status: 500,
      }
    );
  }
}