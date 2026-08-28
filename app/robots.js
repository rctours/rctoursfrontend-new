export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        // Admin & API
        "/admin/",
        "/api/",

        // Booking flow
        "/book-cab",
        "/booking-details",
        "/booking-success",
        "/payment",

        // Private customer pages
        "/invoice/",
        "/my-profile",
        "/profile-login",
        "/track-booking",

        // Driver pages
        "/driver/",
      ],
    },

    sitemap: "https://www.rctoursandtravels.in/sitemap.xml",

    host: "https://www.rctoursandtravels.in",
  };
}