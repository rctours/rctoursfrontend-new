import { NextResponse } from "next/server";

// ===============================================
// GET METHOD: AUTOCOMPLETE SEARCH FOR ADDRESSES
// ===============================================
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    // 1. Handle empty query state gracefully
    if (!query) {
      return NextResponse.json([]);
    }

    // 2. Execute Geocoding Search via OpenStreetMap Nominatim
    // Note: User-Agent is mandatory for Nominatim usage policies
    const response = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    query + ", Maharashtra, India"
    )}&format=json&limit=5&addressdetails=1&countrycodes=in`,
    {
    headers: {
      "User-Agent": "RC-Tours-Travels-App/1.0",
    },
  }
);

    if (!response.ok) {
      throw new Error("Geocoding service provider returned an error.");
    }

    const data = await response.json();

    return NextResponse.json(data);
    
  } catch (error) {
    console.error("LOCATION SEARCH PIPELINE EXCEPTION:", error);
    
    // 3. Return empty array on failure to prevent frontend UI breakage
    return NextResponse.json([]);
  }
}