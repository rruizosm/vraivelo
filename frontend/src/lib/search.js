// Catalogue search shared by the Bikes and Other Products pages.
//
// - Accent and case insensitive: "carbono" finds "Carbóno", "maillot" finds "MAILLOT".
// - Every word of the query must start a word somewhere ("giant di2" = Giant bikes with Di2;
//   "red" finds "SRAM Red" but not "shared").
// - Spacing inside model names is ignored: "105di2" finds "105 Di2", "duraace" finds "Dura-Ace".
// - Ranking: the more query words found in the main fields (brand, model, category, material),
//   the higher the item; matches only in specs or colours come last.

/** Lowercase, strip accents, turn punctuation into spaces. */
export const normalize = (value) =>
    String(value ?? '')
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, ' ')
        .trim();

const flatten = (parts) =>
    parts.flat(Infinity).filter((p) => p !== null && p !== undefined && p !== '');

const toIndex = (parts) => {
    const words = normalize(flatten(parts).join(' ')).split(' ').filter(Boolean);
    // each entry: the text from one word to the end with the spaces removed, so a query
    // word matches when it starts a word, even if it runs across several ("105di2")
    const starts = words.map((_, i) => words.slice(i, i + 4).join(''));
    return { starts };
};

/**
 * Build the searchable text of an item.
 * @param {Array} primary   brand, model, category, material… (a match here ranks first)
 * @param {Array} secondary colours, specs… (may hold nested arrays)
 */
export const buildSearchIndex = (primary, secondary = []) => {
    const main = toIndex(primary);
    const all = toIndex([primary, secondary]);
    return { main, all };
};

/** Split a query into normalized words. */
export const queryTokens = (query) => normalize(query).split(' ').filter(Boolean);

const has = (index, tk) => index.starts.some((s) => s.startsWith(tk));

/**
 * 0 = no match; otherwise 1 + how many query words are found in the main fields,
 * so a higher score is a better match. An empty query matches everything (score 1).
 */
export const searchScore = (searchIndex, tokens) => {
    if (!tokens.length) return 1;
    if (!searchIndex || !tokens.every((tk) => has(searchIndex.all, tk))) return 0;
    return 1 + tokens.filter((tk) => has(searchIndex.main, tk)).length;
};
