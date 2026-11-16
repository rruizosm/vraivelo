import { motion } from 'framer-motion';
import { useState, useEffect, useMemo, useRef } from 'react';
import { ArrowUpRight, Search, SlidersHorizontal, X, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabase';
import { useTranslation } from 'react-i18next';
import SEOHead from '../../components/SEOHead/SEOHead';
import { parsePrice } from '../../lib/price';
import { BIKE_CATEGORIES, categoryByKey } from '../../lib/categories';
import { FEATURED_BIKE_IDS } from '../../config';
import { withBikeImages } from '../../lib/bikeImages';
import BikeCard from './BikeCard';
import { MATERIALS } from '../../lib/bikes';
import { buildSearchIndex, queryTokens, searchScore } from '../../lib/search';
import './Catalog.css';

const PRICE_MAX = 15000;
const PRICE_STEP = 500;

// Header photo per page (official Giant / Berria imagery from public/bikes/, see its README).
// `position` keeps the riders in frame when the photo is cropped to the wide header.
const HERO_IMAGES = {
    all: { src: '/bikes/berria/belador/_family/lifestyle/02.webp', position: 'center 60%' },
    carretera: { src: '/bikes/giant/tcr/_family/lifestyle/09.webp', position: 'center 55%' },
    gravel: { src: '/bikes/giant/revolt/_family/lifestyle/02.webp', position: 'center 22%' },
    mtb: { src: '/bikes/giant/anthem/_family/lifestyle/04.webp', position: 'center 50%' },
    electricas: { src: '/bikes/berria/nexxen/_family/lifestyle/01.webp', position: 'center 55%' },
    infantiles: { src: '/categorias/bicicleta-infantil-1000.webp', position: 'center 22%' },
};

const readStored = (key) => {
    try {
        const saved = sessionStorage.getItem(key);
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
};

// ─── Filter checkbox ─────────────────────────────────────────────────────────
const FilterOption = ({ label, count, checked, onChange }) => (
    <label className={`sh-option${checked ? ' is-checked' : ''}${count === 0 && !checked ? ' is-empty' : ''}`}>
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span className="sh-check" aria-hidden="true" />
        <span className="sh-option-label">{label}</span>
        <span className="sh-option-count">{count}</span>
    </label>
);

// Bikes already fetched in this session: coming back to the list (or switching category)
// renders at once with the right counts, then refreshes quietly in the background.
let bikesCache = null;

// `category` comes from the route: /shop/ (all) or /shop/carretera/, /shop/gravel/ ...
const Shop = ({ category = null }) => {
    const { t } = useTranslation();
    const [bikes, setBikes] = useState(() => bikesCache || []);
    const [loading, setLoading] = useState(() => !bikesCache);
    const [activeBrands, setActiveBrands] = useState(() => {
        // a link like /shop/?marca=Giant (home partner cards) opens the shop filtered by that brand
        const fromUrl = new URLSearchParams(window.location.search).get('marca');
        return fromUrl ? [fromUrl] : readStored('shop_activeBrands');
    });
    const [activeMaterials, setActiveMaterials] = useState(() => readStored('shop_activeMaterials'));
    const [priceRange, setPriceRange] = useState([0, PRICE_MAX]);
    const [showFilters, setShowFilters] = useState(false); // phones/tablets only
    const [sortBy, setSortBy] = useState('featured');
    const [searchQuery, setSearchQuery] = useState('');

    const currentCategory = category ? categoryByKey(category) : null;
    const catSlug = currentCategory?.slug;
    const catsRef = useRef(null);

    // on narrow screens the category row scrolls sideways: bring the current one into view
    useEffect(() => {
        const row = catsRef.current;
        const active = row?.querySelector('.is-active');
        if (row && active) row.scrollLeft = active.offsetLeft - (row.clientWidth - active.offsetWidth) / 2;
    }, [category, loading]);

    useEffect(() => {
        try {
            sessionStorage.setItem('shop_activeBrands', JSON.stringify(activeBrands));
            sessionStorage.setItem('shop_activeMaterials', JSON.stringify(activeMaterials));
        } catch { /* storage unavailable: filters just won't persist */ }
    }, [activeBrands, activeMaterials]);

    useEffect(() => {
        const fetchBikes = async () => {
            try {
                const { data, error } = await supabase
                    .from('bikes')
                    .select('*, bike_variants(*)')
                    .eq('Active', true)
                    .order('brand', { ascending: true });
                if (error) throw error;
                bikesCache = (data || []).map(withBikeImages);
                setBikes(bikesCache);
            } catch (error) {
                console.error('Error fetching bikes:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBikes();
    }, []);

    const categoryCounts = useMemo(() => {
        const counts = {};
        bikes.forEach((b) => { counts[b.category] = (counts[b.category] || 0) + 1; });
        return counts;
    }, [bikes]);

    // bikes of this page's category: the base for the brand/material counts
    const inCategory = useMemo(
        () => bikes.filter((b) => !category || b.category === category),
        [bikes, category],
    );
    const brandsList = useMemo(() => [...new Set(bikes.map((b) => b.brand))].sort(), [bikes]);
    const countBy = (fn) => inCategory.filter(fn).length;

    const toggle = (list, setList, value) =>
        setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

    const priceActive = priceRange[0] > 0 || priceRange[1] < PRICE_MAX;
    const hasActiveFilters = activeBrands.length > 0 || activeMaterials.length > 0 || priceActive || searchQuery.trim() !== '';

    const clearFilters = () => {
        setActiveBrands([]);
        setActiveMaterials([]);
        setPriceRange([0, PRICE_MAX]);
        setSearchQuery('');
    };

    // searchable text per bike: brand, model, category and material rank first; then colours
    // and components (specs in every language, so "cuadro", "frame" or "quadre" all work)
    const searchIndex = useMemo(() => {
        const map = new Map();
        bikes.forEach((bike) => {
            const slug = categoryByKey(bike.category)?.slug;
            const materialKey = MATERIALS.find(([v]) => v.toLowerCase() === (bike.Material || '').toLowerCase())?.[1];
            map.set(bike.id, buildSearchIndex(
                [
                    bike.brand, bike.model,
                    bike.category, slug && t(`shop.cat.${slug}.name`),
                    bike.Material, materialKey && t(`shop.filter.${materialKey}`),
                ],
                [
                    (bike.bike_variants || []).map((v) => v.color_name),
                    bike.specs, bike.specs_es, bike.specs_cat,
                ],
            ));
        });
        return map;
    }, [bikes, t]);

    const filteredBikes = useMemo(() => {
        const tokens = queryTokens(searchQuery);
        const scores = new Map();
        const list = inCategory.filter((bike) => {
            const matchBrand = activeBrands.length === 0 || activeBrands.includes(bike.brand);
            const matchMaterial = activeMaterials.length === 0
                || activeMaterials.some((m) => (bike.Material || '').toLowerCase() === m.toLowerCase());
            const bikePrice = parsePrice(bike.price) ?? 0;
            const matchPrice = bikePrice >= priceRange[0] && bikePrice <= priceRange[1];
            const score = searchScore(searchIndex.get(bike.id), tokens);
            scores.set(bike.id, score);
            return matchBrand && matchMaterial && matchPrice && score > 0;
        });

        const priceOf = (b) => parsePrice(b.price) ?? Infinity;
        const featuredRank = (b) => {
            const i = FEATURED_BIKE_IDS.indexOf(b.id);
            return i === -1 ? Infinity : i;
        };
        if (sortBy === 'price_asc') return [...list].sort((a, b) => priceOf(a) - priceOf(b));
        if (sortBy === 'price_desc') return [...list].sort((a, b) => (parsePrice(b.price) ?? -1) - (parsePrice(a.price) ?? -1));
        // best search matches (brand/model) first, then featured (config order),
        // the rest keep the brand order from the query
        return [...list].sort((a, b) =>
            (scores.get(b.id) - scores.get(a.id)) || (featuredRank(a) - featuredRank(b)));
    }, [inCategory, activeBrands, activeMaterials, priceRange, searchQuery, sortBy, searchIndex]);

    const seoKey = catSlug ? `seo.shop_${catSlug}` : 'seo.shop';
    const h1 = catSlug ? t(`shop.cat.${catSlug}.h1`) : t('shop.h1');
    const intro = catSlug ? t(`shop.cat.${catSlug}.intro`) : t('shop.intro');
    const hero = HERO_IMAGES[catSlug] || HERO_IMAGES.all;
    const euro = (n) => `${n.toLocaleString('de-DE')} €`;

    // chips for the filters in use, each one removable
    const activeChips = [
        ...activeBrands.map((b) => ({ key: `b-${b}`, label: b, remove: () => toggle(activeBrands, setActiveBrands, b) })),
        ...activeMaterials.map((m) => {
            const key = MATERIALS.find(([v]) => v === m)?.[1];
            return { key: `m-${m}`, label: key ? t(`shop.filter.${key}`) : m, remove: () => toggle(activeMaterials, setActiveMaterials, m) };
        }),
        ...(priceActive ? [{ key: 'price', label: `${euro(priceRange[0])} – ${euro(priceRange[1])}`, remove: () => setPriceRange([0, PRICE_MAX]) }] : []),
        ...(searchQuery.trim() ? [{ key: 'q', label: `“${searchQuery.trim()}”`, remove: () => setSearchQuery('') }] : []),
    ];

    return (
        <div className="sh-page">
            <SEOHead
                titleKey={`${seoKey}.title`}
                descriptionKey={`${seoKey}.description`}
                path={catSlug ? `/shop/${catSlug}` : '/shop'}
            />

            {/* HEADER: breadcrumb, eyebrow, H1 + intro, category navigation */}
            <header className="sh-header">
                <nav className="sh-breadcrumb" aria-label={t('shop.breadcrumb_label')}>
                    <ol>
                        <li><Link to="/">{t('shop.breadcrumb_home')}</Link></li>
                        <li>
                            <ChevronRight size={14} aria-hidden="true" />
                            {catSlug
                                ? <Link to="/shop/">{t('shop.breadcrumb_bikes')}</Link>
                                : <span aria-current="page">{t('shop.breadcrumb_bikes')}</span>}
                        </li>
                        {catSlug && (
                            <li>
                                <ChevronRight size={14} aria-hidden="true" />
                                <span aria-current="page">{t(`shop.cat.${catSlug}.name`)}</span>
                            </li>
                        )}
                    </ol>
                </nav>

                {/* photo panel: brand photo + dark gradient so the white text always reads */}
                <div className="sh-hero">
                    <img
                        className="sh-hero-img"
                        src={hero.src}
                        alt=""
                        style={{ objectPosition: hero.position }}
                        fetchPriority="high"
                        decoding="async"
                    />
                    <span className="sh-hero-shade" aria-hidden="true" />

                    <motion.div
                        className="sh-intro"
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <p className="sh-eyebrow">
                            <span className="sh-eyebrow-bar" aria-hidden="true" />
                            {t('shop.eyebrow')}
                        </p>
                        <h1 className="sh-title">{h1}</h1>
                        <p className="sh-lead">{intro}</p>
                    </motion.div>
                </div>

                <nav className="sh-cats" ref={catsRef} aria-label={t('shop.categories_label')}>
                    <Link to="/shop/" className={`sh-cat${!category ? ' is-active' : ''}`} aria-current={!category ? 'page' : undefined}>
                        {t('shop.all')} <small>{bikes.length || ''}</small>
                    </Link>
                    {BIKE_CATEGORIES.filter((c) => categoryCounts[c.key] || loading).map((c) => (
                        <Link
                            key={c.key}
                            to={`/shop/${c.slug}/`}
                            className={`sh-cat${category === c.key ? ' is-active' : ''}`}
                            aria-current={category === c.key ? 'page' : undefined}
                        >
                            {t(`shop.cat.${c.slug}.name`)} <small>{categoryCounts[c.key] || ''}</small>
                        </Link>
                    ))}
                </nav>
            </header>

            <div className="sh-layout">
                {/* FILTERS */}
                <aside className={`sh-filters${showFilters ? ' is-open' : ''}`} aria-label={t('shop.filters_title')}>
                    <div className="sh-filters-head">
                        <p className="sh-filters-title">{t('shop.filters_title')}</p>
                        {hasActiveFilters && (
                            <button type="button" className="sh-clear" onClick={clearFilters}>{t('shop.clear_filters')}</button>
                        )}
                    </div>

                    <fieldset className="sh-group">
                        <legend className="sh-group-title">{t('shop.filter.brands')}</legend>
                        {brandsList.map((brand) => (
                            <FilterOption
                                key={brand}
                                label={brand}
                                count={countBy((b) => b.brand === brand)}
                                checked={activeBrands.includes(brand)}
                                onChange={() => toggle(activeBrands, setActiveBrands, brand)}
                            />
                        ))}
                    </fieldset>

                    <fieldset className="sh-group">
                        <legend className="sh-group-title">{t('shop.filter.material')}</legend>
                        {MATERIALS.map(([value, key]) => (
                            <FilterOption
                                key={value}
                                label={t(`shop.filter.${key}`)}
                                count={countBy((b) => (b.Material || '').toLowerCase() === value.toLowerCase())}
                                checked={activeMaterials.includes(value)}
                                onChange={() => toggle(activeMaterials, setActiveMaterials, value)}
                            />
                        ))}
                    </fieldset>

                    <fieldset className="sh-group">
                        <legend className="sh-group-title">{t('shop.filter.price')}</legend>
                        <div className="sh-range">
                            <div className="sh-range-track">
                                <div
                                    className="sh-range-fill"
                                    style={{
                                        left: `${(priceRange[0] / PRICE_MAX) * 100}%`,
                                        width: `${((priceRange[1] - priceRange[0]) / PRICE_MAX) * 100}%`,
                                    }}
                                />
                            </div>
                            <input
                                type="range" min="0" max={PRICE_MAX} step={PRICE_STEP} value={priceRange[0]}
                                aria-label={t('shop.price_min')}
                                onChange={(e) => setPriceRange([Math.min(Number(e.target.value), priceRange[1] - PRICE_STEP), priceRange[1]])}
                            />
                            <input
                                type="range" min="0" max={PRICE_MAX} step={PRICE_STEP} value={priceRange[1]}
                                aria-label={t('shop.price_max')}
                                onChange={(e) => setPriceRange([priceRange[0], Math.max(Number(e.target.value), priceRange[0] + PRICE_STEP)])}
                            />
                        </div>
                        <p className="sh-range-labels">
                            <span>{euro(priceRange[0])}</span>
                            <span>{priceRange[1] >= PRICE_MAX ? `${euro(PRICE_MAX)}+` : euro(priceRange[1])}</span>
                        </p>
                    </fieldset>

                    <button type="button" className="sh-filters-done" onClick={() => setShowFilters(false)}>
                        {t('shop.show_results', { count: filteredBikes.length })}
                    </button>
                </aside>

                {/* RESULTS */}
                <section className="sh-results" aria-label={t('shop.results_label')}>
                    <div className="sh-toolbar">
                        <label className="sh-search">
                            <Search size={18} aria-hidden="true" />
                            <span className="sr-only">{t('shop.search_placeholder')}</span>
                            <input
                                type="search"
                                placeholder={t('shop.search_placeholder')}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </label>

                        <div className="sh-toolbar-row">
                            <p className="sh-count" aria-live="polite">
                                {loading ? ' ' : t('shop.count', { count: filteredBikes.length })}
                            </p>
                            <button
                                type="button"
                                className="sh-filters-toggle"
                                onClick={() => setShowFilters((v) => !v)}
                                aria-expanded={showFilters}
                            >
                                <SlidersHorizontal size={16} aria-hidden="true" />
                                {t('shop.filters_btn')}
                                {activeChips.length > 0 && <span className="sh-filters-badge">{activeChips.length}</span>}
                            </button>
                            <label className="sh-sort">
                                <span className="sh-sort-label">{t('shop.sort.label')}</span>
                                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                                    <option value="featured">{t('shop.sort.featured')}</option>
                                    <option value="price_asc">{t('shop.sort.price_asc')}</option>
                                    <option value="price_desc">{t('shop.sort.price_desc')}</option>
                                </select>
                            </label>
                        </div>

                        {activeChips.length > 0 && (
                            <ul className="sh-chips">
                                {activeChips.map((c) => (
                                    <li key={c.key}>
                                        <button type="button" className="sh-chip" onClick={c.remove} aria-label={t('shop.remove_filter', { name: c.label })}>
                                            {c.label} <X size={14} aria-hidden="true" />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {loading ? (
                        <div className="sh-grid" aria-hidden="true">
                            {Array.from({ length: 6 }, (_, i) => <div key={i} className="sh-skeleton" />)}
                        </div>
                    ) : filteredBikes.length === 0 ? (
                        <div className="sh-empty">
                            <p className="sh-empty-title">{t('shop.empty')}</p>
                            {hasActiveFilters && (
                                <button type="button" className="sh-clear sh-clear--big" onClick={clearFilters}>{t('shop.clear_filters')}</button>
                            )}
                        </div>
                    ) : (
                        <div className="sh-grid">
                            {filteredBikes.map((bike, index) => (
                                <BikeCard key={bike.id} bike={bike} index={index} t={t} />
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Shop;
