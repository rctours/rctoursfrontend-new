import { NextResponse } from "next/server";
import Razorpay from "razorpay";

// ===============================================
// POST METHOD: INITIALIZE RAZORPAY PAYMENT ORDER
// ===============================================
export async function POST(request) {
  try {
    // 1. Validation Check: Ensure server environment credentials
    if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.error("RAZORPAY CREDENTIALS MISSING IN SERVER ENVIRONMENT.");
      return NextResponse.json(
        { success: false, message: "Payment gateway service currently unavailable." },
        { status: 500 }
      );
    }

    const { bookingId, amount } = await request.json();

    if (!bookingId || !amount) {
      return NextResponse.json(
        { success: false, message: "Operation rejected. Required parameters missing." },
        { status: 400 }
      );
    }

    // 2. Initialize Razorpay Gateway Instance
    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // 3. Generate Secure Payment Order
    const order = await razorpay.orders.create({
      amount: Math.round(Number(amount) * 100), // Convert to paise
      currency: "INR",
      receipt: bookingId,
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      message: "Payment order session initialized successfully.",
    });

  } catch (error) {
    console.error("RAZORPAY ORDER GENERATION PIPELINE FAILED:", error);

    return NextResponse.json(
      { 
        success: false, 
        message: "Internal payment gateway processing exception.",
        error: error.message 
      },
      { status: 500 }
    );
  }
}