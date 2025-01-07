import { connectToDatabase } from "$lib/db.js";

export async function load() {
  const db = await connectToDatabase();

  // Fetch all portfolios
  const portfolios = await db.collection("portfolio").find().toArray();

  return {
    portfolios: portfolios.map((portfolio) => ({
      _id: portfolio._id.toString(),
      name: portfolio.name,
      walletAddress: portfolio.walletAddress,
      //currentValue: portfolio.currentValue || 0
    })),
  };
}
