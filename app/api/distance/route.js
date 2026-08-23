import { NextResponse } from "next/server";

// ===============================================
// GOOGLE ROUTES CACHE
// ===============================================

const cache = new Map();

const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes
const MAX_CACHE_SIZE = 500;

function getCache(key) {
  const cached = cache.get(key);

  if (
    cached &&
    Date.now() - cached.timestamp < CACHE_DURATION
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
    const firstKey = cache.keys().next().value;

    if (firstKey) {
      cache.delete(firstKey);
    }
  }
}

// ===============================================
// VALIDATE COORDINATES
// ===============================================

function validCoordinates(coords) {
  if (!coords) return false;

  return (
    Number.isFinite(Number(coords.lat)) &&
    Number.isFinite(Number(coords.lon))
  );
}

// ===============================================
// GOOGLE GEOCODING FALLBACK
// ===============================================

async function getCoordinates(address, apiKey) {
  const url =
    "https://maps.googleapis.com/maps/api/geocode/json?" +
    new URLSearchParams({
      address,
      components: "country:IN",
      key: apiKey,
    }).toString();

  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, 10000);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    const result = data?.results?.[0];

    if (!result?.geometry?.location) {
      return null;
    }

    return {
      lat: Number(result.geometry.location.lat),
      lon: Number(result.geometry.location.lng),
    };
  } catch (error) {
    console.error("GOOGLE GEOCODING ERROR:", error);
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

// ===============================================
// POST METHOD
// ===============================================

export async function POST(request) {
  try {
    const apiKey = process.env.GOOGLE_MAPS_SERVER_API_KEY;

    if (!apiKey) {
      console.error("GOOGLE_MAPS_SERVER_API_KEY is missing");

      return NextResponse.json(
        {
          success: false,
          message: "Server Maps API key missing",
        },
        { status: 500 }
      );
    }

    const {
      pickup,
      drop,
      pickupCoords,
      dropCoords,
    } = await request.json();

    // ==============================
    // BASIC VALIDATION
    // ==============================

    if (!pickup || !drop) {
      return NextResponse.json(
        {
          success: false,
          message: "Pickup or Drop missing",
        },
        { status: 400 }
      );
    }

    // ==============================
    // COORDINATES
    // ==============================

    let finalPickupCoords = null;
    let finalDropCoords = null;

    if (validCoordinates(pickupCoords)) {
      finalPickupCoords = {
        lat: Number(pickupCoords.lat),
        lon: Number(pickupCoords.lon),
      };
    }

    if (validCoordinates(dropCoords)) {
      finalDropCoords = {
        lat: Number(dropCoords.lat),
        lon: Number(dropCoords.lon),
      };
    }

    // ==============================
    // GOOGLE GEOCODING FALLBACK
    // ==============================

    if (!finalPickupCoords) {
      finalPickupCoords =
        await getCoordinates(pickup, apiKey);
    }

    if (!finalDropCoords) {
      finalDropCoords =
        await getCoordinates(drop, apiKey);
    }

    // ==============================
    // CHECK COORDINATES
    // ==============================

    if (!finalPickupCoords || !finalDropCoords) {
      return NextResponse.json(
        {
          success: false,
          message: "Location coordinates not found",
        },
        { status: 400 }
      );
    }

    // ==============================
    // CACHE
    // ==============================

    const cacheKey =
      `${finalPickupCoords.lat},${finalPickupCoords.lon}` +
      `:${finalDropCoords.lat},${finalDropCoords.lon}`;

    const cached = getCache(cacheKey);

    if (cached) {
      return NextResponse.json({
        success: true,
        ...cached,
        cached: true,
      });
    }

    // ==============================
    // GOOGLE ROUTES API
    // ==============================

    const controller = new AbortController();

    const timeout = setTimeout(() => {
      controller.abort();
    }, 15000);

    try {
      const routeResponse = await fetch(
        "https://routes.googleapis.com/directions/v2:computeRoutes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": apiKey,

            // Distance + Duration + Toll information
            "X-Goog-FieldMask":
              "routes.distanceMeters," +
              "routes.duration," +
              "routes.travelAdvisory.tollInfo",
          },
          body: JSON.stringify({
            origin: {
              location: {
                latLng: {
                  latitude: finalPickupCoords.lat,
                  longitude: finalPickupCoords.lon,
                },
              },
            },

            destination: {
              location: {
                latLng: {
                  latitude: finalDropCoords.lat,
                  longitude: finalDropCoords.lon,
                },
              },
            },

            travelMode: "DRIVE",

            routingPreference: "TRAFFIC_UNAWARE",

            // Toll information request
            extraComputations: [
              "TOLLS",
            ],

            routeModifiers: {
              avoidTolls: false,
            },

            units: "METRIC",
          }),
          signal: controller.signal,
          cache: "no-store",
        }
      );

      const routeText =
        await routeResponse.text();

      if (!routeResponse.ok) {
        console.error(
          "GOOGLE ROUTES API ERROR:",
          routeResponse.status,
          routeText
        );

        return NextResponse.json(
          {
            success: false,
            message: "Unable to calculate route",
          },
          { status: 500 }
        );
      }

      const routeData = JSON.parse(routeText);

      const route = routeData?.routes?.[0];

      if (!route) {
        return NextResponse.json(
          {
            success: false,
            message: "Route not found",
          },
          { status: 400 }
        );
      }

      // ==============================
      // DISTANCE
      // ==============================

      const distanceMeters =
        Number(route.distanceMeters) || 0;

      const distanceKm = Math.round(
        distanceMeters / 1000
      );

      // ==============================
      // DURATION
      // Google format example: "25200s"
      // ==============================

      const durationSeconds = Number(
        String(route.duration || "0s")
          .replace("s", "")
      );

      const durationMinutes = Math.round(
        durationSeconds / 60
      );

      // ==============================
      // TOLL INFORMATION
      // ==============================

      const tollInfo =
        route?.travelAdvisory?.tollInfo;

      const tollCosts =
        tollInfo?.estimatedPrice || [];

      // We keep all available toll estimates.
      // India pricing may contain INR values.
      const tolls = tollCosts.map((item) => ({
        currencyCode: item.currencyCode || "",
        units: Number(item.units || 0),
        nanos: Number(item.nanos || 0),
        amount:
          Number(item.units || 0) +
          Number(item.nanos || 0) / 1_000_000_000,
      }));

      const inrToll = tolls
        .filter(
          (item) =>
            item.currencyCode === "INR"
        )
        .reduce(
          (total, item) =>
            total + item.amount,
          0
        );

      const responseData = {
        distance: distanceKm,
        duration: durationMinutes,

        // Toll amount in INR when Google provides it
        toll: Math.round(inrToll),

        // Useful for debugging / future UI
        tolls,

        pickupCoords: finalPickupCoords,
        dropCoords: finalDropCoords,
      };

      saveCache(cacheKey, responseData);

      console.log(
        "GOOGLE ROUTE RESULT:",
        responseData
      );

      return NextResponse.json({
        success: true,
        ...responseData,
        cached: false,
      });
    } finally {
      clearTimeout(timeout);
    }
  } catch (error) {
    if (error?.name === "AbortError") {
      console.error(
        "GOOGLE ROUTES API TIMEOUT"
      );
    } else {
      console.error(
        "DISTANCE API ERROR:",
        error
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}