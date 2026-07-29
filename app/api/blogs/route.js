import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db("rctours");

    const { searchParams } = new URL(request.url);

    const slug = searchParams.get("slug");

    let query = {
      status: "Published",
    };

    if (slug) {
      query.slug = slug;
    }

    const blogs = await db
      .collection("blogs")
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      blogs,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db("rctours");

    const body = await request.json();

    const blog = {
      title: body.title,
      slug: body.slug,
      image: body.image || "",
      excerpt: body.excerpt || "",
      content: body.content || "",
      category: body.category || "Travel",
      status: body.status || "Draft",
      author: "RC Tours & Travels",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.collection("blogs").insertOne(blog);

    return NextResponse.json({
      success: true,
      message: "Blog created successfully",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      {
        status: 500,
      }
    );
  }
}