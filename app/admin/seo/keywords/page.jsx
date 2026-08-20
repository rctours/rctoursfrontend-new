"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const API_URL = "/api/admin/seo/search-console";

function formatNumber(value) {
  return new Intl.NumberFormat("en-IN").format(Number(value || 0));
}

function formatCTR(value) {
  return `${(Number(value || 0) * 100).toFixed(2)}%`;
}

function formatPosition(value) {
  const position = Number(value || 0);

  if (!position) {
    return "—";
  }

  return position.toFixed(1);
}

function getPositionGroup(position) {
  const value = Number(position || 0);

  if (value >= 1 && value <= 3) {
    return {
      label: "Top 3",
      shortLabel: "1–3",
      className:
        "border-emerald-200 bg-emerald-50 text-emerald-700",
    };
  }

  if (value > 3 && value <= 10) {
    return {
      label: "Page 1",
      shortLabel: "4–10",
      className:
        "border-cyan-200 bg-cyan-50 text-cyan-700",
    };
  }

  if (value > 10 && value <= 20) {
    return {
      label: "Page 2 Opportunity",
      shortLabel: "11–20",
      className:
        "border-amber-200 bg-amber-50 text-amber-700",
    };
  }

  if (value > 20) {
    return {
      label: "20+",
      shortLabel: "20+",
      className:
        "border-rose-200 bg-rose-50 text-rose-700",
    };
  }

  return {
    label: "Not Ranking",
    shortLabel: "—",
    className:
      "border-slate-200 bg-slate-50 text-slate-500",
  };
}

function getOpportunity(position, impressions) {
  const ranking = Number(position || 0);
  const impressionCount = Number(impressions || 0);

  if (
    ranking > 10 &&
    ranking <= 20 &&
    impressionCount >= 5
  ) {
    return {
      label: "HIGH",
      description: "Strong page-2 opportunity",
      className:
        "border-emerald-200 bg-emerald-50 text-emerald-700",
    };
  }

  if (
    ranking > 10 &&
    ranking <= 20
  ) {
    return {
      label: "MEDIUM",
      description: "Improve toward page 1",
      className:
        "border-amber-200 bg-amber-50 text-amber-700",
    };
  }

  if (
    ranking > 20 &&
    impressionCount >= 5
  ) {
    return {
      label: "WATCH",
      description: "Visibility exists",
      className:
        "border-cyan-200 bg-cyan-50 text-cyan-700",
    };
  }

  if (
    ranking >= 1 &&
    ranking <= 10 &&
    impressionCount >= 5
  ) {
    return {
      label: "PROTECT",
      description: "Already ranking well",
      className:
        "border-purple-200 bg-purple-50 text-purple-700",
    };
  }

  return {
    label: "NORMAL",
    description: "Monitor",
    className:
      "border-slate-200 bg-slate-50 text-slate-500",
  };
}

function getQueryFromRow(row) {
  return String(row?.query || "").trim();
}

function sortRows(rows, sortBy, sortDirection) {
  const sorted = [...rows];

  sorted.sort((a, b) => {
    let aValue;
    let bValue;

    if (sortBy === "query") {
      aValue = getQueryFromRow(a).toLowerCase();
      bValue = getQueryFromRow(b).toLowerCase();
    }

    if (sortBy === "clicks") {
      aValue = Number(a.clicks || 0);
      bValue = Number(b.clicks || 0);
    }

    if (sortBy === "impressions") {
      aValue = Number(a.impressions || 0);
      bValue = Number(b.impressions || 0);
    }

    if (sortBy === "ctr") {
      aValue = Number(a.ctr || 0);
      bValue = Number(b.ctr || 0);
    }

    if (sortBy === "position") {
      aValue = Number(a.position || 9999);
      bValue = Number(b.position || 9999);
    }

    if (aValue < bValue) {
      return sortDirection === "asc" ? -1 : 1;
    }

    if (aValue > bValue) {
      return sortDirection === "asc" ? 1 : -1;
    }

    return 0;
  });

  return sorted;
}

export default function KeywordRankingsPage() {
  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] =
    useState("");

  const [positionFilter, setPositionFilter] =
    useState("All");

  const [sortBy, setSortBy] =
    useState("impressions");

  const [sortDirection, setSortDirection] =
    useState("desc");

  async function loadKeywordData(showRefresh = false) {
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

      if (!response.ok || !result.success) {
        throw new Error(
          result.error ||
            "Unable to load Google Search Console data."
        );
      }

      setData(result);
    } catch (err) {
      console.error(
        "Keyword Rankings Error:",
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
    loadKeywordData();
  }, []);

  const queries = useMemo(() => {
    return Array.isArray(data?.queries)
      ? data.queries
      : [];
  }, [data]);

      const queryPageMap = useMemo(() => {
    const rows = Array.isArray(data?.queryPages)
      ? data.queryPages
      : [];

    const map = new Map();

    rows.forEach((item) => {
      const query = String(
        item?.query || ""
      )
        .trim()
        .toLowerCase();

      if (!query) {
        return;
      }

      const existing = map.get(query);

      if (!existing) {
        map.set(query, item);
        return;
      }

      const existingClicks = Number(
        existing.clicks || 0
      );

      const currentClicks = Number(
        item.clicks || 0
      );

      const existingImpressions = Number(
        existing.impressions || 0
      );

      const currentImpressions = Number(
        item.impressions || 0
      );

      if (
        currentClicks > existingClicks ||
        (
          currentClicks === existingClicks &&
          currentImpressions > existingImpressions
        )
      ) {
        map.set(query, item);
      }
    });

    return map;
  }, [data]);

  function getRankingPage(query) {
    const key = String(query || "")
      .trim()
      .toLowerCase();

    return queryPageMap.get(key)?.page || "";
  }

  const statistics = useMemo(() => {
    const top3 = queries.filter((item) => {
      const position = Number(
        item.position || 0
      );

      return position >= 1 && position <= 3;
    });

    const pageOne = queries.filter((item) => {
      const position = Number(
        item.position || 0
      );

      return position > 3 && position <= 10;
    });

    const pageTwo = queries.filter((item) => {
      const position = Number(
        item.position || 0
      );

      return position > 10 && position <= 20;
    });

    const twentyPlus = queries.filter((item) => {
      const position = Number(
        item.position || 0
      );

      return position > 20;
    });

    const opportunity = queries.filter(
      (item) => {
        const position = Number(
          item.position || 0
        );

        const impressions = Number(
          item.impressions || 0
        );

        return (
          position > 10 &&
          position <= 20 &&
          impressions >= 5
        );
      }
    );

    return {
      top3,
      pageOne,
      pageTwo,
      twentyPlus,
      opportunity,
    };
  }, [queries]);

  const filteredQueries = useMemo(() => {
    const search = searchTerm
      .trim()
      .toLowerCase();

    const filtered = queries.filter((item) => {
      const query =
        getQueryFromRow(item).toLowerCase();

      const position = Number(
        item.position || 0
      );

      let matchesSearch = true;

      if (search) {
        matchesSearch =
          query.includes(search);
      }

      let matchesPosition = true;

      if (positionFilter === "Top 3") {
        matchesPosition =
          position >= 1 &&
          position <= 3;
      }

      if (positionFilter === "4–10") {
        matchesPosition =
          position > 3 &&
          position <= 10;
      }

      if (positionFilter === "11–20") {
        matchesPosition =
          position > 10 &&
          position <= 20;
      }

      if (positionFilter === "20+") {
        matchesPosition =
          position > 20;
      }

      return (
        matchesSearch &&
        matchesPosition
      );
    });

    return sortRows(
      filtered,
      sortBy,
      sortDirection
    );
  }, [
    queries,
    searchTerm,
    positionFilter,
    sortBy,
    sortDirection,
  ]);

  function changeSort(column) {
    if (sortBy === column) {
      setSortDirection((current) =>
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

                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-black tracking-wider text-emerald-700">
                    GOOGLE SEARCH CONSOLE
                  </span>

                </div>

                <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
                  Keyword Rankings
                </h1>

                <p className="max-w-3xl text-sm font-medium leading-relaxed text-slate-600 md:text-base">
                  Track real Google search queries,
                  clicks, impressions, CTR and
                  average ranking positions for
                  RC Tours & Travels.
                </p>

              </div>

              <div className="flex flex-wrap gap-3">

                <button
                  type="button"
                  onClick={() =>
                    loadKeywordData(true)
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

          <div className="border-t border-emerald-100 bg-emerald-50 px-6 py-4 md:px-8">

            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">

              <div className="flex items-start gap-3">

                <span className="text-xl">
                  ✅
                </span>

                <div>

                  <p className="text-sm font-black text-emerald-900">
                    Google Search Console Connected
                  </p>

                  <p className="mt-1 text-xs font-medium text-emerald-800">
                    Real search performance data is
                    being used for keyword analysis.
                  </p>

                </div>

              </div>

              <span className="w-fit rounded-full border border-emerald-200 bg-white px-3 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-700">
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
                    loadKeywordData(true)
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
            {/* ================= SUMMARY ================= */}

            <div>

              <div className="mb-4">

                <h2 className="text-2xl font-black tracking-tight text-slate-900">
                  📊 Keyword Ranking Overview
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Google Search Console query data for the selected reporting period.
                </p>

              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">

                {/* Total */}

                <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">

                  <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                    Total Queries
                  </span>

                  <div className="mt-3 text-3xl font-black text-slate-900">
                    {formatNumber(
                      queries.length
                    )}
                  </div>

                  <p className="mt-2 text-xs font-medium text-slate-500">
                    Search queries with visibility
                  </p>

                </div>

                {/* Top 3 */}

                <div className="rounded-3xl border border-emerald-200 bg-emerald-50/60 p-6 shadow-sm">

                  <span className="text-xs font-black uppercase tracking-wider text-emerald-600">
                    Top 3
                  </span>

                  <div className="mt-3 text-3xl font-black text-emerald-900">
                    {formatNumber(
                      statistics.top3.length
                    )}
                  </div>

                  <p className="mt-2 text-xs font-medium text-emerald-700">
                    Positions 1–3
                  </p>

                </div>

                {/* Page 1 */}

                <div className="rounded-3xl border border-cyan-200 bg-cyan-50/60 p-6 shadow-sm">

                  <span className="text-xs font-black uppercase tracking-wider text-cyan-600">
                    Page 1
                  </span>

                  <div className="mt-3 text-3xl font-black text-cyan-900">
                    {formatNumber(
                      statistics.pageOne.length
                    )}
                  </div>

                  <p className="mt-2 text-xs font-medium text-cyan-700">
                    Positions 4–10
                  </p>

                </div>

                {/* Page 2 */}

                <div className="rounded-3xl border border-amber-200 bg-amber-50/60 p-6 shadow-sm">

                  <span className="text-xs font-black uppercase tracking-wider text-amber-600">
                    Page 2
                  </span>

                  <div className="mt-3 text-3xl font-black text-amber-900">
                    {formatNumber(
                      statistics.pageTwo.length
                    )}
                  </div>

                  <p className="mt-2 text-xs font-medium text-amber-700">
                    Positions 11–20
                  </p>

                </div>

                {/* Opportunities */}

                <div className="rounded-3xl border border-purple-200 bg-purple-50/60 p-6 shadow-sm">

                  <span className="text-xs font-black uppercase tracking-wider text-purple-600">
                    Opportunities
                  </span>

                  <div className="mt-3 text-3xl font-black text-purple-900">
                    {formatNumber(
                      statistics.opportunity.length
                    )}
                  </div>

                  <p className="mt-2 text-xs font-medium text-purple-700">
                    Page-2 keywords with impressions
                  </p>

                </div>

              </div>

            </div>

            {/* ================= OPPORTUNITIES ================= */}

            <div className="rounded-3xl border border-emerald-200 bg-emerald-50/40 p-6 shadow-sm md:p-8">

              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                <div>

                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">
                    SEO OPPORTUNITY
                  </span>

                  <h2 className="mt-1 text-xl font-black text-emerald-950">
                    💡 Keywords Worth Improving
                  </h2>

                  <p className="mt-1 text-sm font-medium text-emerald-800/80">
                    These keywords are already visible on Google and may be easier to improve toward page 1.
                  </p>

                </div>

                <div className="rounded-2xl border border-emerald-200 bg-white px-5 py-3 text-center">

                  <div className="text-[10px] font-black uppercase tracking-wider text-emerald-600">
                    Opportunities
                  </div>

                  <div className="mt-1 text-2xl font-black text-emerald-900">
                    {statistics.opportunity.length}
                  </div>

                </div>

              </div>

              {statistics.opportunity.length > 0 ? (

                <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">

                  {statistics.opportunity
                    .slice(0, 12)
                    .map((item) => {

                      const opportunity =
                        getOpportunity(
                          item.position,
                          item.impressions
                        );

                      return (
                        <div
                          key={item.query}
                          className="rounded-2xl border border-emerald-100 bg-white p-4"
                        >

                          <div className="flex items-start justify-between gap-3">

                            <div className="min-w-0">

                              <p className="break-words text-sm font-black text-slate-900">
                                {item.query}
                              </p>

                              <p className="mt-1 text-xs font-medium text-slate-500">
                                {opportunity.description}
                              </p>

                            </div>

                            <span
                              className={`shrink-0 rounded-lg border px-2.5 py-1 text-[10px] font-black ${opportunity.className}`}
                            >
                              {opportunity.label}
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
                                {formatCTR(
                                  item.ctr
                                )}
                              </p>

                            </div>

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
                    No strong page-2 opportunities found yet.
                  </p>

                  <p className="mt-1 text-xs text-emerald-700">
                    Continue monitoring Google Search Console data.
                  </p>

                </div>

              )}

            </div>

            {/* ================= FILTERS ================= */}

            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm md:p-8">

              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                <div>

                  <h2 className="text-xl font-black text-slate-900">
                    🔎 All Google Keywords
                  </h2>

                  <p className="mt-1 text-sm font-medium text-slate-500">
                    Search and filter the actual queries returned by Google Search Console.
                  </p>

                </div>

                <div className="rounded-2xl border border-cyan-100 bg-cyan-50 px-4 py-3">

                  <p className="text-[10px] font-black uppercase tracking-wider text-cyan-600">
                    Showing
                  </p>

                  <p className="mt-1 text-xl font-black text-cyan-900">
                    {filteredQueries.length}
                  </p>

                </div>

              </div>

              <div className="mt-6 flex flex-col gap-3 lg:flex-row">

                <input
                  type="text"
                  aria-label="Search Google keywords"
                  placeholder="Search Google keyword..."
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
                    "Top 3",
                    "4–10",
                    "11–20",
                    "20+",
                  ].map((filter) => (

                    <button
                      key={filter}
                      type="button"
                      onClick={() =>
                        setPositionFilter(
                          filter
                        )
                      }
                      className={`rounded-xl px-3 py-2 text-xs font-bold transition ${
                        positionFilter === filter
                          ? "bg-white text-slate-900 shadow-sm"
                          : "text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      {filter}
                    </button>

                  ))}

                </div>

              </div>

              {/* ================= TABLE ================= */}

              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">

                <div className="overflow-x-auto">

                  <table className="min-w-[1050px] w-full border-collapse">

                    <thead>

                      <tr className="bg-slate-50">

                        <th className="px-4 py-4 text-left text-[10px] font-black uppercase tracking-wider text-slate-400">
                          #
                        </th>

                        <th className="px-4 py-4 text-left text-[10px] font-black uppercase tracking-wider text-slate-400">

                          <button
                            type="button"
                            onClick={() =>
                              changeSort(
                                "query"
                              )
                            }
                            className="hover:text-cyan-600"
                          >
                            Keyword{" "}
                            {sortBy === "query"
                              ? sortDirection ===
                                "asc"
                                ? "↑"
                                : "↓"
                              : ""}
                          </button>

                        </th>

                        <th className="px-4 py-4 text-right text-[10px] font-black uppercase tracking-wider text-slate-400">

                          <button
                            type="button"
                            onClick={() =>
                              changeSort(
                                "clicks"
                              )
                            }
                            className="hover:text-cyan-600"
                          >
                            Clicks{" "}
                            {sortBy === "clicks"
                              ? sortDirection ===
                                "asc"
                                ? "↑"
                                : "↓"
                              : ""}
                          </button>

                        </th>

                        <th className="px-4 py-4 text-right text-[10px] font-black uppercase tracking-wider text-slate-400">

                          <button
                            type="button"
                            onClick={() =>
                              changeSort(
                                "impressions"
                              )
                            }
                            className="hover:text-cyan-600"
                          >
                            Impressions{" "}
                            {sortBy ===
                            "impressions"
                              ? sortDirection ===
                                "asc"
                                ? "↑"
                                : "↓"
                              : ""}
                          </button>

                        </th>

                        <th className="px-4 py-4 text-right text-[10px] font-black uppercase tracking-wider text-slate-400">

                          <button
                            type="button"
                            onClick={() =>
                              changeSort("ctr")
                            }
                            className="hover:text-cyan-600"
                          >
                            CTR{" "}
                            {sortBy === "ctr"
                              ? sortDirection ===
                                "asc"
                                ? "↑"
                                : "↓"
                              : ""}
                          </button>

                        </th>

                        <th className="px-4 py-4 text-right text-[10px] font-black uppercase tracking-wider text-slate-400">

                          <button
                            type="button"
                            onClick={() =>
                              changeSort(
                                "position"
                              )
                            }
                            className="hover:text-cyan-600"
                          >
                            Position{" "}
                            {sortBy === "position"
                              ? sortDirection ===
                                "asc"
                                ? "↑"
                                : "↓"
                              : ""}
                          </button>

                        </th>

                        <th className="px-4 py-4 text-left text-[10px] font-black uppercase tracking-wider text-slate-400">
                        Ranking Page
                        </th>

                        <th className="px-4 py-4 text-left text-[10px] font-black uppercase tracking-wider text-slate-400">
                        Ranking
                        </th>

                        <th className="px-4 py-4 text-left text-[10px] font-black uppercase tracking-wider text-slate-400">
                        Opportunity
                        </th>

                      </tr>

                    </thead>

                    <tbody className="divide-y divide-slate-100">

                      {filteredQueries.length > 0 ? (

                        filteredQueries.map(
                          (item, index) => {

                            const group =
                              getPositionGroup(
                                item.position
                              );

                            const opportunity =
                              getOpportunity(
                                item.position,
                                item.impressions
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
                                  {formatCTR(
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

                                  <div className="max-w-[260px]">

                                    {getRankingPage(
                                      item.query
                                    ) ? (
                                      <a
                                        href={getRankingPage(
                                          item.query
                                        )}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="break-all text-xs font-bold text-cyan-700 hover:text-cyan-900 hover:underline"
                                        title={getRankingPage(
                                          item.query
                                        )}
                                      >
                                        {getRankingPage(
                                          item.query
                                        )}
                                      </a>
                                    ) : (
                                      <span className="text-xs font-medium text-slate-400">
                                        Page data unavailable
                                      </span>
                                    )}

                                  </div>

                                </td>

                                <td className="px-4 py-4">

                                  <span
                                    className={`inline-flex rounded-lg border px-2.5 py-1 text-[10px] font-black ${group.className}`}
                                  >
                                    {group.label}
                                  </span>

                                </td>

                                <td className="px-4 py-4">

                                  <div className="flex flex-col items-start gap-1">

                                    <span
                                      className={`inline-flex rounded-lg border px-2.5 py-1 text-[10px] font-black ${opportunity.className}`}
                                    >
                                      {opportunity.label}
                                    </span>

                                    <span className="text-[10px] font-medium text-slate-400">
                                      {opportunity.description}
                                    </span>

                                  </div>

                                </td>

                              </tr>
                            );
                          }
                        )

                      ) : (

                        <tr>

                          <td
                            colSpan="9"
                            className="px-6 py-12 text-center"
                          >

                            <div className="text-3xl">
                              🔍
                            </div>

                            <p className="mt-3 text-sm font-black text-slate-700">
                              No keywords found.
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                              Try another search term or filter.
                            </p>

                          </td>

                        </tr>

                      )}

                    </tbody>

                  </table>

                </div>

              </div>

            </div>

            {/* ================= DATA INFO ================= */}

            <div className="rounded-3xl border border-cyan-200 bg-cyan-50 p-6 md:p-8">

              <div className="flex flex-col gap-4 md:flex-row md:items-start">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                  💡
                </div>

                <div>

                  <h2 className="text-lg font-black text-cyan-950">
                    How to use Keyword Opportunities
                  </h2>

                  <p className="mt-2 max-w-4xl text-sm leading-relaxed text-cyan-900/80">
                    Keywords ranking between positions
                    11–20 are especially useful because
                    they already have Google visibility.
                    Improving the relevant page,
                    content, internal linking and search
                    intent can help move these keywords
                    toward page 1. Rankings are not
                    guaranteed and should be monitored
                    over time.
                  </p>

                </div>

              </div>

            </div>

            {/* ================= FOOTER STATUS ================= */}

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">

              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                <div>

                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">
                    GOOGLE SEARCH CONSOLE
                  </span>

                  <h2 className="mt-1 text-xl font-black text-slate-900">
                    🚀 Real Keyword Data Connected
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
                        ).toLocaleString("en-IN")
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