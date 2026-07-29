import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongodb";
import { verifyAdmin } from "@/lib/auth";

export async function PUT(request) {
  try {
    // ===========================
    // Verify Logged In Admin
    // ===========================
    const admin = await verifyAdmin();

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    // ===========================
    // Request Body
    // ===========================
    const {
      name,
      email,
      currentPassword,
    } = await request.json();

    if (!name || !email || !currentPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required.",
        },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    const admins = db.collection("admins");

    // ===========================
    // Current Admin
    // ===========================
    const currentAdmin = await admins.findOne({
      _id: new ObjectId(admin.id),
    });

    if (!currentAdmin) {
      return NextResponse.json(
        {
          success: false,
          message: "Admin not found.",
        },
        { status: 404 }
      );
    }

    // ===========================
    // Verify Password
    // ===========================
    const passwordMatched = await bcrypt.compare(
      currentPassword,
      currentAdmin.password
    );

    if (!passwordMatched) {
      return NextResponse.json(
        {
          success: false,
          message: "Current password is incorrect.",
        },
        { status: 401 }
      );
    }

    // ===========================
    // Duplicate Email Check
    // ===========================
    const emailExists = await admins.findOne({
      email: email.toLowerCase(),
      _id: { $ne: currentAdmin._id },
    });

    if (emailExists) {
      return NextResponse.json(
        {
          success: false,
          message: "Email already exists.",
        },
        { status: 400 }
      );
    }

    // ===========================
    // Update Profile
    // ===========================
    await admins.updateOne(
      { _id: currentAdmin._id },
      {
        $set: {
          name: name.trim(),
          email: email.toLowerCase().trim(),
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully.",
    });

  } catch (error) {
    console.error("PROFILE UPDATE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error.",
      },
      { status: 500 }
    );
  }
}