import { NextResponse } from "next/server";
import Razorpay from "razorpay";

// ===============================================
// POST METHOD: INITIALIZE RAZORPAY PAYMENT ORDER
// ===============================================
export async function POST(request) {
  try {
    // 1. Environment Integrity Check
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.error("RAZORPAY CREDENTIALS NOT FOUND IN SERVER ENV.");
      return NextResponse.json(
        { success: false, message: "Payment gateway configuration error." },
        { status: 500 }
      );
    }

    const { amount } = await request.json();

    // 2. Input Validation
    if (!amount || Number(amount) <= 0) {
      return NextResponse.json(
        { success: false, message: "Invalid transaction amount." },
        { status: 400 }
      );
    }

    // 3. Initialize Razorpay Gateway Instance
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // 4. Generate Secure Payment Order
    const order = await razorpay.orders.create({
      amount: Number(amount) * 100, // Convert to paise
      currency: "INR",
    });

    // 5. Success Response
    return NextResponse.json({
  success: true,

  id: order.id,

  amount: order.amount,

  currency: order.currency,

  status: order.status,

  key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
});

  } catch (error) {
    console.error("RAZORPAY ORDER GENERATION PIPELINE FAILED:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal payment gateway processing exception.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}