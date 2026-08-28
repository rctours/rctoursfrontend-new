import { NextResponse } from "next/server";

// ===============================================
// RC TOURS & TRAVELS
// GOOGLE LOCATION SEARCH
// AUTOCOMPLETE + PLACE DETAILS
// + REVERSE GEOCODING
// ===============================================

const cache = new Map();

const CACHE_DURATION = 60 * 60 * 1000; // 1 hour
const MAX_CACHE_SIZE = 5000;

// Same request duplicate hone se bachane ke liye
const activeRequests = new Map();

// ===============================================
// CACHE RESPONSE
// ===============================================

function cachedResponse(data) {
  return NextResponse.json(data, {
    headers: {
      "Cache-Control":
        "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}

// ===============================================
// CLEAN CACHE
// ===============================================

function cleanCache() {
  if (cache.size <= MAX_CACHE_SIZE) return;

  const firstKey = cache.keys().next().value;

  if (firstKey) {
    cache.delete(firstKey);
  }
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
// GET GOOGLE PLACE DETAILS
// Returns exact latitude + longitude
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
            "id,displayName,formattedAddress,location,types,addressComponents",
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
        "GOOGLE PLACE INVALID COORDINATES:",
        placeId,
        data?.location
      );

      return null;
    }

    const address = {};

    if (
      Array.isArray(
        data?.addressComponents
      )
    ) {
      data.addressComponents.forEach(
        (component) => {
          const type =
            component?.types?.[0];

          if (type) {
            address[type] =
              component?.longText || "";
          }
        }
      );
    }

    const placeName =
  data?.displayName?.text ||
  "";

const city =
  address.locality ||
  address.administrative_area_level_2 ||
  "";

const state =
  address.administrative_area_level_1 ||
  "";

const country =
  address.country ||
  "";

const formattedAddress =
  [city, state, country]
    .filter(Boolean)
    .join(", ");

return {
  place_id:
    data?.id || placeId,

  name:
    placeName,

  display_name:
    formattedAddress ||
    data?.formattedAddress ||
    placeName,

  full_address:
    data?.formattedAddress ||
    formattedAddress ||
    placeName,

  lat: latitude,

  lon: longitude,

  type:
    data?.types?.[0] ||
    "location",

  category: "location",

  address,
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
// GOOGLE REVERSE GEOCODING
// Current latitude + longitude se address
// ===============================================

async function getReverseGeocodedLocation(
  lat,
  lon,
  apiKey
) {
  if (
    !validCoordinates(lat, lon) ||
    !apiKey
  ) {
    return null;
  }

  try {
    const url =
      "https://maps.googleapis.com/maps/api/geocode/json?" +
      new URLSearchParams({
        latlng: `${lat},${lon}`,
        key: apiKey,
      }).toString();

    const response = await fetch(
      url,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.error(
        "GOOGLE REVERSE GEOCODING ERROR:",
        response.status
      );

      return null;
    }

    const data =
      await response.json();

    const result =
      data?.results?.[0];

    if (
      !result?.formatted_address
    ) {
      console.error(
        "GOOGLE REVERSE GEOCODING NO RESULT:",
        data?.status
      );

      return null;
    }

    return {
      display_name:
        result.formatted_address,

      lat: Number(lat),

      lon: Number(lon),

      type:
        result?.types?.[0] ||
        "location",

      category: "location",
    };
  } catch (error) {
    console.error(
      "GOOGLE REVERSE GEOCODING EXCEPTION:",
      error
    );

    return null;
  }
}

// ===============================================
// GOOGLE PLACES AUTOCOMPLETE
// ===============================================

async function searchGooglePlaces(
  query,
  apiKey
) {
  if (!apiKey) {
    console.error(
      "GOOGLE_MAPS_SERVER_API_KEY is missing"
    );

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
        "GOOGLE PLACES AUTOCOMPLETE ERROR:",
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

    const placePredictions =
      suggestions
        .filter(
          (item) =>
            item?.placePrediction?.placeId
        )
        .slice(0, 5);

    const results =
      await Promise.all(
        placePredictions.map(
          async (item) => {
            const prediction =
              item.placePrediction;

            const placeId =
              prediction?.placeId;

            if (!placeId) {
              return null;
            }

            const details =
              await getPlaceDetails(
                placeId,
                apiKey
              );

            if (!details) {
              return null;
            }

            return details;
          }
        )
      );

    return results.filter(Boolean);
  } catch (error) {
    console.error(
      "GOOGLE PLACES SEARCH ERROR:",
      error
    );

    return [];
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
      new URL(request.url);

    // ===========================================
    // GOOGLE REVERSE GEOCODING
    // Example:
    // /api/location-search?lat=21.1458&lon=79.0882
    // ===========================================

    const lat =
      searchParams.get("lat");

    const lon =
      searchParams.get("lon");

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
        cache.get(cacheKey);

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

      if (
        activeRequests.has(
          cacheKey
        )
      ) {
        const existingData =
          await activeRequests.get(
            cacheKey
          );

        return cachedResponse(
          existingData
        );
      }

      const reversePromise =
        getReverseGeocodedLocation(
          lat,
          lon,
          apiKey
        );

      activeRequests.set(
        cacheKey,
        reversePromise
      );

      try {
        const result =
          await reversePromise;

        if (!result) {
          return NextResponse.json(
            {
              success: false,
              message:
                "Unable to find address for current location",
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
      } finally {
        activeRequests.delete(
          cacheKey
        );
      }
    }

    // ===========================================
    // PLACE DETAILS BY PLACE ID
    // ===========================================

    const placeId =
      searchParams.get("place_id");

    if (placeId) {
      const cacheKey =
        `place:${placeId}`;

      const cached =
        cache.get(cacheKey);

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
              "Unable to get valid location coordinates",
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
    // NORMAL LOCATION SEARCH
    // ===========================================

    const rawQuery =
      searchParams.get("q") || "";

    const query =
      rawQuery.trim();

    // 1 character se location search start hoga
  if (
  query.length < 1
  ) {
  return NextResponse.json([]);
  }

    const normalizedQuery =
      query.toLowerCase();

    const cacheKey =
      `search:${normalizedQuery}`;

    // ===========================================
    // CACHE CHECK
    // ===========================================

    const cached =
      cache.get(cacheKey);

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

    // ===========================================
    // SAME REQUEST ALREADY RUNNING
    // ===========================================

    if (
      activeRequests.has(
        cacheKey
      )
    ) {
      const existingData =
        await activeRequests.get(
          cacheKey
        );

      return cachedResponse(
        existingData
      );
    }

    // ===========================================
    // GOOGLE PLACES SEARCH
    // ===========================================

    const searchPromise =
      searchGooglePlaces(
        query,
        apiKey
      );

    activeRequests.set(
      cacheKey,
      searchPromise
    );

    try {
      const results =
        await searchPromise;

      // Sirf valid coordinates
      // wale results cache honge
      const validResults =
  results
    .filter(
      (item) =>
        validCoordinates(
          item?.lat,
          item?.lon
        )
    )
    .sort((a, b) => {
      const aName = (
        a?.name ||
        a?.display_name ||
        ""
      ).toLowerCase();

      const bName = (
        b?.name ||
        b?.display_name ||
        ""
      ).toLowerCase();

      const queryText =
        normalizedQuery.toLowerCase();

      // Exact city/location match sabse upar
      const aExact =
        aName === queryText;

      const bExact =
        bName === queryText;

      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;

      // Jo result typed text se start hota hai
      // usko priority
      const aStarts =
        aName.startsWith(queryText);

      const bStarts =
        bName.startsWith(queryText);

      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;

      // Shorter / more relevant name ko priority
      return aName.length - bName.length;
    });

      cache.set(
        cacheKey,
        {
          timestamp:
            Date.now(),

          data:
            validResults,
        }
      );

      cleanCache();

      return cachedResponse(
        validResults
      );
    } finally {
      activeRequests.delete(
        cacheKey
      );
    }
  } catch (error) {
    console.error(
      "LOCATION SEARCH EXCEPTION:",
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
