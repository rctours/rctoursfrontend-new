"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const API_URL = "/api/admin/seo/search-console";

const contentRules = [
  {
    id: "page2",
    title: "Page-2 Keyword Opportunity",
    description:
      "Keywords ranking between positions 11–20 with search visibility are strong candidates for content improvement.",
    icon: "📈",
    category: "Existing Page",
  },
  {
    id: "highImpression",
    title: "High Impression / Low Click",
    description:
      "Queries receiving impressions but relatively few clicks may need better titles, descriptions or search-intent alignment.",
    icon: "🎯",
    category: "CTR",
  },
  {
    id: "lowCtr",
    title: "CTR Improvement",
    description:
      "Visible queries with low CTR can become content and metadata improvement opportunities.",
    icon: "👆",
    category: "CTR",
  },
  {
    id: "newContent",
    title: "New Content Opportunity",
    description:
      "Relevant Google queries that do not clearly match an existing target page can become new blog or landing-page topics.",
    icon: "💡",
    category: "New Content",
  },
];

const targetPages = [
  {
    keyword: "Taxi Service in Nagpur",
    path: "/taxi-service-in-nagpur",
    type: "Service Page",
  },
  {
    keyword: "Cab Service in Nagpur",
    path: "/",
    type: "Homepage",
  },
  {
    keyword: "Nagpur Airport Taxi",
    path: "/nagpur-airport-taxi",
    type: "Airport Page",
  },
  {
    keyword: "Nagpur Airport Cab Booking",
    path: "/airport-taxi-nagpur",
    type: "Airport Page",
  },
  {
    keyword: "Nagpur to Tadoba Taxi",
    path: "/nagpur-to-tadoba-cab",
    type: "Route Page",
  },
  {
    keyword: "Nagpur to Pench Taxi",
    path: "/nagpur-to-pench-cab",
    type: "Route Page",
  },
  {
    keyword: "Innova Crysta Rental Nagpur",
    path: "/fleet",
    type: "Fleet Page",
  },
];

function formatNumber(value) {
  return new Intl.NumberFormat("en-IN").format(
    Number(value || 0)
  );
}

function formatPercent(value) {
  return `${(Number(value || 0) * 100).toFixed(2)}%`;
}

function formatPosition(value) {
  const position = Number(value || 0);

  if (!position) {
    return "—";
  }

  return position.toFixed(1);
}

function getOpportunityType(item) {
  const position = Number(item?.position || 0);
  const impressions = Number(item?.impressions || 0);
  const clicks = Number(item?.clicks || 0);
  const ctr = Number(item?.ctr || 0);

  if (
    position > 10 &&
    position <= 20 &&
    impressions >= 5
  ) {
    return {
      label: "PAGE 2",
      title: "Improve Existing Page",
      description:
        "This keyword already has Google visibility and may move toward page 1 with stronger content.",
      className:
        "border-emerald-200 bg-emerald-50 text-emerald-700",
      priority: "HIGH",
      icon: "📈",
    };
  }

  if (
    impressions >= 20 &&
    clicks === 0
  ) {
    return {
      label: "HIGH IMPRESSIONS",
      title: "Improve Search Snippet",
      description:
        "Google is showing this query but it is not generating clicks yet.",
      className:
        "border-cyan-200 bg-cyan-50 text-cyan-700",
      priority: "HIGH",
      icon: "👁️",
    };
  }

  if (
    impressions >= 20 &&
    ctr < 0.02
  ) {
    return {
      label: "LOW CTR",
      title: "Improve Title & Description",
      description:
        "The page receives search impressions but the click-through rate is low.",
      className:
        "border-amber-200 bg-amber-50 text-amber-700",
      priority: "MEDIUM",
      icon: "🎯",
    };
  }

  if (
    position > 20 &&
    impressions >= 5
  ) {
    return {
      label: "VISIBILITY",
      title: "Content Expansion",
      description:
        "The query has visibility but needs stronger topical relevance and authority.",
      className:
        "border-purple-200 bg-purple-50 text-purple-700",
      priority: "MEDIUM",
      icon: "💡",
    };
  }

  if (
    position >= 1 &&
    position <= 10 &&
    impressions >= 5
  ) {
    return {
      label: "PROTECT",
      title: "Protect Existing Ranking",
      description:
        "This query is already ranking well. Keep the page updated and relevant.",
      className:
        "border-blue-200 bg-blue-50 text-blue-700",
      priority: "LOW",
      icon: "🛡️",
    };
  }

  return {
    label: "MONITOR",
    title: "Monitor",
    description:
      "Continue collecting search data before making a major content decision.",
    className:
      "border-slate-200 bg-slate-50 text-slate-500",
    priority: "LOW",
    icon: "👀",
  };
}

function findTargetPage(query) {
  const normalizedQuery = String(query || "")
    .trim()
    .toLowerCase();

  if (!normalizedQuery) {
    return null;
  }

  const exact = targetPages.find(
    (item) =>
      item.keyword.toLowerCase() ===
      normalizedQuery
  );

  if (exact) {
    return exact;
  }

  const partial = targetPages.find((item) => {
    const keywordWords = item.keyword
      .toLowerCase()
      .split(" ")
      .filter((word) => word.length > 3);

    return keywordWords.some((word) =>
      normalizedQuery.includes(word)
    );
  });

  return partial || null;
}

function getSuggestedAction(item) {
  const opportunity = getOpportunityType(item);

  if (opportunity.label === "PAGE 2") {
    return "Update existing page + add FAQ + improve internal links";
  }

  if (opportunity.label === "HIGH IMPRESSIONS") {
    return "Improve title, meta description and search-intent match";
  }

  if (opportunity.label === "LOW CTR") {
    return "Test stronger title and meta description";
  }

  if (opportunity.label === "VISIBILITY") {
    return "Expand topical content and add supporting internal links";
  }

  if (opportunity.label === "PROTECT") {
    return "Keep content fresh and monitor ranking";
  }

  return "Monitor Google Search Console data";
}

function getSortValue(item, sortBy) {
  if (sortBy === "clicks") {
    return Number(item.clicks || 0);
  }

  if (sortBy === "impressions") {
    return Number(item.impressions || 0);
  }

  if (sortBy === "ctr") {
    return Number(item.ctr || 0);
  }

  if (sortBy === "position") {
    return Number(item.position || 9999);
  }

  return String(item.query || "")
    .toLowerCase();
}

export default function SEOContentOpportunitiesPage() {
  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] =
    useState("");

  const [filter, setFilter] =
    useState("All");

  const [sortBy, setSortBy] =
    useState("impressions");

  const [sortDirection, setSortDirection] =
    useState("desc");

  async function loadContentData(
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
        API_URL,
        {
          method: "GET",
          cache: "no-store",
        }
      );

      const result = await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.error ||
            "Unable to load Google Search Console data."
        );
      }

      setData(result);
    } catch (err) {
      console.error(
        "Content Opportunities Error:",
        err
      );

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
    loadContentData();
  }, []);

  const queries = useMemo(() => {
    return Array.isArray(data?.queries)
      ? data.queries
      : [];
  }, [data]);

  const opportunities = useMemo(() => {
    return queries.filter((item) => {
      const position = Number(
        item?.position || 0
      );

      const impressions = Number(
        item?.impressions || 0
      );

      const clicks = Number(
        item?.clicks || 0
      );

      const ctr = Number(
        item?.ctr || 0
      );

      return (
        (
          position > 10 &&
          position <= 20 &&
          impressions >= 5
        ) ||
        (
          impressions >= 20 &&
          clicks === 0
        ) ||
        (
          impressions >= 20 &&
          ctr < 0.02
        ) ||
        (
          position > 20 &&
          impressions >= 5
        )
      );
    });
  }, [queries]);

  const filteredOpportunities =
    useMemo(() => {
      const search =
        searchTerm.trim().toLowerCase();

      const filtered =
        opportunities.filter((item) => {
          const query =
            String(item?.query || "")
              .toLowerCase();

          const opportunity =
            getOpportunityType(item);

          const matchesSearch =
            !search ||
            query.includes(search);

          let matchesFilter = true;

          if (filter === "Page 2") {
            matchesFilter =
              opportunity.label === "PAGE 2";
          }

          if (filter === "High Impressions") {
            matchesFilter =
              opportunity.label ===
              "HIGH IMPRESSIONS";
          }

          if (filter === "Low CTR") {
            matchesFilter =
              opportunity.label ===
              "LOW CTR";
          }

          if (filter === "Visibility") {
            matchesFilter =
              opportunity.label ===
              "VISIBILITY";
          }

          return (
            matchesSearch &&
            matchesFilter
          );
        });

      return [...filtered].sort(
        (a, b) => {
          const aValue =
            getSortValue(
              a,
              sortBy
            );

          const bValue =
            getSortValue(
              b,
              sortBy
            );

          if (
            typeof aValue === "string" &&
            typeof bValue === "string"
          ) {
            return sortDirection === "asc"
              ? aValue.localeCompare(
                  bValue
                )
              : bValue.localeCompare(
                  aValue
                );
          }

          return sortDirection === "asc"
            ? aValue - bValue
            : bValue - aValue;
        }
      );
    }, [
      opportunities,
      searchTerm,
      filter,
      sortBy,
      sortDirection,
    ]);

  const statistics = useMemo(() => {
    const pageTwo =
      opportunities.filter((item) => {
        const position =
          Number(item.position || 0);

        return (
          position > 10 &&
          position <= 20
        );
      });

    const highImpressions =
      opportunities.filter((item) => {
        return (
          Number(item.impressions || 0) >=
            20 &&
          Number(item.clicks || 0) === 0
        );
      });

    const lowCtr =
      opportunities.filter((item) => {
        return (
          Number(item.impressions || 0) >=
            20 &&
          Number(item.ctr || 0) < 0.02
        );
      });

    const visibility =
      opportunities.filter((item) => {
        return (
          Number(item.position || 0) >
            20 &&
          Number(item.impressions || 0) >=
            5
        );
      });

    return {
      total: opportunities.length,
      pageTwo: pageTwo.length,
      highImpressions:
        highImpressions.length,
      lowCtr: lowCtr.length,
      visibility: visibility.length,
    };
  }, [opportunities]);

  function changeSort(column) {
    if (sortBy === column) {
      setSortDirection(
        (current) =>
          current === "asc"
            ? "desc"
            : "asc"
      );

      return;
    }

    setSortBy(column);

    setSortDirection(
      column === "query"
        ? "asc"
        : "desc"
    );
  }

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

                  <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[11px] font-black tracking-wider text-amber-700">
                    CONTENT OPPORTUNITIES
                  </span>

                </div>

                <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
                  Content Opportunities
                </h1>

                <p className="max-w-3xl text-sm font-medium leading-relaxed text-slate-600 md:text-base">
                  Use real Google Search Console
                  queries to identify pages that can
                  be improved, new content ideas and
                  high-value SEO opportunities for
                  RC Tours & Travels.
                </p>

              </div>

              <div className="flex flex-wrap gap-3">

                <button
                  type="button"
                  onClick={() =>
                    loadContentData(true)
                  }
                  disabled={refreshing}
                  className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-slate-800 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {refreshing
                    ? "⏳ Refreshing..."
                    : "🔄 Refresh Google Data"}
                </button>

                <Link
                  href="/admin/seo"
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  ← SEO Dashboard
                </Link>

              </div>

            </div>

          </div>

          <div className="border-t border-amber-100 bg-amber-50 px-6 py-4 md:px-8">

            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">

              <div className="flex items-start gap-3">

                <span className="text-xl">
                  💡
                </span>

                <div>

                  <p className="text-sm font-black text-amber-950">
                    Google Data Driven Content Planning
                  </p>

                  <p className="mt-1 text-xs font-medium text-amber-900">
                    Opportunities are calculated from
                    real queries, impressions, clicks,
                    CTR and average ranking position.
                  </p>

                </div>

              </div>

              <span className="w-fit rounded-full border border-amber-200 bg-white px-3 py-1 text-[10px] font-black uppercase tracking-wider text-amber-700">
                LIVE DATA
              </span>

            </div>

          </div>

        </div>

        {/* ================= ERROR ================= */}

        {error && (
          <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6">

            <div className="flex items-start gap-3">

              <span className="text-xl">
                ⚠️
              </span>

              <div>

                <h2 className="font-black text-rose-900">
                  Google Data Error
                </h2>

                <p className="mt-1 text-sm text-rose-800">
                  {error}
                </p>

                <button
                  type="button"
                  onClick={() =>
                    loadContentData(true)
                  }
                  className="mt-4 rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-700"
                >
                  Try Again
                </button>

              </div>

            </div>

          </div>
        )}

        {/* ================= LOADING ================= */}

        {loading ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">

            <div className="text-4xl">
              ⏳
            </div>

            <p className="mt-4 text-sm font-bold text-slate-700">
              Loading real Google Search Console data...
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Please wait.
            </p>

          </div>
        ) : (
          <>

            {/* ================= OVERVIEW ================= */}

            <div>

              <div className="mb-4">

                <h2 className="text-2xl font-black tracking-tight text-slate-900">
                  📊 Content Opportunity Overview
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Opportunities are prioritised using
                  actual Google Search Console
                  performance.
                </p>

              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">

                <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">

                  <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                    Total Opportunities
                  </span>

                  <div className="mt-3 text-3xl font-black text-slate-900">
                    {formatNumber(
                      statistics.total
                    )}
                  </div>

                  <p className="mt-2 text-xs font-medium text-slate-500">
                    Queries worth reviewing
                  </p>

                </div>

                <div className="rounded-3xl border border-emerald-200 bg-emerald-50/60 p-6 shadow-sm">

                  <span className="text-xs font-black uppercase tracking-wider text-emerald-600">
                    Page 2
                  </span>

                  <div className="mt-3 text-3xl font-black text-emerald-900">
                    {formatNumber(
                      statistics.pageTwo
                    )}
                  </div>

                  <p className="mt-2 text-xs font-medium text-emerald-700">
                    Strong improvement targets
                  </p>

                </div>

                <div className="rounded-3xl border border-cyan-200 bg-cyan-50/60 p-6 shadow-sm">

                  <span className="text-xs font-black uppercase tracking-wider text-cyan-600">
                    High Impressions
                  </span>

                  <div className="mt-3 text-3xl font-black text-cyan-900">
                    {formatNumber(
                      statistics.highImpressions
                    )}
                  </div>

                  <p className="mt-2 text-xs font-medium text-cyan-700">
                    Visibility without clicks
                  </p>

                </div>

                <div className="rounded-3xl border border-amber-200 bg-amber-50/60 p-6 shadow-sm">

                  <span className="text-xs font-black uppercase tracking-wider text-amber-600">
                    Low CTR
                  </span>

                  <div className="mt-3 text-3xl font-black text-amber-900">
                    {formatNumber(
                      statistics.lowCtr
                    )}
                  </div>

                  <p className="mt-2 text-xs font-medium text-amber-700">
                    Snippet improvement
                  </p>

                </div>

                <div className="rounded-3xl border border-purple-200 bg-purple-50/60 p-6 shadow-sm">

                  <span className="text-xs font-black uppercase tracking-wider text-purple-600">
                    Visibility
                  </span>

                  <div className="mt-3 text-3xl font-black text-purple-900">
                    {formatNumber(
                      statistics.visibility
                    )}
                  </div>

                  <p className="mt-2 text-xs font-medium text-purple-700">
                    Keywords beyond page 2
                  </p>

                </div>

              </div>

            </div>

            {/* ================= PRIORITY OPPORTUNITIES ================= */}

            <div className="rounded-3xl border border-emerald-200 bg-emerald-50/40 p-6 shadow-sm md:p-8">

              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                <div>

                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">
                    SEO CONTENT ACTION CENTER
                  </span>

                  <h2 className="mt-1 text-xl font-black text-emerald-950">
                    🔥 Highest Priority Content Opportunities
                  </h2>

                  <p className="mt-1 text-sm font-medium text-emerald-800/80">
                    Start with page-2 keywords and queries
                    that already have meaningful Google
                    visibility.
                  </p>

                </div>

                <div className="rounded-2xl border border-emerald-200 bg-white px-5 py-3 text-center">

                  <div className="text-[10px] font-black uppercase tracking-wider text-emerald-600">
                    Priority
                  </div>

                  <div className="mt-1 text-2xl font-black text-emerald-900">
                    {opportunities.filter(
                      (item) =>
                        getOpportunityType(
                          item
                        ).priority === "HIGH"
                    ).length}
                  </div>

                </div>

              </div>

              {opportunities.length > 0 ? (

                <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">

                  {opportunities
                    .slice()
                    .sort((a, b) => {
                      const priorityOrder = {
                        HIGH: 1,
                        MEDIUM: 2,
                        LOW: 3,
                      };

                      const aPriority =
                        priorityOrder[
                          getOpportunityType(
                            a
                          ).priority
                        ];

                      const bPriority =
                        priorityOrder[
                          getOpportunityType(
                            b
                          ).priority
                        ];

                      if (
                        aPriority !==
                        bPriority
                      ) {
                        return (
                          aPriority -
                          bPriority
                        );
                      }

                      return (
                        Number(
                          b.impressions || 0
                        ) -
                        Number(
                          a.impressions || 0
                        )
                      );
                    })
                    .slice(0, 12)
                    .map((item) => {

                      const opportunity =
                        getOpportunityType(
                          item
                        );

                      const targetPage =
                        findTargetPage(
                          item.query
                        );

                      return (
                        <div
                          key={item.query}
                          className="rounded-2xl border border-emerald-100 bg-white p-4"
                        >

                          <div className="flex items-start justify-between gap-3">

                            <div className="min-w-0">

                              <div className="flex items-center gap-2">

                                <span className="text-lg">
                                  {opportunity.icon}
                                </span>

                                <p className="break-words text-sm font-black text-slate-900">
                                  {item.query}
                                </p>

                              </div>

                              <p className="mt-2 text-xs font-bold text-slate-700">
                                {opportunity.title}
                              </p>

                              <p className="mt-1 text-xs leading-relaxed text-slate-500">
                                {opportunity.description}
                              </p>

                            </div>

                            <span
                              className={`shrink-0 rounded-lg border px-2.5 py-1 text-[10px] font-black ${opportunity.className}`}
                            >
                              {opportunity.priority}
                            </span>

                          </div>

                          <div className="mt-4 grid grid-cols-3 gap-2">

                            <div className="rounded-xl bg-slate-50 p-3">

                              <p className="text-[10px] font-bold uppercase text-slate-400">
                                Position
                              </p>

                              <p className="mt-1 text-lg font-black text-slate-900">
                                {formatPosition(
                                  item.position
                                )}
                              </p>

                            </div>

                            <div className="rounded-xl bg-slate-50 p-3">

                              <p className="text-[10px] font-bold uppercase text-slate-400">
                                Impressions
                              </p>

                              <p className="mt-1 text-lg font-black text-slate-900">
                                {formatNumber(
                                  item.impressions
                                )}
                              </p>

                            </div>

                            <div className="rounded-xl bg-slate-50 p-3">

                              <p className="text-[10px] font-bold uppercase text-slate-400">
                                CTR
                              </p>

                              <p className="mt-1 text-lg font-black text-slate-900">
                                {formatPercent(
                                  item.ctr
                                )}
                              </p>

                            </div>

                          </div>

                          <div className="mt-3 rounded-xl border border-slate-100 bg-slate-50 p-3">

                            <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                              Suggested Action
                            </p>

                            <p className="mt-1 text-xs font-bold leading-relaxed text-slate-700">
                              {getSuggestedAction(
                                item
                              )}
                            </p>

                          </div>

                          <div className="mt-3">

                            {targetPage ? (
                              <Link
                                href={targetPage.path}
                                target="_blank"
                                className="inline-flex max-w-full items-center gap-2 break-all rounded-xl border border-cyan-200 bg-cyan-50 px-3 py-2 text-[11px] font-bold text-cyan-700 hover:bg-cyan-100"
                              >
                                📄 Target:{" "}
                                {targetPage.path}
                              </Link>
                            ) : (
                              <span className="inline-flex rounded-xl border border-purple-200 bg-purple-50 px-3 py-2 text-[11px] font-bold text-purple-700">
                                💡 Consider new content page
                              </span>
                            )}

                          </div>

                        </div>
                      );
                    })}

                </div>

              ) : (

                <div className="mt-5 rounded-2xl border border-dashed border-emerald-200 bg-white p-8 text-center">

                  <div className="text-3xl">
                    🎉
                  </div>

                  <p className="mt-3 text-sm font-black text-emerald-900">
                    No major content opportunities
                    detected yet.
                  </p>

                  <p className="mt-1 text-xs text-emerald-700">
                    Continue collecting Google Search
                    Console data.
                  </p>

                </div>

              )}

            </div>

            {/* ================= ALL OPPORTUNITIES ================= */}

            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm md:p-8">

              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                <div>

                  <h2 className="text-xl font-black text-slate-900">
                    🔎 All Content Opportunities
                  </h2>

                  <p className="mt-1 text-sm font-medium text-slate-500">
                    Search, filter and sort Google
                    queries that may benefit from
                    content or SEO improvements.
                  </p>

                </div>

                <div className="rounded-2xl border border-cyan-100 bg-cyan-50 px-4 py-3">

                  <p className="text-[10px] font-black uppercase tracking-wider text-cyan-600">
                    Showing
                  </p>

                  <p className="mt-1 text-xl font-black text-cyan-900">
                    {filteredOpportunities.length}
                  </p>

                </div>

              </div>

              <div className="mt-6 flex flex-col gap-3 lg:flex-row">

                <input
                  type="text"
                  aria-label="Search content opportunities"
                  placeholder="Search Google query..."
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(
                      e.target.value
                    )
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
                />

                <div className="flex flex-wrap items-center gap-1 rounded-2xl bg-slate-100 p-1">

                  {[
                    "All",
                    "Page 2",
                    "High Impressions",
                    "Low CTR",
                    "Visibility",
                  ].map((item) => (

                    <button
                      key={item}
                      type="button"
                      onClick={() =>
                        setFilter(item)
                      }
                      className={`rounded-xl px-3 py-2 text-xs font-bold transition ${
                        filter === item
                          ? "bg-white text-slate-900 shadow-sm"
                          : "text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      {item}
                    </button>

                  ))}

                </div>

              </div>

              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">

                <div className="overflow-x-auto">

                  <table className="min-w-[1150px] w-full border-collapse">

                    <thead>

                      <tr className="bg-slate-50">

                        <th className="px-4 py-4 text-left text-[10px] font-black uppercase tracking-wider text-slate-400">
                          #
                        </th>

                        <th className="px-4 py-4 text-left text-[10px] font-black uppercase tracking-wider text-slate-400">
                          Keyword
                        </th>

                        <th className="px-4 py-4 text-right text-[10px] font-black uppercase tracking-wider text-slate-400">
                          Clicks
                        </th>

                        <th className="px-4 py-4 text-right text-[10px] font-black uppercase tracking-wider text-slate-400">
                          Impressions
                        </th>

                        <th className="px-4 py-4 text-right text-[10px] font-black uppercase tracking-wider text-slate-400">
                          CTR
                        </th>

                        <th className="px-4 py-4 text-right text-[10px] font-black uppercase tracking-wider text-slate-400">
                          Position
                        </th>

                        <th className="px-4 py-4 text-left text-[10px] font-black uppercase tracking-wider text-slate-400">
                          Opportunity
                        </th>

                        <th className="px-4 py-4 text-left text-[10px] font-black uppercase tracking-wider text-slate-400">
                          Target Page
                        </th>

                        <th className="px-4 py-4 text-left text-[10px] font-black uppercase tracking-wider text-slate-400">
                          Action
                        </th>

                      </tr>

                    </thead>

                    <tbody className="divide-y divide-slate-100">

                      {filteredOpportunities.length > 0 ? (

                        filteredOpportunities.map(
                          (item, index) => {

                            const opportunity =
                              getOpportunityType(
                                item
                              );

                            const targetPage =
                              findTargetPage(
                                item.query
                              );

                            return (
                              <tr
                                key={`${item.query}-${index}`}
                                className="transition hover:bg-cyan-50/30"
                              >

                                <td className="px-4 py-4 text-xs font-bold text-slate-400">
                                  {index + 1}
                                </td>

                                <td className="max-w-[280px] px-4 py-4">

                                  <p className="break-words text-sm font-black text-slate-900">
                                    {item.query}
                                  </p>

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

                                  <span className="text-lg font-black text-slate-900">
                                    {formatPosition(
                                      item.position
                                    )}
                                  </span>

                                </td>

                                <td className="px-4 py-4">

                                  <span
                                    className={`inline-flex rounded-lg border px-2.5 py-1 text-[10px] font-black ${opportunity.className}`}
                                  >
                                    {opportunity.label}
                                  </span>

                                </td>

                                <td className="max-w-[250px] px-4 py-4">

                                  {targetPage ? (
                                    <Link
                                      href={
                                        targetPage.path
                                      }
                                      target="_blank"
                                      className="break-all text-xs font-bold text-cyan-700 hover:text-cyan-900 hover:underline"
                                    >
                                      {targetPage.path}
                                    </Link>
                                  ) : (
                                    <span className="text-xs font-medium text-purple-600">
                                      New content
                                    </span>
                                  )}

                                </td>

                                <td className="max-w-[300px] px-4 py-4">

                                  <p className="text-xs font-semibold leading-relaxed text-slate-600">
                                    {getSuggestedAction(
                                      item
                                    )}
                                  </p>

                                </td>

                              </tr>
                            );
                          }
                        )

                      ) : (

                        <tr>

                          <td
                            colSpan={9}
                            className="px-6 py-12 text-center"
                          >

                            <div className="text-3xl">
                              🔍
                            </div>

                            <p className="mt-3 text-sm font-black text-slate-700">
                              No content opportunities
                              found.
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                              Try another search or filter.
                            </p>

                          </td>

                        </tr>

                      )}

                    </tbody>

                  </table>

                </div>

              </div>

            </div>

            {/* ================= CONTENT IDEAS ================= */}

            <div className="rounded-3xl border border-purple-200 bg-purple-50/40 p-6 shadow-sm md:p-8">

              <div>

                <span className="text-[10px] font-black uppercase tracking-widest text-purple-600">
                  CONTENT PLANNING
                </span>

                <h2 className="mt-1 text-xl font-black text-purple-950">
                  📝 Recommended Content Directions
                </h2>

                <p className="mt-1 text-sm font-medium text-purple-900/70">
                  These are strategic content directions
                  based on the current RC Tours & Travels
                  SEO structure.
                </p>

              </div>

              <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">

                {[
                  {
                    title:
                      "Nagpur Airport Taxi Guide",
                    description:
                      "Create useful content around airport pickup, drop, fares, booking process and common airport taxi questions.",
                    target:
                      "/nagpur-airport-taxi",
                  },
                  {
                    title:
                      "Nagpur Local Taxi Guide",
                    description:
                      "Explain local taxi packages, hourly rental, full-day usage and booking requirements.",
                    target:
                      "/nagpur-local-taxi",
                  },
                  {
                    title:
                      "Nagpur to Tadoba Travel Guide",
                    description:
                      "Cover route information, distance, travel time, safari planning and taxi booking information.",
                    target:
                      "/nagpur-to-tadoba-cab",
                  },
                  {
                    title:
                      "Nagpur to Pench Travel Guide",
                    description:
                      "Create useful travel content covering route planning, taxi options and Pench trip preparation.",
                    target:
                      "/nagpur-to-pench-cab",
                  },
                ].map((item) => (

                  <div
                    key={item.title}
                    className="rounded-2xl border border-purple-100 bg-white p-5"
                  >

                    <h3 className="text-sm font-black text-slate-900">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-slate-500">
                      {item.description}
                    </p>

                    <Link
                      href={item.target}
                      target="_blank"
                      className="mt-4 inline-flex rounded-xl border border-purple-200 bg-purple-50 px-3 py-2 text-[11px] font-bold text-purple-700 hover:bg-purple-100"
                    >
                      Open Target Page →
                    </Link>

                  </div>

                ))}

              </div>

            </div>

            {/* ================= INFO ================= */}

            <div className="rounded-3xl border border-cyan-200 bg-cyan-50 p-6 md:p-8">

              <div className="flex flex-col gap-4 md:flex-row md:items-start">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                  💡
                </div>

                <div>

                  <h2 className="text-lg font-black text-cyan-950">
                    How to Use Content Opportunities
                  </h2>

                  <p className="mt-2 max-w-4xl text-sm leading-relaxed text-cyan-900/80">
                    Start with keywords ranking between
                    positions 11–20 because they already
                    have Google visibility. Improve the
                    relevant page instead of creating
                    duplicate pages for the same search
                    intent. For queries with impressions
                    but very few clicks, review the title,
                    meta description and search intent.
                    New pages should only be created when
                    the query represents a genuinely
                    different search intent.
                  </p>

                </div>

              </div>

            </div>

            {/* ================= FOOTER ================= */}

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">

              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                <div>

                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-600">
                    GOOGLE SEARCH CONSOLE
                  </span>

                  <h2 className="mt-1 text-xl font-black text-slate-900">
                    🚀 Content Opportunity Engine Connected
                  </h2>

                  <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500">

                    {data?.dateRange?.startDate
                      ? `${data.dateRange.startDate} to ${data.dateRange.endDate}`
                      : "Google Search Console reporting period"}

                    {" · "}

                    Last sync:{" "}

                    {data?.generatedAt
                      ? new Date(
                          data.generatedAt
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

            </div>

          </>
        )}

      </div>
    </div>
  );
}