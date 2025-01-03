import { connectToDatabase } from "$lib/db.js";
import { ObjectId } from "mongodb";

export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const portfolio_id = formData.get("portfolio_id");

    const db = await connectToDatabase();

    try {
      const result = await db.collection("portfolio").deleteOne({ _id: new ObjectId(portfolio_id) });

      if (result.deletedCount === 0) {
        return { error: "Portfolio not found or could not be deleted." };
      }

      return { success: true };
    } catch (error) {
      console.error("Error deleting portfolio:", error);
      return { error: "Failed to delete portfolio." };
    }
  },
};
