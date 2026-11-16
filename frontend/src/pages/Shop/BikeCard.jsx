import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { productPath } from '../../lib/productUrl';
import { parsePrice, formatPrice } from '../../lib/price';
import { categoryByKey } from '../../lib/categories';
import { MATERIALS, modelName } from '../../lib/bikes';
import './Catalog.css';


// ─── Bike card ───────────────────────────────────────────────────────────────
// The heading link is stretched over the whole card (::after), so the card is one real <a>
// for crawlers and keyboards; the colour swatches sit above it.
const BikeCard = ({ bike, index = 0, t, headingLevel = 2 }) => {
    const Heading = `h${headingLevel}`;
    const variants = (bike.bike_variants || []).filter((v) => v.color_name);
    const [image, setImage] = useState(bike.image_url || null);
    const [activeColor, setActiveColor] = useState(null);

    const price = parsePrice(bike.price);
    const category = categoryByKey(bike.category);
    const material = MATERIALS.find(([m]) => (bike.Material || '').toLowerCase() === m.toLowerCase());
    const meta = [
        category && t(`shop.cat.${category.slug}.name`),
        material && t(`shop.filter.${material[1]}`),
    ].filter(Boolean).join(' · ');
    const soldOut = bike.quantity === 0;

    const preview = (v) => {
        setActiveColor(v?.color_name || null);
        setImage(v?.image_url || bike.image_url || null);
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
                    <img
                        src={image}
                        alt={`${bike.model}${activeColor ? ` ${activeColor}` : ''}`}
                        loading={index < 6 ? 'eager' : 'lazy'}
                        decoding="async"
                    />
                ) : (
                    <span className="sh-card-placeholder" aria-hidden="true">{bike.brand?.charAt(0)}</span>
                )}

                <span className="sh-card-badges">
                    {soldOut && <span className="sh-badge sh-badge--sold">{t('product.sold')}</span>}
                    {bike.is_new && !soldOut && <span className="sh-badge sh-badge--new">{t('shop.new')}</span>}
                </span>

                <span className="sh-card-reveal" aria-hidden="true">
                    {t('shop.view_bike')} <ArrowUpRight size={16} />
                </span>
            </div>

            <div className="sh-card-body">
                <p className="sh-card-meta">
                    <span className="sh-card-brand">{bike.brand}</span>
                    {meta && <span>{meta}</span>}
                </p>

                <Heading className="sh-card-title">
                    <Link to={productPath(bike)} className="sh-card-link">
                        <span className="sr-only">{bike.brand} </span>{modelName(bike)}
                    </Link>
                </Heading>

                <div className="sh-card-foot">
                    <p className="sh-card-price">{price ? formatPrice(price) : bike.price}</p>

                    {variants.length > 1 && (
                        <ul className="sh-swatches" aria-label={t('shop.colors', { count: variants.length })}>
                            {variants.map((v) => (
                                <li key={v.color_name}>
                                    <button
                                        type="button"
                                        className={`sh-swatch${activeColor === v.color_name ? ' is-active' : ''}`}
                                        style={{ backgroundColor: v.color_hex || '#ccc' }}
                                        aria-label={v.color_name}
                                        title={v.color_name}
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

export default BikeCard;
