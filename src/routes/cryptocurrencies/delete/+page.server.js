import { connectToDatabase } from "$lib/db.js";
import { ObjectId } from "mongodb";

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get("id"); // Extract the cryptocurrency ID

        try {
            const db = await connectToDatabase();
            const result = await db.collection("cryptocurrencies").deleteOne({ _id: new ObjectId(id) });

            if (result.deletedCount === 0) {
                return { error: "Cryptocurrency not found or could not be deleted." };
            }

            return { success: true };
        } catch (error) {
            console.error("Error deleting cryptocurrency:", error);
            return { error: "Failed to delete cryptocurrency." };
        }
    },
};
