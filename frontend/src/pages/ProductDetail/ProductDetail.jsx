import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, ChevronRight, ChevronLeft, ZoomIn, Banknote, RefreshCcw, ShoppingBag, Mail, Phone, ShieldCheck, Wrench } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../../supabase';
import { useCart } from '../../context/CartContext';
import { clothes } from '../../data/clothes';
import SEOHead from '../../components/SEOHead/SEOHead';
import { getDiscountedPrice } from '../../lib/priceUtils';
import { productPath, productIdFromParam } from '../../lib/productUrl';
import { parsePrice, formatPrice } from '../../lib/price';
import { categoryPath, categoryByKey } from '../../lib/categories';
import { withBikeImages } from '../../lib/bikeImages';
import { materialKey, modelName } from '../../lib/bikes';
import { loadBikeIndex, galleryFor, lifestyleFor, groupSpecs, keySpecs, parseSpec } from '../../lib/bikeDetail';
import BikeCard from '../Shop/BikeCard';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id: slugParam } = useParams();
    // Clothes use a readable string id; bikes/products use "<name-slug>-<numeric id>"
    const id = clothes.some(c => c.id === slugParam) ? slugParam : productIdFromParam(slugParam);
    const navigate = useNavigate();
    const location = useLocation();
    const { t, i18n } = useTranslation();
    const { addToCart, isCartEnabled } = useCart();
    const [bike, setBike] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [hoverImageIndex, setHoverImageIndex] = useState(null); // thumbnail under the cursor (preview only)
    const [related, setRelated] = useState([]);
    const [indexEntry, setIndexEntry] = useState(null);

    useEffect(() => {
        const fetchBike = async () => {
            try {
                setLoading(true);

                // Check if it's a clothing item first (local data)
                const foundCloth = clothes.find(c => c.id === id);
                if (foundCloth) {
                    setBike(foundCloth);
                    // Default to first variant color if available
                    if (foundCloth.variants && foundCloth.variants.length > 0) {
                        setSelectedColor(foundCloth.variants[0]);
                    }
                    setLoading(false);
                    return;
                }

                // If not found in clothes, fetch from Supabase (bikes)
                // Left join with bike_variants
                const { data: rawBike, error: bikeError } = await supabase
                    .from('bikes')
                    .select('*, bike_variants(*)')
                    .eq('id', id)
                    .single();
                const bikeData = withBikeImages(rawBike);

                if (!bikeError && bikeData) {
                    // Format bike_variants to match the standard variant structure used by clothes
                    if (bikeData.bike_variants && bikeData.bike_variants.length > 0) {
                        bikeData.variants = bikeData.bike_variants.map(bv => ({
                            color: bv.color_name.toLowerCase(),
                            colorName: bv.color_name,
                            hex: bv.color_hex,
                            images: bv.image_url ? [bv.image_url] : []
                        }));
                    }
                    // Identity flag for bikes
                    bikeData.isBikeData = true;

                    setBike(bikeData);

                    // Default to first variant color if available
                    if (bikeData.variants && bikeData.variants.length > 0) {
                        setSelectedColor(bikeData.variants[0]);
                    }

                    setLoading(false);
                    return;
                }

                // If not found in bikes, try the products table
                const { data: productData, error: productError } = await supabase
                    .from('products')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (!productError && productData) {
                    const category = productData.Type || productData.type;
                    let specs = productData.Specs || productData.specs || [];

                    if (typeof specs === 'string') {
                        try { specs = JSON.parse(specs.replace(/'/g, '"')); } catch { specs = [specs]; }
                    }
                    if (category === 'Wheels') {
                        specs = [...specs, 'Hub: DT SWISS'];
                    }

                    // Normalize column names to match component expectations
                    setBike({
                        id: productData.id,
                        model: productData.Product || productData.product,
                        category: category,
                        price: productData.Price || productData.price,
                        old_price: productData.OldPrice || productData.oldprice || null,
                        size: productData.Size || productData.size,
                        description: productData.Description || productData.description,
                        image_url: productData["Image URL"] || productData["image url"] || productData.image_url,
                        color: productData.Colors || productData.colors,
                        specs: specs,
                        // Localization Schema (Supporting both legacy and new column names)
                        description_es: productData.description_es || productData.Description_es || productData.description_spanish,
                        description_en: productData.description_en || productData.Description_en || productData.description_english,
                        description_ca: productData.description_ca || productData.Description_ca || productData.description_catalan,
                        long_description: productData.long_description || productData.Long_description,
                        long_description_es: productData.long_description_es || productData.Long_description_es || productData.Long_description_ES,
                        long_description_ca: productData.long_description_ca || productData.Long_description_ca || productData.Long_description_CA,
                        specs_es: productData.specs || productData.Specs || productData.specs,
                        specs_en: productData.specs_en || productData.Specs_en || productData.specs_english,
                        specs_ca: productData.specs_ca || productData.Specs_ca || productData.specs_catalan,
                    });
                    setLoading(false);
                    return;
                }

                // Not found anywhere
                setBike(null);

            } catch (error) {
                console.error('Error fetching product:', error);
                setBike(null);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchBike();
        }
    }, [id]);

    // Reset image index when color changes
    useEffect(() => {
        setCurrentImageIndex(0);
        setHoverImageIndex(null);
    }, [selectedColor]);

    // Other bikes of the same category, closest in price first (internal links + upsell)
    useEffect(() => {
        if (!bike?.isBikeData || !bike.category) { setRelated([]); return; }
        let cancelled = false;
        const current = parsePrice(bike.price) ?? 0;
        supabase
            .from('bikes')
            .select('id,brand,model,category,price,image_url')
            .eq('Active', true)
            .eq('category', bike.category)
            .neq('id', bike.id)
            .limit(30)
            .then(({ data }) => {
                if (cancelled || !data) return;
                const gap = (b) => Math.abs((parsePrice(b.price) ?? Infinity) - current);
                setRelated([...data].sort((a, b) => gap(a) - gap(b)).slice(0, 4).map(withBikeImages));
            });
        return () => { cancelled = true; };
    }, [bike]);

    // Old or mistyped URLs (/shop/316, wrong slug) -> replace with the canonical one
    useEffect(() => {
        if (!bike) return;
        const canonical = productPath(bike);
        const current = location.pathname.endsWith('/') ? location.pathname : `${location.pathname}/`;
        if (current !== canonical) navigate(canonical, { replace: true, state: location.state });
    }, [bike, location.pathname, location.state, navigate]);


    // Bike gallery + lifestyle photos from public/bikes/index.json
    useEffect(() => {
        if (!bike?.isBikeData) { setIndexEntry(null); return; }
        let cancelled = false;
        loadBikeIndex().then((index) => { if (!cancelled) setIndexEntry(index.get(bike.id) || null); });
        return () => { cancelled = true; };
    }, [bike]);

    // ── Sizes: array, "[42,44,46]" string or a single value ──────────────────
    const toList = (value) => {
        if (!value) return [];
        if (Array.isArray(value)) return value;
        if (typeof value === 'string' && value.startsWith('[')) {
            try { return JSON.parse(value.replace(/'/g, '"')); } catch { return []; }
        }
        return [value];
    };
    const sizes = selectedColor?.sizes || (toList(bike?.sizes).length ? toList(bike?.sizes) : toList(bike?.size));

    // ── Texts in the current language ────────────────────────────────────────
    const currentLang = i18n?.language?.toLowerCase().split('-')[0] || 'en';
    const langMap = { es: 'spanish', en: 'english', ca: 'catalan' };
    const fullLangName = langMap[currentLang];
    const shortLang = currentLang === 'ca' ? 'cat' : currentLang;

    const displayDescription =
        bike?.[`description_${fullLangName}`] || bike?.[`description_${shortLang}`] || bike?.[`description_${currentLang}`] || bike?.description;
    const displayLongDescription =
        bike?.[`long_description_${shortLang}`] || bike?.[`long_description_${currentLang}`] || bike?.long_description;

    let displaySpecs = bike?.specs || [];
    const localizedSpecs =
        bike?.[`specs_${fullLangName}`] || bike?.[`Specs_${fullLangName}`] || bike?.[`specs_${shortLang}`]
        || bike?.[`Specs_${shortLang}`] || bike?.[`specs_${currentLang}`];
    if (localizedSpecs) {
        if (typeof localizedSpecs === 'string') {
            try { displaySpecs = JSON.parse(localizedSpecs.replace(/'/g, '"')); } catch { displaySpecs = [localizedSpecs]; }
        } else if (Array.isArray(localizedSpecs)) {
            displaySpecs = localizedSpecs;
        }
    }
    if (typeof displaySpecs === 'string') displaySpecs = [displaySpecs];

    // ── Colours: variants (bikes, clothes) or plain colour names (products) ──
    const parseColors = () => {
        if (bike?.variants) return bike.variants;
        const raw = bike?.Colors || bike?.colors || bike?.Color || bike?.color;
        if (!raw) return [];
        if (Array.isArray(raw)) return raw;
        try { return JSON.parse(String(raw).replace(/'/g, '"')); } catch {
            return String(raw).includes(',') ? String(raw).split(',').map((c) => c.trim()) : [raw];
        }
    };
    const colors = parseColors();
    const selectedColorName = selectedColor?.colorName || (typeof selectedColor === 'string' ? selectedColor : null);

    // ── Images for the selected colour ───────────────────────────────────────
    const baseImages = selectedColor?.images?.length ? selectedColor.images : (bike?.image_url ? [bike.image_url] : []);
    const currentImages = bike?.isBikeData
        ? galleryFor(indexEntry, baseImages[0], selectedColorName, bike.variants?.length || 0)
        : baseImages;
    const displayImage = currentImages[Math.min(currentImageIndex, currentImages.length - 1)] || null;
    // hovering a thumbnail previews it; leaving goes back to the selected one; clicking selects it
    const shownIndex = hoverImageIndex !== null && hoverImageIndex < currentImages.length ? hoverImageIndex : currentImageIndex;
    const stageImage = currentImages[Math.min(shownIndex, currentImages.length - 1)] || null;
    const lifestyle = bike?.isBikeData ? lifestyleFor(indexEntry, 4) : [];

    const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % currentImages.length);
    const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);

    const isOtherProduct = location.state?.from === 'other-products' || (!!bike && !bike.isBikeData);
    const backTo = isOtherProduct ? '/other-products' : '/shop';
    const backLabel = isOtherProduct ? t('product.back_to_other_products') : t('product.back_to_shop');

    // Opened directly (no router state): remember it's a non-bike so the navbar highlights the right section
    useEffect(() => {
        if (bike && !bike.isBikeData && location.state?.from !== 'other-products') {
            navigate(location.pathname, { replace: true, state: { from: 'other-products' } });
        }
    }, [bike, location.pathname, location.state, navigate]);

    if (loading) {
        return (
            <div className="pd-page pd-page--loading" aria-busy="true">
                <div className="pd-skeleton pd-skeleton--media" />
                <div className="pd-skeleton pd-skeleton--info" />
            </div>
        );
    }

    if (!bike) {
        return (
            <div className="pd-page pd-notfound">
                <h1 className="pd-title">{t('product.not_found')}</h1>
                <Link to={backTo} className="pd-back"><ArrowLeft size={16} /> {backLabel}</Link>
            </div>
        );
    }

    const isPartsOrClothes = bike.category === 'Clothes' || bike.category === 'Other Products';
    const category = categoryByKey(bike.category);
    const matKey = materialKey(bike.Material);
    const numericPrice = parsePrice(bike.price);
    const displayPrice = numericPrice ? formatPrice(numericPrice) : bike.price;
    const soldOut = bike.quantity === 0;
    // bikes: grouped (frame, drivetrain…); clothes and parts: one plain list
    const specGroups = bike.isBikeData
        ? groupSpecs(displaySpecs)
        : [{ group: 'all', items: displaySpecs.filter(Boolean).map(parseSpec) }].filter((g) => g.items.length);
    const highlights = bike.isBikeData ? keySpecs(displaySpecs) : [];
    const contactMessage = [
        `${t('product.contact_message')} ${bike.model}`,
        selectedColorName && `${t('product.color')}: ${selectedColorName}`,
        selectedSize && `${t('product.size')}: ${selectedSize}`,
    ].filter(Boolean).join(' · ');
    const goContact = () => navigate('/contact', {
        state: { subject: isPartsOrClothes ? 'parts' : 'bikes', message: contactMessage },
    });

    return (
        <div className="pd-page">
            <SEOHead
                titleKey="seo.product_detail.title"
                descriptionKey="seo.product_detail.description"
                path={productPath(bike)}
                ogImage={bike.image_url}
                tOptions={{ name: bike.model }}
                description={
                    (displayDescription || '')
                        .replace(/\s+/g, ' ').trim().slice(0, 160) || undefined
                }
            />

            {/* Breadcrumb */}
            <nav className="pd-breadcrumb" aria-label={t('shop.breadcrumb_label')}>
                <ol>
                    <li><Link to="/">{t('shop.breadcrumb_home')}</Link></li>
                    {bike.isBikeData ? (
                        <>
                            <li><ChevronRight size={14} aria-hidden="true" /><Link to="/shop/">{t('shop.breadcrumb_bikes')}</Link></li>
                            {category && (
                                <li><ChevronRight size={14} aria-hidden="true" /><Link to={categoryPath(bike.category)}>{t(`shop.cat.${category.slug}.name`)}</Link></li>
                            )}
                        </>
                    ) : (
                        <li><ChevronRight size={14} aria-hidden="true" /><Link to="/other-products/">{t('footer.other_products')}</Link></li>
                    )}
                    <li><ChevronRight size={14} aria-hidden="true" /><span aria-current="page">{modelName(bike) || bike.model}</span></li>
                </ol>
            </nav>

            <div className="pd-main">
                {/* ── Gallery ── */}
                <motion.section
                    className="pd-gallery"
                    aria-label={t('product.gallery')}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className={`pd-stage${currentImages.length > 1 ? ' pd-stage--thumbs' : ''}`}>
                        {soldOut && <span className="pd-badge pd-badge--sold">{t('product.sold')}</span>}
                        {bike.is_new && !soldOut && <span className="pd-badge pd-badge--new">{t('shop.new')}</span>}

                        <AnimatePresence mode="wait">
                            {stageImage ? (
                                <motion.img
                                    key={stageImage}
                                    src={stageImage}
                                    alt={`${bike.model}${selectedColorName ? ` – ${selectedColorName}` : ''}`}
                                    className="pd-stage-img"
                                    initial={{ opacity: 0, scale: 0.985 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.16 }}
                                />
                            ) : (
                                <span className="pd-placeholder" aria-hidden="true">{(bike.brand || bike.model || '?').charAt(0)}</span>
                            )}
                        </AnimatePresence>

                        {currentImages.length > 1 && (
                            <>
                                <button type="button" className="pd-nav pd-nav--prev" onClick={prevImage} aria-label={t('product.prev_image')}>
                                    <ChevronLeft size={22} />
                                </button>
                                <button type="button" className="pd-nav pd-nav--next" onClick={nextImage} aria-label={t('product.next_image')}>
                                    <ChevronRight size={22} />
                                </button>
                                <span className="pd-counter" aria-hidden="true">
                                    {String(shownIndex + 1).padStart(2, '0')} / {String(currentImages.length).padStart(2, '0')}
                                </span>
                            </>
                        )}

                        {/* thumbnails inside the photo, along the bottom */}
                        {currentImages.length > 1 && (
                            <ul className="pd-thumbs" onMouseLeave={() => setHoverImageIndex(null)}>
                                {currentImages.map((src, idx) => (
                                    <li key={src}>
                                        <button
                                            type="button"
                                            className={`pd-thumb${idx === currentImageIndex ? ' is-active' : ''}${idx === hoverImageIndex && idx !== currentImageIndex ? ' is-preview' : ''}`}
                                            onMouseEnter={() => setHoverImageIndex(idx)}
                                            onFocus={() => setHoverImageIndex(idx)}
                                            onBlur={() => setHoverImageIndex(null)}
                                            onClick={() => { setCurrentImageIndex(idx); setHoverImageIndex(null); }}
                                            aria-label={t('product.show_image', { n: idx + 1 })}
                                            aria-current={idx === currentImageIndex ? 'true' : undefined}
                                        >
                                            <img src={src} alt="" decoding="async" />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {stageImage && (
                            <a className="pd-zoom" href={stageImage} target="_blank" rel="noopener noreferrer" aria-label={t('product.open_image')}>
                                <ZoomIn size={18} />
                            </a>
                        )}
                    </div>

                </motion.section>

                {/* ── Info panel ── */}
                <motion.section
                    className="pd-info"
                    aria-labelledby="pd-title"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                    <p className="pd-eyebrow">
                        <span className="pd-eyebrow-bar" aria-hidden="true" />
                        {[bike.brand, category && t(`shop.cat.${category.slug}.name`), matKey && t(`shop.filter.${matKey}`)].filter(Boolean).join(' · ') || bike.category}
                    </p>
                    <h1 id="pd-title" className="pd-title">
                        {bike.brand && <span className="sr-only">{bike.brand} </span>}
                        {modelName(bike) || bike.model}
                    </h1>
                    {bike.category === 'Wheels' && <p className="pd-subtitle">Hub: DT SWISS</p>}

                    <div className="pd-price">
                        {bike.old_price && <span className="pd-price-old">{bike.old_price}</span>}
                        <span className="pd-price-value">{displayPrice}</span>
                        {soldOut && <span className="pd-price-sold">{t('product.sold')}</span>}
                    </div>

                    {highlights.length > 0 && (
                        <dl className="pd-highlights">
                            {highlights.map((h) => (
                                <div key={h.key}>
                                    <dt>{t(`product.highlight.${h.key}`)}</dt>
                                    <dd>{h.value}</dd>
                                </div>
                            ))}
                        </dl>
                    )}

                    {/* Colour + size side by side on wide screens */}
                    {(colors.length > 0 || sizes.length > 0) && (
                        <div className={`pd-options${colors.length > 0 && sizes.length > 0 ? ' pd-options--2' : ''}`}>
                        {/* Colour */}
                        {colors.length > 0 && (
                            <div className="pd-option">
                                <p className="pd-option-label">
                                    {t('product.color')}
                                    {selectedColorName && <span className="pd-option-value">{selectedColorName}</span>}
                                </p>
                                <div className="pd-colors" role="radiogroup" aria-label={t('product.color')}>
                                    {bike.variants ? bike.variants.map((variant) => {
                                        const active = selectedColor?.color === variant.color;
                                        return (
                                            <button
                                                key={variant.color}
                                                type="button"
                                                role="radio"
                                                aria-checked={active}
                                                aria-label={variant.colorName}
                                                title={variant.colorName}
                                                className={`pd-color${active ? ' is-active' : ''}`}
                                                onClick={() => setSelectedColor(variant)}
                                            >
                                                <span className="pd-color-dot" style={{ backgroundColor: variant.hex || '#ccc' }} />
                                                {variant.images?.[0] && <img src={variant.images[0]} alt="" loading="lazy" decoding="async" />}
                                            </button>
                                        );
                                    }) : colors.filter(Boolean).map((color) => (
                                        <button
                                            key={color}
                                            type="button"
                                            role="radio"
                                            aria-checked={selectedColor === color}
                                            className={`pd-pill${selectedColor === color ? ' is-active' : ''}`}
                                            onClick={() => setSelectedColor(color)}
                                        >
                                            {color}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Size */}
                        {sizes.length > 0 && (
                            <div className="pd-option">
                                <p className="pd-option-label">
                                    {t('product.size')}
                                    {selectedSize && <span className="pd-option-value">{selectedSize}</span>}
                                </p>
                                <div className="pd-sizes" role="radiogroup" aria-label={t('product.size')}>
                                    {sizes.map((size) => (
                                        <button
                                            key={size}
                                            type="button"
                                            role="radio"
                                            aria-checked={selectedSize === size}
                                            className={`pd-pill${selectedSize === size ? ' is-active' : ''}`}
                                            onClick={() => setSelectedSize((prev) => (prev === size ? null : size))}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>

                            </div>
                        )}
                        </div>
                    )}
                    {bike.isBikeData && sizes.length > 0 && <p className="pd-option-help">{t('product.size_help')}</p>}

                    {/* Actions */}
                    <div className="pd-actions">
                        {isCartEnabled ? (
                            <button
                                type="button"
                                className="pd-cta"
                                disabled={(sizes.length > 0 && !selectedSize) || soldOut}
                                onClick={() => {
                                    if (!selectedSize && sizes.length > 0) return;
                                    addToCart({
                                        id: bike.id,
                                        brand: bike.brand || '',
                                        model: bike.model,
                                        price: isPartsOrClothes ? bike.price : getDiscountedPrice(bike.price),
                                        image: displayImage,
                                        size: selectedSize,
                                        color: selectedColorName,
                                        type: bike.category === 'Other Products' ? 'clothes' : 'bike',
                                        maxQuantity: bike.quantity,
                                    });
                                }}
                            >
                                <span className="pd-cta-label">{soldOut ? t('product.sold') : t('product.add_to_cart')}</span>
                                <span className="pd-cta-icon" aria-hidden="true"><ShoppingBag size={18} /></span>
                            </button>
                        ) : (
                            <button type="button" className="pd-cta" onClick={goContact}>
                                <span className="pd-cta-label">{t(isPartsOrClothes ? 'product.contact_us' : 'product.ask_availability')}</span>
                                <span className="pd-cta-icon" aria-hidden="true"><ArrowUpRight size={20} /></span>
                            </button>
                        )}
                        <a href="tel:+34657317270" className="pd-call">
                            <Phone size={16} aria-hidden="true" /> {t('product.call_us')} · +34 657 317 270
                        </a>
                    </div>

                    <ul className="pd-perks">
                        {bike.isBikeData && (
                            <>
                                <li><Banknote size={18} aria-hidden="true" /> {t('product.finance_option')}</li>
                                <li><RefreshCcw size={18} aria-hidden="true" /> {t('product.trade_in_option')}</li>
                            </>
                        )}
                        <li><ShieldCheck size={18} aria-hidden="true" /> {t('product.official_dealer')}</li>
                        <li><Wrench size={18} aria-hidden="true" /> {t('product.own_workshop')}</li>
                    </ul>
                </motion.section>

                {/* Description: under the photo on wide screens, after the info panel on phones */}
                {(displayDescription || displayLongDescription) && (
                    <section className="pd-about" aria-labelledby="pd-about-title">
                        <p className="pd-section-eyebrow" id="pd-about-title">
                            <span className="pd-eyebrow-bar" aria-hidden="true" />
                            {t(bike.isBikeData ? 'product.about' : 'product.about_product')}
                        </p>
                        <div className="pd-about-text">
                            {displayDescription && <p className="pd-about-lead">{displayDescription}</p>}
                            {displayLongDescription && <p>{displayLongDescription}</p>}
                        </div>
                    </section>
                )}
            </div>

            {/* Specifications, grouped */}
            {specGroups.length > 0 && (
                <section className="pd-specs" aria-labelledby="pd-specs-title">
                    <div className="pd-specs-inner">
                        <div className="pd-specs-head">
                            <p className="pd-section-eyebrow pd-section-eyebrow--light">
                                <span className="pd-eyebrow-bar" aria-hidden="true" />
                                {t('product.specs_eyebrow')}
                            </p>
                            <h2 id="pd-specs-title" className="pd-specs-title">{t('product.specifications')}</h2>
                        </div>

                        <div className="pd-spec-groups">
                            {specGroups.map(({ group, items }) => (
                                <div key={group} className="pd-spec-group">
                                    {group !== 'all' && <h3 className="pd-spec-group-title">{t(`product.spec_group.${group}`)}</h3>}
                                    <dl className="pd-spec-list">
                                        {items.map((s, i) => (
                                            <div key={i} className={`pd-spec${s.label ? '' : ' pd-spec--plain'}`}>
                                                {s.label && <dt>{s.label}</dt>}
                                                <dd>{s.value}</dd>
                                            </div>
                                        ))}
                                    </dl>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Lifestyle strip */}
            {lifestyle.length > 0 && (
                <section className={`pd-ride pd-ride--${lifestyle.length}`} aria-label={t('product.on_the_road')}>
                    {lifestyle.map((src, i) => (
                        <figure key={src} className={`pd-ride-item pd-ride-item--${i}`}>
                            <img src={src} alt={i === 0 ? t('product.on_the_road_alt', { name: bike.model }) : ''} loading="lazy" decoding="async" />
                        </figure>
                    ))}
                </section>
            )}

            {/* Related bikes */}
            {related.length > 0 && (
                <section className="pd-related" aria-labelledby="pd-related-title">
                    <div className="pd-related-head">
                        <h2 id="pd-related-title" className="pd-related-title">{t('product.related_title')}</h2>
                        <Link to={categoryPath(bike.category)} className="pd-related-all">
                            {t('product.view_all_bikes')} <ArrowUpRight size={16} aria-hidden="true" />
                        </Link>
                    </div>
                    <div className="sh-grid pd-related-grid">
                        {related.map((b, i) => (
                            <BikeCard key={b.id} bike={b} index={i} t={t} headingLevel={3} />
                        ))}
                    </div>
                </section>
            )}

            {/* Phones: price + contact always within reach */}
            {!isCartEnabled && numericPrice && (
                <div className="pd-sticky">
                    <div className="pd-sticky-price">
                        <span>{t('product.price_label')}</span>
                        <strong>{formatPrice(numericPrice)}</strong>
                    </div>
                    <button type="button" onClick={goContact} className="pd-sticky-btn">
                        <Mail size={16} aria-hidden="true" /> {t('product.contact_us')}
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProductDetail;
