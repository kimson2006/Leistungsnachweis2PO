import { json } from "@sveltejs/kit";
import { updateCryptoStatus } from "$lib/db.js";

export async function POST({ request }) {
  try {
    const { id } = await request.json();
    await updateCryptoStatus(id, true); // Status auf `true` setzen
    return json({ success: true });
  } catch (error) {
    console.error("Fehler beim Hinzufügen zur Watchlist:", error);
    return json({ success: false, error: error.message }, { status: 500 });
  }
}
