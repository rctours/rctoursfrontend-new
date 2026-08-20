import { google } from "googleapis";

const SITE_URL = "sc-domain:rctoursandtravels.in";

const SEARCH_CONSOLE_SCOPE =
  "https://www.googleapis.com/auth/webmasters.readonly";

function getGoogleCredentials() {
  const encodedCredentials =
    process.env.GOOGLE_SERVICE_ACCOUNT_JSON_BASE64;

  if (!encodedCredentials) {
    throw new Error(
      "GOOGLE_SERVICE_ACCOUNT_JSON_BASE64 is not configured."
    );
  }

  try {
    const jsonString = Buffer.from(
      encodedCredentials,
      "base64"
    ).toString("utf8");

    return JSON.parse(jsonString);
  } catch (error) {
    console.error(
      "Google credentials parsing error:",
      error
    );

    throw new Error(
      "Google Search Console credentials are invalid."
    );
  }
}

function getDateString(date) {
  return date.toISOString().slice(0, 10);
}

function getDefaultDateRange() {
  const endDate = new Date();

  // Search Console reporting can have a delay.
  // Use yesterday as the default end date.
  endDate.setDate(endDate.getDate() - 1);

  const startDate = new Date(endDate);

  // Last 28 days.
  startDate.setDate(startDate.getDate() - 27);

  return {
    startDate: getDateString(startDate),
    endDate: getDateString(endDate),
  };
}

function isValidDate(value) {
  if (!value || typeof value !== "string") {
    return false;
  }

  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

async function getSearchConsoleClient() {
  const credentials = getGoogleCredentials();

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: [SEARCH_CONSOLE_SCOPE],
  });

  const authClient = await auth.getClient();

  return google.searchconsole({
    version: "v1",
    auth: authClient,
  });
}

async function runSearchAnalyticsQuery(
  searchConsole,
  startDate,
  endDate,
  dimensions,
  rowLimit = 100
) {
  const response =
    await searchConsole.searchanalytics.query({
      siteUrl: SITE_URL,
      requestBody: {
        startDate,
        endDate,
        dimensions,
        type: "web",
        rowLimit,
      },
    });

  return response.data?.rows || [];
}

function formatRows(rows, dimensions) {
  return rows.map((row) => {
    const item = {
      clicks: Number(row.clicks || 0),
      impressions: Number(row.impressions || 0),
      ctr: Number(row.ctr || 0),
      position: Number(row.position || 0),
    };

    dimensions.forEach((dimension, index) => {
      item[dimension] =
        row.keys?.[index] || "";
    });

    return item;
  });
}

function formatQueryPageRows(rows) {
  return rows.map((row) => ({
    query: row.keys?.[0] || "",
    page: row.keys?.[1] || "",
    clicks: Number(row.clicks || 0),
    impressions: Number(row.impressions || 0),
    ctr: Number(row.ctr || 0),
    position: Number(row.position || 0),
  }));
}

export async function GET(request) {
  try {
    const { searchParams } =
      new URL(request.url);

    const requestedStartDate =
      searchParams.get("startDate");

    const requestedEndDate =
      searchParams.get("endDate");

    const startDate =
      requestedStartDate || null;

    const endDate =
      requestedEndDate || null;

    /*
     * ==========================================
     * DATE VALIDATION
     * ==========================================
     */

    if (startDate && !isValidDate(startDate)) {
      return Response.json(
        {
          success: false,
          error:
            "Invalid startDate. Use YYYY-MM-DD format.",
        },
        { status: 400 }
      );
    }

    if (endDate && !isValidDate(endDate)) {
      return Response.json(
        {
          success: false,
          error:
            "Invalid endDate. Use YYYY-MM-DD format.",
        },
        { status: 400 }
      );
    }

    const defaultRange =
      getDefaultDateRange();

    const finalStartDate =
      startDate ||
      defaultRange.startDate;

    const finalEndDate =
      endDate ||
      defaultRange.endDate;

    if (finalStartDate > finalEndDate) {
      return Response.json(
        {
          success: false,
          error:
            "startDate cannot be greater than endDate.",
        },
        { status: 400 }
      );
    }

    /*
     * ==========================================
     * GOOGLE SEARCH CONSOLE CLIENT
     * ==========================================
     */

    const searchConsole =
      await getSearchConsoleClient();

    /*
     * ==========================================
     * 1. OVERALL PERFORMANCE
     * ==========================================
     */

    const overallRows =
      await runSearchAnalyticsQuery(
        searchConsole,
        finalStartDate,
        finalEndDate,
        [],
        1
      );

    const overall = overallRows[0]
      ? {
          clicks: Number(
            overallRows[0].clicks || 0
          ),

          impressions: Number(
            overallRows[0].impressions || 0
          ),

          ctr: Number(
            overallRows[0].ctr || 0
          ),

          position: Number(
            overallRows[0].position || 0
          ),
        }
      : {
          clicks: 0,
          impressions: 0,
          ctr: 0,
          position: 0,
        };

    /*
     * ==========================================
     * 2. TOP SEARCH QUERIES
     * ==========================================
     */

    const queryRows =
      await runSearchAnalyticsQuery(
        searchConsole,
        finalStartDate,
        finalEndDate,
        ["query"],
        1000
      );

    const queries = formatRows(
      queryRows,
      ["query"]
    );

    /*
     * ==========================================
     * 3. TOP PAGES
     * ==========================================
     */

    const pageRows =
      await runSearchAnalyticsQuery(
        searchConsole,
        finalStartDate,
        finalEndDate,
        ["page"],
        1000
      );

    const pages = formatRows(
      pageRows,
      ["page"]
    );

    /*
     * ==========================================
     * 4. QUERY + PAGE MAPPING
     *
     * This is extremely important for SEO.
     *
     * It tells us:
     *
     * Keyword
     *    ↓
     * Ranking Page
     *    ↓
     * Position
     *    ↓
     * Impressions
     *    ↓
     * SEO Opportunity
     * ==========================================
     */

    const queryPageRows =
      await runSearchAnalyticsQuery(
        searchConsole,
        finalStartDate,
        finalEndDate,
        ["query", "page"],
        1000
      );

    const queryPages =
      formatQueryPageRows(
        queryPageRows
      );

    /*
     * ==========================================
     * 5. DAILY PERFORMANCE
     * ==========================================
     */

    const dateRows =
      await runSearchAnalyticsQuery(
        searchConsole,
        finalStartDate,
        finalEndDate,
        ["date"],
        100
      );

    const daily = formatRows(
      dateRows,
      ["date"]
    );

    /*
     * ==========================================
     * 6. DEVICE PERFORMANCE
     * ==========================================
     */

    const deviceRows =
      await runSearchAnalyticsQuery(
        searchConsole,
        finalStartDate,
        finalEndDate,
        ["device"],
        100
      );

    const devices = formatRows(
      deviceRows,
      ["device"]
    );

    /*
     * ==========================================
     * 7. COUNTRY PERFORMANCE
     * ==========================================
     */

    const countryRows =
      await runSearchAnalyticsQuery(
        searchConsole,
        finalStartDate,
        finalEndDate,
        ["country"],
        100
      );

    const countries = formatRows(
      countryRows,
      ["country"]
    );

    /*
     * ==========================================
     * FINAL RESPONSE
     * ==========================================
     */

    return Response.json({
      success: true,

      property: SITE_URL,

      propertyType: "Domain Property",

      dateRange: {
        startDate: finalStartDate,
        endDate: finalEndDate,
      },

      overall,

      queries,

      pages,

      /*
       * New SEO intelligence data.
       */
      queryPages,

      daily,

      devices,

      countries,

      dataSource:
        "Google Search Console API",

      generatedAt:
        new Date().toISOString(),
    });
  } catch (error) {
    console.error(
      "Google Search Console API Error:",
      error
    );

    const status =
      error?.code === 401 ||
      error?.response?.status === 401
        ? 401
        : error?.code === 403 ||
            error?.response?.status === 403
          ? 403
          : 500;

    let message =
      "Unable to fetch Google Search Console data.";

    if (status === 401) {
      message =
        "Google authentication failed. Check the service account credentials.";
    }

    if (status === 403) {
      message =
        "Google Search Console access denied. Check the service account permission and Search Console property.";
    }

    return Response.json(
      {
        success: false,
        error: message,
      },
      { status }
    );
  }
}