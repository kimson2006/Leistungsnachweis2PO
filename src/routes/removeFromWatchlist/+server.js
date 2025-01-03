import { json } from "@sveltejs/kit";
import db from "$lib/db.js";

export async function POST({ request }) {
  try {
    const { id } = await request.json(); // Extrahiere die ID
    await db.updateCryptoStatus(id, false); // Setze `watchlist` auf `false`

    return json({ success: true }); // Erfolg zurückgeben
  } catch (error) {
    console.error("Fehler beim Entfernen aus der Watchlist:", error);
    return json({ success: false, error: error.message }, { status: 500 });
  }
}
