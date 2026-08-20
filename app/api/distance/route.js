import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const {
      pickup,
      drop,
      pickupCoords,
      dropCoords,
    } = await request.json();

    // ==============================
    // Basic Validation
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
    // Coordinates
    // ==============================

    let finalPickupCoords = null;
    let finalDropCoords = null;

    // --------------------------------
    // Pickup coordinates
    // --------------------------------

    if (
      pickupCoords &&
      Number.isFinite(Number(pickupCoords.lat)) &&
      Number.isFinite(Number(pickupCoords.lon))
    ) {
      finalPickupCoords = [
        Number(pickupCoords.lon),
        Number(pickupCoords.lat),
      ];
    }

    // --------------------------------
    // Drop coordinates
    // --------------------------------

    if (
      dropCoords &&
      Number.isFinite(Number(dropCoords.lat)) &&
      Number.isFinite(Number(dropCoords.lon))
    ) {
      finalDropCoords = [
        Number(dropCoords.lon),
        Number(dropCoords.lat),
      ];
    }

    // ==============================
    // Fallback: Nominatim
    // ==============================

    async function getCoordinates(address) {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            address
          )}&format=json&limit=1&countrycodes=in`,
          {
            headers: {
              "User-Agent": "RC-Tours-Travels-App/1.0",
            },
          }
        );

        const data = await res.json();

        if (!Array.isArray(data) || !data.length) {
          return null;
        }

        return [
          Number(data[0].lon),
          Number(data[0].lat),
        ];
      } catch (error) {
        console.log("Nominatim error:", error);
        return null;
      }
    }

    // --------------------------------
    // Pickup fallback
    // --------------------------------

    if (!finalPickupCoords) {
      finalPickupCoords = await getCoordinates(pickup);
    }

    // --------------------------------
    // Drop fallback
    // --------------------------------

    if (!finalDropCoords) {
      finalDropCoords = await getCoordinates(drop);
    }

    console.log("Pickup :", finalPickupCoords);
    console.log("Drop :", finalDropCoords);

    // ==============================
    // Check Coordinates
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
    // OSRM Route API
    // ==============================

    const url =
      `https://router.project-osrm.org/route/v1/driving/` +
      `${finalPickupCoords[0]},${finalPickupCoords[1]};` +
      `${finalDropCoords[0]},${finalDropCoords[1]}` +
      `?overview=false`;

    const routeRes = await fetch(url);

    const routeData = await routeRes.json();

    console.log("OSRM Response :", routeData);

    // ==============================
    // Check Route
    // ==============================

    if (
      routeData.code !== "Ok" ||
      !routeData.routes ||
      !routeData.routes.length
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Route not found",
        },
        { status: 400 }
      );
    }

    // ==============================
    // Distance
    // ==============================

    const distanceKm = Math.round(
      routeData.routes[0].distance / 1000
    );

    console.log("DISTANCE KM :", distanceKm);

    // ==============================
    // Final Response
    // ==============================

    return NextResponse.json({
      success: true,
      distance: distanceKm,
    });
  } catch (error) {
    console.log("Distance API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}