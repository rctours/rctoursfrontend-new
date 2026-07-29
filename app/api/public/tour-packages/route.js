import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("rctours");

    const packages = await db
      .collection("tourPackages")
      .find({
        status: "Published",
      })
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