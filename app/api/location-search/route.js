export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const q = searchParams.get("q");

  if (!q) {
    return Response.json([]);
  }

  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        q
      )}&format=json&limit=5`
    );

    const data = await res.json();

    return Response.json(data);
  } catch (error) {
    return Response.json([]);
  }
}