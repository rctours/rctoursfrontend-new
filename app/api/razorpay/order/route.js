import Razorpay from "razorpay";
import { NextResponse } from "next/server";

export async function POST(req) {
  console.log("KEY:", process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID);
  console.log("SECRET:", process.env.RAZORPAY_KEY_SECRET);

  try {
    const { amount } = await req.json();

    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await razorpay.orders.create({
      amount: Number(amount) * 100,
      currency: "INR",
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("RAZORPAY ERROR:", error);

    return NextResponse.json(
      {
        error: error.message,
        fullError: String(error),
      },
      { status: 500 }
    );
  }
}