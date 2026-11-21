// Site languages and their URLs. Spanish lives at the root (/shop/...), Catalan and English
// under a prefix (/ca/shop/..., /en/shop/...), so Google can index every language as its own
// page. Shared by the React app and scripts/prerender.mjs: keep it dependency-free.

export const LANGS = ['es', 'ca', 'en'];
export const DEFAULT_LANG = 'es';

export const OG_LOCALE = { es: 'es_ES', ca: 'ca_ES', en: 'en_GB' };

/** "/ca/shop/" -> "ca"; "/shop/" -> "es" */
export const langFromPath = (pathname = '/') => {
    const first = String(pathname).split('/')[1];
    return LANGS.includes(first) && first !== DEFAULT_LANG ? first : DEFAULT_LANG;
};

/** React Router basename of a language: "" for Spanish, "/ca" or "/en" otherwise. */
export const basenameFor = (lang) => (lang === DEFAULT_LANG ? '' : `/${lang}`);

/** "/ca/shop/gravel/" -> "/shop/gravel/"; "/ca" -> "/" */
export const stripLang = (pathname = '/') => {
    const lang = langFromPath(pathname);
    if (lang === DEFAULT_LANG) return pathname || '/';
    const rest = pathname.slice(lang.length + 1);
    return rest.startsWith('/') ? rest : `/${rest}`;
};

/** Route path of the site ("/shop/") -> its URL in `lang` ("/ca/shop/"). */
export const localizePath = (path = '/', lang = DEFAULT_LANG) => {
    const p = path.startsWith('/') ? path : `/${path}`;
    return lang === DEFAULT_LANG ? p : `/${lang}${p}`;
};
