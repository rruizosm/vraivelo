import { motion } from 'framer-motion';
import { useState, useEffect, useMemo, useRef } from 'react';
import { ArrowUpRight, ChevronRight, Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabase';
import { clothes } from '../../data/clothes';
import { useTranslation } from 'react-i18next';
import SEOHead from '../../components/SEOHead/SEOHead';
import { productPath } from '../../lib/productUrl';
import { parsePrice, formatPrice } from '../../lib/price';
import { bikeImage } from '../../lib/bikeImages';
import { buildSearchIndex, queryTokens, searchScore } from '../../lib/search';
import '../Shop/Catalog.css';

// Header photo (Julbo helmets and glasses, also used on the Home "Equípate para rodar" box)
const HERO_IMAGE = '/categorias/cascos-gafas-ciclismo-1000.webp';

// "Other Products" rows are clothes too (local data): they share the "Ropa" filter
const sameCategory = (product, cat) =>
    cat === 'All' || product.category === cat || (cat === 'Clothes' && product.category === 'Other Products');

// ─── Product card: same markup and hover as the bike cards (Catalog.css) ─────
const ProductCard = ({ product, index, t, categoryLabel }) => {
    const variants = (product.variants || []).filter((v) => v.hex);
    const [image, setImage] = useState(product.image_url || product.variants?.[0]?.images?.[0] || null);
    const [activeColor, setActiveColor] = useState(null);
    const price = parsePrice(product.price);
    const to = productPath(product);

    const preview = (v) => {
        setActiveColor(v?.color || null);
        setImage(v?.images?.[0] || product.image_url || product.variants?.[0]?.images?.[0] || null);
    };

    return (
        <motion.article
            className="sh-card"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: Math.min(index, 12) * 0.04, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="sh-card-media">
                {image ? (
                    <img src={image} alt={product.model} loading={index < 6 ? 'eager' : 'lazy'} decoding="async" />
                ) : (
                    <span className="sh-card-placeholder" aria-hidden="true">{(product.model || '?').charAt(0)}</span>
                )}
                <span className="sh-card-badges">
                    {product.quantity === 0 && <span className="sh-badge sh-badge--sold">{t('product.sold')}</span>}
                    {product.is_new && product.quantity !== 0 && <span className="sh-badge sh-badge--new">{t('shop.new')}</span>}
                </span>
                <span className="sh-card-reveal" aria-hidden="true">
                    {t('other_products.view_product')} <ArrowUpRight size={16} />
                </span>
            </div>

            <div className="sh-card-body">
                <p className="sh-card-meta">
                    {product.brand && <span className="sh-card-brand">{product.brand}</span>}
                    {categoryLabel && <span>{categoryLabel}</span>}
                </p>

                <h2 className="sh-card-title">
                    <Link to={to} state={{ from: 'other-products' }} className="sh-card-link">{product.model}</Link>
                </h2>

                <div className="sh-card-foot">
                    <p className="sh-card-price">
                        {product.old_price && <s className="sh-card-price-old">{product.old_price}</s>}
                        {price ? formatPrice(price) : product.price}
                    </p>

                    {variants.length > 1 && (
                        <ul className="sh-swatches" aria-label={t('shop.colors', { count: variants.length })}>
                            {variants.map((v) => (
                                <li key={v.color}>
                                    <button
                                        type="button"
                                        className={`sh-swatch${activeColor === v.color ? ' is-active' : ''}`}
                                        style={{ backgroundColor: v.hex }}
                                        aria-label={v.colorName}
                                        title={v.colorName}
                                        onMouseEnter={() => preview(v)}
                                        onFocus={() => preview(v)}
                                        onMouseLeave={() => preview(null)}
                                        onBlur={() => preview(null)}
                                    />
                                </li>
                            ))}
                        </ul>
                    )}

                    <span className="sh-card-arrow" aria-hidden="true">
                        <ArrowUpRight size={18} />
                    </span>
                </div>
            </div>
        </motion.article>
    );
};

// Products already fetched in this session: coming back to the list renders at once with
// the right counts, then refreshes quietly in the background.
let productsCache = null;

const OtherProducts = () => {
    const { t } = useTranslation();
    const [products, setProducts] = useState(() => productsCache || []);
    const [loading, setLoading] = useState(() => !productsCache);
    const [activeCategory, setActiveCategory] = useState(() => {
        try { return sessionStorage.getItem('otherProducts_activeCategory') || 'All'; } catch { return 'All'; }
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('featured');
    const catsRef = useRef(null);

    useEffect(() => {
        try { sessionStorage.setItem('otherProducts_activeCategory', activeCategory); } catch { /* not persisted */ }
    }, [activeCategory]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .eq('Active', true)
                    .order('id', { ascending: true });
                if (error) throw error;

                // Normalize Supabase column names (PascalCase or lowercase) to the component format
                productsCache = (data || []).map((p) => {
                    const category = p.Type || p.type;
                    let specs = p.Specs || p.specs || [];
                    if (typeof specs === 'string') {
                        try { specs = JSON.parse(specs.replace(/'/g, '"')); } catch { specs = [specs]; }
                    }
                    if (category === 'Wheels') specs = [...specs, 'Hub: DT SWISS'];
                    return {
                        id: p.id,
                        model: p.Product || p.product,
                        category,
                        price: p.Price || p.price,
                        old_price: p.OldPrice || p.oldprice || null,
                        size: p.Size || p.size,
                        description: p.Description || p.description,
                        image_url: bikeImage(p['Image URL'] || p['image url'] || p.image_url),
                        color: p.Color || p.color,
                        quantity: p.quantity,
                        specs,
                        // only used by the search: the specs in the other languages
                        search_specs: [p.specs_english, p.specs_catalan],
                    };
                });
                setProducts(productsCache);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const allProducts = useMemo(() => [...products, ...clothes], [products]);

    // Category names from the DB, translated when there is a key (other_products.<name>)
    const categoryKeyMap = { All: 'other_products.all', Clothes: 'other_products.clothes', Wheels: 'other_products.wheels' };
    const translateCategory = (cat) => {
        if (!cat) return '';
        if (cat === 'Other Products') return t('other_products.clothes');
        if (categoryKeyMap[cat]) return t(categoryKeyMap[cat]);
        const key = `other_products.${cat.toLowerCase().replace(/\s+/g, '_')}`;
        const translated = t(key);
        return translated !== key ? translated : cat;
    };

    const categories = useMemo(() => {
        const fromData = allProducts.map((p) => p.category).filter((c) => c && c !== 'Other Products');
        return ['All', ...new Set(fromData)];
    }, [allProducts]);
    const countFor = (cat) => allProducts.filter((p) => sameCategory(p, cat)).length;

    // the saved category may no longer exist
    useEffect(() => {
        if (!loading && !categories.includes(activeCategory)) setActiveCategory('All');
    }, [loading, categories, activeCategory]);

    // narrow screens: keep the selected pill in view
    useEffect(() => {
        const row = catsRef.current;
        const active = row?.querySelector('.is-active');
        if (row && active) row.scrollLeft = active.offsetLeft - (row.clientWidth - active.offsetWidth) / 2;
    }, [activeCategory, loading]);

    // searchable text per product: brand, model and category rank first; then colours,
    // sizes and specs
    const searchIndex = useMemo(() => {
        const map = new Map();
        allProducts.forEach((p) => {
            map.set(p.id, buildSearchIndex(
                [p.brand, p.model, p.category, translateCategory(p.category)],
                [
                    p.color, p.size,
                    (p.variants || []).map((v) => [v.color, v.colorName]),
                    p.specs, p.search_specs,
                ],
            ));
        });
        return map;
        // translateCategory only depends on t
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allProducts, t]);

    const filtered = useMemo(() => {
        const tokens = queryTokens(searchQuery);
        const scores = new Map();
        const list = allProducts.filter((p) => {
            if (!sameCategory(p, activeCategory)) return false;
            const score = searchScore(searchIndex.get(p.id), tokens);
            scores.set(p.id, score);
            return score > 0;
        });
        const priceOf = (p) => parsePrice(p.price);
        if (sortBy === 'price_asc') return [...list].sort((a, b) => (priceOf(a) ?? Infinity) - (priceOf(b) ?? Infinity));
        if (sortBy === 'price_desc') return [...list].sort((a, b) => (priceOf(b) ?? -1) - (priceOf(a) ?? -1));
        // best search matches (brand/model) first, otherwise keep the original order
        return [...list].sort((a, b) => scores.get(b.id) - scores.get(a.id));
    }, [allProducts, activeCategory, searchQuery, sortBy, searchIndex]);

    return (
        <div className="sh-page">
            <SEOHead titleKey="seo.other_products.title" descriptionKey="seo.other_products.description" path="/other-products" />

            <header className="sh-header">
                <nav className="sh-breadcrumb" aria-label={t('shop.breadcrumb_label')}>
                    <ol>
                        <li><Link to="/">{t('shop.breadcrumb_home')}</Link></li>
                        <li>
                            <ChevronRight size={14} aria-hidden="true" />
                            <span aria-current="page">{t('footer.other_products')}</span>
                        </li>
                    </ol>
                </nav>

                <div className="sh-hero">
                    <img className="sh-hero-img" src={HERO_IMAGE} alt="" style={{ objectPosition: 'center 35%' }} fetchPriority="high" decoding="async" />
                    <span className="sh-hero-shade" aria-hidden="true" />
                    <motion.div
                        className="sh-intro"
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <p className="sh-eyebrow">
                            <span className="sh-eyebrow-bar" aria-hidden="true" />
                            {t('other_products.eyebrow')}
                        </p>
                        <h1 className="sh-title">{t('other_products.h1')}</h1>
                        <p className="sh-lead">{t('other_products.intro')}</p>
                    </motion.div>
                </div>

                <nav className="sh-cats" ref={catsRef} aria-label={t('other_products.category')}>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            type="button"
                            className={`sh-cat${activeCategory === cat ? ' is-active' : ''}`}
                            aria-pressed={activeCategory === cat}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {translateCategory(cat)} <small>{loading ? '' : countFor(cat)}</small>
                        </button>
                    ))}
                </nav>
            </header>

            <section className="sh-results sh-results--wide" aria-label={t('footer.other_products')}>
                <div className="sh-toolbar">
                    <label className="sh-search">
                        <Search size={18} aria-hidden="true" />
                        <span className="sr-only">{t('other_products.search_placeholder')}</span>
                        <input
                            type="search"
                            placeholder={t('other_products.search_placeholder')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button type="button" className="sh-search-clear" onClick={() => setSearchQuery('')} aria-label={t('shop.clear_filters')}>
                                <X size={16} />
                            </button>
                        )}
                    </label>

                    <div className="sh-toolbar-row">
                        <p className="sh-count" aria-live="polite">
                            {loading ? ' ' : t('other_products.count', { count: filtered.length })}
                        </p>
                        <label className="sh-sort">
                            <span className="sh-sort-label">{t('shop.sort.label')}</span>
                            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                                <option value="featured">{t('other_products.sort_default')}</option>
                                <option value="price_asc">{t('shop.sort.price_asc')}</option>
                                <option value="price_desc">{t('shop.sort.price_desc')}</option>
                            </select>
                        </label>
                    </div>
                </div>

                {loading ? (
                    <div className="sh-grid" aria-hidden="true">
                        {Array.from({ length: 8 }, (_, i) => <div key={i} className="sh-skeleton" />)}
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="sh-empty">
                        <p className="sh-empty-title">{t('other_products.empty')}</p>
                        <button type="button" className="sh-clear sh-clear--big" onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}>
                            {t('shop.clear_filters')}
                        </button>
                    </div>
                ) : (
                    <div className="sh-grid">
                        {filtered.map((product, index) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                index={index}
                                t={t}
                                categoryLabel={translateCategory(product.category)}
                            />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default OtherProducts;
