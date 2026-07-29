import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const { username, name, email, password } = await request.json();

    // Validate request
    if (!username || !name || !email || !password) {
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

    // Check if admin already exists
    const existingAdmin = await admins.findOne({
      $or: [
        { username: username.toLowerCase() },
        { email: email.toLowerCase() },
      ],
    });

    if (existingAdmin) {
      return NextResponse.json(
        {
          success: false,
          message: "Admin already exists.",
        },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Save admin
    await admins.insertOne({
      username: username.toLowerCase(),
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: "superadmin",
      isActive: true,

      lastLogin: null,

      passwordResetToken: null,
      passwordResetExpires: null,

      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      message: "Admin account created successfully.",
    });
  } catch (error) {
    console.error("ADMIN SETUP ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error.",
      },
      { status: 500 }
    );
  }
}