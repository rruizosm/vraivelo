import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Check, Minus, Star } from 'lucide-react';
import SEOHead from '../../../components/SEOHead/SEOHead';
import '../Workshop.css';
import './ServicePage.css';

const ease = [0.22, 1, 0.36, 1];

// Titles in the locale files still carry <br /> from the old layout; the new one wraps on its own.
const plain = (text) => String(text).replace(/<br\s*\/?>/gi, ' ').replace(/\s+/g, ' ').trim();

/**
 * Shared layout for the workshop service pages (tune-up, forks, rear shocks):
 * hero (copy + photo), price cards (same look as the membership plans), how-we-work
 * section (numbered steps or figures) and a closing call to action.
 *
 * `ns` is the page's i18n prefix; every other text key in `config` is relative to it.
 */
const ServicePage = ({ config }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const k = (key) => t(`${config.ns}.${key}`);
    const book = (service) => navigate('/contact', { state: { subject: 'workshop', service } });
    const title = plain(k('hero.title'));

    return (
        <div className="workshop-page sp-page">
            <SEOHead titleKey={config.seo.titleKey} descriptionKey={config.seo.descriptionKey} path={config.seo.path} />

            {/* HERO: copy on the left, photo on the right (photo on top on phones) */}
            <section className="sp-hero" aria-labelledby="sp-title">
                <div className="sp-hero-copy">
                    <Link to="/workshop" className="sp-back">
                        <ArrowLeft size={16} aria-hidden="true" />
                        {t('workshop.service_page.back')}
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease }}
                    >
                        <p className="sp-eyebrow">
                            <span className="ws-eyebrow-bar" aria-hidden="true" />
                            {k('hero.category')}
                        </p>
                        <h1 id="sp-title" className="sp-title">{title}</h1>
                        <p className="sp-desc">{k('hero.desc')}</p>

                        <div className="sp-hero-actions">
                            <button type="button" className="ws-member" onClick={() => book(title)}>
                                <span className="ws-member-label">{t('workshop.service_page.book')}</span>
                                <span className="ws-member-icon" aria-hidden="true">
                                    <ArrowUpRight size={20} />
                                </span>
                            </button>
                            <a href="#sp-prices" className="sp-link">{t('workshop.service_page.see_prices')}</a>
                        </div>
                    </motion.div>

                    {config.fact && (
                        <p className="sp-fact">
                            <span className="sp-fact-value">{k(config.fact.value)}</span>
                            <span className="sp-fact-label">{k(config.fact.label)}</span>
                        </p>
                    )}
                </div>

                <div className="sp-hero-media">
                    <motion.img
                        src={config.image}
                        alt={k('hero.image_alt')}
                        style={{ objectPosition: config.imagePosition }}
                        initial={{ scale: 1.08 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.4, ease }}
                    />
                </div>
            </section>

            {/* PRICES: one card per option; the recommended one is dark and raised */}
            <section id="sp-prices" className="mp-section sp-prices" aria-labelledby="sp-prices-title">
                <div className="mp-header">
                    <p className="mp-eyebrow">
                        <span className="ws-eyebrow-bar" aria-hidden="true" />
                        {t('workshop.service_page.prices_eyebrow')}
                    </p>
                    <h2 id="sp-prices-title" className="mp-title">{t('workshop.service_page.prices_title')}</h2>
                    <p className="mp-subtitle">{t('workshop.service_page.prices_subtitle')}</p>
                </div>

                <div className={`mp-grid sp-grid sp-grid--${config.plans.length}`}>
                    {config.plans.map((plan, i) => {
                        const name = k(`${plan.base}.title`);
                        const features = t(`${config.ns}.${plan.base}.features`, { returnObjects: true });
                        return (
                            <motion.article
                                key={plan.base}
                                className={`mp-card${plan.featured ? ' mp-card--featured' : ''}`}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.7, delay: i * 0.1, ease }}
                            >
                                {plan.badge && (
                                    <p className="mp-ribbon">
                                        <Star size={14} fill="currentColor" aria-hidden="true" />
                                        {k(plan.badge)}
                                    </p>
                                )}

                                <header className="mp-card-head">
                                    <span className="mp-card-index">0{i + 1}</span>
                                    <h3 className="mp-card-name">{name}</h3>
                                    <p className="mp-card-tagline">{k(`${plan.base}.subtitle`)}</p>
                                </header>

                                <p className="mp-price">
                                    {plan.from && <span className="mp-price-period sp-from">{t('workshop.service_page.from')}</span>}
                                    <span className="mp-price-value">{plan.price}</span>
                                </p>
                                {plan.extra && <p className="sp-price-extra">{k(plan.extra)}</p>}

                                <ul className="mp-features">
                                    {Array.isArray(features) && features.map((f, n) => {
                                        const excluded = plan.excluded?.includes(n);
                                        return (
                                            <li key={n} className={`mp-feature${excluded ? ' sp-feature--off' : ''}`}>
                                                {excluded
                                                    ? <Minus size={18} strokeWidth={2.5} aria-hidden="true" />
                                                    : <Check size={18} strokeWidth={2.5} aria-hidden="true" />}
                                                <span>
                                                    {f}
                                                    {excluded && <span className="sr-only"> ({t('workshop.service_page.not_included')})</span>}
                                                </span>
                                            </li>
                                        );
                                    })}
                                </ul>

                                <button type="button" className="mp-btn" onClick={() => book(name)}>
                                    <span>{k(`${plan.base}.btn`)}</span>
                                    <span className="mp-btn-icon" aria-hidden="true">
                                        <ArrowUpRight size={18} />
                                    </span>
                                </button>
                            </motion.article>
                        );
                    })}
                </div>
            </section>

            {/* HOW WE WORK: numbered steps or key figures, plus optional notes */}
            <section className="sp-process" aria-labelledby="sp-process-title">
                <div className="sp-process-inner">
                    <div className="sp-process-header">
                        <p className="sp-eyebrow sp-eyebrow--light">
                            <span className="ws-eyebrow-bar" aria-hidden="true" />
                            {t('workshop.service_page.process_eyebrow')}
                        </p>
                        <h2 id="sp-process-title" className="sp-process-title">{plain(k(config.process.title))}</h2>
                        {config.process.desc && <p className="sp-process-desc">{k(config.process.desc)}</p>}
                    </div>

                    <ol className="sp-steps">
                        {config.process.items.map((item, i) => (
                            <motion.li
                                key={i}
                                className="sp-step"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.7, delay: i * 0.08, ease }}
                            >
                                {item.value
                                    ? <span className="sp-step-value">{item.value.startsWith('@') ? k(item.value.slice(1)) : item.value}</span>
                                    : <span className="sp-step-index">0{i + 1}</span>}
                                <h3 className="sp-step-title">{k(item.title)}</h3>
                                {item.desc && <p className="sp-step-desc">{k(item.desc)}</p>}
                            </motion.li>
                        ))}
                    </ol>

                    {config.notes && (
                        <div className="sp-notes">
                            {config.notes.map((note) => (
                                <div key={note.title} className="sp-note">
                                    <h3 className="sp-note-title">{k(note.title)}</h3>
                                    {note.value && <p className="sp-note-value">{k(note.value)}</p>}
                                    <p className="sp-note-desc">{k(note.desc)}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="sp-cta" aria-labelledby="sp-cta-title">
                <h2 id="sp-cta-title" className="sp-cta-title">{t('workshop.service_page.cta_title')}</h2>
                <div className="sp-cta-side">
                    <p className="sp-cta-text">{t('workshop.service_page.cta_text')}</p>
                    <button type="button" className="ws-member" onClick={() => book(title)}>
                        <span className="ws-member-label">{t('workshop.service_page.book')}</span>
                        <span className="ws-member-icon" aria-hidden="true">
                            <ArrowUpRight size={20} />
                        </span>
                    </button>
                </div>
            </section>
        </div>
    );
};

export default ServicePage;
