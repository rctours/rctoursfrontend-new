const baseUrl = "https://www.rctoursandtravels.in";

// Current SEO update date
const siteLastModified = new Date("2026-08-28");

export default function sitemap() {
  return [
    // ==========================================
    // MAIN WEBSITE PAGES
    // ==========================================
    {
      url: baseUrl,
      lastModified: siteLastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: siteLastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: siteLastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/fleet`,
      lastModified: siteLastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: siteLastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tour-packages`,
      lastModified: siteLastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: siteLastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },

    // ==========================================
    // PRIMARY SEO LANDING PAGE
    // ==========================================
    {
      url: `${baseUrl}/taxi-service-in-nagpur`,
      lastModified: siteLastModified,
      changeFrequency: "weekly",
      priority: 1,
    },

    // ==========================================
    // TAXI & CAB SERVICE PAGES
    // ==========================================
    {
      url: `${baseUrl}/airport-taxi-nagpur`,
      lastModified: siteLastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/nagpur-airport-taxi`,
      lastModified: siteLastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/nagpur-local-taxi`,
      lastModified: siteLastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/car-rental-in-nagpur`,
      lastModified: siteLastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },

    // ==========================================
    // OUTSTATION ROUTE PAGES
    // ==========================================
    {
      url: `${baseUrl}/nagpur-to-tadoba-cab`,
      lastModified: siteLastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/nagpur-to-pench-cab`,
      lastModified: siteLastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/nagpur-to-chhindwara-cab`,
      lastModified: siteLastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}