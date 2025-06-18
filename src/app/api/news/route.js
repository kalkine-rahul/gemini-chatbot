export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return new Response(JSON.stringify({ error: "Query parameter is required" }), {
      status: 400,
    });
  }
   const apiKey = process.env.NEXT_NEWS_API_KEY;

  const url = `https://newsapi.org/v2/everything?q=${query}&language=en&apiKey=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("Error fetching news:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch news data" }), {
      status: 500,
    });
  }
}
