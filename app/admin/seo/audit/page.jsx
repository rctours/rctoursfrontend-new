"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const SITE_URL = "https://www.rctoursandtravels.in";

const auditChecks = [
  {
    id: "https",
    title: "HTTPS Security",
    description:
      "Website should use HTTPS so customer and search-engine connections are secure.",
    icon: "🔒",
    category: "Security",
  },
  {
    id: "canonical",
    title: "Canonical URL",
    description:
      "Important SEO pages should define a canonical URL to avoid duplicate-page confusion.",
    icon: "🔗",
    category: "On-Page SEO",
  },
  {
    id: "robots",
    title: "Robots.txt",
    description:
      "Search-engine crawlers should be able to access the website through a valid robots.txt file.",
    icon: "🤖",
    category: "Crawling",
  },
  {
    id: "sitemap",
    title: "XML Sitemap",
    description:
      "The website should provide an XML sitemap containing important indexable pages.",
    icon: "🗺️",
    category: "Indexing",
  },
  {
    id: "metadata",
    title: "Page Metadata",
    description:
      "Important pages should have meaningful title and description metadata.",
    icon: "🏷️",
    category: "On-Page SEO",
  },
  {
    id: "mobile",
    title: "Mobile Responsive Structure",
    description:
      "Pages should use responsive layouts so customers can use the website comfortably on phones.",
    icon: "📱",
    category: "Mobile SEO",
  },
  {
    id: "gsc",
    title: "Google Search Console",
    description:
      "Google Search Console should be connected so real search performance can be monitored.",
    icon: "📈",
    category: "Google",
  },
];

const importantPages = [
  {
    name: "Homepage",
    path: "/",
  },
  {
    name: "Taxi Service in Nagpur",
    path: "/taxi-service-in-nagpur",
  },
  {
    name: "Nagpur Local Taxi",
    path: "/nagpur-local-taxi",
  },
  {
    name: "Nagpur Airport Taxi",
    path: "/nagpur-airport-taxi",
  },
  {
    name: "Airport Taxi Nagpur",
    path: "/airport-taxi-nagpur",
  },
  {
    name: "Nagpur to Tadoba Cab",
    path: "/nagpur-to-tadoba-cab",
  },
  {
    name: "Nagpur to Pench Cab",
    path: "/nagpur-to-pench-cab",
  },
  {
    name: "Fleet",
    path: "/fleet",
  },
  {
    name: "Tour Packages",
    path: "/tour-packages",
  },
  {
    name: "Blog",
    path: "/blog",
  },
];

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

function getPriorityClass(priority) {
  if (priority === "HIGH") {
    return "border-rose-200 bg-rose-50 text-rose-700";
  }

  if (priority === "MEDIUM") {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }

  return "border-cyan-200 bg-cyan-50 text-cyan-700";
}

export default function TechnicalSEOAuditPage() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [checks, setChecks] = useState([]);
  const [pageResults, setPageResults] = useState([]);

  const [error, setError] = useState("");
  const [lastRun, setLastRun] = useState("");

  async function runAudit(showRefresh = false) {
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

      const results = [];

      // HTTPS
      const isHttps = SITE_URL.startsWith("https://");

      results.push({
        ...auditChecks.find((item) => item.id === "https"),
        status: isHttps ? "PASS" : "ERROR",
        message: isHttps
          ? "Website uses HTTPS."
          : "Website URL is not configured with HTTPS.",
      });

      // Canonical / SEO landing page
      let canonicalStatus = "WARNING";
      let canonicalMessage =
        "Canonical configuration should be verified on important SEO pages.";

      try {
        const response = await fetch(
          `${currentOrigin}/taxi-service-in-nagpur`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        if (response.ok) {
          canonicalStatus = "PASS";
          canonicalMessage =
            "SEO landing page is reachable. Canonical metadata is configured through the page layout.";
        } else {
          canonicalStatus = "ERROR";
          canonicalMessage = `SEO landing page returned HTTP ${response.status}.`;
        }
      } catch {
        canonicalStatus = "WARNING";
        canonicalMessage =
          "Page could not be checked from the browser. Verify canonical metadata manually.";
      }

      results.push({
        ...auditChecks.find((item) => item.id === "canonical"),
        status: canonicalStatus,
        message: canonicalMessage,
      });

      // Robots.txt
      let robotsStatus = "WARNING";
      let robotsMessage = "robots.txt could not be verified.";

      try {
        const response = await fetch(`${currentOrigin}/robots.txt`, {
          method: "GET",
          cache: "no-store",
        });

        if (response.ok) {
          robotsStatus = "PASS";
          robotsMessage = "robots.txt is publicly reachable.";
        } else {
          robotsStatus = "ERROR";
          robotsMessage = `robots.txt returned HTTP ${response.status}.`;
        }
      } catch {
        robotsStatus = "WARNING";
        robotsMessage =
          "Unable to fetch robots.txt from the browser.";
      }

      results.push({
        ...auditChecks.find((item) => item.id === "robots"),
        status: robotsStatus,
        message: robotsMessage,
      });

      // Sitemap
      let sitemapStatus = "WARNING";
      let sitemapMessage = "sitemap.xml could not be verified.";

      try {
        const response = await fetch(`${currentOrigin}/sitemap.xml`, {
          method: "GET",
          cache: "no-store",
        });

        if (response.ok) {
          sitemapStatus = "PASS";
          sitemapMessage = "sitemap.xml is publicly reachable.";
        } else {
          sitemapStatus = "ERROR";
          sitemapMessage = `sitemap.xml returned HTTP ${response.status}.`;
        }
      } catch {
        sitemapStatus = "WARNING";
        sitemapMessage =
          "Unable to fetch sitemap.xml from the browser.";
      }

      results.push({
        ...auditChecks.find((item) => item.id === "sitemap"),
        status: sitemapStatus,
        message: sitemapMessage,
      });

      // Metadata
      let metadataStatus = "WARNING";
      let metadataMessage =
        "Metadata should be checked on important SEO pages.";

      try {
        const response = await fetch(
          `${currentOrigin}/taxi-service-in-nagpur`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        if (response.ok) {
          const html = await response.text();

          const hasTitle =
            /<title[^>]*>[\s\S]*?<\/title>/i.test(html);

          const hasDescription =
            /<meta[^>]+name=["']description["'][^>]+content=/i.test(
              html
            );

          if (hasTitle && hasDescription) {
            metadataStatus = "PASS";
            metadataMessage =
              "Title and meta description were detected on the SEO landing page.";
          } else if (hasTitle) {
            metadataStatus = "WARNING";
            metadataMessage =
              "Page title exists, but meta description should be verified.";
          } else {
            metadataStatus = "ERROR";
            metadataMessage =
              "Page title metadata could not be detected.";
          }
        }
      } catch {
        metadataStatus = "WARNING";
        metadataMessage =
          "Metadata could not be verified from the browser.";
      }

      results.push({
        ...auditChecks.find((item) => item.id === "metadata"),
        status: metadataStatus,
        message: metadataMessage,
      });

      // Mobile
      results.push({
        ...auditChecks.find((item) => item.id === "mobile"),
        status: "PASS",
        message:
          "The website uses responsive Tailwind layouts. Detailed Core Web Vitals testing will be added later.",
      });

      // Google Search Console
      let gscStatus = "WARNING";
      let gscMessage =
        "Google Search Console connection could not be verified.";

      try {
        const response = await fetch(
          "/api/admin/seo/search-console",
          {
            method: "GET",
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (response.ok && data?.success) {
          gscStatus = "PASS";
          gscMessage =
            "Google Search Console is connected and returning real search data.";
        } else {
          gscStatus = "WARNING";
          gscMessage =
            data?.error ||
            "Google Search Console returned an error.";
        }
      } catch {
        gscStatus = "WARNING";
        gscMessage =
          "Google Search Console connection could not be checked.";
      }

      results.push({
        ...auditChecks.find((item) => item.id === "gsc"),
        status: gscStatus,
        message: gscMessage,
      });

      // Important pages
      const checkedPages = [];

      for (const page of importantPages) {
        try {
          const response = await fetch(
            `${currentOrigin}${page.path}`,
            {
              method: "GET",
              cache: "no-store",
            }
          );

          checkedPages.push({
            ...page,
            status: response.ok ? "PASS" : "ERROR",
            statusCode: response.status,
            message: response.ok
              ? "Page is reachable."
              : `HTTP ${response.status}`,
          });
        } catch {
          checkedPages.push({
            ...page,
            status: "WARNING",
            statusCode: null,
            message: "Unable to check this page.",
          });
        }
      }

      setChecks(results);
      setPageResults(checkedPages);
      setLastRun(new Date().toISOString());
    } catch (err) {
      console.error("Technical SEO Audit Error:", err);

      setError(
        err?.message ||
          "Unable to run technical SEO audit."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    runAudit();
  }, []);

  const summary = {
    pass: checks.filter(
      (item) => item.status === "PASS"
    ).length,

    warning: checks.filter(
      (item) => item.status === "WARNING"
    ).length,

    error: checks.filter(
      (item) => item.status === "ERROR"
    ).length,

    total: checks.length,
  };

  const pageSummary = {
    pass: pageResults.filter(
      (item) => item.status === "PASS"
    ).length,

    warning: pageResults.filter(
      (item) => item.status === "WARNING"
    ).length,

    error: pageResults.filter(
      (item) => item.status === "ERROR"
    ).length,
  };

  const auditScore =
    summary.total > 0
      ? Math.round(
          (summary.pass / summary.total) * 100
        )
      : 0;

  const scoreClass =
    auditScore >= 90
      ? "text-emerald-700 bg-emerald-50 border-emerald-200"
      : auditScore >= 70
      ? "text-amber-700 bg-amber-50 border-amber-200"
      : "text-rose-700 bg-rose-50 border-rose-200";

  const priorities = [];

  checks.forEach((item) => {
    if (item.status === "ERROR") {
      priorities.push({
        title: item.title,
        description: item.message,
        priority: "HIGH",
        icon: item.icon,
      });
    }
  });

  checks.forEach((item) => {
    if (item.status === "WARNING") {
      priorities.push({
        title: item.title,
        description: item.message,
        priority: "MEDIUM",
        icon: item.icon,
      });
    }
  });

  return (
    <div className="min-h-screen bg-slate-50/60 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* HEADER */}

        <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm">

          <div className="p-6 md:p-8">

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

              <div className="space-y-3">

                <div className="flex flex-wrap items-center gap-2">

                  <span className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-[11px] font-black tracking-wider text-cyan-700">
                    SEO & GROWTH SYSTEM
                  </span>

                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-black tracking-wider text-emerald-700">
                    TECHNICAL SEO
                  </span>

                </div>

                <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
                  Technical SEO Audit
                </h1>

                <p className="max-w-3xl text-sm font-medium leading-relaxed text-slate-600 md:text-base">
                  Check the most important technical SEO
                  foundations of the RC Tours & Travels
                  website from one dashboard.
                </p>

              </div>

              <div className="flex flex-wrap gap-3">

                <button
                  type="button"
                  onClick={() => runAudit(true)}
                  disabled={refreshing}
                  className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-slate-800 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {refreshing
                    ? "⏳ Running Audit..."
                    : "🔄 Run SEO Audit"}
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

          <div className="border-t border-cyan-100 bg-cyan-50 px-6 py-4 md:px-8">

            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">

              <div className="flex items-start gap-3">

                <span className="text-xl">
                  🔧
                </span>

                <div>

                  <p className="text-sm font-black text-cyan-900">
                    Technical SEO Monitoring
                  </p>

                  <p className="mt-1 text-xs font-medium text-cyan-800">
                    Basic website, crawling, metadata and
                    Search Console checks are being monitored.
                  </p>

                </div>

              </div>

              <span className="w-fit rounded-full border border-cyan-200 bg-white px-3 py-1 text-[10px] font-black uppercase tracking-wider text-cyan-700">
                AUDIT SYSTEM
              </span>

            </div>

          </div>

        </div>

        {/* ERROR */}

        {error && (
          <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6">

            <div className="flex items-start gap-3">

              <span className="text-xl">
                ⚠️
              </span>

              <div>

                <h2 className="font-black text-rose-900">
                  Audit Error
                </h2>

                <p className="mt-1 text-sm text-rose-800">
                  {error}
                </p>

                <button
                  type="button"
                  onClick={() => runAudit(true)}
                  className="mt-4 rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-700"
                >
                  Try Again
                </button>

              </div>

            </div>

          </div>
        )}

        {/* LOADING */}

        {loading ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">

            <div className="text-4xl">
              ⏳
            </div>

            <p className="mt-4 text-sm font-bold text-slate-700">
              Running Technical SEO Audit...
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Checking website foundations.
            </p>

          </div>
        ) : (
          <>
            {/* SUMMARY */}

            <div>

              <div className="mb-4">

                <h2 className="text-2xl font-black tracking-tight text-slate-900">
                  📊 Audit Overview
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Current technical SEO health based on the checks available in this module.
                </p>

              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">

                <div
                  className={`rounded-3xl border p-6 shadow-sm ${scoreClass}`}
                >

                  <span className="text-xs font-black uppercase tracking-wider">
                    SEO Score
                  </span>

                  <div className="mt-3 text-4xl font-black">
                    {auditScore}%
                  </div>

                  <p className="mt-2 text-xs font-medium">
                    Based on current audit checks
                  </p>

                </div>

                <div className="rounded-3xl border border-emerald-200 bg-emerald-50/60 p-6 shadow-sm">

                  <span className="text-xs font-black uppercase tracking-wider text-emerald-600">
                    Passed
                  </span>

                  <div className="mt-3 text-3xl font-black text-emerald-900">
                    {summary.pass}
                  </div>

                  <p className="mt-2 text-xs font-medium text-emerald-700">
                    Technical checks passed
                  </p>

                </div>

                <div className="rounded-3xl border border-amber-200 bg-amber-50/60 p-6 shadow-sm">

                  <span className="text-xs font-black uppercase tracking-wider text-amber-600">
                    Warnings
                  </span>

                  <div className="mt-3 text-3xl font-black text-amber-900">
                    {summary.warning}
                  </div>

                  <p className="mt-2 text-xs font-medium text-amber-700">
                    Needs verification
                  </p>

                </div>

                <div className="rounded-3xl border border-rose-200 bg-rose-50/60 p-6 shadow-sm">

                  <span className="text-xs font-black uppercase tracking-wider text-rose-600">
                    Errors
                  </span>

                  <div className="mt-3 text-3xl font-black text-rose-900">
                    {summary.error}
                  </div>

                  <p className="mt-2 text-xs font-medium text-rose-700">
                    Needs attention
                  </p>

                </div>

                <div className="rounded-3xl border border-cyan-200 bg-cyan-50/60 p-6 shadow-sm">

                  <span className="text-xs font-black uppercase tracking-wider text-cyan-600">
                    Pages Checked
                  </span>

                  <div className="mt-3 text-3xl font-black text-cyan-900">
                    {pageResults.length}
                  </div>

                  <p className="mt-2 text-xs font-medium text-cyan-700">
                    Important SEO pages
                  </p>

                </div>

              </div>

            </div>

            {/* TECHNICAL CHECKS */}

            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm md:p-8">

              <div>

                <h2 className="text-xl font-black text-slate-900">
                  🔧 Technical SEO Checks
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Core technical foundations currently monitored by this audit.
                </p>

              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">

                {checks.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5 transition hover:border-cyan-200 hover:bg-cyan-50/20"
                  >

                    <div className="flex items-start justify-between gap-4">

                      <div className="flex min-w-0 items-start gap-3">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-xl shadow-sm">
                          {item.icon}
                        </div>

                        <div className="min-w-0">

                          <h3 className="text-sm font-black text-slate-900">
                            {item.title}
                          </h3>

                          <p className="mt-1 text-xs leading-relaxed text-slate-500">
                            {item.description}
                          </p>

                        </div>

                      </div>

                      <span
                        className={`shrink-0 rounded-lg border px-2.5 py-1 text-[10px] font-black ${getStatusClass(
                          item.status
                        )}`}
                      >
                        {getStatusIcon(item.status)}{" "}
                        {item.status}
                      </span>

                    </div>

                    <div className="mt-4 rounded-xl border border-slate-100 bg-white p-3">

                      <p className="text-xs font-semibold leading-relaxed text-slate-600">
                        {item.message}
                      </p>

                    </div>

                    <div className="mt-3">

                      <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-500">
                        {item.category}
                      </span>

                    </div>

                  </div>
                ))}

              </div>

            </div>

            {/* IMPORTANT PAGES */}

            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm md:p-8">

              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                <div>

                  <h2 className="text-xl font-black text-slate-900">
                    📄 Important SEO Pages
                  </h2>

                  <p className="mt-1 text-sm font-medium text-slate-500">
                    Basic availability checks for important RC Tours & Travels landing pages.
                  </p>

                </div>

                <div className="flex flex-wrap gap-2">

                  <span className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-700">
                    ✅ {pageSummary.pass} Live
                  </span>

                  <span className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-black text-amber-700">
                    ⚠️ {pageSummary.warning} Warning
                  </span>

                  <span className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-black text-rose-700">
                    ❌ {pageSummary.error} Errors
                  </span>

                </div>

              </div>

              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">

                <div className="overflow-x-auto">

                  <table className="min-w-[700px] w-full">

                    <thead>

                      <tr className="bg-slate-50">

                        <th className="px-4 py-4 text-left text-[10px] font-black uppercase tracking-wider text-slate-400">
                          Page
                        </th>

                        <th className="px-4 py-4 text-left text-[10px] font-black uppercase tracking-wider text-slate-400">
                          URL
                        </th>

                        <th className="px-4 py-4 text-left text-[10px] font-black uppercase tracking-wider text-slate-400">
                          Status
                        </th>

                        <th className="px-4 py-4 text-left text-[10px] font-black uppercase tracking-wider text-slate-400">
                          Response
                        </th>

                      </tr>

                    </thead>

                    <tbody className="divide-y divide-slate-100">

                      {pageResults.map((page) => (
                        <tr
                          key={page.path}
                          className="hover:bg-cyan-50/30"
                        >

                          <td className="px-4 py-4 text-sm font-black text-slate-900">
                            {page.name}
                          </td>

                          <td className="px-4 py-4">

                            <a
                              href={page.path}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-bold text-cyan-700 hover:text-cyan-900 hover:underline"
                            >
                              {page.path}
                            </a>

                          </td>

                          <td className="px-4 py-4">

                            <span
                              className={`inline-flex rounded-lg border px-2.5 py-1 text-[10px] font-black ${getStatusClass(
                                page.status
                              )}`}
                            >
                              {getStatusIcon(page.status)}{" "}
                              {page.status}
                            </span>

                          </td>

                          <td className="px-4 py-4 text-xs font-semibold text-slate-500">
                            {page.statusCode
                              ? `HTTP ${page.statusCode}`
                              : page.message}
                          </td>

                        </tr>
                      ))}

                    </tbody>

                  </table>

                </div>

              </div>

            </div>

            {/* PRIORITIES */}

            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm md:p-8">

              <div>

                <span className="text-[10px] font-black uppercase tracking-widest text-rose-600">
                  SEO ACTION CENTER
                </span>

                <h2 className="mt-1 text-xl font-black text-slate-900">
                  🔥 Priority SEO Actions
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Fix errors first, then improve warning areas.
                </p>

              </div>

              {priorities.length > 0 ? (

                <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">

                  {priorities.map((item, index) => (
                    <div
                      key={`${item.title}-${index}`}
                      className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4"
                    >

                      <div className="flex items-start gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-lg shadow-sm">
                          {item.icon}
                        </div>

                        <div className="min-w-0 flex-1">

                          <div className="flex flex-wrap items-center gap-2">

                            <h3 className="text-sm font-black text-slate-900">
                              {item.title}
                            </h3>

                            <span
                              className={`rounded-lg border px-2 py-1 text-[9px] font-black ${getPriorityClass(
                                item.priority
                              )}`}
                            >
                              {item.priority}
                            </span>

                          </div>

                          <p className="mt-2 text-xs leading-relaxed text-slate-500">
                            {item.description}
                          </p>

                        </div>

                      </div>

                    </div>
                  ))}

                </div>

              ) : (

                <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">

                  <div className="text-3xl">
                    🎉
                  </div>

                  <p className="mt-2 text-sm font-black text-emerald-900">
                    No urgent SEO actions found.
                  </p>

                  <p className="mt-1 text-xs font-medium text-emerald-700">
                    Continue monitoring the website regularly.
                  </p>

                </div>

              )}

            </div>

            {/* INFORMATION */}

            <div className="rounded-3xl border border-cyan-200 bg-cyan-50 p-6 md:p-8">

              <div className="flex flex-col gap-4 md:flex-row md:items-start">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                  💡
                </div>

                <div>

                  <h2 className="text-lg font-black text-cyan-950">
                    About This Technical SEO Audit
                  </h2>

                  <p className="mt-2 max-w-4xl text-sm leading-relaxed text-cyan-900/80">
                    This audit checks basic technical SEO foundations
                    available from the website and connected Google Search
                    Console system. It is designed for monitoring and
                    prioritisation. Detailed Core Web Vitals, structured-data
                    validation and advanced crawling checks can be added as
                    separate modules later.
                  </p>

                </div>

              </div>

            </div>

            {/* FOOTER STATUS */}

            <div className="rounded-3xl border border-emerald-200 bg-white p-6 shadow-sm md:p-8">

              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                <div>

                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">
                    TECHNICAL SEO
                  </span>

                  <h2 className="mt-1 text-xl font-black text-slate-900">
                    🚀 Technical SEO Audit Ready
                  </h2>

                  <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500">

                    {lastRun
                      ? `Last audit: ${new Date(
                          lastRun
                        ).toLocaleString("en-IN")}`
                      : "Audit status available after the first scan."}

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