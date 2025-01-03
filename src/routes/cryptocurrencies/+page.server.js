import db from "$lib/db.js";

export async function load() {
  try {
    const cryptos = await db.getCryptos(); // Stelle sicher, dass `getCryptos` Daten zurückgibt
    console.log("Geladene Kryptowährungen:", cryptos);
    return { cryptos };
  } catch (error) {
    console.error("Error loading cryptocurrencies:", error.message);
    throw new Error("Failed to load cryptocurrencies.");
  }
}

export const actions = {
  addToWatchlist: async ({ request }) => {
    let data = await request.formData();
    let id = data.get("id");
    let crypto = { 
      _id: id,
      watchlist: true
    };
    await db.updateCrypto(crypto); // Assumes `db.updateCrypto` updates the cryptocurrency's watchlist status
  },
  removeFromWatchlist: async ({ request }) => {
    let data = await request.formData();
    let id = data.get("id");
    let crypto = { 
      _id: id,
      watchlist: false
    };
    await db.updateCrypto(crypto); // Assumes `db.updateCrypto` updates the cryptocurrency's watchlist status
  }
};
