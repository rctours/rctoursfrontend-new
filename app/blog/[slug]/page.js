import Link from "next/link";

async function getSingleBlog(slug) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/blogs?slug=${slug}`, {
      cache: "no-store", 
    });
    const data = await res.json();
    if (data.success && data.blogs) {
      return data.blogs.find((b) => b.slug === slug) || null;
    }
    return data.success ? data.blog : null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getRelatedBlogs(currentSlug) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/blogs`, {
      cache: "no-store",
    });
    const data = await res.json();
    if (data.success && data.blogs) {
      return data.blogs.filter((b) => b.slug !== currentSlug).slice(0, 2);
    }
    return [];
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getSingleBlog(slug);

  if (!blog) {
    return {
      title: "Blog Not Found | RC Tours & Travels",
    };
  }

  const finalTitle = blog.metaTitle || `${blog.title} | RC Tours & Travels`;
  const finalDesc = blog.metaDescription || blog.excerpt || (blog.content ? blog.content.substring(0, 160) : "");

  return {
    title: finalTitle,
    description: finalDesc,
    keywords: blog.keywords || "cab service in nagpur, taxi service nagpur",
    openGraph: {
      title: finalTitle,
      description: finalDesc,
      images: [blog.image || "/blogs/cab-service.jpg"],
      type: "article",
    },
    alternates: {
      canonical: `https://www.rctoursandtravels.in/blog/${slug}`,
    },
  };
}

export default async function BlogDetailsPage({ params }) {
  const { slug } = await params;
  const blog = await getSingleBlog(slug);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Blog Post Not Found</h1>
          <Link href="/blog" className="text-blue-600 font-bold hover:underline">
            ← Back to All Blogs
          </Link>
        </div>
      </div>
    );
  }

  const relatedBlogs = await getRelatedBlogs(slug);
  const publishDate = blog.createdAt ? new Date(blog.createdAt).toISOString().split('T')[0] : "2026-06-12";

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": blog.title,
            "description": blog.metaDescription || blog.excerpt || blog.content?.substring(0, 160),
            "image": blog.image || "https://www.rctoursandtravels.in/blogs/cab-service.jpg",
            "author": {
              "@type": "Organization",
              "name": "RC Tours & Travels",
              "url": "https://www.rctoursandtravels.in"
            },
            "publisher": {
              "@type": "Organization",
              "name": "RC Tours & Travels",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.rctoursandtravels.in/logo.png"
              }
            },
            "datePublished": publishDate,
            "dateModified": publishDate,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://www.rctoursandtravels.in/blog/${slug}`,
            },
          }),
        }}
      />

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-16 md:py-32">
        <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight text-slate-900">
          {blog.title}
        </h1>

        <div className="flex flex-wrap gap-4 text-gray-500 mb-10 items-center text-sm">
          <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-md font-bold">
            {blog.category || "Taxi Service"}
          </span>
          <span>•</span>
          <span>By RC Tours & Travels</span>
          <span>•</span>
          <span>Updated {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString('en-US', {month: 'long', year: 'numeric'}) : "Recent"}</span>
        </div>

        <img
          src={blog.image || "/blogs/cab-service.jpg"}
          alt={blog.title}
          loading="eager"
          className="w-full h-[220px] md:h-[480px] object-cover rounded-3xl mb-10 shadow-md bg-gray-100"
        />

        <div className="prose max-w-none">
          <div className="text-lg leading-9 text-slate-800 whitespace-pre-line font-normal">
            {blog.content}
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 border-t border-b py-6 my-8">
          <a
            href="tel:9172271464"
            className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-4 rounded-xl font-bold text-center flex items-center justify-center gap-2"
          >
            📞 Call Now: 9172271464
          </a>

          <a
            href="https://wa.me/919172271464"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 transition text-white px-6 py-4 rounded-xl font-bold text-center flex items-center justify-center gap-2"
          >
            💬 WhatsApp Booking
          </a>
        </div>

        <div className="mt-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 text-center border border-blue-100 shadow-sm">
          <h2 className="text-3xl font-black text-slate-900 mb-3">
            Need a Reliable Taxi Service in Nagpur?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6 text-lg">
            Get premium airport transfers, local city packages, and outstation rides at transparent per-km rates with RC Tours & Travels.
          </p>
          <a
            href="tel:9172271464"
            className="bg-blue-600 hover:bg-blue-700 shadow-md transition text-white px-8 py-4 rounded-xl font-bold inline-block"
          >
            Instant Cab Booking: 9172271464
          </a>
        </div>

        <div className="mt-10">
          <Link
            href="/blog"
            className="inline-block border border-gray-300 hover:bg-gray-50 transition px-6 py-3 rounded-xl font-semibold text-gray-700"
          >
            ← Back to Blogs List
          </Link>
        </div>

        {relatedBlogs.length > 0 && (
          <div className="mt-20 border-t pt-12">
            <h2 className="text-3xl font-black text-slate-900 mb-8">
              Related Travel Guides
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedBlogs.map((item) => (
                <Link
                  key={item.slug}
                  href={`/blog/${item.slug}`}
                  className="group border rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-md transition flex flex-col"
                >
                  <img
                    src={item.image || "/blogs/cab-service.jpg"}
                    alt={item.title}
                    className="w-full h-52 object-cover group-hover:scale-101 transition duration-300"
                  />
                  <div className="p-6">
                    <span className="text-blue-600 font-bold text-sm bg-blue-50 px-2.5 py-1 rounded">
                      {item.category || "Taxi Fare"}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mt-3 mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-blue-600 font-bold text-sm mt-4 inline-flex items-center group-hover:translate-x-1 transition-transform">
                      Read Article →
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}