"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const SITE_URL = "https://www.rctoursandtravels.in";

const localPages = [
  {
    name: "Taxi Service in Nagpur",
    path: "/taxi-service-in-nagpur",
    keyword: "taxi service in nagpur",
    intent: "Local Commercial",
  },
  {
    name: "Nagpur Local Taxi",
    path: "/nagpur-local-taxi",
    keyword: "nagpur local taxi",
    intent: "Local Commercial",
  },
  {
    name: "Nagpur Airport Taxi",
    path: "/nagpur-airport-taxi",
    keyword: "nagpur airport taxi",
    intent: "Airport",
  },
  {
    name: "Airport Taxi Nagpur",
    path: "/airport-taxi-nagpur",
    keyword: "airport taxi nagpur",
    intent: "Transactional",
  },
  {
    name: "Fleet",
    path: "/fleet",
    keyword: "car rental nagpur",
    intent: "Commercial",
  },
];

const localSignals = [
  {
    id: "service-area",
    title: "Nagpur Service Area",
    description:
      "Nagpur is clearly represented as the primary service area for RC Tours & Travels.",
    icon: "📍",
    category: "Local Relevance",
  },
  {
    id: "nagpur-pages",
    title: "Nagpur Landing Pages",
    description:
      "Dedicated taxi and airport pages target important Nagpur commercial searches.",
    icon: "📄",
    category: "Landing Pages",
  },
  {
    id: "contact",
    title: "Booking & Contact",
    description:
      "Visitors can move from organic search to booking and contact actions.",
    icon: "📞",
    category: "Lead Generation",
  },
  {
    id: "gsc",
    title: "Google Search Console",
    description:
      "Real GSC performance data is connected to this Local SEO dashboard.",
    icon: "📈",
    category: "Google",
  },
  {
    id: "mobile",
    title: "Mobile Visibility",
    description:
      "Mobile search performance is monitored because most local searches happen on phones.",
    icon: "📱",
    category: "Mobile SEO",
  },
  {
    id: "internal-links",
    title: "Internal Local Linking",
    description:
      "Local service, airport, fleet and route pages can strengthen each other through contextual links.",
    icon: "🔗",
    category: "Internal SEO",
  },
];

const keywordGroups = {
  all: {
    label: "All Local",
    keywords: [],
  },

  taxi: {
    label: "Taxi",
    keywords: [
      "taxi",
      "cab",
      "cab service",
      "taxi service",
    ],
  },

  carRental: {
    label: "Car Rental",
    keywords: [
      "car rental",
      "rental car",
      "rent car",
      "car on rent",
      "rental cars",
    ],
  },

  airport: {
    label: "Airport",
    keywords: ["airport"],
  },

  tempo: {
    label: "Tempo Traveller",
    keywords: [
      "tempo traveller",
      "traveller",
      "traveller rent",
    ],
  },

  outstation: {
    label: "Outstation",
    keywords: [
      "outstation",
      "one way",
      "round trip",
    ],
  },

  brand: {
    label: "RC Brand",
    keywords: [
      "rc tours",
      "rc travels",
      "rc tour",
      "rc travel",
      "rc cab",
      "rc car",
      "rc traveller",
    ],
  },
};

function formatNumber(value) {
  return new Intl.NumberFormat("en-IN").format(
    Number(value || 0)
  );
}

function formatPercent(value) {
  return `${(Number(value || 0) * 100).toFixed(2)}%`;
}

function formatPosition(value) {
  const number = Number(value || 0);

  if (!number) {
    return "—";
  }

  return number.toFixed(1);
}

function getPositionClass(position) {
  const value = Number(position || 0);

  if (value >= 1 && value <= 3) {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (value > 3 && value <= 10) {
    return "border-cyan-200 bg-cyan-50 text-cyan-700";
  }

  if (value > 10 && value <= 20) {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }

  if (value > 20) {
    return "border-rose-200 bg-rose-50 text-rose-700";
  }

  return "border-slate-200 bg-slate-50 text-slate-500";
}

function getPositionLabel(position) {
  const value = Number(position || 0);

  if (value >= 1 && value <= 3) {
    return "TOP 3";
  }

  if (value > 3 && value <= 10) {
    return "PAGE 1";
  }

  if (value > 10 && value <= 20) {
    return "PAGE 2";
  }

  if (value > 20) {
    return "20+";
  }

  return "NOT FOUND";
}

function normalizeUrl(url) {
  if (!url) {
    return "";
  }

  try {
    const parsed = new URL(url);

    return `${parsed.pathname}${parsed.search}`;
  } catch {
    return url;
  }
}

function getKeywordCategory(query) {
  const value = String(query || "").toLowerCase();

  if (
    value.includes("rc tours") ||
    value.includes("rc travels") ||
    value.includes("rc tour") ||
    value.includes("rc travel") ||
    value.includes("rc cab") ||
    value.includes("rc car") ||
    value.includes("rc traveller")
  ) {
    return "brand";
  }

  if (value.includes("airport")) {
    return "airport";
  }

  if (
    value.includes("tempo traveller") ||
    value.includes("traveller") ||
    value.includes("traveller rent")
  ) {
    return "tempo";
  }

  if (
    value.includes("outstation") ||
    value.includes("one way") ||
    value.includes("round trip")
  ) {
    return "outstation";
  }

  if (
    value.includes("car rental") ||
    value.includes("rental car") ||
    value.includes("rent car") ||
    value.includes("car on rent") ||
    value.includes("rental cars")
  ) {
    return "carRental";
  }

  if (
    value.includes("taxi") ||
    value.includes("cab") ||
    value.includes("taxi service") ||
    value.includes("cab service")
  ) {
    return "taxi";
  }

  return "other";
}

function isRelevantLocalKeyword(query) {
  const value = String(query || "").toLowerCase();

  const positiveKeywords = [
    "nagpur",
    "taxi",
    "cab",
    "airport",
    "car rental",
    "rental car",
    "rent car",
    "car on rent",
    "rental cars",
    "tempo traveller",
    "traveller",
    "outstation",
    "one way",
    "round trip",
    "tour and travel",
    "tourist car",
    "travel agency",
    "travels near",
    "taxi near",
    "cab near",
    "car near",
    "driver in nagpur",
    "driver on hire nagpur",
    "rc tours",
    "rc travels",
    "rc tour",
    "rc travel",
    "rc cab",
    "rc car",
    "rc traveller",
  ];

  const negativeKeywords = [
    "mobile number update",
    "mobile number in rc",
    "how to update mobile",
    "know mobile number",
    "rc number update",
    "rc me number update",
    "car company",
    "car club",
    "lease car",
    "prompt",
  ];

  const hasPositive = positiveKeywords.some((keyword) =>
    value.includes(keyword)
  );

  const hasNegative = negativeKeywords.some((keyword) =>
    value.includes(keyword)
  );

  return hasPositive && !hasNegative;
}

export default function LocalSEOPage() {
  const [seoData, setSeoData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState("");

  const [pageResults, setPageResults] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [activeCategory, setActiveCategory] =
    useState("all");

  async function checkLocalPages() {
    const results = [];

    for (const page of localPages) {
      try {
        const response = await fetch(page.path, {
          method: "GET",
          cache: "no-store",
        });

        results.push({
          ...page,
          status: response.ok
            ? "PASS"
            : "ERROR",
          statusCode: response.status,
        });
      } catch {
        results.push({
          ...page,
          status: "WARNING",
          statusCode: null,
        });
      }
    }

    setPageResults(results);
  }

  async function loadLocalSEOData(
    showRefresh = false
  ) {
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

      if (!response.ok || !data?.success) {
        throw new Error(
          data?.error ||
            "Unable to load Google Search Console data."
        );
      }

      setSeoData(data);

      await checkLocalPages();
    } catch (err) {
      console.error(
        "Local SEO Dashboard Error:",
        err
      );

      setError(
        err?.message ||
          "Unable to load Local SEO data."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadLocalSEOData();
  }, []);

  const queries = Array.isArray(
    seoData?.queries
  )
    ? seoData.queries
    : [];

  const localQueries = useMemo(() => {
    return queries
      .filter((item) =>
        isRelevantLocalKeyword(item?.query)
      )
      .map((item) => ({
        ...item,
        category: getKeywordCategory(
          item?.query
        ),
      }));
  }, [queries]);

  const filteredQueries = useMemo(() => {
    const search = searchTerm
      .trim()
      .toLowerCase();

    return localQueries.filter((item) => {
      const matchesSearch =
        !search ||
        String(item?.query || "")
          .toLowerCase()
          .includes(search);

      const matchesCategory =
        activeCategory === "all" ||
        item.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [
    localQueries,
    searchTerm,
    activeCategory,
  ]);

  const sortedQueries = useMemo(() => {
    return filteredQueries
      .slice()
      .sort((a, b) => {
        const impressionDifference =
          Number(b.impressions || 0) -
          Number(a.impressions || 0);

        if (impressionDifference !== 0) {
          return impressionDifference;
        }

        return (
          Number(a.position || 999) -
          Number(b.position || 999)
        );
      });
  }, [filteredQueries]);

  const localStats = useMemo(() => {
    let top3 = 0;
    let pageOne = 0;
    let pageTwo = 0;
    let twentyPlus = 0;

    let totalClicks = 0;
    let totalImpressions = 0;

    localQueries.forEach((item) => {
      const position = Number(
        item?.position || 0
      );

      if (position >= 1 && position <= 3) {
        top3++;
      } else if (
        position > 3 &&
        position <= 10
      ) {
        pageOne++;
      } else if (
        position > 10 &&
        position <= 20
      ) {
        pageTwo++;
      } else if (position > 20) {
        twentyPlus++;
      }

      totalClicks += Number(
        item?.clicks || 0
      );

      totalImpressions += Number(
        item?.impressions || 0
      );
    });

    const averagePosition =
      localQueries.length > 0
        ? localQueries.reduce(
            (sum, item) =>
              sum +
              Number(item?.position || 0),
            0
          ) / localQueries.length
        : 0;

    const ctr =
      totalImpressions > 0
        ? totalClicks / totalImpressions
        : 0;

    return {
      total: localQueries.length,
      top3,
      pageOne,
      pageTwo,
      twentyPlus,
      totalClicks,
      totalImpressions,
      averagePosition,
      ctr,
    };
  }, [localQueries]);

  const categoryStats = useMemo(() => {
    const stats = {};

    Object.keys(keywordGroups).forEach(
      (category) => {
        if (category === "all") {
          stats[category] =
            localQueries.length;

          return;
        }

        stats[category] =
          localQueries.filter(
            (item) =>
              item.category === category
          ).length;
      }
    );

    return stats;
  }, [localQueries]);

  const opportunityQueries = useMemo(() => {
    return localQueries
      .filter((item) => {
        const position = Number(
          item?.position || 0
        );

        const impressions = Number(
          item?.impressions || 0
        );

        return (
          position > 3 &&
          position <= 20 &&
          impressions > 0
        );
      })
      .sort((a, b) => {
        const scoreA =
          Number(a.impressions || 0) /
          Math.max(Number(a.position || 1), 1);

        const scoreB =
          Number(b.impressions || 0) /
          Math.max(Number(b.position || 1), 1);

        return scoreB - scoreA;
      })
      .slice(0, 15);
  }, [localQueries]);

  const queryPageMap = useMemo(() => {
    const rows = Array.isArray(
      seoData?.queryPages
    )
      ? seoData.queryPages
      : [];

    return rows
      .filter((item) =>
        isRelevantLocalKeyword(item?.query)
      )
      .sort((a, b) => {
        return (
          Number(b.impressions || 0) -
          Number(a.impressions || 0)
        );
      })
      .slice(0, 20);
  }, [seoData]);

  const pagePassCount = pageResults.filter(
    (item) => item.status === "PASS"
  ).length;

  const localScore = useMemo(() => {
    if (!pageResults.length) {
      return 0;
    }

    return Math.round(
      (pagePassCount /
        pageResults.length) *
        100
    );
  }, [
    pagePassCount,
    pageResults.length,
  ]);

  return (
    <div className="min-h-screen bg-slate-50/60 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* HEADER */}

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          <div className="p-6 md:p-8">

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

              <div className="space-y-3">

                <div className="flex flex-wrap gap-2">

                  <span className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-[10px] font-black tracking-wider text-cyan-700">
                    SEO & GROWTH
                  </span>

                  <span className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-[10px] font-black tracking-wider text-rose-700">
                    LOCAL SEO
                  </span>

                  {seoData && (
                    <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-black tracking-wider text-emerald-700">
                      ● GOOGLE CONNECTED
                    </span>
                  )}

                </div>

                <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
                  Local SEO Command Center
                </h1>

                <p className="max-w-3xl text-sm font-medium leading-relaxed text-slate-600 md:text-base">
                  Real Google Search Console data
                  for Nagpur taxi, cab, car rental,
                  airport, traveller and outstation
                  searches.
                </p>

              </div>

              <div className="flex flex-wrap gap-3">

                <button
                  type="button"
                  onClick={() =>
                    loadLocalSEOData(true)
                  }
                  disabled={refreshing}
                  className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-slate-800 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {refreshing
                    ? "⏳ Syncing..."
                    : "🔄 Refresh SEO"}
                </button>

                <Link
                  href="/admin/seo"
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  ← SEO Dashboard
                </Link>

              </div>

            </div>

          </div>

          <div
            className={`border-t px-6 py-4 md:px-8 ${
              error
                ? "border-rose-100 bg-rose-50"
                : "border-emerald-100 bg-emerald-50"
            }`}
          >

            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

              <div className="flex items-start gap-3">

                <span className="text-xl">
                  {error ? "⚠️" : "📍"}
                </span>

                <div>

                  <p
                    className={`text-sm font-black ${
                      error
                        ? "text-rose-900"
                        : "text-emerald-900"
                    }`}
                  >
                    {error
                      ? "Local SEO Data Error"
                      : "Nagpur Local SEO Monitoring"}
                  </p>

                  <p
                    className={`mt-1 text-xs font-medium ${
                      error
                        ? "text-rose-800"
                        : "text-emerald-800"
                    }`}
                  >
                    {error ||
                      "Google Search Console is connected and local search visibility is being analysed."}
                  </p>

                </div>

              </div>

              <span className="w-fit rounded-full border border-emerald-200 bg-white px-3 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-700">
                LIVE DATA
              </span>

            </div>

          </div>

        </div>

        {/* OVERVIEW */}

        <section>

          <div className="mb-4">

            <h2 className="text-2xl font-black tracking-tight text-slate-900">
              📊 Nagpur Local SEO Overview
            </h2>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Cleaned local-intent queries from
              Google Search Console.
            </p>

          </div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 xl:grid-cols-7">

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Local Queries
              </span>

              <div className="mt-3 text-3xl font-black text-slate-900">
                {loading
                  ? "..."
                  : formatNumber(
                      localStats.total
                    )}
              </div>
            </div>

            <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600">
                Top 3
              </span>

              <div className="mt-3 text-3xl font-black text-emerald-900">
                {formatNumber(
                  localStats.top3
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-cyan-200 bg-cyan-50 p-5 shadow-sm">
              <span className="text-[10px] font-black uppercase tracking-wider text-cyan-600">
                Page 1
              </span>

              <div className="mt-3 text-3xl font-black text-cyan-900">
                {formatNumber(
                  localStats.pageOne
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-600">
                Page 2
              </span>

              <div className="mt-3 text-3xl font-black text-amber-900">
                {formatNumber(
                  localStats.pageTwo
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-rose-200 bg-rose-50 p-5 shadow-sm">
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-600">
                20+
              </span>

              <div className="mt-3 text-3xl font-black text-rose-900">
                {formatNumber(
                  localStats.twentyPlus
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-purple-200 bg-purple-50 p-5 shadow-sm">
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-600">
                Clicks
              </span>

              <div className="mt-3 text-3xl font-black text-purple-900">
                {formatNumber(
                  localStats.totalClicks
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-indigo-200 bg-indigo-50 p-5 shadow-sm">
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600">
                Avg Position
              </span>

              <div className="mt-3 text-3xl font-black text-indigo-900">
                {localStats.averagePosition
                  ? localStats.averagePosition.toFixed(
                      1
                    )
                  : "—"}
              </div>
            </div>

          </div>

        </section>

        {/* CATEGORY FILTER */}

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">

          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

            <div>
              <h2 className="text-xl font-black text-slate-900">
                🎯 Local Keyword Categories
              </h2>

              <p className="mt-1 text-sm font-medium text-slate-500">
                Focus on the search terms that can
                actually generate Nagpur bookings.
              </p>
            </div>

            <span className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-black text-slate-600">
              {formatNumber(
                localStats.totalImpressions
              )}{" "}
              impressions
            </span>

          </div>

          <div className="mt-6 flex flex-wrap gap-2">

            {Object.entries(
              keywordGroups
            ).map(([key, group]) => {

              const active =
                activeCategory === key;

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() =>
                    setActiveCategory(key)
                  }
                  className={`rounded-xl border px-4 py-2 text-xs font-black transition ${
                    active
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:border-cyan-300 hover:bg-cyan-50"
                  }`}
                >
                  {group.label}{" "}
                  <span className="ml-1 opacity-70">
                    {formatNumber(
                      categoryStats[key] || 0
                    )}
                  </span>
                </button>
              );
            })}

          </div>

        </section>

        {/* LOCAL SEO FOUNDATION */}

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div>
              <h2 className="text-xl font-black text-slate-900">
                📍 Local SEO Foundation
              </h2>

              <p className="mt-1 text-sm font-medium text-slate-500">
                Website-level signals supporting local
                organic visibility.
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-center">
              <div className="text-2xl font-black text-emerald-900">
                {localScore}%
              </div>

              <div className="text-[10px] font-black uppercase tracking-wider text-emerald-700">
                Page Health
              </div>
            </div>

          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">

            {localSignals.map((item) => {

              const signalPass =
                item.id === "gsc"
                  ? Boolean(seoData)
                  : true;

              return (
                <div
                  key={item.id}
                  className="rounded-2xl border border-slate-100 bg-slate-50/70 p-5 transition hover:border-cyan-200 hover:bg-cyan-50/30"
                >

                  <div className="flex items-start justify-between gap-3">

                    <div className="flex min-w-0 items-start gap-3">

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-xl shadow-sm">
                        {item.icon}
                      </div>

                      <div>

                        <h3 className="text-sm font-black text-slate-900">
                          {item.title}
                        </h3>

                        <p className="mt-1 text-xs leading-relaxed text-slate-500">
                          {item.description}
                        </p>

                      </div>

                    </div>

                    <span
                      className={`shrink-0 rounded-lg border px-2.5 py-1 text-[10px] font-black ${
                        signalPass
                          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                          : "border-amber-200 bg-amber-50 text-amber-700"
                      }`}
                    >
                      {signalPass
                        ? "PASS"
                        : "CHECK"}
                    </span>

                  </div>

                  <div className="mt-4">
                    <span className="rounded-lg bg-white px-2.5 py-1 text-[10px] font-bold text-slate-500 shadow-sm">
                      {item.category}
                    </span>
                  </div>

                </div>
              );
            })}

          </div>

        </section>

        {/* LOCAL LANDING PAGES */}

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div>
              <h2 className="text-xl font-black text-slate-900">
                📄 Nagpur Local Landing Pages
              </h2>

              <p className="mt-1 text-sm font-medium text-slate-500">
                Important pages that support local
                commercial search intent.
              </p>
            </div>

            <span className="rounded-xl border border-cyan-200 bg-cyan-50 px-3 py-2 text-xs font-black text-cyan-700">
              {pagePassCount}/
              {pageResults.length ||
                localPages.length}{" "}
              LIVE
            </span>

          </div>

          <div className="mt-6 overflow-x-auto">

            <table className="w-full min-w-[850px] border-collapse">

              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Page
                  </th>

                  <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Keyword
                  </th>

                  <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Intent
                  </th>

                  <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Status
                  </th>

                  <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Open
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">

                {localPages.map((page) => {

                  const result =
                    pageResults.find(
                      (item) =>
                        item.path ===
                        page.path
                    );

                  return (
                    <tr
                      key={page.path}
                      className="hover:bg-cyan-50/30"
                    >

                      <td className="px-4 py-4">
                        <p className="text-sm font-black text-slate-900">
                          {page.name}
                        </p>

                        <p className="mt-1 text-xs font-medium text-slate-400">
                          {page.path}
                        </p>
                      </td>

                      <td className="px-4 py-4">
                        <span className="text-xs font-bold text-cyan-700">
                          {page.keyword}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-600">
                          {page.intent}
                        </span>
                      </td>

                      <td className="px-4 py-4">

                        {result ? (
                          <span
                            className={`inline-flex rounded-lg border px-2.5 py-1 text-[10px] font-black ${
                              result.status ===
                              "PASS"
                                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                                : result.status ===
                                  "ERROR"
                                ? "border-rose-200 bg-rose-50 text-rose-700"
                                : "border-amber-200 bg-amber-50 text-amber-700"
                            }`}
                          >
                            {result.status ===
                            "PASS"
                              ? "✅ LIVE"
                              : result.status ===
                                "ERROR"
                              ? `❌ ${result.statusCode}`
                              : "⚠️ CHECK"}
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400">
                            Checking...
                          </span>
                        )}

                      </td>

                      <td className="px-4 py-4">

                        <Link
                          href={page.path}
                          className="text-xs font-black text-cyan-700 hover:text-cyan-900 hover:underline"
                        >
                          Open →
                        </Link>

                      </td>

                    </tr>
                  );
                })}

              </tbody>

            </table>

          </div>

        </section>

        {/* SEO OPPORTUNITIES */}

        <section className="rounded-3xl border border-amber-200 bg-amber-50/50 p-6 shadow-sm md:p-8">

          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

            <div>

              <span className="text-[10px] font-black uppercase tracking-widest text-amber-700">
                HIGH VALUE
              </span>

              <h2 className="mt-1 text-xl font-black text-amber-950">
                🔥 SEO Opportunity Keywords
              </h2>

              <p className="mt-1 text-sm font-medium text-amber-900/70">
                Keywords already getting visibility
                but not yet in Top 3.
              </p>

            </div>

            <span className="rounded-xl border border-amber-200 bg-white px-3 py-2 text-xs font-black text-amber-700">
              {opportunityQueries.length} Opportunities
            </span>

          </div>

          <div className="mt-6 overflow-x-auto">

            <table className="w-full min-w-[850px] border-collapse">

              <thead>
                <tr className="border-b border-amber-200">
                  <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wider text-amber-700">
                    Keyword
                  </th>

                  <th className="px-4 py-3 text-right text-[10px] font-black uppercase tracking-wider text-amber-700">
                    Impressions
                  </th>

                  <th className="px-4 py-3 text-right text-[10px] font-black uppercase tracking-wider text-amber-700">
                    Clicks
                  </th>

                  <th className="px-4 py-3 text-right text-[10px] font-black uppercase tracking-wider text-amber-700">
                    Position
                  </th>

                  <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wider text-amber-700">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-amber-100">

                {opportunityQueries.length > 0 ? (
                  opportunityQueries.map(
                    (item, index) => (
                      <tr key={`${item.query}-${index}`}>

                        <td className="px-4 py-4">
                          <p className="text-sm font-black text-slate-900">
                            {item.query}
                          </p>

                          <span className="mt-1 inline-block rounded-md bg-white px-2 py-1 text-[9px] font-black uppercase text-slate-500">
                            {keywordGroups[
                              item.category
                            ]?.label ||
                              "Local"}
                          </span>
                        </td>

                        <td className="px-4 py-4 text-right text-sm font-bold text-slate-700">
                          {formatNumber(
                            item.impressions
                          )}
                        </td>

                        <td className="px-4 py-4 text-right text-sm font-bold text-slate-700">
                          {formatNumber(
                            item.clicks
                          )}
                        </td>

                        <td className="px-4 py-4 text-right">

                          <span
                            className={`inline-flex rounded-lg border px-2.5 py-1 text-[10px] font-black ${getPositionClass(
                              item.position
                            )}`}
                          >
                            {formatPosition(
                              item.position
                            )}
                          </span>

                        </td>

                        <td className="px-4 py-4">

                          <span className="text-xs font-black text-amber-800">
                            {Number(
                              item.position
                            ) <= 10
                              ? "🚀 Push to Top 3"
                              : "📝 Improve content"}
                          </span>

                        </td>

                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-10 text-center"
                    >
                      <div className="text-3xl">
                        🎯
                      </div>

                      <p className="mt-2 text-sm font-black text-slate-700">
                        No opportunity keywords found.
                      </p>
                    </td>
                  </tr>
                )}

              </tbody>

            </table>

          </div>

        </section>

        {/* REAL LOCAL QUERIES */}

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div>

              <h2 className="text-xl font-black text-slate-900">
                🔎 Real Local Search Queries
              </h2>

              <p className="mt-1 text-sm font-medium text-slate-500">
                Filtered from Google Search Console
                to remove obvious irrelevant searches.
              </p>

            </div>

            <span className="rounded-xl border border-cyan-200 bg-cyan-50 px-3 py-2 text-xs font-black text-cyan-700">
              {filteredQueries.length} Queries
            </span>

          </div>

          <div className="mt-5">

            <input
              type="text"
              aria-label="Search local SEO queries"
              placeholder="Search keyword..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(
                  event.target.value
                )
              }
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
            />

          </div>

          <div className="mt-5 overflow-x-auto">

            <table className="w-full min-w-[850px] border-collapse">

              <thead>

                <tr className="border-b border-slate-100 bg-slate-50">

                  <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Query
                  </th>

                  <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Category
                  </th>

                  <th className="px-4 py-3 text-right text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Clicks
                  </th>

                  <th className="px-4 py-3 text-right text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Impressions
                  </th>

                  <th className="px-4 py-3 text-right text-[10px] font-black uppercase tracking-wider text-slate-400">
                    CTR
                  </th>

                  <th className="px-4 py-3 text-right text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Position
                  </th>

                  <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Ranking
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-slate-100">

                {sortedQueries
                  .slice(0, 75)
                  .map((item, index) => (

                    <tr
                      key={`${item.query}-${index}`}
                      className="hover:bg-cyan-50/30"
                    >

                      <td className="max-w-[300px] px-4 py-4">

                        <p className="break-words text-sm font-black text-slate-900">
                          {item.query}
                        </p>

                      </td>

                      <td className="px-4 py-4">

                        <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-[10px] font-black text-slate-600">
                          {keywordGroups[
                            item.category
                          ]?.label ||
                            "Local"}
                        </span>

                      </td>

                      <td className="px-4 py-4 text-right text-sm font-bold text-slate-700">
                        {formatNumber(
                          item.clicks
                        )}
                      </td>

                      <td className="px-4 py-4 text-right text-sm font-bold text-slate-700">
                        {formatNumber(
                          item.impressions
                        )}
                      </td>

                      <td className="px-4 py-4 text-right text-sm font-bold text-slate-700">
                        {formatPercent(
                          item.ctr
                        )}
                      </td>

                      <td className="px-4 py-4 text-right">

                        <span className="text-sm font-black text-slate-900">
                          {formatPosition(
                            item.position
                          )}
                        </span>

                      </td>

                      <td className="px-4 py-4">

                        <span
                          className={`inline-flex rounded-lg border px-2.5 py-1 text-[10px] font-black ${getPositionClass(
                            item.position
                          )}`}
                        >
                          {getPositionLabel(
                            item.position
                          )}
                        </span>

                      </td>

                    </tr>

                  ))}

                {sortedQueries.length === 0 && (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-12 text-center"
                    >

                      <div className="text-3xl">
                        🔍
                      </div>

                      <p className="mt-3 text-sm font-black text-slate-700">
                        No matching local queries.
                      </p>

                    </td>
                  </tr>
                )}

              </tbody>

            </table>

          </div>

        </section>

        {/* QUERY → PAGE MAPPING */}

        <section className="rounded-3xl border border-indigo-200 bg-indigo-50/50 p-6 shadow-sm md:p-8">

          <div>

            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">
              SEO INTELLIGENCE
            </span>

            <h2 className="mt-1 text-xl font-black text-indigo-950">
              🔗 Keyword → Ranking Page
            </h2>

            <p className="mt-1 text-sm font-medium text-indigo-900/70">
              This shows which website page Google is
              using for each local search.
            </p>

          </div>

          <div className="mt-6 overflow-x-auto">

            <table className="w-full min-w-[900px] border-collapse">

              <thead>

                <tr className="border-b border-indigo-200">

                  <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wider text-indigo-700">
                    Keyword
                  </th>

                  <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wider text-indigo-700">
                    Ranking Page
                  </th>

                  <th className="px-4 py-3 text-right text-[10px] font-black uppercase tracking-wider text-indigo-700">
                    Impressions
                  </th>

                  <th className="px-4 py-3 text-right text-[10px] font-black uppercase tracking-wider text-indigo-700">
                    Clicks
                  </th>

                  <th className="px-4 py-3 text-right text-[10px] font-black uppercase tracking-wider text-indigo-700">
                    Position
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-indigo-100">

                {queryPageMap.map(
                  (item, index) => (

                    <tr
                      key={`${item.query}-${item.page}-${index}`}
                      className="hover:bg-white/70"
                    >

                      <td className="px-4 py-4">

                        <p className="text-sm font-black text-slate-900">
                          {item.query}
                        </p>

                      </td>

                      <td className="max-w-[400px] px-4 py-4">

                        <p className="break-all text-xs font-bold text-indigo-700">
                          {normalizeUrl(
                            item.page
                          )}
                        </p>

                      </td>

                      <td className="px-4 py-4 text-right text-sm font-bold text-slate-700">
                        {formatNumber(
                          item.impressions
                        )}
                      </td>

                      <td className="px-4 py-4 text-right text-sm font-bold text-slate-700">
                        {formatNumber(
                          item.clicks
                        )}
                      </td>

                      <td className="px-4 py-4 text-right">

                        <span
                          className={`inline-flex rounded-lg border px-2.5 py-1 text-[10px] font-black ${getPositionClass(
                            item.position
                          )}`}
                        >
                          {formatPosition(
                            item.position
                          )}
                        </span>

                      </td>

                    </tr>

                  )
                )}

                {queryPageMap.length === 0 && (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-10 text-center text-sm font-bold text-slate-500"
                    >
                      No query-page mapping
                      available.
                    </td>
                  </tr>
                )}

              </tbody>

            </table>

          </div>

        </section>

        {/* DEVICE PERFORMANCE */}

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">

          <div>

            <h2 className="text-xl font-black text-slate-900">
              📱 Local Search Device Performance
            </h2>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Overall Google Search Console device
              performance for the selected period.
            </p>

          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

            {(seoData?.devices || []).map(
              (device) => (

                <div
                  key={device.device}
                  className="rounded-2xl border border-slate-100 bg-slate-50 p-5"
                >

                  <div className="flex items-center justify-between">

                    <span className="text-2xl">
                      {device.device ===
                      "MOBILE"
                        ? "📱"
                        : device.device ===
                          "DESKTOP"
                        ? "💻"
                        : "📟"}
                    </span>

                    <span className="rounded-lg bg-white px-2.5 py-1 text-[10px] font-black text-slate-500">
                      {device.device}
                    </span>

                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3">

                    <div>
                      <p className="text-[10px] font-black uppercase text-slate-400">
                        Clicks
                      </p>

                      <p className="mt-1 text-xl font-black text-slate-900">
                        {formatNumber(
                          device.clicks
                        )}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] font-black uppercase text-slate-400">
                        Impressions
                      </p>

                      <p className="mt-1 text-xl font-black text-slate-900">
                        {formatNumber(
                          device.impressions
                        )}
                      </p>
                    </div>

                  </div>

                  <div className="mt-4 flex items-center justify-between text-xs font-bold text-slate-500">

                    <span>
                      CTR{" "}
                      {formatPercent(
                        device.ctr
                      )}
                    </span>

                    <span>
                      Pos.{" "}
                      {formatPosition(
                        device.position
                      )}
                    </span>

                  </div>

                </div>

              )
            )}

          </div>

        </section>

        {/* LOCAL SEO ACTION CENTER */}

        <section className="rounded-3xl border border-rose-200 bg-rose-50/60 p-6 shadow-sm md:p-8">

          <div>

            <span className="text-[10px] font-black uppercase tracking-widest text-rose-600">
              ACTION CENTER
            </span>

            <h2 className="mt-1 text-xl font-black text-rose-950">
              🚀 What We Should Do Next
            </h2>

            <p className="mt-1 text-sm font-medium text-rose-900/70">
              Use the actual GSC opportunities instead
              of blindly adding keywords.
            </p>

          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">

            <div className="rounded-2xl border border-white bg-white p-5">

              <div className="flex items-start gap-3">

                <span className="text-xl">
                  🥇
                </span>

                <div>

                  <h3 className="text-sm font-black text-slate-900">
                    Push Page 1 Keywords into Top 3
                  </h3>

                  <p className="mt-1 text-xs leading-relaxed text-slate-500">
                    Focus first on keywords already
                    ranking between positions 4 and
                    10. These usually need less effort
                    than keywords ranking 30+.
                  </p>

                </div>

              </div>

            </div>

            <div className="rounded-2xl border border-white bg-white p-5">

              <div className="flex items-start gap-3">

                <span className="text-xl">
                  📍
                </span>

                <div>

                  <h3 className="text-sm font-black text-slate-900">
                    Strengthen Nagpur Taxi Content
                  </h3>

                  <p className="mt-1 text-xs leading-relaxed text-slate-500">
                    Build useful, unique information
                    around taxi service, cab booking,
                    airport taxi and car rental in
                    Nagpur.
                  </p>

                </div>

              </div>

            </div>

            <div className="rounded-2xl border border-white bg-white p-5">

              <div className="flex items-start gap-3">

                <span className="text-xl">
                  🔗
                </span>

                <div>

                  <h3 className="text-sm font-black text-slate-900">
                    Improve Internal Linking
                  </h3>

                  <p className="mt-1 text-xs leading-relaxed text-slate-500">
                    Connect homepage, taxi service,
                    airport, fleet, route and blog
                    pages with relevant contextual
                    links.
                  </p>

                </div>

              </div>

            </div>

            <div className="rounded-2xl border border-white bg-white p-5">

              <div className="flex items-start gap-3">

                <span className="text-xl">
                  ⭐
                </span>

                <div>

                  <h3 className="text-sm font-black text-slate-900">
                    Keep Google Business Profile Strong
                  </h3>

                  <p className="mt-1 text-xs leading-relaxed text-slate-500">
                    Maintain accurate business details,
                    services, photos and genuine customer
                    reviews.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* IMPORTANT NOTE */}

        <section className="rounded-3xl border border-cyan-200 bg-cyan-50 p-6 md:p-8">

          <div className="flex flex-col gap-4 md:flex-row md:items-start">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
              💡
            </div>

            <div>

              <h2 className="text-lg font-black text-cyan-950">
                Local SEO Tracking Note
              </h2>

              <p className="mt-2 max-w-5xl text-sm leading-relaxed text-cyan-900/80">
                Google Search Console measures organic
                Google Search visibility. It does not
                directly provide a Google Business Profile
                or Google Maps ranking score. Therefore
                this dashboard combines real GSC query
                data, keyword categories, ranking
                opportunities, device performance and
                local landing-page health.
              </p>

            </div>

          </div>

        </section>

        {/* FOOTER */}

        <section className="rounded-3xl border border-emerald-200 bg-white p-6 shadow-sm md:p-8">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div>

              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">
                LOCAL SEO SYSTEM
              </span>

              <h2 className="mt-1 text-xl font-black text-slate-900">
                🚀 Nagpur SEO Monitoring Ready
              </h2>

              <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500">

                Property:{" "}
                {seoData?.property ||
                  SITE_URL}

                {" · "}

                Period:{" "}
                {seoData?.dateRange?.startDate
                  ? `${seoData.dateRange.startDate} → ${seoData.dateRange.endDate}`
                  : "—"}

                {" · "}

                Last sync:{" "}
                {seoData?.generatedAt
                  ? new Date(
                      seoData.generatedAt
                    ).toLocaleString(
                      "en-IN"
                    )
                  : "—"}

              </p>

            </div>

            <Link
              href="/admin/seo"
              className="rounded-2xl bg-slate-900 px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-slate-800"
            >
              ← Back to SEO Dashboard
            </Link>

          </div>

        </section>

      </div>
    </div>
  );
}