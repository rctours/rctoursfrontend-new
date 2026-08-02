import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: "No image selected",
        },
        { status: 400 }
      );
    }

    // Only image files allowed
    if (!file.type?.startsWith("image/")) {
      return NextResponse.json(
        {
          success: false,
          message: "Only image files are allowed",
        },
        { status: 400 }
      );
    }

    // Maximum 5 MB
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        {
          success: false,
          message: "Image must be smaller than 5 MB",
        },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Safe file name
    const originalName = file.name || "campaign-image";

    const extension =
      path.extname(originalName).toLowerCase() || ".jpg";

    const baseName = path
      .basename(originalName, path.extname(originalName))
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const fileName = `${Date.now()}-${
      baseName || "campaign"
    }${extension}`;

    // public/uploads/campaigns
    const uploadDirectory = path.join(
      process.cwd(),
      "public",
      "uploads",
      "campaigns"
    );

    await fs.mkdir(uploadDirectory, {
      recursive: true,
    });

    const filePath = path.join(
      uploadDirectory,
      fileName
    );

    await fs.writeFile(filePath, buffer);

    const imageUrl = `/uploads/campaigns/${fileName}`;

    return NextResponse.json({
      success: true,
      message: "Image uploaded successfully",
      imageUrl,
    });
  } catch (error) {
    console.error("Campaign Image Upload Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Image upload failed",
      },
      { status: 500 }
    );
  }
}