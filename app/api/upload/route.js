import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

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

    // Maximum original upload size: 10 MB
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        {
          success: false,
          message: "Image must be smaller than 10 MB",
        },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Safe file name
    const originalName = file.name || "image";

    const baseName = path
      .basename(originalName, path.extname(originalName))
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    // Always save as WebP
    const fileName = `${Date.now()}-${
      baseName || "image"
    }.webp`;

    // Upload directory
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

    // Resize + compress + convert to WebP
    await sharp(buffer)
      .rotate()
      .resize({
        width: 1600,
        height: 900,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({
        quality: 82,
        effort: 6,
      })
      .toFile(filePath);

    const imageUrl = `/uploads/campaigns/${fileName}`;

    return NextResponse.json({
      success: true,
      message: "Image optimized and uploaded successfully",
      imageUrl,
    });
  } catch (error) {
    console.error("Image Upload Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Image upload failed",
      },
      { status: 500 }
    );
  }
}