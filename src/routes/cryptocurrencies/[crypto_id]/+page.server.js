import db from "$lib/db.js";

export async function load({ params }) {
  const cryptoId = params.crypto_id; // Ensure the correct parameter name

  try {
    console.log(`Fetching cryptocurrency with id: ${cryptoId}`);
    const crypto = await db.getCrypto(cryptoId); // Function to load the cryptocurrency by ID
    if (!crypto) {
      return {
        status: 404,
        error: new Error("Kryptowährung nicht gefunden"),
      };
    }

    // Ensure the _id is serializable by converting it to a string
    const serializedCrypto = {
      ...crypto,
      _id: crypto._id.toString(), // Convert ObjectId to string
    };

    return { crypto: serializedCrypto };
  } catch (error) {
    console.error("Fehler beim Laden der Kryptowährung:", error);
    throw error;
  }
}
