import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { bookingId, amount } = await req.json();

    // ✅ 1. FIRST check env
    if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json(
        { success: false, error: "Razorpay keys missing in .env.local" },
        { status: 500 }
      );
    }

    // ✅ 2. Import Razorpay (safe for Next.js)
    const Razorpay = (await import("razorpay")).default;

    // ✅ 3. Create instance AFTER env check
    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // ✅ 4. Create order
    const order = await razorpay.orders.create({
      amount: Math.round(Number(amount) * 100),
      currency: "INR",
      receipt: bookingId,
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    });

  } catch (err) {
    console.error("RAZORPAY ERROR:", err);

    return NextResponse.json(
      { success: false, error: err.message || "Server Error" },
      { status: 500 }
    );
  }
}