import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export async function POST(request) {
  try {
    const { token, password, confirmPassword } = await request.json();

    // ===============================
    // Basic Validation
    // ===============================
    if (!token || !password || !confirmPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required.",
        },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Passwords do not match.",
        },
        { status: 400 }
      );
    }

    const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_\-+=])[A-Za-z\d@$!%*?&^#()_\-+=]{8,}$/;

if (!passwordRegex.test(password)) {
  return NextResponse.json(
    {
      success: false,
      message:
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.",
    },
    { status: 400 }
  );
}

    // ===============================
    // Hash incoming token
    // ===============================
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const client = await clientPromise;
    const db = client.db();

    // ===============================
    // Find valid admin
    // ===============================
    const admin = await db.collection("admins").findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or expired reset link.",
        },
        { status: 400 }
      );
    }

    // ===============================
    // Hash new password
    // ===============================
    const hashedPassword = await bcrypt.hash(password, 10);

    // ===============================
    // Update password
    // ===============================
    await db.collection("admins").updateOne(
      { _id: admin._id },
      {
        $set: {
          password: hashedPassword,
          updatedAt: new Date(),
        },
        $unset: {
          resetPasswordToken: "",
          resetPasswordExpires: "",
        },
      }
    );

    return NextResponse.json({
      success: true,
      message: "Password has been reset successfully.",
    });

  } catch (error) {
    console.error("Reset Password Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error.",
      },
      { status: 500 }
    );
  }
}