import clientPromise from "@/lib/mongodb";

export async function GET(req, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("rctours");

    const booking = await db.collection("bookings").findOne({
      bookingId: params.bookingId,
    });

    if (!booking) {
      return Response.json(
        { success: false, message: "Booking not found" },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      booking,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}