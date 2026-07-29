import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { verifyAdmin } from "@/lib/auth";

export async function GET() {
  try {
    // ===========================
    // Verify Admin
    // ===========================
    const admin = await verifyAdmin();

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    // ===========================
    // MongoDB
    // ===========================
    const client = await clientPromise;
    const db = client.db();

    // ===========================
    // Find Admin
    // ===========================
    const adminData = await db.collection("admins").findOne(
      {
        _id: new ObjectId(admin.id),
      },
      {
        projection: {
          password: 0,
          resetPasswordToken: 0,
          resetPasswordExpires: 0,
        },
      }
    );

    if (!adminData) {
      return NextResponse.json(
        {
          success: false,
          message: "Admin not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      admin: adminData,
    });
  } catch (error) {
    console.error("PROFILE API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}