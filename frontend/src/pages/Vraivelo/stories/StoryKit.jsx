// Building blocks shared by every Vraivēlo story page (Orígenes, Berria, Weekend, Strava,
// Calendario, Licencias), in the same language as the rest of the site: full-bleed photo hero,
// uppercase eyebrows + heavy titles, beige / ink bands, numbered points and photo mosaics.
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react';
import { stories } from '../../../data/stories';
import './StoryKit.css';

const ease = [0.22, 1, 0.36, 1];
const reveal = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.7, ease },
};

/** Page wrapper: hero + sections + "more stories" at the end. */
export const StoryPage = ({ id, children }) => (
    <article className="sk-page">
        {children}
        <MoreStories current={id} />
    </article>
);

/** Full-bleed photo with the title bottom-left. `children` = buttons under the text. */
export const StoryHero = ({ image, position = 'center', eyebrow, title, desc, children }) => {
    const { t } = useTranslation();
    return (
        <header className="sk-hero">
            <motion.img
                className="sk-hero-img"
                src={image}
                alt=""
                style={{ objectPosition: position }}
                initial={{ scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.6, ease }}
            />
            <span className="sk-hero-shade" aria-hidden="true" />

            <Link to="/vraivelo/" className="sk-back">
                <ArrowLeft size={16} aria-hidden="true" /> {t('origins.hero.back')}
            </Link>

            <motion.div
                className="sk-hero-copy"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease }}
            >
                {eyebrow && (
                    <p className="sk-eyebrow sk-eyebrow--light">
                        <span className="sk-eyebrow-bar" aria-hidden="true" />
                        {eyebrow}
                    </p>
                )}
                <h1 className="sk-hero-title">{title}</h1>
                {desc && <p className="sk-hero-desc">{desc}</p>}
                {children && <div className="sk-actions">{children}</div>}
            </motion.div>
        </header>
    );
};

/** A band of the page. tone: white | beige | dark. */
export const StorySection = ({ tone = 'white', id, className = '', children }) => (
    <section id={id} className={`sk-section sk-section--${tone} ${className}`}>
        <div className="sk-inner">{children}</div>
    </section>
);

/** Eyebrow + big title on the left, optional text on the right. */
export const StoryHeading = ({ eyebrow, title, aside, as: Tag = 'h2', light = false }) => (
    <motion.div className="sk-heading" {...reveal}>
        {eyebrow && (
            <p className={`sk-eyebrow${light ? ' sk-eyebrow--light' : ''}`}>
                <span className="sk-eyebrow-bar" aria-hidden="true" />
                {eyebrow}
            </p>
        )}
        <Tag className="sk-title">{title}</Tag>
        {aside && <div className="sk-aside">{aside}</div>}
    </motion.div>
);

/** Readable column of paragraphs; the first one can be a lead. */
export const StoryProse = ({ children, lead = false }) => (
    <motion.div className={`sk-prose${lead ? ' sk-prose--lead' : ''}`} {...reveal}>{children}</motion.div>
);

/** Big figures with a label under a rule: [{ value, label }]. */
export const StoryStats = ({ items }) => (
    <motion.dl className="sk-stats" {...reveal}>
        {items.map((s) => (
            <div key={s.label} className="sk-stat">
                <dt className="sk-stat-label">{s.label}</dt>
                <dd className="sk-stat-value">{s.value}</dd>
            </div>
        ))}
    </motion.dl>
);

/** Numbered points: [{ title, desc }]. */
export const StoryPoints = ({ items, columns = 3 }) => (
    <ol className={`sk-points sk-points--${columns}`}>
        {items.map((p, i) => (
            <motion.li key={p.title} className="sk-point" {...reveal} transition={{ ...reveal.transition, delay: i * 0.08 }}>
                <span className="sk-point-index" aria-hidden="true">0{i + 1}</span>
                <h3 className="sk-point-title">{p.title}</h3>
                {p.desc && <p className="sk-point-desc">{p.desc}</p>}
            </motion.li>
        ))}
    </ol>
);

/** Short list with amber ticks. */
export const StoryChecks = ({ items }) => (
    <ul className="sk-checks">
        {items.map((item) => (
            <li key={item}><Check size={18} strokeWidth={2.5} aria-hidden="true" /> {item}</li>
        ))}
    </ul>
);

/**
 * Text and media side by side (media first on phones).
 * `sticky`: for long texts, the media stays in view while the text scrolls (desktop).
 */
export const StorySplit = ({ media, children, reverse = false, sticky = false }) => (
    <div className={`sk-split${reverse ? ' sk-split--reverse' : ''}${sticky ? ' sk-split--sticky' : ''}`}>
        <motion.div className="sk-split-media" {...reveal}>{media}</motion.div>
        <div className="sk-split-text">{children}</div>
    </div>
);

/** One framed photo for a StorySplit. `tall` = portrait 4:5, otherwise 4:3. */
export const StoryPhoto = ({ src, alt = '', position = 'center', tall = true }) => (
    <div className={`sk-frame${tall ? ' sk-frame--tall' : ''}`}>
        <img src={src} alt={alt} loading="lazy" decoding="async" style={{ objectPosition: position }} />
    </div>
);

/** Cross-fading photos, one every `interval` ms. */
export const StorySlideshow = ({ images, interval = 4000, badge }) => {
    const [index, setIndex] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => setIndex((i) => (i + 1) % images.length), interval);
        return () => clearInterval(timer);
    }, [images.length, interval]);
    return (
        <div className="sk-frame sk-frame--tall">
            <AnimatePresence mode="popLayout">
                <motion.img
                    key={index}
                    src={images[index]}
                    alt=""
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                />
            </AnimatePresence>
            {badge && <span className="sk-frame-badge">{badge}</span>}
            <span className="sk-frame-dots" aria-hidden="true">
                {images.map((src, i) => <span key={src} className={i === index ? 'is-active' : ''} />)}
            </span>
        </div>
    );
};

/** Photo mosaic. Each image: { src, alt, caption, span: 'wide' | 'tall' | 'big' | undefined }. */
export const StoryGallery = ({ images }) => (
    <div className="sk-gallery">
        {images.map((img, i) => (
            <motion.figure
                key={img.src}
                className={`sk-gallery-item${img.span ? ` sk-gallery-item--${img.span}` : ''}`}
                {...reveal}
                transition={{ ...reveal.transition, delay: (i % 3) * 0.08 }}
            >
                <img src={img.src} alt={img.alt || img.caption || ''} loading="lazy" decoding="async" style={img.position ? { objectPosition: img.position } : undefined} />
                {img.caption && (
                    <figcaption className="sk-gallery-caption">
                        {img.tag && <span className="sk-gallery-tag">{img.tag}</span>}
                        <span>{img.caption}</span>
                        {img.desc && <small>{img.desc}</small>}
                    </figcaption>
                )}
            </motion.figure>
        ))}
    </div>
);

/** Big quote over a photo. */
export const StoryQuote = ({ image, position = 'center', quote, author }) => (
    <figure className="sk-quote">
        <img className="sk-quote-img" src={image} alt="" loading="lazy" decoding="async" style={{ objectPosition: position }} />
        <span className="sk-quote-shade" aria-hidden="true" />
        <motion.blockquote className="sk-quote-text" {...reveal}>
            <p>{quote}</p>
            {author && <footer>{author}</footer>}
        </motion.blockquote>
    </figure>
);

/** Ink pill with an amber disc; amber fill sweeps in on hover. `light` = for dark backgrounds. */
export const StoryButton = ({ to, href, state, onClick, children, light = false }) => {
    const className = `sk-btn${light ? ' sk-btn--light' : ''}`;
    const inner = (
        <>
            <span className="sk-btn-label">{children}</span>
            <span className="sk-btn-icon" aria-hidden="true"><ArrowUpRight size={18} /></span>
        </>
    );
    if (to) return <Link to={to} state={state} className={className}>{inner}</Link>;
    if (href) {
        const external = /^https?:/.test(href);
        return (
            <a href={href} className={className} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                {inner}
            </a>
        );
    }
    return <button type="button" onClick={onClick} className={className}>{inner}</button>;
};

/** Dark closing band: big title, text and buttons. */
export const StoryCTA = ({ eyebrow, title, text, children }) => (
    <section className="sk-cta">
        <motion.div className="sk-cta-inner" {...reveal}>
            {eyebrow && (
                <p className="sk-eyebrow sk-eyebrow--light">
                    <span className="sk-eyebrow-bar" aria-hidden="true" />
                    {eyebrow}
                </p>
            )}
            <h2 className="sk-cta-title">{title}</h2>
            <div className="sk-cta-side">
                {text && (typeof text === 'string'
                    ? <p className="sk-cta-text">{text}</p>
                    : <div className="sk-cta-text">{text}</div>)}
                {children && <div className="sk-actions">{children}</div>}
            </div>
        </motion.div>
    </section>
);

/** Square story cards (same look and hover as the Vraivēlo index). */
export const StoryCard = ({ story, className = '', headingLevel = 2 }) => {
    const { t } = useTranslation();
    const Heading = `h${headingLevel}`;
    return (
        <Link to={`/vraivelo/${story.id}/`} className={`sk-card ${className}`}>
            <img
                className="sk-card-img"
                src={story.image}
                alt=""
                loading="lazy"
                decoding="async"
                style={{
                    objectPosition: story.backgroundPosition || 'center',
                    objectFit: story.backgroundSize === 'contain' ? 'contain' : 'cover',
                }}
            />
            <span className="sk-card-shade" aria-hidden="true" />
            <span className="sk-card-body">
                <span className="sk-card-category">
                    <span className="sk-card-bar" aria-hidden="true" />
                    {story.category}
                </span>
                <Heading className="sk-card-title">{story.title}</Heading>
                <span className="sk-card-cta">
                    {t('vraivelo.read_story')}
                    <span className="sk-card-arrow" aria-hidden="true"><ArrowUpRight size={18} /></span>
                </span>
            </span>
        </Link>
    );
};

/** "Más historias": the other stories at the end of each page. */
const MoreStories = ({ current }) => {
    const { t, i18n } = useTranslation();
    const list = (stories[i18n.language] || stories.en).filter((s) => s.content && s.id !== current).slice(0, 3);
    if (!list.length) return null;
    return (
        <section className="sk-section sk-section--white sk-more" aria-labelledby="sk-more-title">
            <div className="sk-inner">
                <div className="sk-more-head">
                    <h2 id="sk-more-title" className="sk-title sk-title--sm">{t('vraivelo.more_stories')}</h2>
                    <Link to="/vraivelo/" className="sk-link">{t('vraivelo.all_stories')} <ArrowUpRight size={16} aria-hidden="true" /></Link>
                </div>
                <div className="sk-more-grid">
                    {list.map((s) => <StoryCard key={s.id} story={s} headingLevel={3} />)}
                </div>
            </div>
        </section>
    );
};
