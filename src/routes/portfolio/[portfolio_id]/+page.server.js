import { connectToDatabase } from "$lib/db.js";
import { ObjectId } from "mongodb";

// Load function to fetch portfolio and cryptocurrencies
export async function load({ params }) {
  const db = await connectToDatabase();
  const { portfolio_id } = params;

  if (!ObjectId.isValid(portfolio_id)) {
    return { status: 400, error: "Invalid Portfolio ID" };
  }

  const portfolio = await db.collection("portfolio").findOne({ _id: new ObjectId(portfolio_id) });

  if (!portfolio) {
    return { status: 404, error: "Portfolio not found" };
  }

  const holdings = portfolio.portfolio || [];

  const cryptocurrencies = holdings.length > 0
    ? await db
        .collection("cryptocurrencies")
        .find({ _id: { $in: holdings.map((entry) => new ObjectId(entry.cryptoId)) } })
        .toArray()
    : [];

  return {
    portfolio: {
      _id: portfolio._id.toString(),
      name: portfolio.name || "Unnamed Portfolio",
      walletAddress: portfolio.walletAddress || "No Wallet Address",
      holdings: holdings.map((entry) => ({
        cryptoId: entry.cryptoId?.toString() || "Unknown",
        amount: entry.amount || 0,
        buyPrice: entry.buyPrice || 0,
      })),
    },
    cryptocurrencies: cryptocurrencies.map((crypto) => ({
      _id: crypto._id.toString(),
      name: crypto.name || "Unknown",
      symbol: crypto.symbol || "",
      price: crypto.price || 0,
    })),
  };
}

// Actions for handling POST requests
export const actions = {
  addCrypto: async ({ request }) => {
    const formData = await request.formData();
    const portfolio_id = formData.get("portfolio_id");
    const cryptoId = formData.get("cryptoId");
    const amount = parseFloat(formData.get("amount"));
    const buyPrice = parseFloat(formData.get("buyPrice"));

    const db = await connectToDatabase();

    if (!ObjectId.isValid(portfolio_id) || !ObjectId.isValid(cryptoId)) {
      return { error: "Invalid Portfolio ID or Cryptocurrency ID." };
    }
    if (isNaN(amount) || isNaN(buyPrice) || amount <= 0 || buyPrice <= 0) {
      return { error: "Amount and Buy Price must be positive numbers." };
    }

    try {
      const result = await db.collection("portfolio").updateOne(
        { _id: new ObjectId(portfolio_id) },
        {
          $push: {
            portfolio: {
              cryptoId: new ObjectId(cryptoId),
              amount,
              buyPrice,
            },
          },
        }
      );

      if (result.matchedCount === 0) {
        return { error: "Portfolio not found or could not be updated." };
      }

      console.log(`Cryptocurrency added to portfolio with ID ${portfolio_id}`);
      return { success: true, message: "Cryptocurrency added successfully!" };
    } catch (error) {
      console.error("Error adding cryptocurrency:", error.message);
      return { error: "Failed to add cryptocurrency to portfolio." };
    }
  },
  removeCrypto: async ({ request }) => {
    const formData = await request.formData();
    const portfolio_id = formData.get("portfolio_id");
    const cryptoId = formData.get("cryptoId");

    const db = await connectToDatabase();

    // Validate ObjectId
    if (!ObjectId.isValid(portfolio_id) || !ObjectId.isValid(cryptoId)) {
      return { error: "Invalid Portfolio ID or Cryptocurrency ID" };
    }

    try {
      // Remove cryptocurrency from portfolio
      const result = await db.collection("portfolio").updateOne(
        { _id: new ObjectId(portfolio_id) },
        {
          $pull: { portfolio: { cryptoId: new ObjectId(cryptoId) } },
        }
      );

      if (result.matchedCount === 0) {
        return { error: "Portfolio not found or could not be updated." };
      }

      console.log(`Cryptocurrency removed from portfolio with ID ${portfolio_id}`);
      return { success: true, message: "Cryptocurrency removed successfully!" };
    } catch (error) {
      console.error("Error removing cryptocurrency:", error.message);
      return { error: "Failed to remove cryptocurrency from portfolio." };
    }
  },
  create: async ({ request }) => {
    const formData = await request.formData();
    const name = formData.get("name");
    const walletAddress = formData.get("walletAddress");

    const db = await connectToDatabase();

    try {
      // Insert the portfolio into the database
      const result = await db.collection("portfolio").insertOne({
        name,
        walletAddress,
        portfolio: [], // Initialize holdings as an empty array
        createdAt: new Date(),
      });

      console.log("Inserted Portfolio ID:", result.insertedId.toString());
      return {
        success: true,
        redirect: `/portfolio/${result.insertedId.toString()}`, // Redirect to portfolio details
      };
    } catch (error) {
      console.error("Error creating portfolio:", error);
      return { error: "Failed to create portfolio." };
    }
  },
};
