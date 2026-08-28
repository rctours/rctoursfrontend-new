const baseUrl = "https://www.rctoursandtravels.in";

// Current SEO update date
const siteLastModified = new Date("2026-08-28");

export default function sitemap() {
  return [
    // ================================
    // MAIN WEBSITE PAGES
    // ================================
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
      priority: 0.8,
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

    // ================================
    // CURRENTLY SEO-OPTIMIZED PAGE
    // ================================
    {
      url: `${baseUrl}/taxi-service-in-nagpur`,
      lastModified: siteLastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}