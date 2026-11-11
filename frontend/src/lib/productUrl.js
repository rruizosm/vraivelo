// Product URLs carry the product name so it shows up in Google results and in the link
// itself, e.g. /shop/giant-tcr-advanced-pro-1-di2-316/. The trailing number is the
// database id, which is what ProductDetail actually looks up.
// Shared by the React app and scripts/prerender.mjs: keep it dependency-free.

export const slugify = (text = '') =>
    String(text)
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '') // strip accents: "Bidón" -> "Bidon"
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

const productName = (item) => item?.model || item?.Product || item?.product || '';

export const productPath = (item) => {
    const id = String(item.id);
    // Local items (clothes) already use a readable string id
    if (!/^\d+$/.test(id)) return `/shop/${id}/`;
    const slug = slugify(productName(item));
    return `/shop/${slug ? `${slug}-` : ''}${id}/`;
};

// "/shop/giant-tcr-advanced-pro-1-di2-316" -> "316"; "/shop/316" -> "316"
export const productIdFromParam = (param = '') => {
    const match = String(param).match(/(?:^|-)(\d+)$/);
    return match ? match[1] : param;
};
