import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req) {
  try {
    const { bookingId, paymentId, orderId, signature, amount } = await req.json();

    const razorpaySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!razorpaySecret) {
      return NextResponse.json({
        success: false,
        message: "Server configuration error",
      });
    }

    const generatedSignature = crypto
      .createHmac("sha256", razorpaySecret)
      .update(orderId + "|" + paymentId)
      .digest("hex");

    if (generatedSignature !== signature) {
      return NextResponse.json({
        success: false,
        message: "Payment verification failed",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully",
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
      message: "Server error",
    });
  }
}