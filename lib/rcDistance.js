// ======================================================
// RC TOURS & TRAVELS
// GOOGLE VERIFIED ROAD DISTANCE HELPER
// ======================================================
//
// PURPOSE:
// Pickup aur Drop ke beech verified road distance
// Google Geocoding + Google Routes API se calculate karna.
//
// This helper is used by:
// - Travel Assistant
// - Route distance questions
// - Route + vehicle questions
// - AI fare calculation
//
// ======================================================

const GOOGLE_GEOCODING_URL =
  "https://maps.googleapis.com/maps/api/geocode/json";

const GOOGLE_ROUTES_URL =
  "https://routes.googleapis.com/directions/v2:computeRoutes";

// ======================================================
// SIMPLE MEMORY CACHE
// ======================================================

const cache = new Map();

const CACHE_DURATION =
  30 * 60 * 1000; // 30 minutes

const MAX_CACHE_SIZE = 500;

function getCache(key) {
  const cached = cache.get(key);

  if (
    cached &&
    Date.now() - cached.timestamp <
      CACHE_DURATION
  ) {
    return cached.data;
  }

  return null;
}

function saveCache(key, data) {
  cache.set(key, {
    timestamp: Date.now(),
    data,
  });

  if (cache.size > MAX_CACHE_SIZE) {
    const firstKey =
      cache.keys().next().value;

    if (firstKey) {
      cache.delete(firstKey);
    }
  }
}

// ======================================================
// GOOGLE GEOCODING
// ======================================================

async function getCoordinates(
  address,
  apiKey
) {
  if (
    !address ||
    !address.toString().trim()
  ) {
    return null;
  }

  const cleanAddress =
    address.toString().trim();

  const url =
    GOOGLE_GEOCODING_URL +
    "?" +
    new URLSearchParams({
      address: cleanAddress,
      components: "country:IN",
      key: apiKey,
    }).toString();

  const controller =
    new AbortController();

  const timeout =
    setTimeout(() => {
      controller.abort();
    }, 10000);

  try {
    const response =
      await fetch(url, {
        signal: controller.signal,
        cache: "no-store",
      });

    if (!response.ok) {
      console.error(
        "Google Geocoding HTTP Error:",
        response.status
      );

      return null;
    }

    const data =
      await response.json();

    if (
      data.status !== "OK" ||
      !Array.isArray(data.results) ||
      data.results.length === 0
    ) {
      console.error(
        "Google Geocoding Error:",
        data.status,
        data.error_message || ""
      );

      return null;
    }

    const result =
      data.results[0];

    const location =
      result?.geometry?.location;

    if (!location) {
      return null;
    }

    const latitude =
      Number(location.lat);

    const longitude =
      Number(location.lng);

    if (
      !Number.isFinite(latitude) ||
      !Number.isFinite(longitude)
    ) {
      return null;
    }

    return {
      latitude,
      longitude,

      resolvedLocation:
        result.formatted_address ||
        cleanAddress,

      locationType:
        Array.isArray(result.types)
          ? result.types[0] || "unknown"
          : "unknown",
    };
  } catch (error) {
    if (
      error?.name === "AbortError"
    ) {
      console.error(
        "Google Geocoding Timeout"
      );
    } else {
      console.error(
        "Google Geocoding Error:",
        error
      );
    }

    return null;
  } finally {
    clearTimeout(timeout);
  }
}

// ======================================================
// GOOGLE ROUTES API
// ======================================================

async function getGoogleRoute({
  pickupLocation,
  dropLocation,
  apiKey,
}) {
  const controller =
    new AbortController();

  const timeout =
    setTimeout(() => {
      controller.abort();
    }, 15000);

  try {
    const response =
      await fetch(
        GOOGLE_ROUTES_URL,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            "X-Goog-Api-Key":
              apiKey,

            "X-Goog-FieldMask":
              "routes.distanceMeters," +
              "routes.duration",
          },

          body: JSON.stringify({
            origin: {
              location: {
                latLng: {
                  latitude:
                    pickupLocation.latitude,

                  longitude:
                    pickupLocation.longitude,
                },
              },
            },

            destination: {
              location: {
                latLng: {
                  latitude:
                    dropLocation.latitude,

                  longitude:
                    dropLocation.longitude,
                },
              },
            },

            travelMode: "DRIVE",

            routingPreference:
              "TRAFFIC_UNAWARE",

            units: "METRIC",
          }),

          signal:
            controller.signal,

          cache:
            "no-store",
        }
      );

    const responseText =
      await response.text();

    if (!response.ok) {
      console.error(
        "Google Routes API Error:",
        response.status,
        responseText
      );

      return null;
    }

    const data =
      JSON.parse(responseText);

    const route =
      data?.routes?.[0];

    if (!route) {
      return null;
    }

    const distanceMeters =
      Number(
        route.distanceMeters
      );

    if (
      !Number.isFinite(
        distanceMeters
      ) ||
      distanceMeters <= 0
    ) {
      return null;
    }

    const distanceKm =
      Math.round(
        distanceMeters / 1000
      );

    const durationSeconds =
      Number(
        String(
          route.duration || "0s"
        ).replace("s", "")
      );

    const durationMinutes =
      Number.isFinite(
        durationSeconds
      ) &&
      durationSeconds > 0
        ? Math.round(
            durationSeconds / 60
          )
        : null;

    return {
      distanceKm,
      durationMinutes,
    };
  } catch (error) {
    if (
      error?.name === "AbortError"
    ) {
      console.error(
        "Google Routes Timeout"
      );
    } else {
      console.error(
        "Google Routes Error:",
        error
      );
    }

    return null;
  } finally {
    clearTimeout(timeout);
  }
}

// ======================================================
// GET VERIFIED ROAD DISTANCE
// ======================================================

export async function getRoadDistance({
  pickup,
  drop,
}) {
  try {
    // ==================================================
    // VALIDATE
    // ==================================================

    if (
      !pickup ||
      !pickup.toString().trim() ||
      !drop ||
      !drop.toString().trim()
    ) {
      return {
        success: false,

        verified: false,

        message:
          "Pickup and destination are required.",
      };
    }

    const cleanPickup =
      pickup.toString().trim();

    const cleanDrop =
      drop.toString().trim();

    // ==================================================
    // GOOGLE API KEY
    // ==================================================

    const apiKey =
      process.env
        .GOOGLE_MAPS_SERVER_API_KEY;

    if (!apiKey) {
      console.error(
        "GOOGLE_MAPS_SERVER_API_KEY is missing"
      );

      return {
        success: false,

        verified: false,

        pickup:
          cleanPickup,

        drop:
          cleanDrop,

        message:
          "Server Maps API key missing.",
      };
    }

    // ==================================================
    // CACHE CHECK
    // ==================================================

    const cacheKey =
      `${cleanPickup.toLowerCase()}` +
      `:${cleanDrop.toLowerCase()}`;

    const cached =
      getCache(cacheKey);

    if (cached) {
      return {
        ...cached,

        cached: true,
      };
    }

    // ==================================================
    // GET PICKUP COORDINATES
    // ==================================================

    const pickupLocation =
      await getCoordinates(
        cleanPickup,
        apiKey
      );

    // ==================================================
    // GET DROP COORDINATES
    // ==================================================

    const dropLocation =
      await getCoordinates(
        cleanDrop,
        apiKey
      );

    // ==================================================
    // VALIDATE LOCATIONS
    // ==================================================

    if (
      !pickupLocation ||
      !dropLocation
    ) {
      return {
        success: false,

        verified: false,

        pickup:
          cleanPickup,

        drop:
          cleanDrop,

        message:
          "Pickup or destination location could not be verified.",
      };
    }

    // ==================================================
    // GOOGLE ROUTE
    // ==================================================

    const routeResult =
      await getGoogleRoute({
        pickupLocation,
        dropLocation,
        apiKey,
      });

    if (!routeResult) {
      return {
        success: false,

        verified: false,

        pickup:
          cleanPickup,

        drop:
          cleanDrop,

        pickupResolved:
          pickupLocation.resolvedLocation,

        dropResolved:
          dropLocation.resolvedLocation,

        message:
          "Road route could not be verified.",
      };
    }

    // ==================================================
    // FINAL RESULT
    // ==================================================

    const result = {
      success: true,

      verified: true,

      pickup:
        cleanPickup,

      drop:
        cleanDrop,

      pickupResolved:
        pickupLocation.resolvedLocation,

      dropResolved:
        dropLocation.resolvedLocation,

      pickupLocationType:
        pickupLocation.locationType,

      dropLocationType:
        dropLocation.locationType,

      pickupCoordinates: {
        longitude:
          pickupLocation.longitude,

        latitude:
          pickupLocation.latitude,
      },

      dropCoordinates: {
        longitude:
          dropLocation.longitude,

        latitude:
          dropLocation.latitude,
      },

      distanceKm:
        routeResult.distanceKm,

      durationMinutes:
        routeResult.durationMinutes,

      source:
        "Google Geocoding + Google Routes API",

      note:
        "Road distance is calculated using Google Maps routing data and may change depending on route and road conditions.",

      cached:
        false,
    };

    // ==================================================
    // SAVE CACHE
    // ==================================================

    saveCache(
      cacheKey,
      result
    );

    console.log(
      "RC GOOGLE VERIFIED ROUTE:",
      {
        pickup:
          result.pickupResolved,

        drop:
          result.dropResolved,

        distanceKm:
          result.distanceKm,

        durationMinutes:
          result.durationMinutes,
      }
    );

    return result;
  } catch (error) {
    console.error(
      "RC Google Distance Error:",
      error
    );

    return {
      success: false,

      verified: false,

      message:
        "Road distance could not be calculated at this time.",

      error:
        error instanceof Error
          ? error.message
          : "Unknown distance error",
    };
  }
}