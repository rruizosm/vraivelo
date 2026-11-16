// Helpers for the product page of a bike: photo gallery per colour (from public/bikes/index.json)
// and the specifications split into groups.

// ─── Gallery ────────────────────────────────────────────────────────────────
let indexPromise = null;

/** public/bikes/index.json, fetched once and cached (≈15 KB gzipped). Resolves to a Map id → entry. */
export const loadBikeIndex = () => {
    if (!indexPromise) {
        indexPromise = fetch('/bikes/index.json')
            .then((r) => (r.ok ? r.json() : { bikes: [] }))
            .then((data) => new Map((data.bikes || []).map((b) => [b.id, b])))
            .catch(() => {
                indexPromise = null; // allow a retry on the next product page
                return new Map();
            });
    }
    return indexPromise;
};

const IGNORED_WORDS = new Set(['irisselect', 'collection', 'gloss', 'matte', 'satin']);
const words = (text) => (text || '')
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length > 1 && !IGNORED_WORDS.has(w));

const VIEW_ORDER = ['side', 'three-quarter-front', 'three-quarter-rear'];
const viewRank = (view) => {
    const i = VIEW_ORDER.indexOf(view);
    return i === -1 ? VIEW_ORDER.length : i;
};

/**
 * Photos for one colour of a bike: its catalogue shot first, then the official studio views
 * (side, 3/4, details) of that colour. Studio photos are only used when the official page is
 * this exact model (`match: "exact"`), and are matched to the colour by its words
 * ("CHALK GREY-IrisSelect" ↔ "white-pearl-chalk-grey-red-racing"); no match → catalogue shot only.
 */
export const galleryFor = (entry, mainImage, colorName, colorCount) => {
    const list = mainImage ? [mainImage] : [];
    if (!entry || entry.match !== 'exact' || !entry.studio?.length) return list;

    const byColor = new Map();
    entry.studio.forEach((s) => {
        if (!byColor.has(s.color)) byColor.set(s.color, []);
        byColor.get(s.color).push(s);
    });

    // Pick the studio colour that best matches. A match needs two shared words, or the studio
    // colour starting with the same main colour ("BLACK" ↔ "black-liquid-metal"); a single word
    // somewhere in the middle ("BLUE OCEAN" ↔ "miami-blue-…") is too weak, so no studio shots.
    let chosen = null;
    const wanted = words(colorName);
    if (wanted.length) {
        let best = 0;
        for (const [color, shots] of byColor) {
            const have = words(color);
            const shared = wanted.filter((w) => have.includes(w)).length;
            const startsSame = have[0] === wanted[0];
            if (shared < 2 && !startsSame) continue;
            const score = shared * 10 + (startsSame ? 5 : 0) - have.length; // fewer extra words = closer
            if (score > best) { best = score; chosen = shots; }
        }
    }
    // a single-colour bike: its studio set is that colour even if the names differ
    if (!chosen && colorCount <= 1 && byColor.size === 1) chosen = [...byColor.values()][0];
    if (!chosen) return list;

    const studio = [...chosen]
        .sort((a, b) => viewRank(a.view) - viewRank(b.view) || a.file.localeCompare(b.file))
        .map((s) => s.file);
    return [...list, ...studio.filter((f) => f !== mainImage)];
};

/** Lifestyle photos for the "en ruta" strip: the model's own first, then its family's. */
export const lifestyleFor = (entry, max = 4) =>
    entry ? [...(entry.lifestyle || []), ...(entry.family_lifestyle || [])].slice(0, max) : [];

// ─── Specifications ─────────────────────────────────────────────────────────
// Labels come in Spanish, Catalan or English and in any case ("CUADRO", "Frame", "Quadre"),
// so groups are picked by keywords. Order matters: the first group that matches wins.
const GROUPS = [
    ['electric', ['motor', 'bateria', 'battery', 'display', 'pantalla', 'cargador', 'charger', 'carregador', 'autonomia', 'range']],
    ['brakes', ['freno', 'brake', 'fre ', 'frens', 'maneta']],
    ['frame', ['cuadro', 'quadre', 'frame', 'horquilla', 'forquilla', 'fork', 'material', 'amortiguador', 'amortidor', 'shock', 'suspension', 'headset', 'direccion', 'direccio', 'colgador', 'patilla', 'hanger', 'abrazadera', 'seat clamp', 'flip chip']],
    ['drivetrain', ['mando', 'shifter', 'cambio', 'canvi', 'derailleur', 'desviador', 'biela', 'crank', 'cadena', 'chain', 'casete', 'cassette', 'pedalier', 'bottom bracket', 'bb ', 'gear', 'control changes', 'transmision', 'grupo', 'groupset']],
    ['wheels', ['rueda', 'roda', 'wheel', 'llanta', 'rim', 'cubierta', 'neumatic', 'tyre', 'tire', 'radio', 'spoke', 'buje', 'boixa', 'hub']],
    ['cockpit', ['manillar', 'handlebar', 'tija', 'seatpost', 'sillin', 'selli', 'saddle', 'potencia', 'stem', 'puno', 'grip', 'pedal']],
];
export const SPEC_GROUP_ORDER = ['frame', 'drivetrain', 'brakes', 'wheels', 'cockpit', 'electric', 'other'];

const plain = (text) => ` ${(text || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')} `;

const prettyLabel = (label) => {
    const l = label.trim();
    // "CUADRO" / "TIJA DE SILLÍN" → "Cuadro" / "Tija de sillín"; mixed-case labels stay as they are
    return l === l.toUpperCase() ? l.charAt(0) + l.slice(1).toLowerCase() : l;
};

/** "Cuadro: Advanced-grade Composite" → { label, value, group }. Lines without a label go to "other". */
export const parseSpec = (line) => {
    const text = String(line).trim();
    const i = text.indexOf(':');
    const hasLabel = i > 0 && i < 40;
    const label = hasLabel ? prettyLabel(text.slice(0, i)) : '';
    const value = hasLabel ? text.slice(i + 1).trim() : text;
    const key = plain(label);
    const group = hasLabel ? (GROUPS.find(([, kws]) => kws.some((k) => key.includes(k)))?.[0] || 'other') : 'other';
    return { label, value, group };
};

/** Specs grouped in display order: [{ group, items: [{label, value}] }]. */
export const groupSpecs = (specs) => {
    const parsed = (specs || []).filter(Boolean).map(parseSpec);
    return SPEC_GROUP_ORDER
        .map((group) => ({ group, items: parsed.filter((s) => s.group === group) }))
        .filter((g) => g.items.length);
};

/** Short value for the highlight strip: "SHIMANO GRX400, ST-RX400, 10s" → "SHIMANO GRX400". */
const short = (value) => value.split(/,|\s\(|;/)[0].trim();

/** Up to four key specs (groupset, brakes, wheels, motor) for the strip under the title. */
export const keySpecs = (specs) => {
    const parsed = (specs || []).filter(Boolean).map(parseSpec).filter((s) => s.label);
    const find = (...kws) => parsed.find((s) => kws.some((k) => plain(s.label).includes(k)));
    return [
        ['groupset', find('mando', 'shifter', 'grupo', 'groupset', 'cambio trasero', 'rear derailleur', 'canvi posterior')],
        ['brakes', find('freno', 'brake', 'fre')],
        ['wheels', find('rueda', 'roda', 'wheel')],
        ['motor', find('motor')],
    ]
        .filter(([, s]) => s && s.value)
        .map(([key, s]) => ({ key, value: short(s.value) }));
};
