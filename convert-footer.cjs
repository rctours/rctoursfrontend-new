const sharp = require("sharp");

sharp("./public/footer-bg.png")
  .webp({ quality: 80 })
  .toFile("./public/footer-bg.webp")
  .then(() => console.log("WebP created successfully"))
  .catch(console.error);
