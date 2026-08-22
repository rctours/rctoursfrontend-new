const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const publicDir = path.join(__dirname, "..", "public");

const imageExtensions = [
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
];

async function getAllImages(dir) {
  const entries = fs.readdirSync(dir, {
    withFileTypes: true,
  });

  let files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files = files.concat(
        await getAllImages(fullPath)
      );
    } else {
      const ext = path.extname(entry.name).toLowerCase();

      if (imageExtensions.includes(ext)) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();

  try {
    const image = sharp(filePath);

    const metadata = await image.metadata();

    const maxWidth = 1600;
    const maxHeight = 1200;

    // Existing WEBP image: optimize safely
    if (ext === ".webp") {
      const tempPath = `${filePath}.temp.webp`;

      await image
        .resize({
          width:
            metadata.width > maxWidth
              ? maxWidth
              : null,

          height:
            metadata.height > maxHeight
              ? maxHeight
              : null,

          fit: "inside",
          withoutEnlargement: true,
        })
        .webp({
          quality: 78,
          effort: 6,
        })
        .toFile(tempPath);

      fs.renameSync(tempPath, filePath);

      console.log(`✓ Optimized: ${filePath}`);

      return;
    }

    // JPG / JPEG / PNG → WEBP
    const dir = path.dirname(filePath);
    const name = path.basename(filePath, ext);

    const outputPath = path.join(
      dir,
      `${name}.webp`
    );

    await image
      .resize({
        width:
          metadata.width > maxWidth
            ? maxWidth
            : null,

        height:
          metadata.height > maxHeight
            ? maxHeight
            : null,

        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({
        quality: 78,
        effort: 6,
      })
      .toFile(outputPath);

    // Delete original only after successful conversion
    if (fs.existsSync(outputPath)) {
      fs.unlinkSync(filePath);
    }

    console.log(
      `✓ Converted: ${filePath} → ${outputPath}`
    );
  } catch (error) {
    console.error(
      `✗ Failed: ${filePath}`,
      error.message
    );
  }
}

async function main() {
  console.log(
    "\n🚀 RC Tours Image Optimization Started...\n"
  );

  const images = await getAllImages(publicDir);

  console.log(
    `Found ${images.length} images\n`
  );

  for (const image of images) {
    await optimizeImage(image);
  }

  console.log(
    "\n✅ Image Optimization Completed!"
  );
}

main();