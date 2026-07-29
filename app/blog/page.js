import Link from "next/link";

export const metadata = {
  title: "Official Blog | RC Tours & Travels Nagpur",
  description: "Read latest travel guides, Nagpur taxi fare information per km, outstation tour packages, and airport cab booking tips from RC Tours & Travels.",
  keywords: "cab service in nagpur, taxi fare per km in nagpur, nagpur cab booking, outstation taxi nagpur",
};

async function getBlogs() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/blogs`, {
    cache: "no-store",
    });
    const data = await res.json();
    return data.success ? data.blogs : [];
  } catch (error) {
    console.error("Error fetching blogs for frontend:", error);
    return [];
  }
}

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const blogs = await getBlogs();
  const featuredBlog = blogs[0];
  const remainingBlogs = blogs.slice(1);

  return (
    <div className="min-h-screen bg-slate-50">

      <section className="pt-45 pb-24 bg-gradient-to-r from-blue-900 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-6Mesh">
            RC Tours & Travels Blog
          </h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto text-white/90">
            Taxi Services, Travel Guides, Tour Packages, Fare Information and Local Travel Tips from Nagpur.
          </p>
        </div>
      </section>

      {featuredBlog && (
        <section className="max-w-7xl mx-auto px-6 py-16 -mt-12">
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl grid md:grid-cols-2 gap-2">
            <img
              src={featuredBlog.image || "/blogs/featured.jpeg"}
              alt={featuredBlog.title}
              className="w-full h-[400px] object-cover"
            />
            <div className="p-8 flex flex-col justify-center">
              <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold w-fit">
                🔥 Featured Article
              </span>
              <h2 className="text-3xl md:text-4xl font-black mt-4 mb-4">
                {featuredBlog.title}
              </h2>
              <p className="text-slate-600 text-lg mb-6 line-clamp-3">
                {featuredBlog.excerpt || featuredBlog.content?.substring(0, 150) + "..."}
              </p>
              <Link
                href={`/blog/${featuredBlog.slug}`}
                className="bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-4 rounded-xl font-bold inline-block text-center w-fit"
              >
                Read Full Article
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="max-w-7xl mx-auto px-6 pb-20 pt-10">
        <h2 className="text-4xl font-black text-center mb-12">
          Latest Articles from RC Tours
        </h2>

        {blogs.length === 0 ? (
          <p className="text-center text-gray-500 text-xl py-10">
            No live blogs found. Add some from Admin Panel!
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(featuredBlog ? remainingBlogs : blogs).map((blog) => (
              <div
                key={blog._id || blog.slug}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition flex flex-col justify-between"
              >
                <div>
                  <img
                    src={blog.image || "/blogs/cab-service.jpg"}
                    alt={blog.title}
                    className="w-full h-60 object-cover"
                  />
                  <div className="p-6">
                    <span className="text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-md text-sm">
                      {blog.category || "Taxi Service"}
                    </span>
                    <h3 className="text-2xl font-bold mt-3 mb-3 line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                      {blog.excerpt || blog.content?.substring(0, 90) + "..."}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="text-blue-600 font-bold hover:text-blue-800 transition inline-block"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}