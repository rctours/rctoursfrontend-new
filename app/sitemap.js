import clientPromise from "@/lib/mongodb";

const baseUrl = "https://www.rctoursandtravels.in";

// Website launch / major SEO update date.
// Future me kisi page ko actually update karne par us page ki date change kar sakte hain.
const siteLastModified = new Date("2026-08-27");

export default async function sitemap() {
  /*
   * ================================
   * MAIN WEBSITE PAGES
   * ================================
   */
  const staticPages = [
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
      url: `${baseUrl}/tour-packages`,
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
      url: `${baseUrl}/blog`,
      lastModified: siteLastModified,
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
      lastModified: siteLastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/airport-taxi-nagpur`,
      lastModified: siteLastModified,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/nagpur-airport-taxi`,
      lastModified: siteLastModified,
      changeFrequency: "weekly",
      priority: 0.95,
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
    {
      url: `${baseUrl}/nagpur-to-tadoba-cab`,
      lastModified: siteLastModified,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/nagpur-to-pench-cab`,
      lastModified: siteLastModified,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/nagpur-to-chhindwara-cab`,
      lastModified: siteLastModified,
      changeFrequency: "weekly",
      priority: 0.95,
    },

    /*
     * ================================
     * BOOKING / FARE PAGES
     * ================================
     */
    {
      url: `${baseUrl}/book-cab`,
      lastModified: siteLastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/fare-calculator`,
      lastModified: siteLastModified,
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
          blog.updatedAt ||
          blog.createdAt ||
          siteLastModified,
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
          tour.updatedAt ||
          tour.createdAt ||
          siteLastModified,
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

    // Sitemap should still work if MongoDB is temporarily unavailable.
    return staticPages;
  }
}