"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const seoModules = [
  {
    title: "Keyword Rankings",
    description:
      "Track real Google keywords, clicks, impressions, CTR and average position through Google Search Console.",
    icon: "📈",
    status: "Live Data",
    href: "/admin/seo/keywords",
    badgeColor: "bg-cyan-50 text-cyan-700 border-cyan-200",
  },
  {
    title: "Technical SEO Audit",
    description:
      "Monitor technical SEO, indexing, metadata, internal links, mobile usability and sitemap issues.",
    icon: "🔍",
    status: "Coming Next",
    href: "/admin/seo/audit",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    title: "SEO Pages",
    description:
      "Manage Nagpur service pages, airport pages and high-value route landing pages.",
    icon: "📄",
    status: "Coming Next",
    href: "/admin/seo/pages",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
  {
    title: "Content Opportunities",
    description:
      "Use real Google search data to identify new blog topics, FAQs and high-intent content opportunities.",
    icon: "💡",
    status: "Coming Next",
    href: "/admin/seo/content",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    title: "Local SEO",
    description:
      "Monitor Nagpur local visibility, Google Business Profile, reviews and local search growth.",
    icon: "📍",
    status: "High Priority",
    href: "/admin/seo/local",
    badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
  },
  {
    title: "Organic Leads",
    description:
      "Measure calls, WhatsApp enquiries and website bookings coming from Google organic search.",
    icon: "🎯",
    status: "Coming Next",
    href: "/admin/seo/leads",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
  },
    {
    title: "Conversion Tracking",
    description:
      "Track website bookings, WhatsApp enquiries and phone-call conversion signals from SEO and paid traffic.",
    icon: "📊",
    status: "Tracking Setup",
    href: "/admin/seo/conversions",
    badgeColor: "bg-green-50 text-green-700 border-green-200",
  },
  {
    title: "Google Ads",
    description:
      "Track paid advertising separately from SEO for immediate leads and keyword testing.",
    icon: "💰",
    status: "Separate System",
    href: "/admin/seo/ads",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    title: "Daily SEO Actions",
    description:
      "Generate a priority list of important SEO tasks using real search and website data.",
    icon: "🔥",
    status: "Coming Next",
    href: "/admin/seo/actions",
    badgeColor: "bg-orange-50 text-orange-700 border-orange-200",
  },
];

const targetKeywords = [
  {
    keyword: "Taxi Service in Nagpur",
    intent: "Commercial",
    targetUrl: "/taxi-service-in-nagpur",
  },
  {
    keyword: "Cab Service in Nagpur",
    intent: "Commercial",
    targetUrl: "/",
  },
  {
    keyword: "Nagpur Airport Taxi",
    intent: "Local / Airport",
    targetUrl: "/nagpur-airport-taxi",
  },
  {
    keyword: "Nagpur Airport Cab Booking",
    intent: "Transactional",
    targetUrl: "/airport-taxi-nagpur",
  },
  {
    keyword: "Nagpur to Tadoba Taxi",
    intent: "Outstation / Tourism",
    targetUrl: "/nagpur-to-tadoba-cab",
  },
  {
    keyword: "Nagpur to Pench Taxi",
    intent: "Outstation / Tourism",
    targetUrl: "/nagpur-to-pench-cab",
  },
  {
    keyword: "Nagpur to Shirdi Taxi",
    intent: "Outstation",
    targetUrl: "/",
  },
  {
    keyword: "Nagpur to Pune Taxi",
    intent: "Outstation",
    targetUrl: "/",
  },
  {
    keyword: "Nagpur to Hyderabad Taxi",
    intent: "Outstation",
    targetUrl: "/",
  },
  {
    keyword: "Nagpur to Goa Taxi",
    intent: "Outstation",
    targetUrl: "/",
  },
  {
    keyword: "Innova Crysta Rental Nagpur",
    intent: "Fleet / Rental",
    targetUrl: "/fleet",
  },
];

const growthPlan = [
  {
    number: "01",
    title: "Real Google Search Console Data",
    description:
      "Actual Google clicks, impressions, CTR, search queries and average positions are now connected.",
    icon: "🔎",
    className: "border-cyan-100 bg-cyan-50/50 text-cyan-900",
  },
  {
    number: "02",
    title: "Keyword Ranking Opportunities",
    description:
      "Identify keywords ranking between positions 4–20 and improve pages with real ranking opportunities.",
    icon: "📈",
    className: "border-emerald-100 bg-emerald-50/50 text-emerald-900",
  },
  {
    number: "03",
    title: "Nagpur Local SEO",
    description:
      "Strengthen Google Business Profile, customer reviews, local relevance and service-area pages.",
    icon: "📍",
    className: "border-blue-100 bg-blue-50/50 text-blue-900",
  },
  {
    number: "04",
    title: "High-Intent Pages & Content",
    description:
      "Improve airport, local rental, Tadoba, Pench and important route pages according to search intent.",
    icon: "📄",
    className: "border-purple-100 bg-purple-50/50 text-purple-900",
  },
  {
    number: "05",
    title: "Organic Lead Tracking",
    description:
      "Measure calls, WhatsApp enquiries and booking conversions generated from organic search.",
    icon: "🎯",
    className: "border-amber-100 bg-amber-50/50 text-amber-900",
  },
  {
    number: "06",
    title: "Daily SEO Actions",
    description:
      "The dashboard will show which SEO tasks should be completed first.",
    icon: "🔥",
    className: "border-orange-100 bg-orange-50/50 text-orange-900",
  },
];

function formatNumber(value) {
  return new Intl.NumberFormat("en-IN").format(Number(value || 0));
}

function formatPercent(value) {
  return `${(Number(value || 0) * 100).toFixed(2)}%`;
}

function formatPosition(value) {
  return Number(value || 0).toFixed(1);
}

function shortUrl(url) {
  if (!url) return "";

  try {
    const parsed = new URL(url);
    return `${parsed.hostname}${parsed.pathname}`;
  } catch {
    return url;
  }
}

export default function SEOPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIntent, setSelectedIntent] = useState("All");

  const [seoData, setSeoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  async function loadSearchConsoleData(showRefresh = false) {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const response = await fetch(
        "/api/admin/seo/search-console",
        {
          method: "GET",
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data?.error ||
            "Unable to fetch Google Search Console data."
        );
      }

      setSeoData(data);
    } catch (err) {
      console.error("SEO dashboard error:", err);

      setError(
        err?.message ||
          "Unable to load Google Search Console data."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadSearchConsoleData();
  }, []);

  const filteredKeywords = useMemo(() => {
    return targetKeywords.filter((item) => {
      const matchesSearch = item.keyword
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesIntent =
        selectedIntent === "All" ||
        item.intent
          .toLowerCase()
          .includes(selectedIntent.toLowerCase());

      return matchesSearch && matchesIntent;
    });
  }, [searchTerm, selectedIntent]);

  const overall = seoData?.overall || {
    clicks: 0,
    impressions: 0,
    ctr: 0,
    position: 0,
  };

  const queries = seoData?.queries || [];
  const pages = seoData?.pages || [];
  const daily = seoData?.daily || [];
  const devices = seoData?.devices || [];
  const countries = seoData?.countries || [];

  return (
    <div className="min-h-screen bg-slate-50/60 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* ================= HEADER ================= */}

        <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm">

          <div className="p-6 md:p-8">

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

              <div className="space-y-3">

                <div className="flex flex-wrap items-center gap-2">

                  <span className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-[11px] font-black tracking-wider text-cyan-700">
                    SEO & GROWTH SYSTEM
                  </span>

                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-black tracking-wider text-emerald-700">
                    RC TOURS & TRAVELS
                  </span>

                  {seoData && (
                    <span className="rounded-full border border-green-200 bg-green-50 px-3 py-1 text-[11px] font-black tracking-wider text-green-700">
                      ● GOOGLE CONNECTED
                    </span>
                  )}

                </div>

                <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
                  SEO Growth Dashboard
                </h1>

                <p className="max-w-3xl text-sm font-medium leading-relaxed text-slate-600 md:text-base">
                  Real Google Search Console performance for RC Tours &
                  Travels. Track search visibility, queries, pages,
                  devices and organic growth from one dashboard.
                </p>

              </div>

              <div className="flex flex-wrap gap-3">

                <button
                  type="button"
                  onClick={() => loadSearchConsoleData(true)}
                  disabled={refreshing}
                  className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-slate-800 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {refreshing ? "⏳ Syncing..." : "🔄 Refresh Google Data"}
                </button>

                <Link
                  href="/admin"
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  ← Admin Dashboard
                </Link>

              </div>

            </div>

          </div>

          {/* ================= CONNECTION STATUS ================= */}

          <div
            className={`border-t px-6 py-4 md:px-8 ${
              error
                ? "border-red-100 bg-red-50"
                : seoData
                ? "border-emerald-100 bg-emerald-50"
                : "border-cyan-100 bg-cyan-50"
            }`}
          >

            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">

              <div className="flex items-start gap-3">

                <span className="text-xl">
                  {error ? "❌" : seoData ? "✅" : "⏳"}
                </span>

                <div>

                  <p
                    className={`text-sm font-black ${
                      error
                        ? "text-red-900"
                        : seoData
                        ? "text-emerald-900"
                        : "text-cyan-900"
                    }`}
                  >
                    {error
                      ? "Google Search Console Error"
                      : seoData
                      ? "Google Search Console Connected"
                      : "Loading Google Search Console Data"}
                  </p>

                  <p
                    className={`mt-1 text-xs font-medium leading-relaxed ${
                      error
                        ? "text-red-800"
                        : seoData
                        ? "text-emerald-800"
                        : "text-cyan-800"
                    }`}
                  >
                    {error
                      ? error
                      : seoData
                      ? `Property: ${
                          seoData.property ||
                          "rctoursandtravels.in"
                        }`
                      : "Fetching real Google Search Console performance data..."}
                  </p>

                </div>

              </div>

              {seoData && (
                <span className="w-fit rounded-full border border-emerald-200 bg-white px-3 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-700">
                  LIVE DATA
                </span>
              )}

            </div>

          </div>

        </div>

        {/* ================= PERFORMANCE OVERVIEW ================= */}

        <div>

          <div className="mb-4">

            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">

              <div>

                <h2 className="text-xl font-black text-slate-900">
                  📊 Google Search Performance
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  {seoData
                    ? `${seoData.dateRange?.startDate} to ${seoData.dateRange?.endDate}`
                    : "Loading reporting period..."}
                </p>

              </div>

              {seoData?.generatedAt && (
                <p className="text-xs font-semibold text-slate-400">
                  Last synced:{" "}
                  {new Date(
                    seoData.generatedAt
                  ).toLocaleString("en-IN")}
                </p>
              )}

            </div>

          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

            {/* Clicks */}

            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">

              <div className="flex items-center justify-between">

                <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Total Clicks
                </span>

                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-50 text-lg">
                  👆
                </span>

              </div>

              <div className="mt-4">

                <span className="text-3xl font-black text-slate-900">
                  {loading ? "..." : formatNumber(overall.clicks)}
                </span>

              </div>

              <p className="mt-2 text-xs font-medium text-slate-500">
                Organic Google clicks
              </p>

            </div>

            {/* Impressions */}

            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">

              <div className="flex items-center justify-between">

                <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Impressions
                </span>

                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-lg">
                  👁️
                </span>

              </div>

              <div className="mt-4">

                <span className="text-3xl font-black text-slate-900">
                  {loading
                    ? "..."
                    : formatNumber(overall.impressions)}
                </span>

              </div>

              <p className="mt-2 text-xs font-medium text-slate-500">
                Google Search appearances
              </p>

            </div>

            {/* CTR */}

            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">

              <div className="flex items-center justify-between">

                <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Average CTR
                </span>

                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-lg">
                  🎯
                </span>

              </div>

              <div className="mt-4">

                <span className="text-3xl font-black text-slate-900">
                  {loading
                    ? "..."
                    : formatPercent(overall.ctr)}
                </span>

              </div>

              <p className="mt-2 text-xs font-medium text-slate-500">
                Click-through rate
              </p>

            </div>

            {/* Position */}

            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">

              <div className="flex items-center justify-between">

                <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Average Position
                </span>

                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-50 text-lg">
                  📈
                </span>

              </div>

              <div className="mt-4">

                <span className="text-3xl font-black text-slate-900">
                  {loading
                    ? "..."
                    : formatPosition(overall.position)}
                </span>

              </div>

              <p className="mt-2 text-xs font-medium text-slate-500">
                Average Google ranking position
              </p>

            </div>

          </div>

        </div>

        {/* ================= TOP QUERIES ================= */}

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm md:p-8">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-xl font-black text-slate-900">
                  🔎 Top Google Queries
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Real search terms bringing visibility to the website.
                </p>

              </div>

              <span className="rounded-xl bg-cyan-50 px-3 py-2 text-xs font-black text-cyan-700">
                {queries.length}
              </span>

            </div>

            <div className="mt-5 space-y-2.5">

              {queries.length > 0 ? (
                queries
                  .slice()
                  .sort((a, b) => b.impressions - a.impressions)
                  .slice(0, 10)
                  .map((item) => (
                    <div
                      key={item.query}
                      className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4"
                    >

                      <div className="flex items-start justify-between gap-3">

                        <p className="min-w-0 break-words text-sm font-bold text-slate-900">
                          {item.query}
                        </p>

                        <span className="shrink-0 rounded-lg bg-white px-2 py-1 text-[10px] font-black text-slate-500 shadow-sm">
                          #{formatPosition(item.position)}
                        </span>

                      </div>

                      <div className="mt-3 grid grid-cols-3 gap-2 text-center">

                        <div className="rounded-xl bg-white p-2">
                          <p className="text-[9px] font-black uppercase text-slate-400">
                            Clicks
                          </p>
                          <p className="mt-1 text-sm font-black text-slate-900">
                            {formatNumber(item.clicks)}
                          </p>
                        </div>

                        <div className="rounded-xl bg-white p-2">
                          <p className="text-[9px] font-black uppercase text-slate-400">
                            Impr.
                          </p>
                          <p className="mt-1 text-sm font-black text-slate-900">
                            {formatNumber(item.impressions)}
                          </p>
                        </div>

                        <div className="rounded-xl bg-white p-2">
                          <p className="text-[9px] font-black uppercase text-slate-400">
                            CTR
                          </p>
                          <p className="mt-1 text-sm font-black text-slate-900">
                            {formatPercent(item.ctr)}
                          </p>
                        </div>

                      </div>

                    </div>
                  ))
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-200 py-12 text-center text-sm font-medium text-slate-400">
                  {loading
                    ? "Loading Google queries..."
                    : "No query data available."}
                </div>
              )}

            </div>

          </div>

          {/* ================= TOP PAGES ================= */}

          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm md:p-8">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-xl font-black text-slate-900">
                  📄 Top Google Pages
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Website pages receiving organic search visibility.
                </p>

              </div>

              <span className="rounded-xl bg-indigo-50 px-3 py-2 text-xs font-black text-indigo-700">
                {pages.length}
              </span>

            </div>

            <div className="mt-5 space-y-2.5">

              {pages.length > 0 ? (
                pages
                  .slice()
                  .sort((a, b) => b.impressions - a.impressions)
                  .slice(0, 10)
                  .map((item) => (
                    <div
                      key={item.page}
                      className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4"
                    >

                      <p className="break-all text-xs font-bold leading-relaxed text-slate-700">
                        {shortUrl(item.page)}
                      </p>

                      <div className="mt-3 grid grid-cols-4 gap-2 text-center">

                        <div className="rounded-xl bg-white p-2">
                          <p className="text-[9px] font-black uppercase text-slate-400">
                            Clicks
                          </p>
                          <p className="mt-1 text-sm font-black text-slate-900">
                            {formatNumber(item.clicks)}
                          </p>
                        </div>

                        <div className="rounded-xl bg-white p-2">
                          <p className="text-[9px] font-black uppercase text-slate-400">
                            Impr.
                          </p>
                          <p className="mt-1 text-sm font-black text-slate-900">
                            {formatNumber(item.impressions)}
                          </p>
                        </div>

                        <div className="rounded-xl bg-white p-2">
                          <p className="text-[9px] font-black uppercase text-slate-400">
                            CTR
                          </p>
                          <p className="mt-1 text-sm font-black text-slate-900">
                            {formatPercent(item.ctr)}
                          </p>
                        </div>

                        <div className="rounded-xl bg-white p-2">
                          <p className="text-[9px] font-black uppercase text-slate-400">
                            Pos.
                          </p>
                          <p className="mt-1 text-sm font-black text-slate-900">
                            {formatPosition(item.position)}
                          </p>
                        </div>

                      </div>

                    </div>
                  ))
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-200 py-12 text-center text-sm font-medium text-slate-400">
                  {loading
                    ? "Loading Google pages..."
                    : "No page data available."}
                </div>
              )}

            </div>

          </div>

        </div>

        {/* ================= DEVICES ================= */}

        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm md:p-8">

          <div>

            <h2 className="text-xl font-black text-slate-900">
              📱 Device Performance
            </h2>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Understand how users find RC Tours & Travels across devices.
            </p>

          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">

            {devices.map((device) => (
              <div
                key={device.device}
                className="rounded-2xl border border-slate-100 bg-slate-50/70 p-5"
              >

                <div className="flex items-center justify-between">

                  <span className="text-sm font-black text-slate-900">
                    {device.device}
                  </span>

                  <span className="text-xl">
                    {device.device === "MOBILE"
                      ? "📱"
                      : device.device === "DESKTOP"
                      ? "💻"
                      : "📲"}
                  </span>

                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">

                  <div className="rounded-xl bg-white p-3">
                    <p className="text-[9px] font-black uppercase text-slate-400">
                      Clicks
                    </p>
                    <p className="mt-1 text-lg font-black text-slate-900">
                      {formatNumber(device.clicks)}
                    </p>
                  </div>

                  <div className="rounded-xl bg-white p-3">
                    <p className="text-[9px] font-black uppercase text-slate-400">
                      Impressions
                    </p>
                    <p className="mt-1 text-lg font-black text-slate-900">
                      {formatNumber(device.impressions)}
                    </p>
                  </div>

                  <div className="rounded-xl bg-white p-3">
                    <p className="text-[9px] font-black uppercase text-slate-400">
                      CTR
                    </p>
                    <p className="mt-1 text-lg font-black text-slate-900">
                      {formatPercent(device.ctr)}
                    </p>
                  </div>

                  <div className="rounded-xl bg-white p-3">
                    <p className="text-[9px] font-black uppercase text-slate-400">
                      Position
                    </p>
                    <p className="mt-1 text-lg font-black text-slate-900">
                      {formatPosition(device.position)}
                    </p>
                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>

        {/* ================= COUNTRY ================= */}

        {countries.length > 0 && (
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm md:p-8">

            <div>

              <h2 className="text-xl font-black text-slate-900">
                🌍 Search Countries
              </h2>

              <p className="mt-1 text-sm font-medium text-slate-500">
                Countries where Google Search visibility is being recorded.
              </p>

            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">

              {countries
                .slice()
                .sort((a, b) => b.impressions - a.impressions)
                .slice(0, 12)
                .map((country) => (
                  <div
                    key={country.country}
                    className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 text-center"
                  >

                    <p className="text-xs font-black uppercase text-slate-500">
                      {country.country}
                    </p>

                    <p className="mt-2 text-lg font-black text-slate-900">
                      {formatNumber(country.impressions)}
                    </p>

                    <p className="mt-1 text-[10px] font-semibold text-slate-400">
                      impressions
                    </p>

                  </div>
                ))}

            </div>

          </div>
        )}

        {/* ================= DAILY PERFORMANCE ================= */}

        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm md:p-8">

          <div>

            <h2 className="text-xl font-black text-slate-900">
              📅 Daily Google Performance
            </h2>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Daily clicks, impressions and average position from Search Console.
            </p>

          </div>

          <div className="mt-5 overflow-x-auto">

            <table className="w-full min-w-[650px] text-left">

              <thead>

                <tr className="border-b border-slate-100">

                  <th className="px-4 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Date
                  </th>

                  <th className="px-4 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Clicks
                  </th>

                  <th className="px-4 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Impressions
                  </th>

                  <th className="px-4 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    CTR
                  </th>

                  <th className="px-4 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Position
                  </th>

                </tr>

              </thead>

              <tbody>

                {daily
                  .slice()
                  .reverse()
                  .map((item) => (
                    <tr
                      key={item.date}
                      className="border-b border-slate-50 hover:bg-slate-50"
                    >

                      <td className="px-4 py-3 text-sm font-bold text-slate-700">
                        {item.date}
                      </td>

                      <td className="px-4 py-3 text-sm font-black text-slate-900">
                        {formatNumber(item.clicks)}
                      </td>

                      <td className="px-4 py-3 text-sm font-black text-slate-900">
                        {formatNumber(item.impressions)}
                      </td>

                      <td className="px-4 py-3 text-sm font-bold text-cyan-700">
                        {formatPercent(item.ctr)}
                      </td>

                      <td className="px-4 py-3 text-sm font-bold text-purple-700">
                        {formatPosition(item.position)}
                      </td>

                    </tr>
                  ))}

              </tbody>

            </table>

            {daily.length === 0 && (
              <div className="py-10 text-center text-sm font-medium text-slate-400">
                {loading
                  ? "Loading daily performance..."
                  : "No daily performance data available."}
              </div>
            )}

          </div>

        </div>

        {/* ================= MODULES ================= */}

        <div className="space-y-4">

          <div>

            <h2 className="text-2xl font-black tracking-tight text-slate-900">
              🚀 SEO Growth Modules
            </h2>

            <p className="text-sm font-medium text-slate-500">
              Manage every important SEO area through dedicated modules.
            </p>

          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

            {seoModules.map((module) => (
              <Link
                key={module.title}
                href={module.href}
                className="group flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:shadow-xl hover:shadow-cyan-500/5"
              >

                <div>

                  <div className="flex items-start justify-between gap-3">

                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-2xl transition group-hover:scale-110 group-hover:bg-cyan-50">
                      {module.icon}
                    </div>

                    <span
                      className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-wider ${module.badgeColor}`}
                    >
                      {module.status}
                    </span>

                  </div>

                  <h3 className="mt-5 text-lg font-bold text-slate-900 transition-colors group-hover:text-cyan-600">
                    {module.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {module.description}
                  </p>

                </div>

                <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-cyan-600 transition-transform group-hover:translate-x-1">
                  <span>Open Module</span>
                  <span>→</span>
                </div>

              </Link>
            ))}

          </div>

        </div>

        {/* ================= KEYWORDS ================= */}

        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm md:p-8">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <h2 className="text-xl font-black text-slate-900">
                🎯 Target Keyword Strategy
              </h2>

              <p className="mt-1 text-sm font-medium text-slate-500">
                Initial commercial and route keywords selected for RC Tours &
                Travels. Actual Google search data is displayed above.
              </p>

            </div>

            <div className="rounded-2xl border border-cyan-100 bg-cyan-50 px-4 py-3">

              <p className="text-[10px] font-black uppercase tracking-wider text-cyan-600">
                Target Keywords
              </p>

              <p className="mt-1 text-xl font-black text-cyan-900">
                {targetKeywords.length}
              </p>

            </div>

          </div>

          <div className="mt-6 flex flex-col gap-3 md:flex-row">

            <input
              type="text"
              aria-label="Search target keywords"
              placeholder="Search keyword... e.g. Airport, Tadoba, Pune"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
            />

            <div className="flex shrink-0 items-center gap-1 rounded-2xl bg-slate-100 p-1">

              {["All", "Commercial", "Outstation"].map((intent) => (
                <button
                  key={intent}
                  type="button"
                  onClick={() => setSelectedIntent(intent)}
                  className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                    selectedIntent === intent
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {intent}
                </button>
              ))}

            </div>

          </div>

          <div className="mt-5 space-y-2.5">

            {filteredKeywords.length > 0 ? (
              filteredKeywords.map((item, index) => {

                const matchingQuery = queries.find(
                  (query) =>
                    query.query?.toLowerCase() ===
                    item.keyword.toLowerCase()
                );

                return (
                  <div
                    key={item.keyword}
                    className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-slate-50/60 px-4 py-4 transition hover:border-cyan-200 hover:bg-cyan-50/30 md:flex-row md:items-center md:justify-between"
                  >

                    <div className="flex min-w-0 items-center gap-3">

                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-xs font-black text-slate-600 shadow-sm">
                        {index + 1}
                      </span>

                      <div className="min-w-0">

                        <p className="truncate text-sm font-bold text-slate-900">
                          {item.keyword}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Target URL:
                          <span className="ml-1 font-semibold text-cyan-600">
                            {item.targetUrl}
                          </span>
                        </p>

                      </div>

                    </div>

                    <div className="flex shrink-0 flex-wrap items-center gap-2">

                      <span className="rounded-lg bg-white px-3 py-1.5 text-[11px] font-bold text-slate-600 shadow-sm">
                        {item.intent}
                      </span>

                      {matchingQuery ? (
                        <span className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[11px] font-bold text-emerald-700">
                          Pos. {formatPosition(matchingQuery.position)}
                        </span>
                      ) : (
                        <span className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5 text-[11px] font-bold text-amber-700">
                          Not Found Yet
                        </span>
                      )}

                    </div>

                  </div>
                );
              })
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 py-12 text-center text-sm font-medium text-slate-400">
                No keywords found for "{searchTerm}"
              </div>
            )}

          </div>

          <div className="mt-6 flex flex-col gap-2 border-t border-slate-100 pt-4 text-xs font-semibold text-slate-500 sm:flex-row sm:items-center sm:justify-between">

            <span>
              Showing {filteredKeywords.length} of{" "}
              {targetKeywords.length} target keywords
            </span>

            <span className="font-bold text-emerald-600">
              Real Google Search Console data connected
            </span>

          </div>

        </div>

        {/* ================= GROWTH ROADMAP ================= */}

        <div>

          <div className="mb-4">

            <h2 className="text-2xl font-black tracking-tight text-slate-900">
              🏆 RC Tours SEO Growth Roadmap
            </h2>

            <p className="text-sm font-medium text-slate-500">
              The growth system is built around real data, measurable
              improvements and consistent SEO work.
            </p>

          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">

            {growthPlan.map((item) => (
              <div
                key={item.number}
                className={`rounded-3xl border p-5 transition hover:-translate-y-1 hover:shadow-md ${item.className}`}
              >

                <div className="flex items-start justify-between">

                  <span className="text-2xl">
                    {item.icon}
                  </span>

                  <span className="text-xs font-black opacity-40">
                    {item.number}
                  </span>

                </div>

                <h3 className="mt-4 text-sm font-black">
                  {item.title}
                </h3>

                <p className="mt-2 text-xs leading-relaxed opacity-80">
                  {item.description}
                </p>

              </div>
            ))}

          </div>

        </div>

        {/* ================= IMPORTANT WARNING ================= */}

        <div className="rounded-3xl border border-cyan-200 bg-cyan-50 p-6 md:p-8">

          <div className="flex flex-col gap-5 md:flex-row md:items-start">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
              💡
            </div>

            <div>

              <h2 className="text-lg font-black text-cyan-950">
                Important: SEO Rankings Cannot Be Guaranteed
              </h2>

              <p className="mt-2 max-w-4xl text-sm leading-relaxed text-cyan-900/80">
                This system is being built to make the website technically
                stronger, understand Google search data, identify ranking
                opportunities and prioritise daily improvements. No system
                can guarantee a #1 Google ranking or a fixed number of daily
                customers. Our focus will be measurable organic growth,
                stronger search visibility and better lead conversion.
              </p>

            </div>

          </div>

        </div>

        {/* ================= GOOGLE ADS ================= */}

        <div className="overflow-hidden rounded-3xl bg-slate-900 p-6 text-white shadow-xl md:p-8">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div className="max-w-4xl">

              <span className="inline-block rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-blue-300">
                PAID SUPPORT
              </span>

              <h2 className="mt-3 text-xl font-black tracking-tight md:text-2xl">
                💰 Google Ads Will Support SEO, Not Replace It
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                SEO will focus on long-term organic traffic and sustainable
                search visibility. Google Ads will be measured separately for
                immediate leads, high-intent keyword testing and profitable
                campaigns.
              </p>

            </div>

            <Link
              href="/admin/seo/ads"
              className="shrink-0 rounded-2xl bg-blue-500 px-6 py-3 text-center text-sm font-black text-white transition hover:bg-blue-600"
            >
              Open Google Ads →
            </Link>

          </div>

        </div>

        {/* ================= FINAL STATUS ================= */}

        <div className="rounded-3xl border border-emerald-200 bg-white p-6 shadow-sm md:p-8">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div>

              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">
                GOOGLE SEARCH CONSOLE
              </span>

              <h2 className="mt-1 text-xl font-black text-slate-900">
                🚀 SEO Growth Engine Connected
              </h2>

              <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500">
                Real Google Search Console data is now available inside
                the RC Tours & Travels SEO dashboard.
              </p>

            </div>

            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-center">

              <div className="text-[10px] font-black uppercase tracking-wider text-emerald-600">
                Current Status
              </div>

              <div className="mt-1 text-lg font-black text-emerald-800">
                {seoData ? "GSC Connected" : "Connecting..."}
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}