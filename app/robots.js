export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/api/",
        "/booking-details",
        "/booking-success",
        "/payment",
        "/invoice/",
        "/driver/",
        "/my-profile",
        "/profile-login",
        "/track-booking",
      ],
    },

    sitemap: "https://www.rctoursandtravels.in/sitemap.xml",

    host: "https://www.rctoursandtravels.in",
  };
}