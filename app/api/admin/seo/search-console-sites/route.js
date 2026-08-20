import { google } from "googleapis";

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
    console.error("Google credentials parsing error:", error);

    throw new Error(
      "Google Search Console credentials are invalid."
    );
  }
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

export async function GET() {
  try {
    const searchConsole =
      await getSearchConsoleClient();

    const response =
      await searchConsole.sites.list();

    const sites =
      response.data?.siteEntry || [];

    return Response.json({
      success: true,
      count: sites.length,
      sites: sites.map((site) => ({
        siteUrl: site.siteUrl || "",
        permissionLevel:
          site.permissionLevel || "",
      })),
      dataSource:
        "Google Search Console API",
    });
  } catch (error) {
    console.error(
      "Search Console Sites API Error:",
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

    return Response.json(
      {
        success: false,
        error:
          status === 403
            ? "Google Search Console access denied."
            : status === 401
              ? "Google authentication failed."
              : "Unable to fetch Search Console properties.",
      },
      { status }
    );
  }
}