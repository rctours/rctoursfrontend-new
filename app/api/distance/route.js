export async function POST(req) {
  try {
    const { pickup, drop } = await req.json();

    const apiKey = process.env.ORS_API_KEY;

    // Pickup Geocode
    const pickupRes = await fetch(
      `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${encodeURIComponent(
        pickup
      )}`
    );

    const pickupData = await pickupRes.json();
    console.log("PICKUP DATA =", JSON.stringify(pickupData, null, 2));

    // Drop Geocode
    const dropRes = await fetch(
      `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${encodeURIComponent(
        drop
      )}`
    );

    const dropData = await dropRes.json();
    console.log("DROP DATA =", JSON.stringify(dropData, null, 2));

    const pickupCoords =
      pickupData.features?.[0]?.geometry?.coordinates;

    const dropCoords =
      dropData.features?.[0]?.geometry?.coordinates;

    if (!pickupCoords || !dropCoords) {
      return Response.json(
      {
      success: false,
      error: "Location not found",
      },
      { status: 400 }
      );
      }

    const routeRes = await fetch(
      "https://api.openrouteservice.org/v2/directions/driving-car",
      {
        method: "POST",
        headers: {
          Authorization: apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          coordinates: [
            pickupCoords,
            dropCoords,
          ],
        }),
      }
    );

    const routeData = await routeRes.json();

    const distanceMeters =
      routeData.routes[0].summary.distance;

    const distanceKm = Math.round(
      distanceMeters / 1000
    );

    return Response.json({
    success: true,
    distance: distanceKm,
    });
    } catch (error) {
    console.log(error);

    return Response.json(
    {
    success: false,
    error: "Server Error",
    },
    { status: 500 }
    );
  }
}