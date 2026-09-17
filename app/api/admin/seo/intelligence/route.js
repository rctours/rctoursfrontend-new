import { NextResponse } from "next/server";
import { google } from "googleapis";
import clientPromise from "@/lib/mongodb";
import { verifyAdmin } from "@/lib/auth";

// ============================================================
// RC TOURS & TRAVELS
// SEO INTELLIGENCE ENGINE
// Version 1.1
//
// - Google Search Console intelligence
// - URL normalization
// - Keyword intent classification
// - Commercial priority
// - Keyword opportunities
// - Page intelligence
// - Ranking movement
// - Diagnosis + Medicine
// - SEO Health
// - Booking business signal
//
// READ ONLY:
// - Does not modify Search Console
// - Does not write to MongoDB
// ============================================================

const SITE_URL = "sc-domain:rctoursandtravels.in";

const SEARCH_CONSOLE_SCOPE =
  "https://www.googleapis.com/auth/webmasters.readonly";

const CANONICAL_HOST = "www.rctoursandtravels.in";

// ============================================================
// TARGET KEYWORDS
// ============================================================

const TARGET_KEYWORDS = [
  {
    keyword: "taxi service in nagpur",
    intent: "local-service",
    commercial: true,
    targetPage: "/taxi-service-in-nagpur",
  },
  {
    keyword: "cab service in nagpur",
    intent: "local-service",
    commercial: true,
    targetPage: "/",
  },
  {
    keyword: "nagpur taxi service",
    intent: "local-service",
    commercial: true,
    targetPage: "/taxi-service-in-nagpur",
  },
  {
    keyword: "nagpur airport taxi",
    intent: "airport",
    commercial: true,
    targetPage: "/nagpur-airport-taxi",
  },
  {
    keyword: "nagpur airport cab",
    intent: "airport",
    commercial: true,
    targetPage: "/airport-taxi-nagpur",
  },
  {
    keyword: "airport taxi nagpur",
    intent: "airport",
    commercial: true,
    targetPage: "/airport-taxi-nagpur",
  },
  {
    keyword: "nagpur to tadoba taxi",
    intent: "outstation",
    commercial: true,
    targetPage: "/nagpur-to-tadoba-cab",
  },
  {
    keyword: "nagpur to tadoba cab",
    intent: "outstation",
    commercial: true,
    targetPage: "/nagpur-to-tadoba-cab",
  },
  {
    keyword: "nagpur to pench taxi",
    intent: "outstation",
    commercial: true,
    targetPage: "/nagpur-to-pench-cab",
  },
  {
    keyword: "nagpur to pench cab",
    intent: "outstation",
    commercial: true,
    targetPage: "/nagpur-to-pench-cab",
  },
  {
    keyword: "nagpur local taxi",
    intent: "local-service",
    commercial: true,
    targetPage: "/nagpur-local-taxi",
  },
  {
    keyword: "tempo traveller in nagpur",
    intent: "vehicle-rental",
    commercial: true,
    targetPage: "/fleet",
  },
  {
    keyword: "innova crysta rental nagpur",
    intent: "vehicle-rental",
    commercial: true,
    targetPage: "/fleet",
  },
];

// ============================================================
// DATE HELPERS
// ============================================================

function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

function parseDate(value) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return null;
  }

  const date = new Date(`${value}T00:00:00.000Z`);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

function addDays(date, days) {
  const result = new Date(date);
  result.setUTCDate(result.getUTCDate() + days);
  return result;
}

function getDateRanges(searchParams) {
  const requestedStart = searchParams.get("startDate");
  const requestedEnd = searchParams.get("endDate");

  const today = new Date();

  const defaultEnd = addDays(today, -1);
  const defaultStart = addDays(defaultEnd, -27);

  const endDate = requestedEnd
    ? parseDate(requestedEnd)
    : defaultEnd;

  const startDate = requestedStart
    ? parseDate(requestedStart)
    : defaultStart;

  if (!startDate || !endDate) {
    throw new Error(
      "Invalid date. Use YYYY-MM-DD format."
    );
  }

  if (startDate > endDate) {
    throw new Error(
      "startDate cannot be after endDate."
    );
  }

  const totalDays =
    Math.floor(
      (endDate - startDate) /
        (1000 * 60 * 60 * 24)
    ) + 1;

  if (totalDays > 90) {
    throw new Error(
      "SEO Intelligence supports a maximum 90-day date range."
    );
  }

  const previousEnd = addDays(startDate, -1);

  const previousStart = addDays(
    previousEnd,
    -(totalDays - 1)
  );

  return {
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
    previousStartDate: formatDate(previousStart),
    previousEndDate: formatDate(previousEnd),
    totalDays,
  };
}

// ============================================================
// NUMBER HELPERS
// ============================================================

function safeNumber(value) {
  const number = Number(value);

  return Number.isFinite(number)
    ? number
    : 0;
}

function round(value, decimals = 2) {
  const multiplier = 10 ** decimals;

  return (
    Math.round(
      (safeNumber(value) + Number.EPSILON) *
        multiplier
    ) / multiplier
  );
}

function clamp(value, min, max) {
  return Math.min(
    Math.max(value, min),
    max
  );
}

function calculatePercentChange(
  current,
  previous
) {
  current = safeNumber(current);
  previous = safeNumber(previous);

  if (previous === 0) {
    return current === 0 ? 0 : null;
  }

  return (
    ((current - previous) /
      Math.abs(previous)) *
    100
  );
}

// ============================================================
// URL NORMALIZATION
// ============================================================

function normalizePath(value) {
  if (!value) {
    return "/";
  }

  try {
    const url = new URL(value);

    let pathname = url.pathname || "/";

    if (pathname.length > 1) {
      pathname = pathname.replace(/\/+$/, "");
    }

    return pathname || "/";
  } catch {
    return value
      .replace(/^https?:\/\//i, "")
      .replace(/^www\./i, "")
      .split("?")[0]
      .split("#")[0]
      .replace(/\/+$/, "") || "/";
  }
}

function normalizeUrl(value) {
  const path = normalizePath(value);

  return `https://${CANONICAL_HOST}${
    path === "/" ? "/" : path
  }`;
}

function analyzeUrlVersions(rows) {
  const grouped = new Map();

  for (const row of rows) {
    const rawPage = row.keys?.[0] || "";

    if (!rawPage) {
      continue;
    }

    const normalized = normalizeUrl(rawPage);

    if (!grouped.has(normalized)) {
      grouped.set(normalized, {
        canonicalUrl: normalized,
        variants: [],
        clicks: 0,
        impressions: 0,
      });
    }

    const group = grouped.get(normalized);

    group.variants.push({
      url: rawPage,
      clicks: round(row.clicks, 0),
      impressions: round(row.impressions, 0),
      position: round(row.position, 1),
      ctr: round(row.ctr * 100, 2),
    });

    group.clicks += row.clicks;
    group.impressions += row.impressions;
  }

  const duplicateGroups = [];

  for (const group of grouped.values()) {
    const uniqueVariants = [
      ...new Set(
        group.variants.map(
          (item) => item.url
        )
      ),
    ];

    if (uniqueVariants.length > 1) {
      duplicateGroups.push({
        ...group,
        clicks: round(group.clicks, 0),
        impressions: round(
          group.impressions,
          0
        ),
        variantCount:
          uniqueVariants.length,
      });
    }
  }

  return {
    uniqueNormalizedPages:
      grouped.size,

    duplicateUrlGroups:
      duplicateGroups.sort(
        (a, b) =>
          b.impressions -
          a.impressions
      ),

    duplicateUrlCount:
      duplicateGroups.length,
  };
}

// ============================================================
// GOOGLE CREDENTIALS
// ============================================================

function getGoogleCredentials() {
  const encoded =
    process.env
      .GOOGLE_SERVICE_ACCOUNT_JSON_BASE64;

  if (!encoded) {
    throw new Error(
      "GOOGLE_SERVICE_ACCOUNT_JSON_BASE64 is missing from environment variables."
    );
  }

  let decoded;

  try {
    decoded =
      Buffer.from(
        encoded,
        "base64"
      ).toString("utf8");
  } catch {
    throw new Error(
      "Google service account credentials could not be decoded."
    );
  }

  try {
    return JSON.parse(decoded);
  } catch {
    throw new Error(
      "Google service account credentials contain invalid JSON."
    );
  }
}

function getSearchConsoleClient() {
  const credentials =
    getGoogleCredentials();

  const auth =
    new google.auth.GoogleAuth({
      credentials,
      scopes: [
        SEARCH_CONSOLE_SCOPE,
      ],
    });

  return google.searchconsole({
    version: "v1",
    auth,
  });
}

// ============================================================
// SEARCH CONSOLE
// ============================================================

async function querySearchConsole(
  searchconsole,
  startDate,
  endDate,
  dimensions = [],
  rowLimit = 1000
) {
  const response =
    await searchconsole.searchanalytics.query(
      {
        siteUrl: SITE_URL,
        requestBody: {
          startDate,
          endDate,
          dimensions,
          rowLimit,
          dataState: "final",
        },
      }
    );

  return response;
}

function normalizeRows(response) {
  const rows =
    response?.data?.rows || [];

  return rows.map((row) => ({
    keys: row.keys || [],
    clicks: safeNumber(
      row.clicks
    ),
    impressions: safeNumber(
      row.impressions
    ),
    ctr: safeNumber(row.ctr),
    position: safeNumber(
      row.position
    ),
  }));
}

function normalizeOverall(response) {
  const rows =
    normalizeRows(response);

  if (!rows.length) {
    return {
      clicks: 0,
      impressions: 0,
      ctr: 0,
      position: 0,
    };
  }

  return rows[0];
}

// ============================================================
// KEYWORD INTENT
// ============================================================

function classifyKeywordIntent(query) {
  const text = String(query || "")
    .trim()
    .toLowerCase();

  if (!text) {
    return {
      intent: "other",
      commercial: false,
      commercialScore: 0,
    };
  }

  // ---------------- BRAND ----------------

  const brandTerms = [
    "rc tours",
    "rc tour",
    "rc travels",
    "rc travel",
    "rc tours and travels",
    "rc trips",
  ];

  if (
    brandTerms.some((term) =>
      text.includes(term)
    )
  ) {
    return {
      intent: "brand",
      commercial: false,
      commercialScore: 20,
    };
  }

  // ---------------- AIRPORT ----------------

  if (
    /(airport|flight|pickup.*airport|drop.*airport)/i.test(
      text
    )
  ) {
    return {
      intent: "airport",
      commercial: true,
      commercialScore: 95,
    };
  }

  // ---------------- OUTSTATION ----------------

  if (
    /(nagpur to|taxi to|cab to|cab from|taxi from|outstation|tadoba|pench|shirdi|pune|goa|hyderabad|amravati|wardha|bhandara)/i.test(
      text
    )
  ) {
    return {
      intent: "outstation",
      commercial: true,
      commercialScore: 95,
    };
  }

  // ---------------- VEHICLE RENTAL ----------------

  if (
    /(innova|crysta|ertiga|dzire|swift|rumion|car rental|car rent|vehicle rental|tempo traveller|traveller|urbania)/i.test(
      text
    )
  ) {
    return {
      intent: "vehicle-rental",
      commercial: true,
      commercialScore: 90,
    };
  }

  // ---------------- LOCAL SERVICE ----------------

  if (
    /(taxi|cab|car|rental|booking|hire|hiring|driver|transport|travels|travel agency)/i.test(
      text
    ) &&
    /(nagpur|dighori|near me|nearby|local)/i.test(
      text
    )
  ) {
    return {
      intent: "local-service",
      commercial: true,
      commercialScore: 90,
    };
  }

  // ---------------- INFORMATIONAL ----------------

  if (
    /(distance|how far|how long|route|timing|time|price|fare|cost|places|things to do|information|meaning|number)/i.test(
      text
    )
  ) {
    return {
      intent: "informational",
      commercial: false,
      commercialScore: 35,
    };
  }

  // ---------------- OTHER ----------------

  return {
    intent: "other",
    commercial: false,
    commercialScore: 40,
  };
}

// ============================================================
// KEYWORD ANALYSIS
// ============================================================

function analyzeKeywords(rows) {
  const opportunities = [];
  const protect = [];

  const enriched = rows
    .map((row) => {
      const query =
        row.keys?.[0] || "";

      const intent =
        classifyKeywordIntent(query);

      return {
        query,
        position: round(
          row.position,
          1
        ),
        impressions: round(
          row.impressions,
          0
        ),
        clicks: round(
          row.clicks,
          0
        ),
        ctr: round(
          row.ctr * 100,
          2
        ),
        intent: intent.intent,
        commercial:
          intent.commercial,
        commercialScore:
          intent.commercialScore,
      };
    })
    .filter(
      (item) => item.query
    );

  for (const item of enriched) {
    const {
      position,
      impressions,
      intent,
      commercialScore,
    } = item;

    // -----------------------------------------
    // TOP 3
    // -----------------------------------------

    if (
      position > 0 &&
      position <= 3 &&
      impressions >= 5
    ) {
      protect.push({
        ...item,
        type: "protect",
        priority: "PROTECT",
        reason:
          "This query already has strong search visibility and should be protected.",
      });

      continue;
    }

    // -----------------------------------------
    // TOP 10
    // -----------------------------------------

    if (
      position >= 4 &&
      position <= 10 &&
      impressions >= 5
    ) {
      let priority = "MEDIUM";

      if (
        commercialScore >= 90 &&
        impressions >= 20
      ) {
        priority = "HIGH";
      } else if (
        commercialScore >= 90
      ) {
        priority = "MEDIUM";
      } else if (
        impressions >= 20
      ) {
        priority = "MEDIUM";
      }

      opportunities.push({
        ...item,
        type: "top10-growth",
        priority,
        reason:
          commercialScore >= 90
            ? "Commercial search intent with existing page-one visibility."
            : "Existing page-one visibility with room for stronger performance.",
      });

      continue;
    }

    // -----------------------------------------
    // PAGE 2
    // -----------------------------------------

    if (
      position > 10 &&
      position <= 20 &&
      impressions >= 5
    ) {
      let priority = "WATCH";

      if (
        commercialScore >= 90 &&
        impressions >= 10
      ) {
        priority = "HIGH";
      } else if (
        commercialScore >= 90
      ) {
        priority = "MEDIUM";
      } else if (
        impressions >= 15
      ) {
        priority = "MEDIUM";
      }

      opportunities.push({
        ...item,
        type: "page2-opportunity",
        priority,
        reason:
          commercialScore >= 90
            ? "Commercial search intent is visible on page two and deserves targeted improvement."
            : "The query has measurable page-two visibility.",
      });

      continue;
    }

    // -----------------------------------------
    // BEYOND PAGE 2
    // -----------------------------------------

    if (
      position > 20 &&
      impressions >= 10
    ) {
      opportunities.push({
        ...item,
        type: "visibility-growth",
        priority:
          commercialScore >= 90
            ? "MEDIUM"
            : "WATCH",
        reason:
          commercialScore >= 90
            ? "Commercial query has impressions but weak current ranking visibility."
            : "The query has impressions but weak current ranking visibility.",
      });
    }
  }

  // Commercial opportunities first.
  opportunities.sort(
    (a, b) => {
      const priorityWeight = {
        HIGH: 3,
        MEDIUM: 2,
        WATCH: 1,
      };

      return (
        (priorityWeight[b.priority] || 0) -
          (priorityWeight[a.priority] || 0) ||
        b.commercialScore -
          a.commercialScore ||
        b.impressions -
          a.impressions
      );
    }
  );

  protect.sort(
    (a, b) =>
      b.impressions -
      a.impressions
  );

  return {
    totalTrackedQueries:
      enriched.length,

    commercialQueries:
      enriched.filter(
        (item) => item.commercial
      ).length,

    brandQueries:
      enriched.filter(
        (item) =>
          item.intent === "brand"
      ).length,

    intentSummary: {
      brand: enriched.filter(
        (item) =>
          item.intent === "brand"
      ).length,

      localService: enriched.filter(
        (item) =>
          item.intent ===
          "local-service"
      ).length,

      airport: enriched.filter(
        (item) =>
          item.intent ===
          "airport"
      ).length,

      outstation: enriched.filter(
        (item) =>
          item.intent ===
          "outstation"
      ).length,

      vehicleRental: enriched.filter(
        (item) =>
          item.intent ===
          "vehicle-rental"
      ).length,

      informational: enriched.filter(
        (item) =>
          item.intent ===
          "informational"
      ).length,

      other: enriched.filter(
        (item) =>
          item.intent ===
          "other"
      ).length,
    },

    opportunities:
      opportunities.slice(0, 50),

    protect:
      protect.slice(0, 25),

    rising: [],
    declining: [],
  };
}

// ============================================================
// PAGE ANALYSIS
// ============================================================

function analyzePages(rows) {
  const pages = rows
    .map((row) => ({
      page: normalizeUrl(
        row.keys?.[0] || ""
      ),
      originalPage:
        row.keys?.[0] || "",
      position: round(
        row.position,
        1
      ),
      impressions: round(
        row.impressions,
        0
      ),
      clicks: round(
        row.clicks,
        0
      ),
      ctr: round(
        row.ctr * 100,
        2
      ),
    }))
    .filter(
      (item) => item.page
    );

  const pageMap = new Map();

  for (const page of pages) {
    if (!pageMap.has(page.page)) {
      pageMap.set(
        page.page,
        {
          page: page.page,
          clicks: 0,
          impressions: 0,
          variants: [],
        }
      );
    }

    const item =
      pageMap.get(page.page);

    item.clicks += page.clicks;
    item.impressions +=
      page.impressions;

    item.variants.push(
      page.originalPage
    );
  }

  const normalizedPages =
    Array.from(
      pageMap.values()
    ).map((page) => ({
      ...page,
      clicks: round(
        page.clicks,
        0
      ),
      impressions: round(
        page.impressions,
        0
      ),
      variantCount:
        [
          ...new Set(
            page.variants
          ),
        ].length,
    }));

  const highVisibilityPages =
    pages
      .filter(
        (page) =>
          page.impressions >= 10
      )
      .sort(
        (a, b) =>
          b.impressions -
          a.impressions
      )
      .slice(0, 25);

  const lowCtrPages =
    pages
      .filter(
        (page) =>
          page.impressions >= 20 &&
          page.ctr < 2
      )
      .sort(
        (a, b) =>
          b.impressions -
          a.impressions
      )
      .slice(0, 25);

  const strongPages =
    pages
      .filter(
        (page) =>
          page.position > 0 &&
          page.position <= 10 &&
          page.impressions >= 5
      )
      .sort(
        (a, b) =>
          b.impressions -
          a.impressions
      )
      .slice(0, 25);

  return {
    totalPages:
      normalizedPages.length,

    pages:
      highVisibilityPages,

    lowCtrPages,

    strongPages,

    normalizedPages:
      normalizedPages
        .sort(
          (a, b) =>
            b.impressions -
            a.impressions
        )
        .slice(0, 100),
  };
}

// ============================================================
// QUERY + PAGE
// ============================================================

function analyzeQueryPages(rows) {
  return rows
    .map((row) => {
      const query =
        row.keys?.[0] || "";

      const page =
        row.keys?.[1] || "";

      const intent =
        classifyKeywordIntent(
          query
        );

      return {
        query,
        page: normalizeUrl(page),
        originalPage: page,
        position: round(
          row.position,
          1
        ),
        impressions: round(
          row.impressions,
          0
        ),
        clicks: round(
          row.clicks,
          0
        ),
        ctr: round(
          row.ctr * 100,
          2
        ),
        intent:
          intent.intent,
        commercial:
          intent.commercial,
        commercialScore:
          intent.commercialScore,
      };
    })
    .filter(
      (row) =>
        row.query &&
        row.page
    )
    .sort(
      (a, b) =>
        b.commercialScore -
          a.commercialScore ||
        b.impressions -
          a.impressions
    )
    .slice(0, 150);
}

// ============================================================
// TARGET KEYWORDS
// ============================================================

function analyzeTargetKeywords(
  queryRows
) {
  const normalizedMap =
    new Map();

  for (const row of queryRows) {
    const query = String(
      row.keys?.[0] || ""
    )
      .trim()
      .toLowerCase();

    if (!query) {
      continue;
    }

    const existing =
      normalizedMap.get(query);

    if (
      !existing ||
      row.impressions >
        existing.impressions
    ) {
      normalizedMap.set(
        query,
        row
      );
    }
  }

  return TARGET_KEYWORDS.map(
    (target) => {
      const row =
        normalizedMap.get(
          target.keyword
        );

      if (!row) {
        return {
          ...target,
          found: false,
          position: null,
          impressions: 0,
          clicks: 0,
          ctr: 0,
          status:
            "NO_CURRENT_DATA",
        };
      }

      let status =
        "WATCH";

      if (row.position <= 3) {
        status = "TOP_3";
      } else if (
        row.position <= 10
      ) {
        status = "TOP_10";
      } else if (
        row.position <= 20
      ) {
        status = "PAGE_2";
      } else {
        status =
          "BEYOND_PAGE_2";
      }

      return {
        ...target,
        found: true,
        position: round(
          row.position,
          1
        ),
        impressions: round(
          row.impressions,
          0
        ),
        clicks: round(
          row.clicks,
          0
        ),
        ctr: round(
          row.ctr * 100,
          2
        ),
        status,
      };
    }
  );
}

// ============================================================
// HEALTH SCORE
// ============================================================

function calculateHealth({
  overall,
  keywordAnalysis,
  pageAnalysis,
  targetKeywords,
  urlAnalysis,
}) {
  // ----------------------------------------------------------
  // Visibility
  // ----------------------------------------------------------

  let visibilityScore = 0;

  if (overall.impressions > 0) {
    visibilityScore = 100;
  }

  if (
    overall.position > 0
  ) {
    if (
      overall.position <= 5
    ) {
      visibilityScore -= 0;
    } else if (
      overall.position <= 10
    ) {
      visibilityScore -= 5;
    } else if (
      overall.position <= 20
    ) {
      visibilityScore -= 15;
    } else if (
      overall.position <= 50
    ) {
      visibilityScore -= 30;
    } else {
      visibilityScore -= 45;
    }
  }

  visibilityScore = clamp(
    visibilityScore,
    0,
    100
  );

  // ----------------------------------------------------------
  // Commercial keyword health
  // ----------------------------------------------------------

  const commercialTargets =
    targetKeywords.filter(
      (item) =>
        item.commercial
    );

  let keywordScore = 0;

  if (
    commercialTargets.length
  ) {
    let points = 0;

    for (
      const item of commercialTargets
    ) {
      if (
        item.status ===
        "TOP_3"
      ) {
        points += 100;
      } else if (
        item.status ===
        "TOP_10"
      ) {
        points += 80;
      } else if (
        item.status ===
        "PAGE_2"
      ) {
        points += 55;
      } else if (
        item.status ===
        "BEYOND_PAGE_2"
      ) {
        points += 25;
      } else {
        points += 15;
      }
    }

    keywordScore =
      points /
      commercialTargets.length;
  }

  // ----------------------------------------------------------
  // CTR
  // ----------------------------------------------------------

  let ctrScore = 0;

  if (
    overall.impressions > 0
  ) {
    ctrScore = clamp(
      overall.ctr * 100 * 4,
      0,
      100
    );
  }

  // ----------------------------------------------------------
  // Page health
  // ----------------------------------------------------------

  let pageScore = 0;

  if (
    pageAnalysis.totalPages > 0
  ) {
    const strongPageRatio =
      pageAnalysis.strongPages
        .length /
      pageAnalysis.totalPages;

    pageScore = clamp(
      strongPageRatio * 100,
      0,
      100
    );

    if (
      pageAnalysis.strongPages
        .length === 0
    ) {
      pageScore = 30;
    }
  }

  // ----------------------------------------------------------
  // URL health
  // ----------------------------------------------------------

  let urlScore = 100;

  if (
    urlAnalysis.duplicateUrlCount >
    0
  ) {
    urlScore = clamp(
      100 -
        urlAnalysis.duplicateUrlCount *
          10,
      40,
      100
    );
  }

  // ----------------------------------------------------------
  // Opportunity load
  // ----------------------------------------------------------

  const highPriority =
    keywordAnalysis.opportunities.filter(
      (item) =>
        item.priority ===
        "HIGH"
    ).length;

  const opportunityScore =
    clamp(
      100 -
        highPriority * 4,
      20,
      100
    );

  // ----------------------------------------------------------
  // Final weighted score
  // ----------------------------------------------------------

  const score =
    visibilityScore * 0.20 +
    keywordScore * 0.30 +
    ctrScore * 0.15 +
    pageScore * 0.15 +
    urlScore * 0.10 +
    opportunityScore * 0.10;

  return {
    score: round(
      clamp(score, 0, 100),
      1
    ),

    components: {
      visibility: round(
        visibilityScore,
        1
      ),

      commercialKeywords:
        round(
          keywordScore,
          1
        ),

      ctr: round(
        ctrScore,
        1
      ),

      pages: round(
        pageScore,
        1
      ),

      urlHealth: round(
        urlScore,
        1
      ),

      opportunityLoad:
        round(
          opportunityScore,
          1
        ),
    },

    methodology:
      "Internal SEO diagnostic indicator based on Search Console visibility, commercial target-keyword positions, CTR, page visibility, URL normalization signals and opportunity load. It is not a Google ranking score.",
  };
}

// ============================================================
// HEALTH STATUS
// ============================================================

function getHealthStatus(score) {
  if (score < 40) {
    return {
      label: "Critical",
      color: "red",
      description:
        "Important SEO signals need immediate treatment.",
    };
  }

  if (score < 60) {
    return {
      label: "Under Treatment",
      color: "orange",
      description:
        "The website has measurable visibility, but several SEO areas need work.",
    };
  }

  if (score < 80) {
    return {
      label: "Recovering",
      color: "yellow",
      description:
        "SEO visibility is developing and targeted improvements can strengthen performance.",
    };
  }

  return {
    label: "Healthy",
    color: "green",
    description:
      "Available SEO signals are comparatively strong while ongoing optimization remains necessary.",
  };
}

// ============================================================
// DIAGNOSIS
// ============================================================

function buildDiagnoses({
  overall,
  period,
  keywordAnalysis,
  pageAnalysis,
  targetKeywords,
  urlAnalysis,
}) {
  const diagnoses = [];

  // ----------------------------------------------------------
  // URL DUPLICATION
  // ----------------------------------------------------------

  if (
    urlAnalysis.duplicateUrlCount >
    0
  ) {
    diagnoses.push({
      code: "URL_VARIANTS",
      severity: "HIGH",
      title:
        "Search Console is reporting multiple URL variants",
      reason:
        `${urlAnalysis.duplicateUrlCount} normalized page group(s) contain multiple URL variants such as HTTP, HTTPS, www or non-www.`,
      medicine: [
        "Keep one canonical HTTPS hostname.",
        "Verify HTTP redirects to HTTPS.",
        "Verify www/non-www redirects consistently.",
        "Make canonical tags use the preferred URL.",
        "Use the preferred URL in internal links and sitemap.",
      ],
      examples:
        urlAnalysis.duplicateUrlGroups
          .slice(0, 5),
    });
  }

  // ----------------------------------------------------------
  // COMMERCIAL PAGE 2
  // ----------------------------------------------------------

  const commercialPageTwo =
    keywordAnalysis.opportunities.filter(
      (item) =>
        item.type ===
          "page2-opportunity" &&
        item.commercial
    );

  if (
    commercialPageTwo.length
  ) {
    diagnoses.push({
      code:
        "COMMERCIAL_PAGE_TWO",
      severity: "HIGH",
      title:
        "Commercial keywords are on page two",
      reason:
        `${commercialPageTwo.length} commercial queries are currently between positions 11 and 20.`,
      medicine: [
        "Map each query to the most relevant existing landing page.",
        "Strengthen content for the actual search intent.",
        "Add contextual internal links from relevant pages.",
        "Improve title and meta description where CTR is weak.",
      ],
      examples:
        commercialPageTwo
          .slice(0, 8),
    });
  }

  // ----------------------------------------------------------
  // COMMERCIAL TOP 10
  // ----------------------------------------------------------

  const commercialTop10 =
    keywordAnalysis.opportunities.filter(
      (item) =>
        item.type ===
          "top10-growth" &&
        item.commercial
    );

  if (
    commercialTop10.length
  ) {
    diagnoses.push({
      code:
        "COMMERCIAL_TOP10_GROWTH",
      severity: "MEDIUM",
      title:
        "Commercial keywords already have page-one visibility",
      reason:
        `${commercialTop10.length} commercial queries are already in positions 4–10.`,
      medicine: [
        "Protect the relevant landing pages.",
        "Improve useful content depth and intent coverage.",
        "Strengthen relevant internal links.",
        "Monitor CTR and ranking movement before major structural changes.",
      ],
      examples:
        commercialTop10
          .slice(0, 8),
    });
  }

  // ----------------------------------------------------------
  // CTR
  // ----------------------------------------------------------

  if (
    overall.impressions >= 50 &&
    overall.ctr < 0.02
  ) {
    diagnoses.push({
      code: "LOW_CTR",
      severity: "HIGH",
      title:
        "Search impressions are converting weakly into clicks",
      reason:
        "Overall Search Console CTR is below 2% for the selected period.",
      medicine: [
        "Review titles of high-impression pages.",
        "Improve titles around actual search intent.",
        "Improve meta descriptions with clear service value.",
        "Measure CTR again after changes.",
      ],
    });
  }

  // ----------------------------------------------------------
  // RANKING DECLINE
  // ----------------------------------------------------------

  if (
    period.changes
      .positionImprovement !== null &&
    period.changes
      .positionImprovement < -1
  ) {
    diagnoses.push({
      code:
        "AVERAGE_POSITION_DECLINE",
      severity: "MEDIUM",
      title:
        "Average search position declined",
      reason:
        "The current average position is weaker than the previous comparison period.",
      medicine: [
        "Inspect declining queries.",
        "Inspect affected ranking pages.",
        "Check recent content or technical changes.",
        "Strengthen affected commercial pages where appropriate.",
      ],
    });
  }

  // ----------------------------------------------------------
  // CLICKS
  // ----------------------------------------------------------

  if (
    period.changes.clicksPercent !==
      null &&
    period.changes.clicksPercent <
      -10
  ) {
    diagnoses.push({
      code:
        "ORGANIC_CLICKS_DECLINE",
      severity: "MEDIUM",
      title:
        "Organic clicks decreased",
      reason:
        "Organic clicks are more than 10% lower than the comparison period.",
      medicine: [
        "Identify queries that lost clicks.",
        "Identify pages that lost clicks.",
        "Compare impressions with clicks.",
        "Prioritize high-intent commercial queries.",
      ],
    });
  }

  // ----------------------------------------------------------
  // LOW CTR PAGES
  // ----------------------------------------------------------

  if (
    pageAnalysis.lowCtrPages
      .length > 0
  ) {
    diagnoses.push({
      code:
        "PAGE_CTR_OPPORTUNITY",
      severity: "MEDIUM",
      title:
        "High-impression pages have weak CTR",
      reason:
        `${pageAnalysis.lowCtrPages.length} pages have at least 20 impressions and CTR below 2%.`,
      medicine: [
        "Review page title and meta description.",
        "Check whether the page matches search intent.",
        "Improve SERP messaging without misleading claims.",
      ],
      examples:
        pageAnalysis.lowCtrPages
          .slice(0, 5),
    });
  }

  // ----------------------------------------------------------
  // MISSING TARGETS
  // ----------------------------------------------------------

  const missingCommercialTargets =
    targetKeywords.filter(
      (item) =>
        item.commercial &&
        !item.found
    );

  if (
    missingCommercialTargets.length
  ) {
    diagnoses.push({
      code:
        "COMMERCIAL_TARGET_NOT_VISIBLE",
      severity: "MEDIUM",
      title:
        "Some commercial target keywords have no current GSC row",
      reason:
        `${missingCommercialTargets.length} configured commercial targets were not returned for this period.`,
      medicine: [
        "Check whether the target page is indexed.",
        "Check whether the page satisfies the actual search intent.",
        "Strengthen the relevant existing page where appropriate.",
        "Do not create duplicate pages simply to target similar keywords.",
      ],
      examples:
        missingCommercialTargets
          .slice(0, 10),
    });
  }

  // ----------------------------------------------------------
  // PROTECTION
  // ----------------------------------------------------------

  const protectedTargets =
    targetKeywords.filter(
      (item) =>
        item.status ===
          "TOP_3" ||
        item.status ===
          "TOP_10"
    );

  if (
    protectedTargets.length
  ) {
    diagnoses.push({
      code:
        "PROTECT_EXISTING_VISIBILITY",
      severity: "LOW",
      title:
        "Existing target-keyword visibility should be protected",
      reason:
        `${protectedTargets.length} configured target keywords are currently in the top 10.`,
      medicine: [
        "Avoid unnecessary structural changes.",
        "Continue useful content improvements.",
        "Maintain strong internal linking.",
        "Monitor ranking and CTR changes.",
      ],
    });
  }

  if (!diagnoses.length) {
    diagnoses.push({
      code:
        "NO_MAJOR_SIGNAL",
      severity: "LOW",
      title:
        "No major threshold-based issue detected",
      reason:
        "The selected Search Console dataset did not trigger a major diagnostic threshold.",
      medicine: [
        "Continue monitoring rankings.",
        "Continue strengthening commercial pages.",
        "Continue useful content and local SEO work.",
      ],
    });
  }

  const severityWeight = {
    CRITICAL: 4,
    HIGH: 3,
    MEDIUM: 2,
    LOW: 1,
  };

  diagnoses.sort(
    (a, b) =>
      (severityWeight[b.severity] ||
        0) -
      (severityWeight[a.severity] ||
        0)
  );

  return diagnoses;
}

// ============================================================
// DAILY MEDICINE
// ============================================================

function buildDailyAction({
  keywordAnalysis,
  pageAnalysis,
  targetKeywords,
  urlAnalysis,
}) {
  // URL issue gets first priority because it affects
  // interpretation of page-level SEO data.
  if (
    urlAnalysis.duplicateUrlCount >
    0
  ) {
    const firstGroup =
      urlAnalysis
        .duplicateUrlGroups[0];

    return {
      priority: "HIGH",
      type: "technical-url",
      title:
        "Treat duplicate URL variants",
      action:
        "Verify HTTPS, hostname redirects, canonical URLs, sitemap URLs and internal links all use one preferred URL.",
      data: firstGroup || null,
    };
  }

  // Commercial page-two opportunity.
  const commercialOpportunity =
    keywordAnalysis.opportunities.find(
      (item) =>
        item.priority ===
          "HIGH" &&
        item.commercial
    );

  if (
    commercialOpportunity
  ) {
    return {
      priority: "HIGH",
      type: "commercial-keyword",
      title:
        `Treat commercial keyword: "${commercialOpportunity.query}"`,
      action:
        "Open the relevant ranking page, verify search intent, improve useful content and strengthen contextual internal links.",
      data:
        commercialOpportunity,
    };
  }

  // Commercial target on page two.
  const targetPageTwo =
    targetKeywords.find(
      (item) =>
        item.commercial &&
        item.status ===
          "PAGE_2"
    );

  if (targetPageTwo) {
    return {
      priority: "HIGH",
      type: "target-keyword",
      title:
        `Work on "${targetPageTwo.keyword}"`,
      action:
        `Strengthen ${targetPageTwo.targetPage} for the search intent and improve relevant internal linking.`,
      data:
        targetPageTwo,
    };
  }

  // Low CTR page.
  const lowCtrPage =
    pageAnalysis.lowCtrPages[0];

  if (lowCtrPage) {
    return {
      priority: "MEDIUM",
      type: "ctr",
      title:
        "Improve a high-impression page's CTR",
      action:
        "Review its title and meta description against the actual search intent and improve the SERP message.",
      data:
        lowCtrPage,
    };
  }

  // Commercial top 10 protection.
  const commercialTop10 =
    keywordAnalysis.opportunities.find(
      (item) =>
        item.commercial &&
        item.type ===
          "top10-growth"
    );

  if (commercialTop10) {
    return {
      priority: "MEDIUM",
      type: "commercial-growth",
      title:
        `Strengthen "${commercialTop10.query}"`,
      action:
        "Improve the relevant commercial page and internal links while protecting the current page-one visibility.",
      data:
        commercialTop10,
    };
  }

  // Protect top ranking keyword.
  const protect =
    keywordAnalysis.protect[0];

  if (protect) {
    return {
      priority: "PROTECT",
      type: "protect",
      title:
        `Protect "${protect.query}"`,
      action:
        "Avoid unnecessary changes to the ranking page and continue useful SEO improvements.",
      data: protect,
    };
  }

  return {
    priority: "MEDIUM",
    type: "content",
    title:
      "Strengthen the next high-intent service page",
    action:
      "Review an important commercial page, improve useful content and strengthen relevant internal links.",
    data: null,
  };
}

// ============================================================
// BUSINESS SIGNAL
// ============================================================

async function getBusinessSignal() {
  try {
    const client =
      await clientPromise;

    const db =
      client.db("rctours");

    const bookings =
      db.collection("bookings");

    const [
      totalBookings,
      completedBookings,
      paidBookings,
      recentBookings,
    ] =
      await Promise.all([
        bookings.countDocuments({}),

        bookings.countDocuments({
          tripStatus: {
            $in: [
              "completed",
              "Completed",
            ],
          },
        }),

        bookings.countDocuments({
          paymentStatus: {
            $in: [
              "paid",
              "Paid",
              "completed",
              "Completed",
            ],
          },
        }),

        bookings.countDocuments({
          createdAt: {
            $gte: addDays(
              new Date(),
              -28
            ),
          },
        }),
      ]);

    return {
      available: true,
      totalBookings,
      completedBookings,
      paidBookings,
      recent28DayBookings:
        recentBookings,
      attributionAvailable: false,
      note:
        "Booking data is a business signal only. It is not treated as SEO-attributed without explicit source or UTM attribution.",
    };
  } catch (error) {
    console.error(
      "SEO BUSINESS SIGNAL ERROR:",
      error
    );

    return {
      available: false,
      totalBookings: null,
      completedBookings: null,
      paidBookings: null,
      recent28DayBookings:
        null,
      attributionAvailable: false,
      note:
        "Booking data could not be read. SEO intelligence continues without booking data.",
    };
  }
}

// ============================================================
// MAIN GET
// ============================================================

export async function GET(
  request
) {
  try {
    // ========================================================
    // 1. ADMIN SECURITY
    // ========================================================

    const isAdmin =
      await verifyAdmin();

    if (!isAdmin) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Access denied.",
        },
        {
          status: 401,
        }
      );
    }

    // ========================================================
    // 2. DATE RANGE
    // ========================================================

    const { searchParams } =
      new URL(request.url);

    const ranges =
      getDateRanges(
        searchParams
      );

    // ========================================================
    // 3. GSC CLIENT
    // ========================================================

    const searchconsole =
      getSearchConsoleClient();

    // ========================================================
    // 4. GSC DATA
    // ========================================================

    const [
      currentOverallResponse,
      previousOverallResponse,
      currentQueriesResponse,
      previousQueriesResponse,
      currentPagesResponse,
      previousPagesResponse,
      currentQueryPagesResponse,
    ] =
      await Promise.all([
        querySearchConsole(
          searchconsole,
          ranges.startDate,
          ranges.endDate,
          [],
          1
        ),

        querySearchConsole(
          searchconsole,
          ranges.previousStartDate,
          ranges.previousEndDate,
          [],
          1
        ),

        querySearchConsole(
          searchconsole,
          ranges.startDate,
          ranges.endDate,
          ["query"],
          1000
        ),

        querySearchConsole(
          searchconsole,
          ranges.previousStartDate,
          ranges.previousEndDate,
          ["query"],
          1000
        ),

        querySearchConsole(
          searchconsole,
          ranges.startDate,
          ranges.endDate,
          ["page"],
          1000
        ),

        querySearchConsole(
          searchconsole,
          ranges.previousStartDate,
          ranges.previousEndDate,
          ["page"],
          1000
        ),

        querySearchConsole(
          searchconsole,
          ranges.startDate,
          ranges.endDate,
          [
            "query",
            "page",
          ],
          1000
        ),
      ]);

    // ========================================================
    // 5. NORMALIZE
    // ========================================================

    const currentOverall =
      normalizeOverall(
        currentOverallResponse
      );

    const previousOverall =
      normalizeOverall(
        previousOverallResponse
      );

    const currentQueries =
      normalizeRows(
        currentQueriesResponse
      );

    const previousQueries =
      normalizeRows(
        previousQueriesResponse
      );

    const currentPages =
      normalizeRows(
        currentPagesResponse
      );

    const previousPages =
      normalizeRows(
        previousPagesResponse
      );

    const currentQueryPages =
      normalizeRows(
        currentQueryPagesResponse
      );

    // ========================================================
    // 6. PERIOD COMPARISON
    // ========================================================

    const clicksPercent =
      calculatePercentChange(
        currentOverall.clicks,
        previousOverall.clicks
      );

    const impressionsPercent =
      calculatePercentChange(
        currentOverall.impressions,
        previousOverall.impressions
      );

    const ctrPercent =
      calculatePercentChange(
        currentOverall.ctr,
        previousOverall.ctr
      );

    const positionImprovement =
      previousOverall.position &&
      currentOverall.position
        ? previousOverall.position -
          currentOverall.position
        : null;

    const period = {
      current: {
        clicks: currentOverall.clicks,
        impressions:
          currentOverall.impressions,
        ctr: currentOverall.ctr,
        position:
          currentOverall.position,
      },

      previous: {
        clicks:
          previousOverall.clicks,
        impressions:
          previousOverall.impressions,
        ctr:
          previousOverall.ctr,
        position:
          previousOverall.position,
      },

      changes: {
        clicksPercent,
        impressionsPercent,
        ctrPercent,
        positionImprovement,
      },
    };

    // ========================================================
    // 7. KEYWORDS
    // ========================================================

    const keywordAnalysis =
      analyzeKeywords(
        currentQueries
      );

    // ========================================================
    // 8. QUERY MOVEMENT
    // ========================================================

    const previousQueryMap =
      new Map();

    for (
      const row of previousQueries
    ) {
      const query =
        String(
          row.keys?.[0] || ""
        )
          .trim()
          .toLowerCase();

      if (!query) {
        continue;
      }

      previousQueryMap.set(
        query,
        row
      );
    }

    const movements =
      currentQueries
        .map((row) => {
          const query =
            String(
              row.keys?.[0] || ""
            )
              .trim()
              .toLowerCase();

          const previous =
            previousQueryMap.get(
              query
            );

          if (!previous) {
            return null;
          }

          const intent =
            classifyKeywordIntent(
              query
            );

          const currentPosition =
            safeNumber(
              row.position
            );

          const previousPosition =
            safeNumber(
              previous.position
            );

          return {
            query,
            intent:
              intent.intent,
            commercial:
              intent.commercial,
            commercialScore:
              intent.commercialScore,
            currentPosition:
              round(
                currentPosition,
                1
              ),
            previousPosition:
              round(
                previousPosition,
                1
              ),
            positionChange:
              round(
                previousPosition -
                  currentPosition,
                1
              ),
            currentClicks:
              round(
                row.clicks,
                0
              ),
            previousClicks:
              round(
                previous.clicks,
                0
              ),
            currentImpressions:
              round(
                row.impressions,
                0
              ),
            previousImpressions:
              round(
                previous.impressions,
                0
              ),
          };
        })
        .filter(Boolean);

    const rising =
      movements
        .filter(
          (item) =>
            item.positionChange >=
            2
        )
        .sort(
          (a, b) =>
            b.positionChange -
              a.positionChange ||
            b.commercialScore -
              a.commercialScore
        )
        .slice(0, 25);

    const declining =
      movements
        .filter(
          (item) =>
            item.positionChange <=
            -2
        )
        .sort(
          (a, b) =>
            a.positionChange -
              b.positionChange ||
            b.commercialScore -
              a.commercialScore
        )
        .slice(0, 25);

    keywordAnalysis.rising =
      rising;

    keywordAnalysis.declining =
      declining;

    // ========================================================
    // 9. PAGES
    // ========================================================

    const pageAnalysis =
      analyzePages(
        currentPages
      );

    // ========================================================
    // 10. URL ANALYSIS
    // ========================================================

    const urlAnalysis =
      analyzeUrlVersions(
        currentPages
      );

    // ========================================================
    // 11. QUERY + PAGE
    // ========================================================

    const queryPageAnalysis =
      analyzeQueryPages(
        currentQueryPages
      );

    // ========================================================
    // 12. TARGET KEYWORDS
    // ========================================================

    const targetKeywords =
      analyzeTargetKeywords(
        currentQueries
      );

    // ========================================================
    // 13. HEALTH
    // ========================================================

    const health =
      calculateHealth({
        overall:
          currentOverall,

        keywordAnalysis,

        pageAnalysis,

        targetKeywords,

        urlAnalysis,
      });

    const healthStatus =
      getHealthStatus(
        health.score
      );

    // ========================================================
    // 14. DIAGNOSIS
    // ========================================================

    const diagnoses =
      buildDiagnoses({
        overall:
          currentOverall,

        period,

        keywordAnalysis,

        pageAnalysis,

        targetKeywords,

        urlAnalysis,
      });

    // ========================================================
    // 15. DAILY ACTION
    // ========================================================

    const dailyAction =
      buildDailyAction({
        keywordAnalysis,

        pageAnalysis,

        targetKeywords,

        urlAnalysis,
      });

    // ========================================================
    // 16. BUSINESS SIGNAL
    // ========================================================

    const businessSignal =
      await getBusinessSignal();

    // ========================================================
    // 17. RESPONSE
    // ========================================================

    return NextResponse.json({
      success: true,

      property: SITE_URL,

      propertyType:
        "Domain Property",

      engine: {
        name:
          "RC Tours & Travels SEO Intelligence Engine",

        version:
          "1.1.0",

        mode: "read-only",

        dataSource:
          "Google Search Console API",

        businessDataSource:
          "MongoDB bookings collection",
      },

      dateRange: {
        startDate:
          ranges.startDate,

        endDate:
          ranges.endDate,

        days:
          ranges.totalDays,
      },

      comparisonRange: {
        startDate:
          ranges.previousStartDate,

        endDate:
          ranges.previousEndDate,

        days:
          ranges.totalDays,
      },

      health: {
        score:
          health.score,

        status:
          healthStatus,

        components:
          health.components,

        methodology:
          health.methodology,
      },

      overview: {
        clicks:
          round(
            currentOverall.clicks,
            0
          ),

        impressions:
          round(
            currentOverall.impressions,
            0
          ),

        ctr:
          round(
            currentOverall.ctr *
              100,
            2
          ),

        averagePosition:
          round(
            currentOverall.position,
            1
          ),
      },

      comparison: period,

      keywords: {
        totalTrackedQueries:
          keywordAnalysis.totalTrackedQueries,

        commercialQueries:
          keywordAnalysis.commercialQueries,

        brandQueries:
          keywordAnalysis.brandQueries,

        intentSummary:
          keywordAnalysis.intentSummary,

        opportunities:
          keywordAnalysis.opportunities,

        protect:
          keywordAnalysis.protect,

        rising:
          keywordAnalysis.rising,

        declining:
          keywordAnalysis.declining,
      },

      targetKeywords,

      pages: {
        totalPages:
          pageAnalysis.totalPages,

        topVisibility:
          pageAnalysis.pages,

        lowCtr:
          pageAnalysis.lowCtrPages,

        strongPages:
          pageAnalysis.strongPages,

        normalizedPages:
          pageAnalysis.normalizedPages,
      },

      urlIntelligence: {
        canonicalHost:
          CANONICAL_HOST,

        uniqueNormalizedPages:
          urlAnalysis.uniqueNormalizedPages,

        duplicateUrlGroups:
          urlAnalysis.duplicateUrlGroups,

        duplicateUrlCount:
          urlAnalysis.duplicateUrlCount,

        note:
          "GSC URL variants are normalized for analysis. This does not itself change redirects or canonical tags on the website.",
      },

      queryPages:
        queryPageAnalysis,

      diagnosis:
        diagnoses,

      dailyAction,

      businessSignal,

      limitations: [
        "Search Console data has reporting delay.",
        "Health score is an internal diagnostic indicator, not a Google ranking score.",
        "URL normalization is an analysis layer and does not modify website redirects or canonical tags.",
        "No competitor metrics are invented.",
        "Booking data is not treated as SEO-attributed without explicit attribution.",
        "Ranking position varies by query, device, location and search context.",
      ],

      generatedAt:
        new Date().toISOString(),
    });
  } catch (error) {
    console.error(
      "SEO INTELLIGENCE API ERROR:",
      error
    );

    const message =
      error?.message ||
      "SEO Intelligence analysis failed.";

    let status = 500;

    if (
      message.includes(
        "Invalid date"
      ) ||
      message.includes(
        "maximum 90-day"
      )
    ) {
      status = 400;
    }

    return NextResponse.json(
      {
        success: false,
        message,
        source:
          "SEO Intelligence Engine",
      },
      {
        status,
      }
    );
  }
}