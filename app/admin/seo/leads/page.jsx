"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const GSC_API = "/api/admin/seo/search-console";

const leadSignals = [
  {
    id: "booking",
    title: "Website Bookings",
    description:
      "Bookings generated through the RC Tours & Travels website.",
    icon: "🚕",
  },
  {
    id: "whatsapp",
    title: "WhatsApp Enquiries",
    description:
      "WhatsApp conversations can be tracked when conversion tracking is available.",
    icon: "💬",
  },
  {
    id: "call",
    title: "Phone Calls",
    description:
      "Phone-call conversions require call tracking or analytics conversion data.",
    icon: "📞",
  },
  {
    id: "organic",
    title: "Organic Search",
    description:
      "Google Search Console shows which queries are generating organic visibility and clicks.",
    icon: "🔎",
  },
];

const localLeadTerms = [
  "taxi",
  "cab",
  "car rental",
  "airport taxi",
  "travel",
  "tempo traveller",
  "driver",
  "booking",
  "nagpur",
  "outstation",
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

function getRankingLabel(position) {
  const value = Number(position || 0);

  if (value > 0 && value <= 3) {
    return "TOP 3";
  }

  if (value > 3 && value <= 10) {
    return "PAGE 1";
  }

  if (value > 10 && value <= 20) {
    return "PAGE 2";
  }

  return "20+";
}

function getRankingClass(position) {
  const value = Number(position || 0);

  if (value > 0 && value <= 3) {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (value > 3 && value <= 10) {
    return "border-cyan-200 bg-cyan-50 text-cyan-700";
  }

  if (value > 10 && value <= 20) {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }

  return "border-rose-200 bg-rose-50 text-rose-700";
}

function isLocalLeadQuery(query) {
  const text = String(query || "").toLowerCase();

  return localLeadTerms.some((term) => text.includes(term));
}

function getLeadOpportunity(item) {
  const clicks = Number(item.clicks || 0);
  const impressions = Number(item.impressions || 0);
  const position = Number(item.position || 0);
  const ctr = Number(item.ctr || 0);

  if (position > 0 && position <= 3 && clicks > 0) {
    return {
      label: "Strong Organic Lead Signal",
      description:
        "This query is already ranking strongly and generating organic clicks. Keep the page and conversion experience strong.",
      priority: "HIGH",
    };
  }

  if (position > 3 && position <= 10 && impressions >= 5) {
    return {
      label: "Page-1 Lead Opportunity",
      description:
        "The query has page-1 visibility. Improving the landing-page CTA and conversion experience may help turn visibility into leads.",
      priority: "HIGH",
    };
  }

  if (position > 10 && position <= 20) {
    return {
      label: "Ranking + Lead Opportunity",
      description:
        "The query is close to page 1. Improve the relevant page before creating duplicate content.",
      priority: "MEDIUM",
    };
  }

  if (impressions >= 5 && ctr < 0.02) {
    return {
      label: "Low CTR Opportunity",
      description:
        "Google is showing the website for this query but users are not clicking. Review title, description and search intent.",
      priority: "MEDIUM",
    };
  }

  return {
    label: "Monitor",
    description:
      "Continue monitoring this query as more Google Search Console data becomes available.",
    priority: "LOW",
  };
}

function getPriorityClass(priority) {
  if (priority === "HIGH") {
    return "border-rose-200 bg-rose-50 text-rose-700";
  }

  if (priority === "MEDIUM") {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }

  return "border-cyan-200 bg-cyan-50 text-cyan-700";
}

export default function OrganicLeadsPage() {
  const [seoData, setSeoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [lastSync, setLastSync] = useState("");

  async function loadData(showRefresh = false) {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const response = await fetch(GSC_API, {
        method: "GET",
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok || !data?.success) {
        throw new Error(
          data?.error ||
            "Unable to fetch Google Search Console data."
        );
      }

      setSeoData(data);
      setLastSync(new Date().toISOString());
    } catch (err) {
      console.error("Organic Leads SEO Error:", err);

      setError(
        err?.message ||
          "Unable to load organic search data."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const queries = seoData?.queries || [];

  const localQueries = useMemo(() => {
    return queries
      .filter((item) => isLocalLeadQuery(item.query))
      .sort((a, b) => {
        const impressionDifference =
          Number(b.impressions || 0) -
          Number(a.impressions || 0);

        if (impressionDifference !== 0) {
          return impressionDifference;
        }

        return Number(a.position || 999) -
          Number(b.position || 999);
      });
  }, [queries]);

  const filteredQueries = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    if (!search) {
      return localQueries;
    }

    return localQueries.filter((item) =>
      String(item.query || "")
        .toLowerCase()
        .includes(search)
    );
  }, [localQueries, searchTerm]);

  const organicClicks = useMemo(() => {
    return localQueries.reduce(
      (total, item) =>
        total + Number(item.clicks || 0),
      0
    );
  }, [localQueries]);

  const organicImpressions = useMemo(() => {
    return localQueries.reduce(
      (total, item) =>
        total + Number(item.impressions || 0),
      0
    );
  }, [localQueries]);

  const topThreeQueries = useMemo(() => {
    return localQueries.filter(
      (item) =>
        Number(item.position || 0) > 0 &&
        Number(item.position || 0) <= 3
    );
  }, [localQueries]);

  const pageOneQueries = useMemo(() => {
    return localQueries.filter(
      (item) =>
        Number(item.position || 0) > 3 &&
        Number(item.position || 0) <= 10
    );
  }, [localQueries]);

  const pageTwoQueries = useMemo(() => {
    return localQueries.filter(
      (item) =>
        Number(item.position || 0) > 10 &&
        Number(item.position || 0) <= 20
    );
  }, [localQueries]);

  const leadOpportunities = useMemo(() => {
    return localQueries
      .map((item) => ({
        ...item,
        opportunity: getLeadOpportunity(item),
      }))
      .filter((item) => {
        return (
          item.opportunity.priority === "HIGH" ||
          item.opportunity.priority === "MEDIUM"
        );
      })
      .sort((a, b) => {
        const priorityOrder = {
          HIGH: 1,
          MEDIUM: 2,
          LOW: 3,
        };

        const priorityDifference =
          priorityOrder[a.opportunity.priority] -
          priorityOrder[b.opportunity.priority];

        if (priorityDifference !== 0) {
          return priorityDifference;
        }

        return (
          Number(b.impressions || 0) -
          Number(a.impressions || 0)
        );
      })
      .slice(0, 10);
  }, [localQueries]);

  const overall = seoData?.overall || {
    clicks: 0,
    impressions: 0,
    ctr: 0,
    position: 0,
  };

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

                  <span className="rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-[11px] font-black tracking-wider text-purple-700">
                    ORGANIC LEADS
                  </span>

                  {seoData && (
                    <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-black tracking-wider text-emerald-700">
                      ● GOOGLE CONNECTED
                    </span>
                  )}

                </div>

                <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
                  Organic Leads
                </h1>

                <p className="max-w-3xl text-sm font-medium leading-relaxed text-slate-600 md:text-base">
                  Identify Google searches that can generate
                  bookings, calls and WhatsApp enquiries for
                  RC Tours & Travels.
                </p>

              </div>

              <div className="flex flex-wrap gap-3">

                <button
                  type="button"
                  onClick={() => loadData(true)}
                  disabled={refreshing}
                  className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-slate-800 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {refreshing
                    ? "⏳ Syncing..."
                    : "🔄 Refresh Organic Data"}
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

          {/* ================= CONNECTION ================= */}

          <div
            className={`border-t px-6 py-4 md:px-8 ${
              error
                ? "border-rose-100 bg-rose-50"
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
                        ? "text-rose-900"
                        : seoData
                        ? "text-emerald-900"
                        : "text-cyan-900"
                    }`}
                  >
                    {error
                      ? "Google Search Console Error"
                      : seoData
                      ? "Google Search Console Connected"
                      : "Loading Google Search Console"}
                  </p>

                  <p
                    className={`mt-1 text-xs font-medium ${
                      error
                        ? "text-rose-800"
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
                      : "Fetching real Google Search Console data..."}
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

        {/* ================= ERROR ================= */}

        {error && (
          <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6">

            <div className="flex items-start gap-3">

              <span className="text-xl">⚠️</span>

              <div>

                <h2 className="font-black text-rose-900">
                  Organic Data Error
                </h2>

                <p className="mt-1 text-sm text-rose-800">
                  {error}
                </p>

                <button
                  type="button"
                  onClick={() => loadData(true)}
                  className="mt-4 rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-rose-700"
                >
                  Try Again
                </button>

              </div>

            </div>

          </div>
        )}

        {/* ================= OVERVIEW ================= */}

        <div>

          <div className="mb-4">

            <h2 className="text-2xl font-black tracking-tight text-slate-900">
              📊 Organic Lead Overview
            </h2>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Real Google Search Console visibility for queries
              related to taxi, cab, rental and travel services.
            </p>

          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">

            {/* Queries */}

            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">

              <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                Local Queries
              </span>

              <div className="mt-3 text-3xl font-black text-slate-900">
                {loading ? "..." : formatNumber(localQueries.length)}
              </div>

              <p className="mt-2 text-xs font-medium text-slate-500">
                Search queries with lead relevance
              </p>

            </div>

            {/* Clicks */}

            <div className="rounded-3xl border border-cyan-200 bg-cyan-50/60 p-6 shadow-sm">

              <span className="text-xs font-black uppercase tracking-wider text-cyan-600">
                Organic Clicks
              </span>

              <div className="mt-3 text-3xl font-black text-cyan-900">
                {loading ? "..." : formatNumber(organicClicks)}
              </div>

              <p className="mt-2 text-xs font-medium text-cyan-700">
                Clicks from relevant queries
              </p>

            </div>

            {/* Impressions */}

            <div className="rounded-3xl border border-blue-200 bg-blue-50/60 p-6 shadow-sm">

              <span className="text-xs font-black uppercase tracking-wider text-blue-600">
                Impressions
              </span>

              <div className="mt-3 text-3xl font-black text-blue-900">
                {loading
                  ? "..."
                  : formatNumber(organicImpressions)}
              </div>

              <p className="mt-2 text-xs font-medium text-blue-700">
                Search visibility
              </p>

            </div>

            {/* Top 3 */}

            <div className="rounded-3xl border border-emerald-200 bg-emerald-50/60 p-6 shadow-sm">

              <span className="text-xs font-black uppercase tracking-wider text-emerald-600">
                Top 3
              </span>

              <div className="mt-3 text-3xl font-black text-emerald-900">
                {loading ? "..." : topThreeQueries.length}
              </div>

              <p className="mt-2 text-xs font-medium text-emerald-700">
                Strong ranking opportunities
              </p>

            </div>

            {/* Page 2 */}

            <div className="rounded-3xl border border-amber-200 bg-amber-50/60 p-6 shadow-sm">

              <span className="text-xs font-black uppercase tracking-wider text-amber-600">
                Page 2
              </span>

              <div className="mt-3 text-3xl font-black text-amber-900">
                {loading ? "..." : pageTwoQueries.length}
              </div>

              <p className="mt-2 text-xs font-medium text-amber-700">
                Ranking + lead opportunities
              </p>

            </div>

          </div>

        </div>

        {/* ================= LEAD SIGNALS ================= */}

        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm md:p-8">

          <div>

            <h2 className="text-xl font-black text-slate-900">
              🎯 Lead Conversion Signals
            </h2>

            <p className="mt-1 max-w-3xl text-sm font-medium leading-relaxed text-slate-500">
              These are the main conversion channels for organic
              visitors. Only Google Search Console search data is
              currently connected to this module.
            </p>

          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

            {leadSignals.map((signal) => (
              <div
                key={signal.id}
                className="rounded-2xl border border-slate-100 bg-slate-50/70 p-5"
              >

                <div className="flex items-center justify-between">

                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                    {signal.icon}
                  </span>

                  <span
                    className={`rounded-lg px-2.5 py-1 text-[10px] font-black uppercase ${
                      signal.id === "organic"
                        ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border border-amber-200 bg-amber-50 text-amber-700"
                    }`}
                  >
                    {signal.id === "organic"
                      ? "CONNECTED"
                      : "TRACKING NEEDED"}
                  </span>

                </div>

                <h3 className="mt-4 text-sm font-black text-slate-900">
                  {signal.title}
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-slate-500">
                  {signal.description}
                </p>

              </div>
            ))}

          </div>

        </div>

        {/* ================= OPPORTUNITIES ================= */}

        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm md:p-8">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <h2 className="text-xl font-black text-slate-900">
                🔥 Organic Lead Opportunities
              </h2>

              <p className="mt-1 text-sm font-medium text-slate-500">
                Queries with useful visibility that can potentially
                generate more organic enquiries.
              </p>

            </div>

            <div className="rounded-2xl border border-purple-100 bg-purple-50 px-4 py-3">

              <p className="text-[10px] font-black uppercase tracking-wider text-purple-600">
                Opportunities
              </p>

              <p className="mt-1 text-xl font-black text-purple-900">
                {leadOpportunities.length}
              </p>

            </div>

          </div>

          <div className="mt-6 space-y-3">

            {leadOpportunities.length > 0 ? (
              leadOpportunities.map((item) => (
                <div
                  key={`${item.query}-${item.position}`}
                  className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5 transition hover:border-purple-200 hover:bg-purple-50/20"
                >

                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">

                    <div className="min-w-0">

                      <div className="flex flex-wrap items-center gap-2">

                        <span className="text-base">
                          {item.opportunity.priority === "HIGH"
                            ? "🔥"
                            : "📈"}
                        </span>

                        <h3 className="break-words text-sm font-black text-slate-900">
                          {item.query}
                        </h3>

                        <span
                          className={`rounded-lg border px-2.5 py-1 text-[10px] font-black ${getPriorityClass(
                            item.opportunity.priority
                          )}`}
                        >
                          {item.opportunity.priority}
                        </span>

                      </div>

                      <p className="mt-2 text-xs leading-relaxed text-slate-500">
                        {item.opportunity.description}
                      </p>

                      <p className="mt-3 text-xs font-bold text-purple-700">
                        {item.opportunity.label}
                      </p>

                    </div>

                    <div className="grid shrink-0 grid-cols-2 gap-2 sm:grid-cols-4">

                      <div className="rounded-xl bg-white px-3 py-2 text-center shadow-sm">
                        <p className="text-[9px] font-black uppercase text-slate-400">
                          Clicks
                        </p>
                        <p className="mt-1 text-sm font-black text-slate-900">
                          {formatNumber(item.clicks)}
                        </p>
                      </div>

                      <div className="rounded-xl bg-white px-3 py-2 text-center shadow-sm">
                        <p className="text-[9px] font-black uppercase text-slate-400">
                          Impr.
                        </p>
                        <p className="mt-1 text-sm font-black text-slate-900">
                          {formatNumber(item.impressions)}
                        </p>
                      </div>

                      <div className="rounded-xl bg-white px-3 py-2 text-center shadow-sm">
                        <p className="text-[9px] font-black uppercase text-slate-400">
                          CTR
                        </p>
                        <p className="mt-1 text-sm font-black text-cyan-700">
                          {formatPercent(item.ctr)}
                        </p>
                      </div>

                      <div className="rounded-xl bg-white px-3 py-2 text-center shadow-sm">
                        <p className="text-[9px] font-black uppercase text-slate-400">
                          Position
                        </p>
                        <p className="mt-1 text-sm font-black text-purple-700">
                          {formatPosition(item.position)}
                        </p>
                      </div>

                    </div>

                  </div>

                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 py-12 text-center">

                <div className="text-3xl">
                  {loading ? "⏳" : "📭"}
                </div>

                <p className="mt-3 text-sm font-bold text-slate-600">
                  {loading
                    ? "Loading organic lead opportunities..."
                    : "No high-value organic lead opportunities found yet."}
                </p>

                <p className="mt-1 text-xs font-medium text-slate-400">
                  More Google Search Console data will improve
                  opportunity detection.
                </p>

              </div>
            )}

          </div>

        </div>

        {/* ================= QUERY TABLE ================= */}

        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm md:p-8">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

            <div>

              <h2 className="text-xl font-black text-slate-900">
                🔎 Organic Search Lead Queries
              </h2>

              <p className="mt-1 text-sm font-medium text-slate-500">
                Real Google queries filtered for taxi, cab, rental,
                travel and Nagpur-related lead intent.
              </p>

            </div>

            <div className="w-full lg:max-w-sm">

              <input
                type="text"
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
                placeholder="Search lead query..."
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none transition focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-500/10"
              />

            </div>

          </div>

          <div className="mt-5 overflow-x-auto">

            <table className="w-full min-w-[900px] text-left">

              <thead>

                <tr className="border-b border-slate-100">

                  <th className="px-4 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Query
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

                  <th className="px-4 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Ranking
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredQueries.length > 0 ? (
                  filteredQueries.map((item) => (
                    <tr
                      key={`${item.query}-${item.position}`}
                      className="border-b border-slate-50 transition hover:bg-slate-50"
                    >

                      <td className="max-w-[320px] px-4 py-3">

                        <p className="break-words text-sm font-bold text-slate-800">
                          {item.query}
                        </p>

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

                      <td className="px-4 py-3 text-sm font-black text-purple-700">
                        {formatPosition(item.position)}
                      </td>

                      <td className="px-4 py-3">

                        <span
                          className={`rounded-lg border px-2.5 py-1 text-[10px] font-black ${getRankingClass(
                            item.position
                          )}`}
                        >
                          {getRankingLabel(item.position)}
                        </span>

                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>

                    <td
                      colSpan={6}
                      className="px-4 py-12 text-center"
                    >

                      <div className="text-3xl">
                        {loading ? "⏳" : "📭"}
                      </div>

                      <p className="mt-3 text-sm font-bold text-slate-600">
                        {loading
                          ? "Loading Google Search Console queries..."
                          : "No relevant organic search queries found."}
                      </p>

                    </td>

                  </tr>
                )}

              </tbody>

            </table>

          </div>

          <div className="mt-5 border-t border-slate-100 pt-4">

            <p className="text-xs font-semibold text-slate-500">
              Showing{" "}
              <span className="font-black text-slate-800">
                {filteredQueries.length}
              </span>{" "}
              of{" "}
              <span className="font-black text-slate-800">
                {localQueries.length}
              </span>{" "}
              relevant queries.
            </p>

          </div>

        </div>

        {/* ================= CONVERSION TRACKING ================= */}

        <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 md:p-8">

          <div className="flex flex-col gap-5 md:flex-row md:items-start">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
              💡
            </div>

            <div>

              <h2 className="text-lg font-black text-amber-950">
                Organic Conversion Tracking
              </h2>

              <p className="mt-2 max-w-4xl text-sm leading-relaxed text-amber-900/80">
                Google Search Console tells us which searches bring
                clicks and visibility, but it does not directly tell
                us whether a visitor booked a cab, called the business
                or sent a WhatsApp message. Those conversion events
                require separate website analytics or conversion
                tracking.
              </p>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">

                <div className="rounded-2xl border border-amber-100 bg-white p-4">

                  <p className="text-[10px] font-black uppercase tracking-wider text-amber-600">
                    Booking
                  </p>

                  <p className="mt-1 text-sm font-black text-slate-900">
                    Tracking Required
                  </p>

                </div>

                <div className="rounded-2xl border border-amber-100 bg-white p-4">

                  <p className="text-[10px] font-black uppercase tracking-wider text-amber-600">
                    WhatsApp
                  </p>

                  <p className="mt-1 text-sm font-black text-slate-900">
                    Tracking Required
                  </p>

                </div>

                <div className="rounded-2xl border border-amber-100 bg-white p-4">

                  <p className="text-[10px] font-black uppercase tracking-wider text-amber-600">
                    Phone Calls
                  </p>

                  <p className="mt-1 text-sm font-black text-slate-900">
                    Tracking Required
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* ================= ACTION CENTER ================= */}

        <div className="rounded-3xl border border-purple-200 bg-purple-50 p-6 md:p-8">

          <div className="flex flex-col gap-5 md:flex-row md:items-start">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
              🚀
            </div>

            <div>

              <h2 className="text-lg font-black text-purple-950">
                Organic Lead Action Center
              </h2>

              <p className="mt-2 max-w-4xl text-sm leading-relaxed text-purple-900/80">
                Focus first on queries already ranking on page 1 or
                page 2. Improve their landing pages, booking CTAs,
                WhatsApp visibility, internal links and search-result
                snippets before creating duplicate pages.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">

                <Link
                  href="/admin/seo/content"
                  className="rounded-2xl bg-purple-600 px-5 py-3 text-sm font-black text-white transition hover:bg-purple-700"
                >
                  Open Content Opportunities →
                </Link>

                <Link
                  href="/admin/seo/local"
                  className="rounded-2xl border border-purple-200 bg-white px-5 py-3 text-sm font-black text-purple-700 transition hover:bg-purple-100"
                >
                  Open Local SEO →
                </Link>

                <Link
                  href="/admin/seo/keywords"
                  className="rounded-2xl border border-purple-200 bg-white px-5 py-3 text-sm font-black text-purple-700 transition hover:bg-purple-100"
                >
                  Open Keyword Rankings →
                </Link>

              </div>

            </div>

          </div>

        </div>

        {/* ================= FINAL STATUS ================= */}

        <div className="rounded-3xl border border-emerald-200 bg-white p-6 shadow-sm md:p-8">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div>

              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">
                ORGANIC LEAD ENGINE
              </span>

              <h2 className="mt-1 text-xl font-black text-slate-900">
                🚀 Organic Search Lead Monitoring Ready
              </h2>

              <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500">
                Real Google Search Console data is connected.
                Booking, WhatsApp and phone conversion tracking can
                be added separately when analytics events are available.
              </p>

            </div>

            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-center">

              <div className="text-[10px] font-black uppercase tracking-wider text-emerald-600">
                Current Status
              </div>

              <div className="mt-1 text-lg font-black text-emerald-800">
                {seoData
                  ? "GSC Connected"
                  : "Connecting..."}
              </div>

              {lastSync && (
                <p className="mt-1 text-[10px] font-semibold text-emerald-600">
                  {new Date(lastSync).toLocaleString("en-IN")}
                </p>
              )}

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}