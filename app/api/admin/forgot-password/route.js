import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { generateResetToken } from "@/lib/utils/resetToken";
import { resend } from "@/lib/resend";
import { forgotPasswordTemplate } from "@/lib/emails/forgotPasswordTemplate";

export async function POST(request) {
  try {
    const { email } = await request.json();

    // ===============================
    // Validate Email
    // ===============================
    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required.",
        },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    // ===============================
    // Find Admin
    // ===============================
    const admin = await db.collection("admins").findOne({
      email: email.trim().toLowerCase(),
      isActive: true,
    });

    if (!admin) {
    return NextResponse.json({
    success: true,
    message:
      "If an account exists with this email, a password reset link has been sent.",
    });
  }

    // ===============================
    // Generate Reset Token
    // ===============================
    const { token, hashedToken, expiresAt } = generateResetToken();

    // ===============================
    // Save Token
    // ===============================
    await db.collection("admins").updateOne(
      {
        _id: admin._id,
      },
      {
        $set: {
          resetPasswordToken: hashedToken,
          resetPasswordExpires: expiresAt,
        },
      }
    );

    // ===============================
    // Reset Link
    // ===============================
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/admin/reset-password?token=${token}`;

    // ===============================
    // Send Email
    // ===============================
    await resend.emails.send({
      from: "RC Tours <onboarding@resend.dev>",
      to: admin.email,
      subject: "Reset Your Admin Password",
      html: forgotPasswordTemplate({
        name: admin.username || "Admin",
        resetLink,
      }),
    });

    return NextResponse.json({
    success: true,
    message:
    "If an account exists with this email, a password reset link has been sent.",
    });

  } catch (error) {
    console.error("FORGOT PASSWORD ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Forgot Password API Ready",
  });
}