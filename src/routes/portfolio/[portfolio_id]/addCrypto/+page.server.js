import { connectToDatabase } from "$lib/db.js";
import { ObjectId } from "mongodb";

export const actions = {
  addCrypto: async ({ request }) => {
    const formData = await request.formData();
    const portfolio_id = formData.get("portfolio_id");
    const cryptoId = formData.get("cryptoId");
    const amount = parseFloat(formData.get("amount"));
    const buyPrice = parseFloat(formData.get("buyPrice"));

    const db = await connectToDatabase();

    if (!ObjectId.isValid(portfolio_id) || !ObjectId.isValid(cryptoId)) {
      return { error: "Invalid Portfolio ID or Cryptocurrency ID" };
    }

    try {
      const result = await db.collection("portfolio").updateOne(
        { _id: new ObjectId(portfolio_id) },
        {
          $push: {
            portfolio: { cryptoId: new ObjectId(cryptoId), amount, buyPrice },
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
};
