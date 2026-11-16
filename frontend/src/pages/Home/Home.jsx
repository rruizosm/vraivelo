import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Wrench, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead/SEOHead';
import GoogleReviews from '../../components/GoogleReviews/GoogleReviews';
import StatementBlock from '../../components/StatementBlock/StatementBlock';
import { supabase } from '../../supabase';
import { FEATURED_BIKE_IDS, FEATURED_BIKE_MEDIA } from '../../config';
import { BIKE_CATEGORIES, categoryPath, categoryByKey } from '../../lib/categories';
import { productPath } from '../../lib/productUrl';
import { withBikeImages } from '../../lib/bikeImages';
import { parsePrice, formatPrice } from '../../lib/price';
import './Home.css';

// Bike brands we are official dealers for: big cards right below the hero.
// `key` picks the copy in home.brands.<key>; `brand` must match `bikes.brand` (shop filter).
const dealerBrands = [
    { key: 'giant', brand: 'Giant', image: '/bikes/giant/tcr/_family/lifestyle/01.webp' },
    { key: 'berria', brand: 'Berria', image: '/bikes/berria/belador/_family/lifestyle/01.webp' },
];

const partnerBrands = ['Julbo', 'Klinpig', '226ers', 'High Level'];

// "¿Por qué Vraivēlo?" points, in order; copy lives in home.values.cards.<key>
const VALUE_KEYS = ['service', 'workshop', 'setup', 'guarantee'];

// Lifestyle photos for the category boxes, self-hosted in public/categorias
// Official brand imagery: carretera/gravel/mtb/electricas = Berria (Mistral Essential, Naii X,
// Bravo, Nexxen) from berriabikes.com · infantiles = Giant kids range · otros = Julbo (Forest Evo)
const CATEGORY_IMAGES = {
    carretera: 'bicicleta-carretera',
    gravel: 'bicicleta-gravel',
    mtb: 'bicicleta-mtb',
    electricas: 'bicicleta-electrica',
    infantiles: 'bicicleta-infantil',
};

const heroItem = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const Home = () => {
    const { t } = useTranslation();
    const [bikes, setBikes] = useState([]);

    // Lightweight catalogue query: only what the category tiles and featured cards need
    useEffect(() => {
        let cancelled = false;
        supabase
            .from('bikes')
            .select('id,brand,model,category,price,image_url')
            .eq('Active', true)
            .then(({ data, error }) => {
                if (!cancelled && !error && data) setBikes(data.map(withBikeImages));
            });
        return () => { cancelled = true; };
    }, []);

    const featuredBikes = useMemo(
        () => FEATURED_BIKE_IDS.map((id) => bikes.find((b) => b.id === id)).filter(Boolean),
        [bikes]
    );

    // Photo boxes: always rendered (static photos); count and price fill in once bikes load
    const categoryBoxes = useMemo(() => [
        ...BIKE_CATEGORIES.map((c) => {
            const list = bikes.filter((b) => b.category === c.key);
            const prices = list.map((b) => parsePrice(b.price)).filter(Boolean);
            return {
                id: c.key,
                to: categoryPath(c.key),
                image: CATEGORY_IMAGES[c.slug],
                name: t(`shop.cat.${c.slug}.name`),
                tagline: t(`home.categories.tagline.${c.slug}`),
                alt: t(`home.categories.alt.${c.slug}`),
                meta: list.length ? t('home.categories.models', { count: list.length }) : null,
                price: prices.length ? formatPrice(Math.min(...prices)) : null,
            };
        }),
        {
            id: 'other',
            to: '/other-products',
            image: 'cascos-gafas-ciclismo',
            name: t('home.categories.other_name'),
            tagline: t('home.categories.tagline.other'),
            alt: t('home.categories.alt.other'),
            meta: t('home.categories.other_meta'),
            price: null,
        },
    ], [bikes, t]);

    const categoryTiles = useMemo(
        () => BIKE_CATEGORIES.map((c) => {
            const list = bikes.filter((b) => b.category === c.key);
            const prices = list.map((b) => parsePrice(b.price)).filter(Boolean);
            const cover = list.find((b) => FEATURED_BIKE_IDS.includes(b.id) && b.image_url) || list.find((b) => b.image_url);
            return { ...c, count: list.length, minPrice: prices.length ? Math.min(...prices) : null, cover };
        }).filter((c) => c.count > 0),
        [bikes]
    );


    return (
        <div className="home-container">
            <SEOHead titleKey="seo.home.title" descriptionKey="seo.home.description" path="/" />
            {/* HERO: full-screen photo below the navbar, copy anchored bottom-left,
                bike types with "from" prices as the hero's footer */}
            <section className="hx-hero">
                <motion.img
                    src="/david_vraivelo/taller-1920.webp"
                    srcSet="/david_vraivelo/taller-960.webp 960w, /david_vraivelo/taller-1920.webp 1920w"
                    sizes="100vw"
                    alt={t('home.hero.image_alt')}
                    className="hx-hero-img"
                    fetchPriority="high"
                    initial={{ scale: 1.08 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                />
                <div className="hx-hero-scrim" aria-hidden="true" />

                <div className="hx-hero-inner">
                    <motion.div
                        className="hx-hero-copy"
                        initial="hidden"
                        animate="show"
                        variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } }}
                    >
                        <motion.p variants={heroItem} className="hx-hero-eyebrow">
                            <span className="hx-hero-eyebrow-bar" aria-hidden="true" />
                            {t('home.hero.badge')}
                        </motion.p>
                        <motion.h1 variants={heroItem} className="hx-hero-title">
                            {t('seo.home.h1')}
                        </motion.h1>
                        <motion.p variants={heroItem} className="hx-hero-sub">
                            {t('home.hero.subtitle')}
                        </motion.p>
                        <motion.div variants={heroItem} className="hx-hero-actions">
                            <Link to="/shop/" className="hx-btn hx-btn-solid">
                                {t('home.hero.explore_btn')} <ArrowRight size={18} />
                            </Link>
                            <Link to="/workshop" className="hx-btn hx-btn-ghost">
                                <Wrench size={18} /> {t('home.hero.book_btn')}
                            </Link>
                        </motion.div>
                    </motion.div>

                    {categoryTiles.length > 0 && (
                        <motion.nav
                            className="hx-hero-cats"
                            aria-label={t('home.categories.title')}
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {categoryTiles.map((c) => (
                                <Link key={c.key} to={categoryPath(c.key)} className="hx-cat">
                                    <span className="hx-cat-name">{t(`shop.cat.${c.slug}.name`)}</span>
                                    {c.minPrice && (
                                        <span className="hx-cat-price">
                                            {t('home.hero.from')} <strong>{formatPrice(c.minPrice)}</strong>
                                        </span>
                                    )}
                                    <ArrowUpRight size={18} className="hx-cat-icon" aria-hidden="true" />
                                </Link>
                            ))}
                        </motion.nav>
                    )}
                </div>
            </section>

            {/* PARTNERS: official dealer for Giant and Berria, then the rest of the partners */}
            <section className="pt-section" aria-labelledby="pt-title">
                <div className="pt-header">
                    <p className="pt-eyebrow">
                        <span className="cb-eyebrow-bar" aria-hidden="true" />
                        {t('home.brands.title')}
                    </p>
                    <h2 id="pt-title" className="pt-title">{t('home.brands.heading')}</h2>
                    <p className="pt-subtitle">{t('home.brands.subtitle')}</p>
                </div>

                <div className="pt-grid">
                    {dealerBrands.map((b, i) => (
                        <motion.div
                            key={b.key}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <Link to={`/shop/?marca=${encodeURIComponent(b.brand)}`} className="pt-card">
                                <img className="pt-card-img" src={b.image} alt="" loading="lazy" decoding="async" />
                                <span className="pt-card-shade" aria-hidden="true" />
                                <span className="pt-card-top">
                                    <span className="pt-badge">
                                        <ShieldCheck size={14} aria-hidden="true" />
                                        {t('home.brands.official')}
                                    </span>
                                </span>
                                <span className="pt-card-bottom">
                                    <span className="pt-card-name">{b.brand}</span>
                                    <span className="pt-card-desc">{t(`home.brands.${b.key}.desc`)}</span>
                                    <span className="pt-card-link">
                                        {t('home.brands.see_bikes', { brand: b.brand })}
                                        <ArrowUpRight size={18} aria-hidden="true" />
                                    </span>
                                </span>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div className="pt-others">
                    <span className="pt-others-label">{t('home.brands.also')}</span>
                    <ul className="pt-others-list">
                        {partnerBrands.map((name) => (
                            <li key={name}>{name}</li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* SLOGAN: full-width statement between the hero and the shop */}
            <StatementBlock
                id="sl-title"
                k="home.slogan"
                t={t}
                footerEnd={(
                    <span className="sl-brands">
                        <span>Giant</span>
                        <span className="sl-brands-dot" aria-hidden="true" />
                        <span>Berria</span>
                    </span>
                )}
            />

            {/* SHOP BY TYPE: big square photo boxes, one per bike type + gear */}
            <section className="cb-section" aria-labelledby="cb-title">
                <div className="cb-inner">
                    <div className="cb-header">
                        <div>
                            <p className="cb-eyebrow">
                                <span className="cb-eyebrow-bar" aria-hidden="true" />
                                {t('home.categories.eyebrow')}
                            </p>
                            <h2 id="cb-title" className="cb-title">{t('home.categories.title')}</h2>
                        </div>
                        <p className="cb-subtitle">{t('home.categories.subtitle')}</p>
                    </div>
                </div>

                {/* full-bleed grid: 3 equal columns edge to edge */}
                <div className="cb-grid">
                        {categoryBoxes.map((box, i) => (
                            <motion.div
                                key={box.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.7, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <Link to={box.to} className="cb-box">
                                    <img
                                        className="cb-box-img"
                                        src={`/categorias/${box.image}-1000.webp`}
                                        srcSet={`/categorias/${box.image}-600.webp 600w, /categorias/${box.image}-1000.webp 1000w`}
                                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                        alt={box.alt}
                                        loading="lazy"
                                        decoding="async"
                                    />
                                    <span className="cb-box-shade" aria-hidden="true" />

                                    <span className="cb-box-top">
                                        <span className="cb-box-index">0{i + 1}</span>
                                        {box.meta && <span className="cb-box-meta">{box.meta}</span>}
                                    </span>

                                    <span className="cb-box-bottom">
                                        <span className="cb-box-text">
                                            <span className="cb-box-tagline">{box.tagline}</span>
                                            <span className="cb-box-name">{box.name}</span>
                                            {box.price && (
                                                <span className="cb-box-price">
                                                    {t('home.hero.from')} <strong>{box.price}</strong>
                                                </span>
                                            )}
                                        </span>
                                        <span className="cb-box-arrow" aria-hidden="true">
                                            <ArrowUpRight size={22} />
                                        </span>
                                    </span>
                                </Link>
                            </motion.div>
                        ))}
                </div>
            </section>

            {/* CARE: same statement block, mirrored (title left, text right), about workshop care */}
            <StatementBlock
                id="fit-title"
                k="home.fit"
                t={t}
                flip
                footerEnd={(
                    <Link to="/workshop" className="sl-brands sl-cta">
                        {t('home.fit.cta')}
                        <ArrowUpRight size={22} aria-hidden="true" />
                    </Link>
                )}
            />

            {/* FEATURED BIKES: one row of square boxes sliding left in an endless loop */}
            {featuredBikes.length > 0 && (
                <section className="fb-section" aria-labelledby="fb-title">
                    <div className="cb-inner">
                        <div className="cb-header">
                            <div>
                                <p className="cb-eyebrow">
                                    <span className="cb-eyebrow-bar" aria-hidden="true" />
                                    {t('home.featured.eyebrow')}
                                </p>
                                <h2 id="fb-title" className="cb-title">{t('home.featured.title')}</h2>
                            </div>
                            <div className="fb-aside">
                                <p className="cb-subtitle">{t('home.featured.subtitle')}</p>
                                <Link to="/shop/" className="fb-all">
                                    {t('home.featured.view_all')} <ArrowRight size={18} />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* the list is rendered twice; the track slides by exactly one copy, so the loop is seamless */}
                    <div className="fb-marquee">
                        <div
                            className="fb-track"
                            style={{ '--fb-duration': `${featuredBikes.length * 6}s` }}
                        >
                            {[0, 1].map((copy) => (
                                <ul className="fb-list" key={copy} aria-hidden={copy === 1 || undefined}>
                                    {featuredBikes.map((bike) => (
                                        <li key={bike.id} className="fb-item">
                                            <FeaturedBox bike={bike} t={t} hidden={copy === 1} />
                                        </li>
                                    ))}
                                </ul>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* WHY VRAIVĒLO: what we value most, as four numbered points */}
            <section className="wv-section" aria-labelledby="wv-title">
                <div className="wv-header">
                    <p className="wv-eyebrow">
                        <span className="cb-eyebrow-bar" aria-hidden="true" />
                        {t('home.values.eyebrow')}
                    </p>
                    <h2 id="wv-title" className="wv-title">
                        {t('home.values.title')} {t('home.values.title_highlight')}
                    </h2>
                    <p className="wv-subtitle">{t('home.values.subtitle')}</p>
                </div>

                <ol className="wv-grid">
                    {VALUE_KEYS.map((key, i) => (
                        <motion.li
                            key={key}
                            className="wv-item"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <span className="wv-index" aria-hidden="true">0{i + 1}</span>
                            <h3 className="wv-item-title">{t(`home.values.cards.${key}.title`)}</h3>
                            <p className="wv-item-desc">{t(`home.values.cards.${key}.desc`)}</p>
                            {key === 'guarantee' && (
                                <Link to="/contact" className="wv-link">
                                    {t('home.values.cards.guarantee.link')}
                                    <ArrowUpRight size={16} aria-hidden="true" />
                                </Link>
                            )}
                        </motion.li>
                    ))}
                </ol>
            </section>

            {/* GOOGLE REVIEWS SECTION */}
            <GoogleReviews />

            {/* CTA: full-bleed photo from the Vraivēlo × Berria ride in Girona */}
            <section className="ct-section" aria-labelledby="ct-title">
                <img
                    className="ct-img"
                    src="/events/berria-girona-1600.webp"
                    srcSet="/events/berria-girona-1000.webp 1000w, /events/berria-girona-1600.webp 1600w"
                    sizes="100vw"
                    alt={t('home.cta.image_alt')}
                    loading="lazy"
                    decoding="async"
                />
                <span className="ct-shade" aria-hidden="true" />

                <motion.div
                    className="ct-inner"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <p className="ct-eyebrow">
                        <span className="cb-eyebrow-bar" aria-hidden="true" />
                        {t('home.cta.eyebrow')}
                    </p>
                    <h2 id="ct-title" className="ct-title">{t('home.cta.title')}</h2>
                    <p className="ct-text">{t('home.cta.text')}</p>
                    <div className="ct-actions">
                        <Link to="/contact" className="hx-btn hx-btn-solid">
                            {t('home.cta.button')} <ArrowRight size={18} />
                        </Link>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

// Square box in the "Encuentra tu bicicleta" style: lifestyle photo, chips on top, name and
// price at the bottom. On hover the exact bike (catalogue image) fades in over the photo.
const FeaturedBox = ({ bike, t, hidden }) => {
    const media = FEATURED_BIKE_MEDIA[bike.id] || {};
    const photo = media.photo;
    const bikeImage = media.bike || bike.image_url;
    const price = parsePrice(bike.price);
    const cat = categoryByKey(bike.category);

    return (
        <Link
            to={productPath(bike)}
            className={`cb-box fb-box${photo ? '' : ' fb-box--studio'}`}
            tabIndex={hidden ? -1 : undefined}
        >
            {photo && <img className="cb-box-img" src={photo} alt="" loading="lazy" decoding="async" />}
            {bikeImage && (
                <span className="fb-box-bike" aria-hidden="true">
                    <img src={bikeImage} alt="" decoding="async" />
                </span>
            )}
            <span className="cb-box-shade" aria-hidden="true" />

            <span className="cb-box-top">
                <span className="cb-box-meta">{bike.brand}</span>
                {cat && <span className="cb-box-meta">{t(`shop.cat.${cat.slug}.name`)}</span>}
            </span>

            <span className="cb-box-bottom">
                <span className="cb-box-text">
                    <span className="fb-box-name">{bike.model.replace(new RegExp(`^${bike.brand}\\s+`, 'i'), '')}</span>
                    <span className="cb-box-price">
                        <strong>{price ? formatPrice(price) : bike.price}</strong>
                    </span>
                </span>
                <span className="cb-box-arrow" aria-hidden="true">
                    <ArrowUpRight size={22} />
                </span>
            </span>
        </Link>
    );
};

export default Home;
