import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// ===============================================
// POPULAR ROUTES CONFIGURATION
// ===============================================

const popularRoutes = [
  {
    destination: "Nagpur Airport to City",
    pickup: "Dr. Babasaheb Ambedkar International Airport, Nagpur",
    drop: "Nagpur",
    tripType: "Airport Pick-Up & Drop",
    airport: true,
  },
  {
    destination: "Wardha",
    pickup: "Nagpur, Maharashtra",
    drop: "Wardha",
    tripType: "One Way Trip",
  },
  {
    destination: "Bhandara",
    pickup: "Nagpur, Maharashtra",
    drop: "Bhandara",
    tripType: "One Way Trip",
  },
  {
    destination: "Chandrapur",
    pickup: "Nagpur, Maharashtra",
    drop: "Chandrapur",
    tripType: "One Way Trip",
  },
  {
    destination: "Amravati",
    pickup: "Nagpur, Maharashtra",
    drop: "Amravati",
    tripType: "One Way Trip",
  },
  {
  destination: "Pench",
  pickup: "Nagpur, Maharashtra",
  drop: "Silari Gate, Pench Tiger Reserve, Madhya Pradesh",
  tripType: "One Way Trip",
  },
  {
  destination: "Tadoba",
  pickup: "Nagpur, Maharashtra",
  drop: "Moharli Gate, Tadoba Andhari Tiger Reserve, Maharashtra",
  tripType: "One Way Trip",
  },
  {
    destination: "Saoner",
    pickup: "Nagpur, Maharashtra",
    drop: "Saoner, Maharashtra",
    tripType: "One Way Trip",
  },
  {
    destination: "Kamptee",
    pickup: "Nagpur, Maharashtra",
    drop: "Kamptee, Maharashtra",
    tripType: "One Way Trip",
  },
  {
    destination: "Ramtek",
    pickup: "Nagpur, Maharashtra",
    drop: "Ramtek, Maharashtra",
    tripType: "One Way Trip",
  },
  {
    destination: "Umred",
    pickup: "Nagpur, Maharashtra",
    drop: "Umred, Maharashtra",
    tripType: "One Way Trip",
  },
  {
    destination: "Katol",
    pickup: "Nagpur, Maharashtra",
    drop: "Katol, Maharashtra",
    tripType: "One Way Trip",
  },
  {
    destination: "Chhindwara",
    pickup: "Nagpur, Maharashtra",
    drop: "Chhindwara, Madhya Pradesh",
    tripType: "One Way Trip",
  },
];

// ===============================================
// GOOGLE ROUTE CALCULATION
// ===============================================

async function getCoordinates(address, apiKey) {
  const url =
    "https://maps.googleapis.com/maps/api/geocode/json?" +
    new URLSearchParams({
      address,
      components: "country:IN",
      key: apiKey,
    }).toString();

  const response = await fetch(url, {
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
}

async function calculateRoute(route, apiKey) {
  const pickupCoords = await getCoordinates(
    route.pickup,
    apiKey
  );

  const dropCoords = await getCoordinates(
    route.drop,
    apiKey
  );

  if (!pickupCoords || !dropCoords) {
    throw new Error(
      `Coordinates not found for ${route.destination}`
    );
  }

  const response = await fetch(
    "https://routes.googleapis.com/directions/v2:computeRoutes",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,

        "X-Goog-FieldMask":
          "routes.distanceMeters,routes.duration",
      },

      body: JSON.stringify({
        origin: {
          location: {
            latLng: {
              latitude: pickupCoords.lat,
              longitude: pickupCoords.lon,
            },
          },
        },

        destination: {
          location: {
            latLng: {
              latitude: dropCoords.lat,
              longitude: dropCoords.lon,
            },
          },
        },

        travelMode: "DRIVE",

        routingPreference: "TRAFFIC_UNAWARE",

        units: "METRIC",
      }),

      cache: "no-store",
    }
  );

  if (!response.ok) {
    const errorText = await response.text();

    console.error(
      "POPULAR ROUTE GOOGLE ERROR:",
      errorText
    );

    throw new Error(
      `Unable to calculate ${route.destination}`
    );
  }

  const data = await response.json();
  const googleRoute = data?.routes?.[0];

  if (!googleRoute) {
    throw new Error(
      `Route not found for ${route.destination}`
    );
  }

  const distance = Math.round(
    Number(googleRoute.distanceMeters || 0) / 1000
  );

  const durationSeconds = Number(
    String(googleRoute.duration || "0s")
      .replace("s", "")
  );

  const duration = Math.round(
    durationSeconds / 60
  );

  return {
    distance,
    duration,
  };
}

// ===============================================
// GET POPULAR ROUTES
//
// 1. MongoDB check
// 2. Existing route found → use MongoDB
// 3. Missing route → Google API call once
// 4. Save result in MongoDB
// 5. Future requests → Google API call nahi
// ===============================================

export async function GET() {
  try {
    const apiKey =
      process.env.GOOGLE_MAPS_SERVER_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          message: "Google Maps API key missing",
        },
        { status: 500 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    const collection =
      db.collection("popularRoutes");

    const results = [];

    for (const route of popularRoutes) {
      const existingRoute =
        await collection.findOne({
          destination: route.destination,
          pickup: route.pickup,
          drop: route.drop,
        });

      // =========================================
      // ROUTE ALREADY SAVED
      // =========================================

      if (
        existingRoute &&
        existingRoute.distance &&
        existingRoute.duration
      ) {
        results.push({
          ...route,
          distance: existingRoute.distance,
          duration: existingRoute.duration,
        });

        continue;
      }

      // =========================================
      // NEW ROUTE
      // GOOGLE API CALL ONLY ONCE
      // =========================================

      const calculatedRoute =
        await calculateRoute(route, apiKey);

      const routeData = {
        ...route,
        distance: calculatedRoute.distance,
        duration: calculatedRoute.duration,
        updatedAt: new Date(),
      };

      await collection.updateOne(
        {
          destination: route.destination,
          pickup: route.pickup,
          drop: route.drop,
        },
        {
          $set: routeData,
          $setOnInsert: {
            createdAt: new Date(),
          },
        },
        {
          upsert: true,
        }
      );

      results.push(routeData);
    }

    return NextResponse.json({
      success: true,
      routes: results,
    });
  } catch (error) {
    console.error(
      "POPULAR ROUTES API ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load popular routes",
      },
      { status: 500 }
    );
  }
}