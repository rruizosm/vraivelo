// Small helpers shared by the bike catalogue, the bike card and the product page.

// Frame materials as stored in Supabase (`bikes.Material`) → i18n key under shop.filter.*
export const MATERIALS = [['Carbon', 'carbon'], ['Aluminum', 'aluminum']];

export const materialKey = (value) =>
    MATERIALS.find(([m]) => (value || '').toLowerCase() === m.toLowerCase())?.[1] || null;

// "Giant TCR Advanced 2" → "TCR Advanced 2", for places that show the brand separately
export const modelName = (bike) => (bike?.model || '').replace(new RegExp(`^${bike?.brand}\\s+`, 'i'), '');
