import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  try {
    const data = await req.json();

    const client = await clientPromise;
    const db = client.db("rctours");

    const result = await db.collection("bookings").insertOne({
      ...data,
      createdAt: new Date(),
    });

    return Response.json({
      success: true,
      insertedId: result.insertedId,
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