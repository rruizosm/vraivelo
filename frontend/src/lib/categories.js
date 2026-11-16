// Bike categories as stored in Supabase (`bikes.category`) and the URL slug of each
// category landing page. Shared by the app and scripts/prerender.mjs.
// Slugs are Spanish on purpose: they appear in the URL users and Google see.
// None of them can collide with a product URL, which always ends in "-<numeric id>".

export const BIKE_CATEGORIES = [
    { key: 'Road', slug: 'carretera' },
    { key: 'Gravel', slug: 'gravel' },
    { key: 'MTB', slug: 'mtb' },
    { key: 'eBike', slug: 'electricas' },
    { key: 'Kids', slug: 'infantiles' },
];

export const categoryBySlug = (slug) => BIKE_CATEGORIES.find((c) => c.slug === slug);
export const categoryByKey = (key) => BIKE_CATEGORIES.find((c) => c.key === key);

export const categoryPath = (key) => {
    const c = categoryByKey(key);
    return c ? `/shop/${c.slug}/` : '/shop/';
};
