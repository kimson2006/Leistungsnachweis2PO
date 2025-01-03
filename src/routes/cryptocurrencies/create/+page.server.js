import db from '$lib/db';

export const actions = {
    create: async ({ request }) => {
        const formData = await request.formData();

        const newCrypto = {
            name: formData.get('name'),
            symbol: formData.get('symbol'),
            year: parseInt(formData.get('year'), 10),
            price: parseFloat(formData.get('price')),
            marketCap: parseFloat(formData.get('marketCap')),
            poster: formData.get('poster') || '/images/placeholder.png',
            watchlist: formData.get('watchlist') === 'true'
        };

        try {
            await db.createCrypto(newCrypto);
            return { success: true };
        } catch (error) {
            console.error('Fehler beim Erstellen der Kryptowährung:', error);
            return { error: 'Fehler beim Erstellen der Kryptowährung.' };
        }
    }
};
