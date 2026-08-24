import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

export async function POST(request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file");
    const campaignType = formData.get("campaignType");

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: "No image selected",
        },
        { status: 400 }
      );
    }

    // ========================================
    // ONLY IMAGE FILES
    // ========================================

    if (!file.type?.startsWith("image/")) {
      return NextResponse.json(
        {
          success: false,
          message: "Only image files are allowed",
        },
        { status: 400 }
      );
    }

    // ========================================
    // MAXIMUM ORIGINAL FILE SIZE: 10 MB
    // ========================================

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

    // ========================================
    // SAFE FILE NAME
    // ========================================

    const originalName = file.name || "image";

    const baseName = path
      .basename(originalName, path.extname(originalName))
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const fileName = `${Date.now()}-${
      baseName || "campaign"
    }.webp`;

    // ========================================
    // UPLOAD DIRECTORY
    // ========================================

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

    // ========================================
    // CREATE SHARP INSTANCE
    // ========================================

    let imageProcessor = sharp(buffer).rotate();

    // ========================================
    // HOMEPAGE BANNER
    // ANY SIZE → EXACTLY 1920 × 350
    // NO WHITE SPACE
    // SMART CENTER CROP
    // ========================================

    if (campaignType === "banner") {
      imageProcessor = imageProcessor.resize({
        width: 1920,
        height: 350,
        fit: "cover",
        position: "centre",
      });
    }

    // ========================================
    // HOMEPAGE POPUP
    // NORMAL OPTIMIZATION
    // ========================================

    else {
      imageProcessor = imageProcessor.resize({
        width: 1080,
        height: 1350,
        fit: "inside",
        withoutEnlargement: true,
      });
    }

    // ========================================
    // CONVERT TO WEBP
    // ========================================

    await imageProcessor
      .webp({
        quality: 85,
        effort: 6,
      })
      .toFile(filePath);

    const imageUrl = `/uploads/campaigns/${fileName}`;

    return NextResponse.json({
      success: true,
      message:
        campaignType === "banner"
          ? "Banner automatically converted to 1920 × 350"
          : "Image optimized and uploaded successfully",
      imageUrl,
      width: campaignType === "banner" ? 1920 : null,
      height: campaignType === "banner" ? 350 : null,
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