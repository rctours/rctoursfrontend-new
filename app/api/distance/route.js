import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { pickup, drop } = await request.json();

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
    // Get Coordinates from Nominatim
    // ==============================

    async function getCoordinates(address) {
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

      if (!data.length) return null;

      return [
        Number(data[0].lon),
        Number(data[0].lat),
      ];
    }

    const pickupCoords = await getCoordinates(pickup);
    const dropCoords = await getCoordinates(drop);

    console.log("Pickup :", pickupCoords);
    console.log("Drop :", dropCoords);

    if (!pickupCoords || !dropCoords) {
      return NextResponse.json(
        {
          success: false,
          message: "Location not found",
        },
        { status: 400 }
      );
    }

    // ==============================
    // OSRM ROUTE API
    // ==============================

    const url =
      `https://router.project-osrm.org/route/v1/driving/` +
      `${pickupCoords[0]},${pickupCoords[1]};` +
      `${dropCoords[0]},${dropCoords[1]}` +
      `?overview=false`;

    const routeRes = await fetch(url);

    const routeData = await routeRes.json();

    console.log("OSRM Response :", routeData);

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

    const distanceKm = Math.round(
      routeData.routes[0].distance / 1000
    );

    return NextResponse.json({
      success: true,
      distance: distanceKm,
    });

  } catch (error) {

    console.log(error);

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