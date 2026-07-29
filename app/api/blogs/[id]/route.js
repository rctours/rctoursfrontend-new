import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";


// ================= DELETE BLOG =================

export async function DELETE(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("rctours");

    const { id } = await params;

    await db.collection("blogs").deleteOne({
      _id: new ObjectId(id),
    });

    return NextResponse.json({
      success: true,
      message: "Blog deleted successfully",
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Delete failed",
      },
      {
        status: 500,
      }
    );
  }
}


// ================= UPDATE BLOG =================

export async function PATCH(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("rctours");

    const { id } = await params;

    const body = await request.json();

    await db.collection("blogs").updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          title: body.title,
          slug: body.slug,
          image: body.image || "",
          excerpt: body.excerpt || "",
          content: body.content || "",
          category: body.category || "Travel",
          status: body.status || "Draft",
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.json({
      success: true,
      message: "Blog updated successfully",
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Update failed",
      },
      {
        status: 500,
      }
    );
  }
}