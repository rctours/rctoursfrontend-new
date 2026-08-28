import { NextResponse } from "next/server";

// ===============================================
// RC TOURS & TRAVELS
// GOOGLE PLACES LOCATION SEARCH
// ===============================================

const cache = new Map();

const CACHE_DURATION = 60 * 60 * 1000; // 1 hour
const MAX_CACHE_SIZE = 5000;

// ===============================================
// CACHE HELPERS
// ===============================================

function cleanCache() {
  if (cache.size <= MAX_CACHE_SIZE) return;

  const firstKey = cache.keys().next().value;

  if (firstKey) {
    cache.delete(firstKey);
  }
}

function cachedResponse(data) {
  return NextResponse.json(data, {
    headers: {
      "Cache-Control":
        "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}

// ===============================================
// VALIDATE COORDINATES
// ===============================================

function validCoordinates(lat, lon) {
  const latitude = Number(lat);
  const longitude = Number(lon);

  return (
    Number.isFinite(latitude) &&
    Number.isFinite(longitude) &&
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180
  );
}

// ===============================================
// GOOGLE PLACE DETAILS
// Exact Place ID -> Exact coordinates
// ===============================================

async function getPlaceDetails(placeId, apiKey) {
  if (!placeId || !apiKey) {
    return null;
  }

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(
        placeId
      )}`,
      {
        method: "GET",
        headers: {
          "X-Goog-Api-Key": apiKey,

          "X-Goog-FieldMask":
            "id,displayName,formattedAddress,shortFormattedAddress,location,types",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorText = await response.text();

      console.error(
        "GOOGLE PLACE DETAILS ERROR:",
        response.status,
        errorText
      );

      return null;
    }

    const data = await response.json();

    const latitude = Number(
      data?.location?.latitude
    );

    const longitude = Number(
      data?.location?.longitude
    );

    if (
      !validCoordinates(
        latitude,
        longitude
      )
    ) {
      console.error(
        "INVALID PLACE COORDINATES:",
        placeId,
        data?.location
      );

      return null;
    }

    const name =
      data?.displayName?.text ||
      "";

    const fullAddress =
      data?.formattedAddress ||
      data?.shortFormattedAddress ||
      name;

    return {
      place_id:
        data?.id || placeId,

      name,

      display_name:
        fullAddress,

      full_address:
        fullAddress,

      lat: latitude,

      lon: longitude,

      type:
        data?.types?.[0] ||
        "location",

      category:
        "location",
    };
  } catch (error) {
    console.error(
      "GOOGLE PLACE DETAILS EXCEPTION:",
      error
    );

    return null;
  }
}

// ===============================================
// GOOGLE PLACES AUTOCOMPLETE
//
// Example:
//
// name:
// Butibori
//
// secondary_text:
// Nagpur, Maharashtra, India
// ===============================================

async function searchGooglePlaces(
  query,
  apiKey
) {
  if (!apiKey) {
    return [];
  }

  try {
    const response = await fetch(
      "https://places.googleapis.com/v1/places:autocomplete",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          "X-Goog-Api-Key":
            apiKey,

          "X-Goog-FieldMask":
            "suggestions.placePrediction.placeId," +
            "suggestions.placePrediction.text.text," +
            "suggestions.placePrediction.structuredFormat.mainText.text," +
            "suggestions.placePrediction.structuredFormat.secondaryText.text," +
            "suggestions.placePrediction.types",
        },

        body: JSON.stringify({
          input: query,

          includedRegionCodes: [
            "in",
          ],

          languageCode:
            "en",

          regionCode:
            "IN",

          inputOffset:
            query.length,
        }),

        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorText =
        await response.text();

      console.error(
        "GOOGLE AUTOCOMPLETE ERROR:",
        response.status,
        errorText
      );

      return [];
    }

    const data =
      await response.json();

    const suggestions =
      Array.isArray(
        data?.suggestions
      )
        ? data.suggestions
        : [];

    const seenPlaceIds =
      new Set();

    const seenLabels =
      new Set();

    const results =
      suggestions
        .map((item) => {
          const prediction =
            item?.placePrediction;

          const placeId =
            prediction?.placeId;

          if (!placeId) {
            return null;
          }

          // Same place ID duplicate nahi hoga
          if (
            seenPlaceIds.has(
              placeId
            )
          ) {
            return null;
          }

          const mainText =
            prediction
              ?.structuredFormat
              ?.mainText
              ?.text ||
            prediction
              ?.text
              ?.text ||
            "";

          const secondaryText =
            prediction
              ?.structuredFormat
              ?.secondaryText
              ?.text ||
            "";

          // Empty result ignore
          if (!mainText) {
            return null;
          }

          // Same visible suggestion duplicate nahi hoga
          const duplicateKey =
            `${mainText.trim().toLowerCase()}|` +
            `${secondaryText.trim().toLowerCase()}`;

          if (
            seenLabels.has(
              duplicateKey
            )
          ) {
            return null;
          }

          seenPlaceIds.add(
            placeId
          );

          seenLabels.add(
            duplicateKey
          );

          const displayName =
            [
              mainText,
              secondaryText,
            ]
              .filter(Boolean)
              .join(", ");

          return {
            place_id:
              placeId,

            // TOP LINE
            name:
              mainText,

            // SECOND LINE
            secondary_text:
              secondaryText,

            // Selected hone ke baad
            // input me ye show hoga
            display_name:
              displayName,

            full_address:
              prediction
                ?.text
                ?.text ||
              displayName,

            type:
              prediction
                ?.types
                ?.[0] ||
              "location",

            category:
              "location",
          };
        })
        .filter(Boolean)
        .slice(0, 6);

    return results;
  } catch (error) {
    console.error(
      "GOOGLE AUTOCOMPLETE EXCEPTION:",
      error
    );

    return [];
  }
}

// ===============================================
// GOOGLE REVERSE GEOCODING
// Current location
// ===============================================

async function reverseGeocode(
  lat,
  lon,
  apiKey
) {
  try {
    const url =
      "https://maps.googleapis.com/maps/api/geocode/json?" +
      new URLSearchParams({
        latlng:
          `${lat},${lon}`,

        key:
          apiKey,
      }).toString();

    const response =
      await fetch(url, {
        cache: "no-store",
      });

    if (!response.ok) {
      return null;
    }

    const data =
      await response.json();

    const result =
      data?.results?.[0];

    if (
      !result?.formatted_address
    ) {
      return null;
    }

    return {
      display_name:
        result.formatted_address,

      full_address:
        result.formatted_address,

      lat:
        Number(lat),

      lon:
        Number(lon),

      type:
        result?.types?.[0] ||
        "location",

      category:
        "location",
    };
  } catch (error) {
    console.error(
      "REVERSE GEOCODING ERROR:",
      error
    );

    return null;
  }
}

// ===============================================
// GET METHOD
// ===============================================

export async function GET(request) {
  try {
    const apiKey =
      process.env
        .GOOGLE_MAPS_SERVER_API_KEY;

    if (!apiKey) {
      console.error(
        "GOOGLE_MAPS_SERVER_API_KEY is missing"
      );

      return NextResponse.json(
        {
          success: false,

          message:
            "Google Maps API key missing",
        },
        {
          status: 500,
        }
      );
    }

    const { searchParams } =
      new URL(
        request.url
      );

    // ===========================================
    // 1. PLACE DETAILS
    // ===========================================

    const placeId =
      searchParams.get(
        "place_id"
      );

    if (placeId) {
      const cacheKey =
        `place:${placeId}`;

      const cached =
        cache.get(
          cacheKey
        );

      if (
        cached &&
        Date.now() -
          cached.timestamp <
          CACHE_DURATION
      ) {
        return cachedResponse(
          cached.data
        );
      }

      const result =
        await getPlaceDetails(
          placeId,
          apiKey
        );

      if (!result) {
        return NextResponse.json(
          {
            success: false,

            message:
              "Place details not found",
          },
          {
            status: 404,
          }
        );
      }

      cache.set(
        cacheKey,
        {
          timestamp:
            Date.now(),

          data:
            result,
        }
      );

      cleanCache();

      return cachedResponse(
        result
      );
    }

    // ===========================================
    // 2. REVERSE GEOCODING
    // ===========================================

    const lat =
      searchParams.get(
        "lat"
      );

    const lon =
      searchParams.get(
        "lon"
      );

    if (lat && lon) {
      if (
        !validCoordinates(
          lat,
          lon
        )
      ) {
        return NextResponse.json(
          {
            success: false,

            message:
              "Invalid coordinates",
          },
          {
            status: 400,
          }
        );
      }

      const cacheKey =
        `reverse:${Number(lat).toFixed(6)},` +
        `${Number(lon).toFixed(6)}`;

      const cached =
        cache.get(
          cacheKey
        );

      if (
        cached &&
        Date.now() -
          cached.timestamp <
          CACHE_DURATION
      ) {
        return cachedResponse(
          cached.data
        );
      }

      const result =
        await reverseGeocode(
          lat,
          lon,
          apiKey
        );

      if (!result) {
        return NextResponse.json(
          {
            success: false,

            message:
              "Address not found",
          },
          {
            status: 404,
          }
        );
      }

      cache.set(
        cacheKey,
        {
          timestamp:
            Date.now(),

          data:
            result,
        }
      );

      cleanCache();

      return cachedResponse(
        result
      );
    }

    // ===========================================
    // 3. GOOGLE AUTOCOMPLETE SEARCH
    // ===========================================

    const rawQuery =
      searchParams.get(
        "q"
      ) || "";

    const query =
      rawQuery.trim();

    if (!query) {
      return NextResponse.json(
        []
      );
    }

    const cacheKey =
      `search:${query.toLowerCase()}`;

    const cached =
      cache.get(
        cacheKey
      );

    if (
      cached &&
      Date.now() -
        cached.timestamp <
        CACHE_DURATION
    ) {
      return cachedResponse(
        cached.data
      );
    }

    const results =
      await searchGooglePlaces(
        query,
        apiKey
      );

    cache.set(
      cacheKey,
      {
        timestamp:
          Date.now(),

        data:
          results,
      }
    );

    cleanCache();

    return cachedResponse(
      results
    );
  } catch (error) {
    console.error(
      "LOCATION SEARCH ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          "Location search failed",
      },
      {
        status: 500,
      }
    );
  }
}