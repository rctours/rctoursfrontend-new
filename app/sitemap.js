import clientPromise from "@/lib/mongodb";

const baseUrl = "https://www.rctoursandtravels.in";

export default async function sitemap() {
  const now = new Date();

  /*
   * ================================
   * MAIN WEBSITE PAGES
   * ================================
   */
  const staticPages = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },

    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: `${baseUrl}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },

    {
      url: `${baseUrl}/fleet`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },

    {
      url: `${baseUrl}/tour-packages`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },

    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },

    /*
     * ================================
     * HIGH-INTENT SEO PAGES
     * ================================
     */

    {
      url: `${baseUrl}/taxi-service-in-nagpur`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },

    {
      url: `${baseUrl}/airport-taxi-nagpur`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },

    {
      url: `${baseUrl}/nagpur-airport-taxi`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },

    {
      url: `${baseUrl}/nagpur-local-taxi`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },

    {
      url: `${baseUrl}/nagpur-to-tadoba-cab`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },

    {
      url: `${baseUrl}/nagpur-to-pench-cab`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },

    /*
     * ================================
     * BOOKING / FARE PAGE
     * ================================
     */

    {
      url: `${baseUrl}/book-cab`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },

    {
      url: `${baseUrl}/fare-calculator`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ];

  /*
   * ================================
   * DATABASE CONTENT
   * ================================
   */

  try {
    const client = await clientPromise;
    const db = client.db("rctours");

    /*
     * ================================
     * PUBLISHED BLOGS
     * ================================
     */

    const blogs = await db
      .collection("blogs")
      .find({
        status: "Published",
      })
      .toArray();

    const blogPages = blogs
      .filter((blog) => blog.slug)
      .map((blog) => ({
        url: `${baseUrl}/blog/${blog.slug}`,
        lastModified:
          blog.updatedAt || blog.createdAt || now,
        changeFrequency: "weekly",
        priority: 0.7,
      }));

    /*
     * ================================
     * PUBLISHED TOUR PACKAGES
     * ================================
     */

    const tourPackages = await db
      .collection("tourPackages")
      .find({
        status: "Published",
      })
      .toArray();

    const tourPackagePages = tourPackages
      .filter((tour) => tour.slug)
      .map((tour) => ({
        url: `${baseUrl}/tour-packages/${tour.slug}`,
        lastModified:
          tour.updatedAt || tour.createdAt || now,
        changeFrequency: "weekly",
        priority: 0.8,
      }));

    /*
     * ================================
     * FINAL SITEMAP
     * ================================
     */

    return [
      ...staticPages,
      ...blogPages,
      ...tourPackagePages,
    ];
  } catch (error) {
    console.error("Sitemap Error:", error);

    /*
     * Website sitemap should still work
     * even if MongoDB is temporarily unavailable.
     */
    return staticPages;
  }
}