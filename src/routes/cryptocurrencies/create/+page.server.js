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
            watchlist: formData.get('watchlist') === 'true',
            description: formData.get('description') || 'No description provided.' 
        };

        try {
            await db.createCrypto(newCrypto);
            return { success: true };
        } catch (error) {
            console.error('Error creating cryptocurrency:', error);
            return { error: 'Error creating cryptocurrency.' };
        }
    }
};
