export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],

    sitemap: "https://www.rctoursandtravels.in/sitemap.xml",

    host: "https://www.rctoursandtravels.in",
  };
}