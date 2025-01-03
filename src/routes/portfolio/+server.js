import { getPortfolios } from "$lib/db.js";

export async function GET() {
  try {
    const portfolios = await getPortfolios();
    return new Response(JSON.stringify(portfolios), { status: 200 });
  } catch (error) {
    console.error("Error fetching portfolios:", error.message);
    return new Response("Failed to fetch portfolios", { status: 500 });
  }
}
