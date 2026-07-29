import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const client = await clientPromise;
    const db = client.db("rctours");

    const tourPackage = await db.collection("tourPackages").findOne({
      _id: new ObjectId(id),
    });

    if (!tourPackage) {
      return NextResponse.json(
        { success: false, message: "Package not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      package: tourPackage,
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}


export async function PATCH(request, { params }) {
  try {
    const { id } = await params;

    const client = await clientPromise;
    const db = client.db("rctours");

    const body = await request.json();

    await db.collection("tourPackages").updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          title: body.title || "",
          slug: body.slug || "",
          image: body.image || "",
          description: body.description || "",
          price: body.price || "",
          duration: body.duration || "",
          location: body.location || "",
          status: body.status || "Draft",
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.json({
      success: true,
      message: "Tour package updated successfully",
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { success: false, message: "Update failed" },
      { status: 500 }
    );
  }
}


export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    const client = await clientPromise;
    const db = client.db("rctours");

    await db.collection("tourPackages").deleteOne({
      _id: new ObjectId(id),
    });

    return NextResponse.json({
      success: true,
      message: "Tour package deleted successfully",
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { success: false, message: "Delete failed" },
      { status: 500 }
    );
  }
}