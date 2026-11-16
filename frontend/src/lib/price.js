// Prices are stored as free text in Supabase ("4699€", "1.599,50 €"). These helpers are
// shared by the React app and scripts/prerender.mjs: keep them dependency-free.

// "4699€" -> 4699 · "1.599,50 €" -> 1599.5 · anything unparseable -> null
export const parsePrice = (value) => {
    if (value == null) return null;
    let s = String(value).replace(/[^\d.,]/g, '');
    if (!s) return null;
    if (s.includes(',')) s = s.replace(/\./g, '').replace(',', '.');
    else if (/\.\d{3}$/.test(s)) s = s.replace(/\./g, ''); // "1.599" is thousands, not decimals
    const n = parseFloat(s);
    return Number.isFinite(n) && n > 0 ? n : null;
};

// 4699 -> "4.699 €"
export const formatPrice = (n) => `${Math.round(n).toLocaleString('de-DE')} €`;
