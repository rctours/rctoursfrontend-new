"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const SITE_URL = "https://www.rctoursandtravels.in";

const seoPages = [
  {
    name: "Homepage",
    path: "/",
    targetKeyword: "Cab Service in Nagpur",
    intent: "Commercial",
  },
  {
    name: "Taxi Service in Nagpur",
    path: "/taxi-service-in-nagpur",
    targetKeyword: "Taxi Service in Nagpur",
    intent: "Commercial",
  },
  {
    name: "Nagpur Local Taxi",
    path: "/nagpur-local-taxi",
    targetKeyword: "Local Taxi Service in Nagpur",
    intent: "Local",
  },
  {
    name: "Nagpur Airport Taxi",
    path: "/nagpur-airport-taxi",
    targetKeyword: "Nagpur Airport Taxi",
    intent: "Local / Airport",
  },
  {
    name: "Airport Taxi Nagpur",
    path: "/airport-taxi-nagpur",
    targetKeyword: "Nagpur Airport Cab Booking",
    intent: "Transactional",
  },
  {
    name: "Nagpur to Tadoba Cab",
    path: "/nagpur-to-tadoba-cab",
    targetKeyword: "Nagpur to Tadoba Taxi",
    intent: "Outstation / Tourism",
  },
  {
    name: "Nagpur to Pench Cab",
    path: "/nagpur-to-pench-cab",
    targetKeyword: "Nagpur to Pench Taxi",
    intent: "Outstation / Tourism",
  },
  {
    name: "Fleet",
    path: "/fleet",
    targetKeyword: "Car Rental Nagpur",
    intent: "Fleet / Rental",
  },
  {
    name: "Tour Packages",
    path: "/tour-packages",
    targetKeyword: "Nagpur Tour Packages",
    intent: "Tourism",
  },
  {
    name: "Blog",
    path: "/blog",
    targetKeyword: "Nagpur Taxi Blog",
    intent: "Informational",
  },
];

function formatNumber(value) {
  return new Intl.NumberFormat("en-IN").format(
    Number(value || 0)
  );
}

function getStatusClass(status) {
  if (status === "PASS") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (status === "WARNING") {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }

  if (status === "ERROR") {
    return "border-rose-200 bg-rose-50 text-rose-700";
  }

  return "border-slate-200 bg-slate-50 text-slate-500";
}

function getStatusIcon(status) {
  if (status === "PASS") {
    return "✅";
  }

  if (status === "WARNING") {
    return "⚠️";
  }

  if (status === "ERROR") {
    return "❌";
  }

  return "⏳";
}

function getHealthClass(score) {
  if (score >= 90) {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (score >= 70) {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }

  return "border-rose-200 bg-rose-50 text-rose-700";
}

function getHealthLabel(score) {
  if (score >= 90) {
    return "Healthy";
  }

  if (score >= 70) {
    return "Needs Improvement";
  }

  return "Needs Attention";
}

function extractMetadata(html) {
  const titleMatch = html.match(
    /<title[^>]*>([\s\S]*?)<\/title>/i
  );

  const descriptionMatch = html.match(
    /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["'][^>]*>/i
  );

  const descriptionMatchReverse = html.match(
    /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["'][^>]*>/i
  );

  const canonicalMatch = html.match(
    /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["'][^>]*>/i
  );

  const canonicalMatchReverse = html.match(
    /<link[^>]+href=["']([^"']*)["'][^>]+rel=["']canonical["'][^>]*>/i
  );

  const robotsMatch = html.match(
    /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)["'][^>]*>/i
  );

  const robotsMatchReverse = html.match(
    /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']robots["'][^>]*>/i
  );

  const h1Matches = html.match(
    /<h1\b[^>]*>([\s\S]*?)<\/h1>/gi
  );

  const bodyMatch = html.match(
    /<body[^>]*>([\s\S]*?)<\/body>/i
  );

  const title = titleMatch
    ? titleMatch[1].replace(/\s+/g, " ").trim()
    : "";

  const description = descriptionMatch
    ? descriptionMatch[1].trim()
    : descriptionMatchReverse
    ? descriptionMatchReverse[1].trim()
    : "";

  const canonical = canonicalMatch
    ? canonicalMatch[1].trim()
    : canonicalMatchReverse
    ? canonicalMatchReverse[1].trim()
    : "";

  const robots = robotsMatch
    ? robotsMatch[1].trim()
    : robotsMatchReverse
    ? robotsMatchReverse[1].trim()
    : "";

  const h1Count = h1Matches ? h1Matches.length : 0;

  const bodyText = bodyMatch
    ? bodyMatch[1]
        .replace(/<script[\s\S]*?<\/script>/gi, " ")
        .replace(/<style[\s\S]*?<\/style>/gi, " ")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim()
    : "";

  const wordCount = bodyText
    ? bodyText.split(/\s+/).filter(Boolean).length
    : 0;

  return {
    title,
    description,
    canonical,
    robots,
    h1Count,
    wordCount,
  };
}

function calculatePageScore(metadata, statusCode) {
  let score = 0;

  if (statusCode >= 200 && statusCode < 400) {
    score += 20;
  }

  if (metadata.title) {
    score += 20;
  }

  if (metadata.description) {
    score += 20;
  }

  if (metadata.canonical) {
    score += 15;
  }

  if (metadata.h1Count === 1) {
    score += 15;
  } else if (metadata.h1Count > 1) {
    score += 5;
  }

  if (metadata.wordCount >= 300) {
    score += 10;
  } else if (metadata.wordCount >= 100) {
    score += 5;
  }

  return Math.min(score, 100);
}

function getIssues(metadata, statusCode) {
  const issues = [];

  if (!(statusCode >= 200 && statusCode < 400)) {
    issues.push("Page is not returning a successful HTTP response.");
  }

  if (!metadata.title) {
    issues.push("Title tag was not detected.");
  }

  if (!metadata.description) {
    issues.push("Meta description was not detected.");
  }

  if (!metadata.canonical) {
    issues.push("Canonical URL was not detected.");
  }

  if (metadata.h1Count === 0) {
    issues.push("No H1 heading was detected.");
  }

  if (metadata.h1Count > 1) {
    issues.push("Multiple H1 headings were detected.");
  }

  if (metadata.wordCount < 100) {
    issues.push("Page text appears short and should be reviewed.");
  }

  return issues;
}

export default function SEOPagesPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  async function runPagesAudit(showRefresh = false) {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const currentOrigin =
        typeof window !== "undefined"
          ? window.location.origin
          : SITE_URL;

      const checkedPages = [];

      for (const page of seoPages) {
        try {
          const response = await fetch(
            `${currentOrigin}${page.path}`,
            {
              method: "GET",
              cache: "no-store",
            }
          );

          const html = await response.text();

          const metadata = extractMetadata(html);

          const score = calculatePageScore(
            metadata,
            response.status
          );

          const issues = getIssues(
            metadata,
            response.status
          );

          checkedPages.push({
            ...page,
            status:
              response.ok
                ? issues.length > 0
                  ? "WARNING"
                  : "PASS"
                : "ERROR",
            statusCode: response.status,
            metadata,
            score,
            issues,
          });
        } catch (pageError) {
          console.error(
            `SEO page audit error: ${page.path}`,
            pageError
          );

          checkedPages.push({
            ...page,
            status: "ERROR",
            statusCode: null,
            metadata: {
              title: "",
              description: "",
              canonical: "",
              robots: "",
              h1Count: 0,
              wordCount: 0,
            },
            score: 0,
            issues: [
              "Unable to fetch this page from the browser.",
            ],
          });
        }
      }

      setResults(checkedPages);
    } catch (err) {
      console.error(
        "SEO Pages Audit Error:",
        err
      );

      setError(
        err?.message ||
          "Unable to run SEO pages audit."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    runPagesAudit();
  }, []);

  const filteredResults = useMemo(() => {
    const search = searchTerm
      .trim()
      .toLowerCase();

    return results.filter((item) => {
      const matchesSearch =
        !search ||
        item.name
          .toLowerCase()
          .includes(search) ||
        item.path
          .toLowerCase()
          .includes(search) ||
        item.targetKeyword
          .toLowerCase()
          .includes(search);

      const matchesStatus =
        statusFilter === "All" ||
        item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [
    results,
    searchTerm,
    statusFilter,
  ]);

  const summary = useMemo(() => {
    const pass = results.filter(
      (item) => item.status === "PASS"
    ).length;

    const warning = results.filter(
      (item) => item.status === "WARNING"
    ).length;

    const error = results.filter(
      (item) => item.status === "ERROR"
    ).length;

    const averageScore =
      results.length > 0
        ? Math.round(
            results.reduce(
              (total, item) =>
                total + Number(item.score || 0),
              0
            ) / results.length
          )
        : 0;

    const withTitle = results.filter(
      (item) => item.metadata?.title
    ).length;

    const withDescription = results.filter(
      (item) => item.metadata?.description
    ).length;

    const withCanonical = results.filter(
      (item) => item.metadata?.canonical
    ).length;

    const withH1 = results.filter(
      (item) => item.metadata?.h1Count === 1
    ).length;

    return {
      total: results.length,
      pass,
      warning,
      error,
      averageScore,
      withTitle,
      withDescription,
      withCanonical,
      withH1,
    };
  }, [results]);

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

                  <span className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-[11px] font-black tracking-wider text-indigo-700">
                    SEO PAGES
                  </span>

                </div>

                <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
                  SEO Pages
                </h1>

                <p className="max-w-3xl text-sm font-medium leading-relaxed text-slate-600 md:text-base">
                  Monitor important RC Tours & Travels pages,
                  metadata, canonical URLs, H1 structure,
                  content length and basic SEO health.
                </p>

              </div>

              <div className="flex flex-wrap gap-3">

                <button
                  type="button"
                  onClick={() => runPagesAudit(true)}
                  disabled={refreshing}
                  className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-slate-800 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {refreshing
                    ? "⏳ Auditing..."
                    : "🔄 Refresh SEO Pages"}
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

          <div className="border-t border-indigo-100 bg-indigo-50 px-6 py-4 md:px-8">

            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">

              <div className="flex items-start gap-3">

                <span className="text-xl">
                  📄
                </span>

                <div>

                  <p className="text-sm font-black text-indigo-900">
                    SEO Page Monitoring
                  </p>

                  <p className="mt-1 text-xs font-medium leading-relaxed text-indigo-800">
                    Important landing pages are checked for
                    basic SEO elements and page accessibility.
                  </p>

                </div>

              </div>

              <span className="w-fit rounded-full border border-indigo-200 bg-white px-3 py-1 text-[10px] font-black uppercase tracking-wider text-indigo-700">
                LIVE AUDIT
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
                  SEO Pages Error
                </h2>

                <p className="mt-1 text-sm leading-relaxed text-rose-800">
                  {error}
                </p>

                <button
                  type="button"
                  onClick={() => runPagesAudit(true)}
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
              Auditing important SEO pages...
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Checking metadata, canonical URLs,
              H1 structure and content.
            </p>

          </div>
        ) : (
          <>
            {/* ================= SUMMARY ================= */}

            <div>

              <div className="mb-4">

                <h2 className="text-2xl font-black tracking-tight text-slate-900">
                  📊 SEO Pages Overview
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Current SEO health of the important website pages.
                </p>

              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">

                <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">

                  <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                    Pages Checked
                  </span>

                  <div className="mt-3 text-3xl font-black text-slate-900">
                    {formatNumber(summary.total)}
                  </div>

                  <p className="mt-2 text-xs font-medium text-slate-500">
                    Important SEO pages
                  </p>

                </div>

                <div className="rounded-3xl border border-emerald-200 bg-emerald-50/60 p-6 shadow-sm">

                  <span className="text-xs font-black uppercase tracking-wider text-emerald-600">
                    Healthy
                  </span>

                  <div className="mt-3 text-3xl font-black text-emerald-900">
                    {formatNumber(summary.pass)}
                  </div>

                  <p className="mt-2 text-xs font-medium text-emerald-700">
                    No basic SEO issues detected
                  </p>

                </div>

                <div className="rounded-3xl border border-amber-200 bg-amber-50/60 p-6 shadow-sm">

                  <span className="text-xs font-black uppercase tracking-wider text-amber-600">
                    Warnings
                  </span>

                  <div className="mt-3 text-3xl font-black text-amber-900">
                    {formatNumber(summary.warning)}
                  </div>

                  <p className="mt-2 text-xs font-medium text-amber-700">
                    Pages worth reviewing
                  </p>

                </div>

                <div className="rounded-3xl border border-rose-200 bg-rose-50/60 p-6 shadow-sm">

                  <span className="text-xs font-black uppercase tracking-wider text-rose-600">
                    Errors
                  </span>

                  <div className="mt-3 text-3xl font-black text-rose-900">
                    {formatNumber(summary.error)}
                  </div>

                  <p className="mt-2 text-xs font-medium text-rose-700">
                    Pages needing attention
                  </p>

                </div>

                <div
                  className={`rounded-3xl border p-6 shadow-sm ${getHealthClass(
                    summary.averageScore
                  )}`}
                >

                  <span className="text-xs font-black uppercase tracking-wider">
                    Average SEO Score
                  </span>

                  <div className="mt-3 text-3xl font-black">
                    {summary.averageScore}%
                  </div>

                  <p className="mt-2 text-xs font-medium">
                    Across monitored pages
                  </p>

                </div>

              </div>

            </div>

            {/* ================= SEO ELEMENT COVERAGE ================= */}

            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm md:p-8">

              <div>

                <h2 className="text-xl font-black text-slate-900">
                  🧩 SEO Element Coverage
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  How many monitored pages currently contain important SEO elements.
                </p>

              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">

                <div className="rounded-2xl bg-slate-50 p-4 text-center">

                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Title
                  </p>

                  <p className="mt-2 text-2xl font-black text-slate-900">
                    {summary.withTitle}/{summary.total}
                  </p>

                </div>

                <div className="rounded-2xl bg-slate-50 p-4 text-center">

                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Description
                  </p>

                  <p className="mt-2 text-2xl font-black text-slate-900">
                    {summary.withDescription}/{summary.total}
                  </p>

                </div>

                <div className="rounded-2xl bg-slate-50 p-4 text-center">

                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Canonical
                  </p>

                  <p className="mt-2 text-2xl font-black text-slate-900">
                    {summary.withCanonical}/{summary.total}
                  </p>

                </div>

                <div className="rounded-2xl bg-slate-50 p-4 text-center">

                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Single H1
                  </p>

                  <p className="mt-2 text-2xl font-black text-slate-900">
                    {summary.withH1}/{summary.total}
                  </p>

                </div>

              </div>

            </div>

            {/* ================= FILTERS ================= */}

            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm md:p-8">

              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                <div>

                  <h2 className="text-xl font-black text-slate-900">
                    📄 Important SEO Pages
                  </h2>

                  <p className="mt-1 text-sm font-medium text-slate-500">
                    Review page-level SEO information and basic health.
                  </p>

                </div>

                <div className="rounded-2xl border border-indigo-100 bg-indigo-50 px-4 py-3">

                  <p className="text-[10px] font-black uppercase tracking-wider text-indigo-600">
                    Showing
                  </p>

                  <p className="mt-1 text-xl font-black text-indigo-900">
                    {filteredResults.length}
                  </p>

                </div>

              </div>

              <div className="mt-6 flex flex-col gap-3 lg:flex-row">

                <input
                  type="text"
                  aria-label="Search SEO pages"
                  placeholder="Search page, URL or target keyword..."
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(event.target.value)
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
                />

                <div className="flex flex-wrap items-center gap-1 rounded-2xl bg-slate-100 p-1">

                  {[
                    "All",
                    "PASS",
                    "WARNING",
                    "ERROR",
                  ].map((filter) => (

                    <button
                      key={filter}
                      type="button"
                      onClick={() =>
                        setStatusFilter(filter)
                      }
                      className={`rounded-xl px-3 py-2 text-xs font-bold transition ${
                        statusFilter === filter
                          ? "bg-white text-slate-900 shadow-sm"
                          : "text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      {filter}
                    </button>

                  ))}

                </div>

              </div>

              {/* ================= PAGE CARDS ================= */}

              <div className="mt-6 space-y-4">

                {filteredResults.length > 0 ? (

                  filteredResults.map((item) => {

                    const healthLabel =
                      getHealthLabel(item.score);

                    return (
                      <div
                        key={item.path}
                        className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-cyan-200 hover:shadow-md md:p-6"
                      >

                        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">

                          <div className="min-w-0 flex-1">

                            <div className="flex flex-wrap items-center gap-2">

                              <h3 className="text-lg font-black text-slate-900">
                                {item.name}
                              </h3>

                              <span
                                className={`rounded-lg border px-2.5 py-1 text-[10px] font-black ${getStatusClass(
                                  item.status
                                )}`}
                              >
                                {getStatusIcon(item.status)}{" "}
                                {item.status}
                              </span>

                              <span
                                className={`rounded-lg border px-2.5 py-1 text-[10px] font-black ${getHealthClass(
                                  item.score
                                )}`}
                              >
                                {item.score}% {healthLabel}
                              </span>

                            </div>

                            <div className="mt-2 flex flex-col gap-1 text-xs">

                              <a
                                href={item.path}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="break-all font-bold text-cyan-700 hover:text-cyan-900 hover:underline"
                              >
                                {item.path}
                              </a>

                              <p className="text-slate-500">
                                Target Keyword:
                                <span className="ml-1 font-bold text-slate-700">
                                  {item.targetKeyword}
                                </span>
                              </p>

                              <p className="text-slate-500">
                                Search Intent:
                                <span className="ml-1 font-bold text-slate-700">
                                  {item.intent}
                                </span>
                              </p>

                            </div>

                          </div>

                          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 xl:w-[460px]">

                            <div className="rounded-2xl bg-slate-50 p-3 text-center">

                              <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                                HTTP
                              </p>

                              <p className="mt-1 text-lg font-black text-slate-900">
                                {item.statusCode || "—"}
                              </p>

                            </div>

                            <div className="rounded-2xl bg-slate-50 p-3 text-center">

                              <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                                H1
                              </p>

                              <p className="mt-1 text-lg font-black text-slate-900">
                                {item.metadata?.h1Count ?? "—"}
                              </p>

                            </div>

                            <div className="rounded-2xl bg-slate-50 p-3 text-center">

                              <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                                Words
                              </p>

                              <p className="mt-1 text-lg font-black text-slate-900">
                                {formatNumber(
                                  item.metadata?.wordCount
                                )}
                              </p>

                            </div>

                            <div className="rounded-2xl bg-slate-50 p-3 text-center">

                              <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                                Score
                              </p>

                              <p className="mt-1 text-lg font-black text-slate-900">
                                {item.score}%
                              </p>

                            </div>

                          </div>

                        </div>

                        <div className="mt-5 grid grid-cols-1 gap-3 lg:grid-cols-2">

                          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">

                            <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                              Title
                            </p>

                            <p className="mt-2 break-words text-sm font-bold text-slate-800">
                              {item.metadata?.title ||
                                "Not detected"}
                            </p>

                          </div>

                          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">

                            <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                              Meta Description
                            </p>

                            <p className="mt-2 break-words text-sm font-medium leading-relaxed text-slate-700">
                              {item.metadata?.description ||
                                "Not detected"}
                            </p>

                          </div>

                          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">

                            <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                              Canonical
                            </p>

                            {item.metadata?.canonical ? (
                              <a
                                href={item.metadata.canonical}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-2 block break-all text-xs font-bold text-cyan-700 hover:underline"
                              >
                                {item.metadata.canonical}
                              </a>
                            ) : (
                              <p className="mt-2 text-sm font-medium text-slate-400">
                                Not detected
                              </p>
                            )}

                          </div>

                          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">

                            <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                              Robots
                            </p>

                            <p className="mt-2 break-words text-sm font-medium text-slate-700">
                              {item.metadata?.robots ||
                                "Default / not explicitly declared"}
                            </p>

                          </div>

                        </div>

                        {item.issues.length > 0 && (
                          <div className="mt-5 rounded-2xl border border-amber-100 bg-amber-50/70 p-4">

                            <p className="text-[10px] font-black uppercase tracking-wider text-amber-700">
                              SEO Review Items
                            </p>

                            <ul className="mt-2 space-y-1">

                              {item.issues.map(
                                (issue) => (
                                  <li
                                    key={issue}
                                    className="text-xs font-medium leading-relaxed text-amber-900"
                                  >
                                    • {issue}
                                  </li>
                                )
                              )}

                            </ul>

                          </div>
                        )}

                      </div>
                    );
                  })

                ) : (

                  <div className="rounded-2xl border border-dashed border-slate-200 py-12 text-center">

                    <div className="text-3xl">
                      🔍
                    </div>

                    <p className="mt-3 text-sm font-black text-slate-700">
                      No SEO pages found.
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Try another search term or status filter.
                    </p>

                  </div>

                )}

              </div>

            </div>

            {/* ================= EXPLANATION ================= */}

            <div className="rounded-3xl border border-cyan-200 bg-cyan-50 p-6 md:p-8">

              <div className="flex flex-col gap-4 md:flex-row md:items-start">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                  💡
                </div>

                <div>

                  <h2 className="text-lg font-black text-cyan-950">
                    How to use SEO Pages
                  </h2>

                  <p className="mt-2 max-w-4xl text-sm leading-relaxed text-cyan-900/80">
                    Use this module to monitor the most important
                    landing pages before making SEO changes.
                    A healthy page should be reachable, have a
                    meaningful title and meta description, use a
                    canonical URL, contain a sensible H1 structure
                    and provide enough useful content for the page
                    intent. These checks are indicators, not a
                    guarantee of Google rankings.
                  </p>

                </div>

              </div>

            </div>

            {/* ================= FOOTER ================= */}

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">

              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                <div>

                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">
                    SEO PAGES
                  </span>

                  <h2 className="mt-1 text-xl font-black text-slate-900">
                    🚀 SEO Page Monitoring Ready
                  </h2>

                  <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500">
                    Monitoring {results.length} important RC Tours &
                    Travels pages from the admin SEO system.
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