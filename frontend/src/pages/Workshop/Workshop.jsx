import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDown, Check, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SEOHead from '../../components/SEOHead/SEOHead';
import StatementBlock from '../../components/StatementBlock/StatementBlock';
import './Workshop.css';

// Workshop services, in display order. Copy lives in workshop.discipline.cards.<key>;
// photos are in public/workshop/ (own photos of the shop and of David riding).
const SERVICES = [
    { key: 'mechanics', to: '/workshop/mechanics', image: '/workshop/puesta-a-punto.webp', position: '22% 50%' },
    { key: 'suspensions', to: '/workshop/suspensions', image: '/workshop/horquillas.webp', position: 'center 55%' },
    { key: 'rear_shock', to: '/workshop/rear-shock', image: '/workshop/amortiguadores.webp', position: 'center 60%' },
];

// Yearly membership plans. `features` = how many fN keys the plan has in workshop.membership.plans.<key>.
// `featured` marks the plan we recommend (shown dark, raised and with the ribbon).
const PLANS = [
    { key: 'peloton', features: 4 },
    { key: 'pro', features: 6, featured: true },
    { key: 'elite', features: 5 },
];

const Workshop = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className="workshop-page">
            <SEOHead titleKey="seo.workshop.title" descriptionKey="seo.workshop.description" path="/workshop" />

            {/* SERVICES: one big photo block per workshop service (same look as the Home boxes) */}
            <section className="ws-services" aria-labelledby="ws-title">
                <div className="ws-header">
                    <p className="ws-eyebrow">
                        <span className="ws-eyebrow-bar" aria-hidden="true" />
                        {t('workshop.discipline.eyebrow')}
                    </p>
                    <h1 id="ws-title" className="ws-title">{t('workshop.discipline.title_1')}</h1>
                    <div className="ws-aside">
                        <a href="#membership-plans" className="ws-member">
                            <span className="ws-member-label">{t('workshop.discipline.become_member')}</span>
                            <span className="ws-member-icon" aria-hidden="true">
                                <ArrowDown size={20} />
                            </span>
                        </a>
                    </div>
                </div>

                <div className="ws-grid">
                    {SERVICES.map((svc, i) => (
                        <motion.div
                            key={svc.key}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <Link to={svc.to} className="ws-box">
                                <img
                                    className="ws-box-img"
                                    src={svc.image}
                                    alt={t(`workshop.discipline.cards.${svc.key}.image_alt`)}
                                    style={{ objectPosition: svc.position }}
                                    loading={i === 0 ? 'eager' : 'lazy'}
                                    decoding="async"
                                />
                                <span className="ws-box-shade" aria-hidden="true" />

                                <span className="ws-box-top">
                                    <span className="ws-box-index">0{i + 1}</span>
                                    <span className="ws-box-badge">{t(`workshop.discipline.cards.${svc.key}.badge`)}</span>
                                </span>

                                <span className="ws-box-bottom">
                                    <span className="ws-box-title">{t(`workshop.discipline.cards.${svc.key}.title`)}</span>
                                    <span className="ws-box-desc">{t(`workshop.discipline.cards.${svc.key}.desc`)}</span>
                                    <span className="ws-box-cta">
                                        {t('workshop.discipline.view_services')}
                                        <span className="ws-box-arrow" aria-hidden="true">
                                            <ArrowUpRight size={20} />
                                        </span>
                                    </span>
                                </span>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CARE: same statement block as the Home, about how carefully we treat each bike */}
            <StatementBlock
                id="care-title"
                k="workshop.care"
                t={t}
                footerEnd={(
                    <Link to="/contact" className="sl-brands sl-cta">
                        {t('workshop.care.cta')}
                        <ArrowUpRight size={22} aria-hidden="true" />
                    </Link>
                )}
            />

            {/* MEMBERSHIP: three yearly plans; Pro Performance is the one we recommend */}
            <section id="membership-plans" className="mp-section" aria-labelledby="mp-title">
                <div className="mp-header">
                    <p className="mp-eyebrow">
                        <span className="ws-eyebrow-bar" aria-hidden="true" />
                        {t('workshop.membership.eyebrow')}
                    </p>
                    <h2 id="mp-title" className="mp-title">{t('workshop.membership.title_2')}</h2>
                    <p className="mp-subtitle">{t('workshop.membership.subtitle')}</p>
                </div>

                <div className="mp-grid">
                    {PLANS.map((plan, i) => {
                        const base = `workshop.membership.plans.${plan.key}`;
                        const name = t(`${base}.name`);
                        return (
                            <motion.article
                                key={plan.key}
                                className={`mp-card${plan.featured ? ' mp-card--featured' : ''}`}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                            >
                                {plan.featured && (
                                    <p className="mp-ribbon">
                                        <Star size={14} fill="currentColor" aria-hidden="true" />
                                        {t('workshop.membership.recommended')}
                                    </p>
                                )}

                                <header className="mp-card-head">
                                    <span className="mp-card-index">0{i + 1}</span>
                                    <h3 className="mp-card-name">{name}</h3>
                                    <p className="mp-card-tagline">{t(`${base}.tagline`)}</p>
                                </header>

                                <p className="mp-price">
                                    <span className="mp-price-value">{t(`${base}.price`)}</span>
                                    <span className="mp-price-period">{t(`${base}.period`)}</span>
                                </p>

                                <ul className="mp-features">
                                    {Array.from({ length: plan.features }, (_, n) => (
                                        <li key={n} className="mp-feature">
                                            <Check size={18} strokeWidth={2.5} aria-hidden="true" />
                                            <span>{t(`${base}.f${n + 1}`)}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    type="button"
                                    className="mp-btn"
                                    onClick={() => navigate('/contact', { state: { subject: 'member', service: name } })}
                                >
                                    <span>{t('workshop.membership.join_now')}</span>
                                    <span className="mp-btn-icon" aria-hidden="true">
                                        <ArrowUpRight size={18} />
                                    </span>
                                </button>
                            </motion.article>
                        );
                    })}
                </div>
            </section>
        </div>
    );
};

export default Workshop;
