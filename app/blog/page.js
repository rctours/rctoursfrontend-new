import Link from "next/link";
import {
  BookOpen,
  ArrowRight,
  CalendarDays,
  Tag,
  Car,
  MapPin,
  ChevronRight,
  Sparkles,
  Compass,
} from "lucide-react";

export const metadata = {
  title: "Travel Blog & Taxi Guides in Nagpur | RC Tours & Travels",
  description:
    "Read travel guides, Nagpur taxi fare information, outstation cab booking tips, airport transfer guides and popular routes from RC Tours & Travels.",
  keywords: [
    "cab service in nagpur",
    "taxi fare per km in nagpur",
    "nagpur cab booking",
    "outstation taxi nagpur",
    "nagpur travel guide",
    "nagpur airport taxi",
    "nagpur to pench taxi",
    "nagpur to tadoba taxi",
    "rc tours and travels blog",
  ],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Travel Blog & Taxi Guides in Nagpur | RC Tours & Travels",
    description:
      "Travel guides, taxi fare information, airport cab tips and outstation travel advice from Nagpur.",
    type: "website",
    url: "/blog",
  },
};

export const dynamic = "force-dynamic";

async function getBlogs() {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/blogs`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();

    return data.success && Array.isArray(data.blogs)
      ? data.blogs
      : [];
  } catch (error) {
    console.error("Error fetching blogs for frontend:", error);
    return [];
  }
}

function formatDate(date) {
  if (!date) return null;

  try {
    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(date));
  } catch {
    return null;
  }
}

function getExcerpt(blog, length = 150) {
  if (blog.excerpt) {
    return blog.excerpt;
  }

  if (blog.content) {
    const cleanContent = blog.content
      .replace(/<[^>]*>/g, "")
      .replace(/\s+/g, " ")
      .trim();

    return cleanContent.length > length
      ? `${cleanContent.substring(0, length)}...`
      : cleanContent;
  }

  return "Read the latest travel tips, taxi fare details and route guides from RC Tours & Travels Nagpur.";
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  const featuredBlog = blogs[0];
  const remainingBlogs = blogs.slice(1);

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://www.rctoursandtravels.in";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "RC Tours & Travels Nagpur Blog",
    description:
      "Travel guides, taxi fare information, airport transfer tips and outstation cab booking guides from Nagpur.",
    url: `${siteUrl}/blog`,
    publisher: {
      "@type": "Organization",
      name: "RC Tours & Travels",
      url: siteUrl,
    },
    blogPost: blogs.map((blog) => ({
      "@type": "BlogPosting",
      headline: blog.title,
      description: getExcerpt(blog, 160),
      datePublished: blog.createdAt || blog.updatedAt,
      dateModified: blog.updatedAt || blog.createdAt,
      image: blog.image || `${siteUrl}/blogs/local-taxi-nagpur.webp`,
      mainEntityOfPage: `${siteUrl}/blog/${blog.slug}`,
      url: `${siteUrl}/blog/${blog.slug}`,
      author: {
        "@type": "Organization",
        name: "RC Tours & Travels",
      },
    })),
  };

  return (
    <main className="min-h-screen overflow-hidden bg-slate-50 selection:bg-cyan-500 selection:text-white">
      {/* ================= SEO SCHEMA ================= */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden border-b border-cyan-100 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 pb-12 pt-24 sm:pb-14 sm:pt-28 md:pb-16 md:pt-32">
        {/* BACKGROUND EFFECTS */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-[8%] top-0 h-56 w-56 rounded-full bg-cyan-500/15 blur-3xl md:h-72 md:w-72" />

          <div className="absolute right-[8%] top-8 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl md:h-72 md:w-72" />

          <div className="absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-5 text-center sm:px-6">
          {/* BADGE */}
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-cyan-300 backdrop-blur-md md:text-[10px]">
            <Sparkles size={13} />
            RC Tours & Travels Blog
          </div>

          {/* HEADING */}
          <h1 className="mx-auto mt-4 max-w-4xl text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Travel & Taxi Guides For{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Nagpur
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base md:leading-7">
            Taxi fares, outstation travel guides, airport transfers and useful
            travel tips from Nagpur.
          </p>

          {/* INFO PILLS */}
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-medium text-slate-200 backdrop-blur-sm sm:text-xs">
              <Car size={13} className="text-cyan-400" />
              Taxi Fare Guides
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-medium text-slate-200 backdrop-blur-sm sm:text-xs">
              <MapPin size={13} className="text-cyan-400" />
              Outstation Routes
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-medium text-slate-200 backdrop-blur-sm sm:text-xs">
              <Compass size={13} className="text-cyan-400" />
              Travel Tips
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURED BLOG ================= */}

      {featuredBlog && (
        <section className="relative z-20 mx-auto -mt-6 max-w-7xl px-5 sm:px-6 md:-mt-8">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10 md:rounded-3xl">
            <div className="grid md:grid-cols-2">
            {/* FEATURED IMAGE */}
            <div className="relative h-[260px] overflow-hidden sm:h-[320px] md:h-[390px] lg:h-[430px]">
            <img
            src={featuredBlog.image || "/blogs/featured.webp"}
            alt={featuredBlog.title}
            className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent" />

            <div className="absolute left-4 top-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-600 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-lg sm:text-[10px]">
            🔥 Featured Guide
            </span>
            </div>
            </div>

              {/* FEATURED CONTENT */}
              <div className="flex flex-col justify-center p-5 sm:p-7 md:p-9 lg:p-10">
                <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold text-slate-500">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-cyan-50 px-2.5 py-1 text-cyan-700">
                    <Tag size={12} />
                    {featuredBlog.category || "Travel Guide"}
                  </span>

                  {formatDate(
                    featuredBlog.createdAt || featuredBlog.updatedAt
                  ) && (
                    <span className="inline-flex items-center gap-1.5 text-slate-400">
                      <CalendarDays size={13} />
                      {formatDate(
                        featuredBlog.createdAt || featuredBlog.updatedAt
                      )}
                    </span>
                  )}
                </div>

                <h2 className="mt-3 text-2xl font-black leading-tight tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
                  {featuredBlog.title}
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
                  {getExcerpt(featuredBlog, 190)}
                </p>

                <div className="mt-5">
                  <Link
                    href={`/blog/${featuredBlog.slug}`}
                    className="group inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-600/20 transition-all hover:-translate-y-0.5 hover:bg-cyan-700"
                  >
                    Read Full Article

                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ================= LATEST ARTICLES ================= */}

      <section className="mx-auto max-w-7xl px-5 pb-16 pt-12 sm:px-6 md:pb-20 md:pt-16">
        {/* HEADER */}
        <div className="mx-auto mb-8 max-w-3xl text-center md:mb-10">
          <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-cyan-600">
            <span className="h-px w-6 bg-cyan-500" />
            Latest Insights
            <span className="h-px w-6 bg-cyan-500" />
          </div>

          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
            Latest Travel Articles
          </h2>

          <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
            Explore route guides, taxi fare details and travel tips for your
            next journey.
          </p>
        </div>

        {/* EMPTY STATE */}
        {blogs.length === 0 ? (
          <div className="mx-auto max-w-lg rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
              <BookOpen size={25} />
            </div>

            <h3 className="mt-4 text-xl font-bold text-slate-900">
              New Articles Coming Soon
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
              We are preparing useful travel guides and Nagpur taxi information.
            </p>
          </div>
        ) : remainingBlogs.length === 0 ? (
          <div className="mx-auto max-w-lg rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
              <BookOpen size={24} />
            </div>

            <h3 className="mt-4 text-xl font-bold text-slate-900">
              More Guides Coming Soon
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Explore our featured article while we publish more travel guides.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
            {remainingBlogs.map((blog) => (
              <article
                key={blog._id || blog.slug}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:shadow-xl hover:shadow-slate-900/10"
              >
                {/* BLOG IMAGE */}
                <div className="relative h-52 overflow-hidden bg-slate-100 sm:h-56">
                  <img
                    src={blog.image || "/blogs/local-taxi-nagpur.webp"}
                    alt={blog.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent" />

                  <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-cyan-700 shadow-sm">
                    <Tag size={11} />
                    {blog.category || "Taxi Service"}
                  </span>
                </div>

                {/* BLOG BODY */}
                <div className="flex flex-1 flex-col p-5">
                  {formatDate(
                    blog.createdAt || blog.updatedAt
                  ) && (
                    <div className="mb-2.5 inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
                      <CalendarDays size={13} />
                      {formatDate(
                        blog.createdAt || blog.updatedAt
                      )}
                    </div>
                  )}

                  <h3 className="line-clamp-2 text-xl font-black leading-snug text-slate-950 transition-colors group-hover:text-cyan-600">
                    {blog.title}
                  </h3>

                  <p className="mt-2.5 line-clamp-3 text-sm leading-6 text-slate-600">
                    {getExcerpt(blog, 125)}
                  </p>

                  <div className="mt-auto pt-5">
                    <Link
                      href={`/blog/${blog.slug}`}
                      className="group/link inline-flex items-center gap-1.5 text-sm font-bold text-cyan-600 transition-colors hover:text-cyan-800"
                    >
                      Read Full Article

                      <ChevronRight
                        size={16}
                        className="transition-transform group-hover/link:translate-x-1"
                      />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* ================= BOTTOM CTA ================= */}

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-6 md:pb-20">
        <div className="relative overflow-hidden rounded-2xl bg-slate-950 px-5 py-9 text-center shadow-xl sm:px-8 md:rounded-3xl md:px-12 md:py-12">
          {/* BACKGROUND GLOW */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-80 -translate-x-1/2 rounded-full bg-cyan-500/15 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.15em] text-cyan-300">
              <Car size={13} />
              RC Tours & Travels
            </div>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
              Ready to Book Your Next Journey?
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-300 md:text-base md:leading-7">
              Book a comfortable cab from Nagpur for local travel, airport
              transfers and outstation trips.
            </p>

            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/book-cab"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:bg-cyan-600"
              >
                <Car size={17} />
                Book a Cab Now
              </Link>

              <Link
                href="/fleet"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
              >
                View Fleet
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}