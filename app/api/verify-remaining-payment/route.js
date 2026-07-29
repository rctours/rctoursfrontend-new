import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import crypto from "crypto";

// ===============================================
// POST METHOD: VERIFY AND UPDATE REMAINING PAYMENT
// ===============================================
export async function POST(request) {
  try {
    const { 
      bookingId, 
      paymentId, 
      orderId, 
      signature, 
      amount 
    } = await request.json();

    // 1. Signature Validation (Security Layer)
    const razorpaySecret = process.env.RAZORPAY_KEY_SECRET;
    const generatedSignature = crypto
      .createHmac("sha256", razorpaySecret)
      .update(orderId + "|" + paymentId)
      .digest("hex");

    if (generatedSignature !== signature) {
      return NextResponse.json(
        { success: false, message: "Security Alert: Invalid payment signature." },
        { status: 401 }
      );
    }

    // 2. Database Update (Update remaining balance)
    const client = await clientPromise;
    const db = client.db("rctours");

    const result = await db.collection("bookings").updateOne(
      { bookingId: bookingId },
      {
  $set: {
    paymentStatus: "Fully Paid",

    remainingPaymentStatus: "Paid",

    remainingPaymentId: paymentId,

    remainingAmount: 0,

    updatedAt: new Date(),
  },

  $inc: {
    paidAmount: Number(amount),

    advancePaid: Number(amount),
  },
}
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Booking record not found for update." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Remaining payment settled successfully.",
    });

  } catch (error) {
    console.error("REMAINING PAYMENT VERIFICATION EXCEPTION:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error during settlement." },
      { status: 500 }
    );
  }
}