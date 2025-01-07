import { connectToDatabase } from "$lib/db.js";

export const actions = {
  create: async ({ request }) => {
    const formData = await request.formData();
    const name = formData.get("name");
    const walletAddress = formData.get("walletAddress");
    const description = formData.get("description"); 

    const db = await connectToDatabase();

    try {
      const result = await db.collection("portfolio").insertOne({
        name,
        walletAddress,
        description,
        portfolio: [], // Initialize holdings as an empty array
        createdAt: new Date(),
      });
    
      console.log("Inserted Portfolio ID:", result.insertedId.toString());
      return {
        success: true,
        redirect: `/portfolio`,
      };
    } catch (error) {
      console.error("Error creating portfolio:", error);
      return { error: "Failed to create portfolio." };
    }    
  },
};

