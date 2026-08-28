const baseUrl = "https://www.rctoursandtravels.in";

// Current SEO update date
const siteLastModified = new Date("2026-08-28");

export default function sitemap() {
  return [
    // ==========================================
    // 1. HOME PAGE
    // ==========================================
    {
      url: baseUrl,
      lastModified: siteLastModified,
      changeFrequency: "weekly",
      priority: 1,
    },

    // ==========================================
    // 2. ABOUT
    // ==========================================
    {
      url: `${baseUrl}/about`,
      lastModified: siteLastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    // ==========================================
    // 3. SERVICES
    // ==========================================
    {
      url: `${baseUrl}/services`,
      lastModified: siteLastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },

    // ==========================================
    // 4. CONTACT
    // ==========================================
    {
      url: `${baseUrl}/contact`,
      lastModified: siteLastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    // ==========================================
    // 5. FLEET
    // ==========================================
    {
      url: `${baseUrl}/fleet`,
      lastModified: siteLastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },

    // ==========================================
    // 6. TOUR PACKAGES
    // ==========================================
    {
      url: `${baseUrl}/tour-packages`,
      lastModified: siteLastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },

    // ==========================================
    // 7. BLOG
    // ==========================================
    {
      url: `${baseUrl}/blog`,
      lastModified: siteLastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },

    // ==========================================
    // 8. PRIMARY SEO LANDING PAGE
    // ==========================================
    {
      url: `${baseUrl}/taxi-service-in-nagpur`,
      lastModified: siteLastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}