import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";
import { verifyAdmin } from "@/lib/auth";

export async function PUT(request) {
  try {
    // Verify logged in admin
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

    const { currentPassword, newPassword } = await request.json();

    // Validation
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Current Password and New Password are required.",
        },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must be at least 8 characters.",
        },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    const adminsCollection = db.collection("admins");

    // Get current admin
    const currentAdmin = await adminsCollection.findOne({
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

    // Verify current password
    const isMatch = await bcrypt.compare(
      currentPassword,
      currentAdmin.password
    );

    if (!isMatch) {
      return NextResponse.json(
        {
          success: false,
          message: "Current password is incorrect.",
        },
        { status: 400 }
      );
    }

    // Check if new password is same as old password
    const samePassword = await bcrypt.compare(
      newPassword,
      currentAdmin.password
    );

    if (samePassword) {
      return NextResponse.json(
        {
          success: false,
          message: "New password must be different from current password.",
        },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await adminsCollection.updateOne(
      {
        _id: currentAdmin._id,
      },
      {
        $set: {
          password: hashedPassword,
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.json({
      success: true,
      message: "Password changed successfully.",
    });
  } catch (error) {
    console.error("Change Password Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error.",
      },
      { status: 500 }
    );
  }
}