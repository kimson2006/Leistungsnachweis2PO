import { connectToDatabase } from "$lib/db.js";

export const actions = {
  create: async ({ request }) => {
    const formData = await request.formData();
    const name = formData.get("name");
    const walletAddress = formData.get("walletAddress");

    const db = await connectToDatabase();

    try {
      const result = await db.collection("portfolio").insertOne({
        name,
        walletAddress,
        portfolio: [], // Initialize holdings as an empty array
        createdAt: new Date(),
      });
    
      console.log("Inserted Portfolio ID:", result.insertedId.toString());
      return {
        success: true,
        redirect: `/portfolio`, // Redirect to the portfolio list page
      };
    } catch (error) {
      console.error("Error creating portfolio:", error);
      return { error: "Failed to create portfolio." };
    }    
  },
};
