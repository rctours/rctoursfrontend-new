import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  try {
    const {
      bookingId,
      paymentId,
      orderId,
      paymentStatus,
      amount,
    } = await req.json();

    const client = await clientPromise;
    const db = client.db("rctours");

    const result = await db.collection("bookings").updateOne(
      { bookingId: bookingId },
      {
        $set: {
          paymentId,
          orderId,
          paymentStatus,
          paidAmount: amount,
          paidAt: new Date(),
        },
      }
    );

    return Response.json({
      success: true,
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}