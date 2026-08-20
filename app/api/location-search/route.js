import { NextResponse } from "next/server";

// ===============================================
// LOCATION SEARCH CACHE
// ===============================================

const cache = new Map();

const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

// ===============================================
// GET METHOD
// - Normal location autocomplete
// - Current location reverse geocoding
// ===============================================

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    // ===========================================
    // CURRENT LOCATION
    // latitude + longitude -> address
    // ===========================================

    const latitude = searchParams.get("lat");
    const longitude = searchParams.get("lon");

    if (latitude && longitude) {
      const reverseUrl =
        "https://nominatim.openstreetmap.org/reverse?" +
        new URLSearchParams({
          lat: latitude,
          lon: longitude,
          format: "json",
          addressdetails: "1",
          "accept-language": "en",
        }).toString();

      const controller = new AbortController();

      const timeout = setTimeout(() => {
        controller.abort();
      }, 8000);

      let response;

      try {
        response = await fetch(reverseUrl, {
          method: "GET",

          headers: {
            "User-Agent":
              "RC-Tours-Travels/1.0 (https://www.rctoursandtravels.in)",
            Accept: "application/json",
          },

          signal: controller.signal,

          cache: "no-store",
        });
      } finally {
        clearTimeout(timeout);
      }

      // =========================================
      // REVERSE GEOCODING ERROR
      // =========================================

      if (!response.ok) {
        console.error(
          "NOMINATIM REVERSE ERROR:",
          response.status,
          response.statusText
        );

        return NextResponse.json({
          display_name: `${latitude}, ${longitude}`,
          lat: latitude,
          lon: longitude,
          address: {},
        });
      }

      const data = await response.json();

      // =========================================
      // CURRENT LOCATION RESPONSE
      // =========================================

      return NextResponse.json({
        display_name:
          data?.display_name ||
          `${latitude}, ${longitude}`,

        lat: data?.lat || latitude,
        lon: data?.lon || longitude,

        address: data?.address || {},
      });
    }

    // ===========================================
    // NORMAL LOCATION SEARCH
    // ===========================================

    const rawQuery = searchParams.get("q") || "";

    const query = rawQuery.trim();

    // ===========================================
    // EMPTY / VERY SHORT QUERY
    // ===========================================

    if (!query || query.length < 2) {
      return NextResponse.json([]);
    }

    // ===========================================
    // CACHE KEY
    // ===========================================

    const cacheKey = query.toLowerCase();

    const cached = cache.get(cacheKey);

    if (cached) {
      const age = Date.now() - cached.timestamp;

      if (age < CACHE_DURATION) {
        return NextResponse.json(cached.data, {
          headers: {
            "Cache-Control":
              "public, max-age=600, stale-while-revalidate=3600",
          },
        });
      }

      cache.delete(cacheKey);
    }

    // ===========================================
    // NOMINATIM SEARCH
    // ===========================================

    const url =
      "https://nominatim.openstreetmap.org/search?" +
      new URLSearchParams({
        q: query + ", India",
        format: "json",
        addressdetails: "1",
        limit: "5",
        countrycodes: "in",
        "accept-language": "en",
      }).toString();

    const controller = new AbortController();

    const timeout = setTimeout(() => {
      controller.abort();
    }, 5000);

    let response;

    try {
      response = await fetch(url, {
        method: "GET",

        headers: {
          "User-Agent":
            "RC-Tours-Travels/1.0 (https://www.rctoursandtravels.in)",
          Accept: "application/json",
        },

        signal: controller.signal,

        cache: "no-store",
      });
    } finally {
      clearTimeout(timeout);
    }

    // ===========================================
    // PROVIDER ERROR
    // ===========================================

    if (!response.ok) {
      console.error(
        "NOMINATIM ERROR:",
        response.status,
        response.statusText
      );

      return NextResponse.json([], {
        status: 200,

        headers: {
          "Cache-Control": "no-store",
        },
      });
    }

    const data = await response.json();

    // ===========================================
    // CLEAN RESULTS
    // ===========================================

    const results = Array.isArray(data)
      ? data.map((item) => ({
          place_id: item.place_id,

          display_name: item.display_name,

          lat: item.lat,

          lon: item.lon,

          type: item.type,

          category: item.category,

          address: item.address || {},
        }))
      : [];

    // ===========================================
    // SAVE TO CACHE
    // ===========================================

    cache.set(cacheKey, {
      timestamp: Date.now(),
      data: results,
    });

    // ===========================================
    // LIMIT CACHE SIZE
    // ===========================================

    if (cache.size > 500) {
      const firstKey = cache.keys().next().value;

      if (firstKey) {
        cache.delete(firstKey);
      }
    }

    // ===========================================
    // RESPONSE
    // ===========================================

    return NextResponse.json(results, {
      headers: {
        "Cache-Control":
          "public, max-age=600, stale-while-revalidate=3600",
      },
    });
  } catch (error) {
    // ===========================================
    // TIMEOUT
    // ===========================================

    if (error?.name === "AbortError") {
      console.error("LOCATION SEARCH TIMEOUT");

      return NextResponse.json([], {
        status: 200,
      });
    }

    // ===========================================
    // GENERAL ERROR
    // ===========================================

    console.error(
      "LOCATION SEARCH PIPELINE EXCEPTION:",
      error
    );

    // Frontend should never break because
    // location provider failed.

    return NextResponse.json([], {
      status: 200,
    });
  }
}