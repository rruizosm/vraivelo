import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEOHead from '../../../components/SEOHead/SEOHead';
import '../Workshop.css';
import './Mechanics.css';

const Mechanics = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className="workshop-page mechanics-page">
            <SEOHead titleKey="seo.workshop.title" descriptionKey="seo.workshop.description" path="/workshop/mechanics" />

            <main className="mechanics-main">
                {/* Hero Section */}
                <section className="mechanics-hero">
                    <div className="mechanics-hero-grid">
                        <div>
                            <div className="mechanics-hero-label">
                                <div className="mechanics-hero-bar"></div>
                                <span className="mechanics-hero-category">{t('workshop.mechanics_page.hero.category')}</span>
                            </div>
                            <h1 className="mechanics-hero-title" dangerouslySetInnerHTML={{ __html: t('workshop.mechanics_page.hero.title') }} />
                            <p className="mechanics-hero-desc">
                                {t('workshop.mechanics_page.hero.desc')}
                            </p>
                        </div>
                        <div className="mechanics-hero-image-wrapper">
                            <img alt="Bicycle Workshop" className="mechanics-hero-image" data-alt="Close up of a professional bike mechanic working on a drivetrain" src="/david_vraivelo/taller.png" />
                            <div className="mechanics-hero-image-overlay"></div>
                        </div>
                    </div>
                </section>

                {/* Service Matrix */}
                <section className="mechanics-services">
                    <div className="mechanics-services-grid">
                        {/* Basic Tune-up Card */}
                        <div className="mechanics-card-basic">
                            <div className="mechanics-card-header">
                                <div>
                                    <h2 className="mechanics-card-title">{t('workshop.mechanics_page.services.basic.title')}</h2>
                                    <p className="mechanics-card-subtitle">{t('workshop.mechanics_page.services.basic.subtitle')}</p>
                                </div>
                                <div className="mechanics-card-price">40€</div>
                            </div>

                            <div className="mechanics-card-features">
                                <div className="mechanics-card-feature">
                                    <span className="material-symbols-outlined mechanics-card-feature-icon">settings</span>
                                    <span className="mechanics-card-feature-text">{t('workshop.mechanics_page.services.basic.features.0')}</span>
                                </div>
                                <div className="mechanics-card-feature">
                                    <span className="material-symbols-outlined mechanics-card-feature-icon">emergency_home</span>
                                    <span className="mechanics-card-feature-text">{t('workshop.mechanics_page.services.basic.features.1')}</span>
                                </div>
                                <div className="mechanics-card-feature">
                                    <span className="material-symbols-outlined mechanics-card-feature-icon">cleaning_services</span>
                                    <span className="mechanics-card-feature-text">{t('workshop.mechanics_page.services.basic.features.2')}</span>
                                </div>
                                <div className="mechanics-card-feature">
                                    <span className="material-symbols-outlined mechanics-card-feature-icon">tire_repair</span>
                                    <span className="mechanics-card-feature-text">{t('workshop.mechanics_page.services.basic.features.3')}</span>
                                </div>
                            </div>

                            <button
                                className="mechanics-btn-basic"
                                onClick={() => navigate('/contact', { state: { subject: 'workshop', service: t('workshop.mechanics_page.services.basic.title') } })}
                            >
                                {t('workshop.mechanics_page.services.basic.btn')}
                            </button>
                        </div>

                        {/* Full Overhaul Card */}
                        <div className="mechanics-card-premium">
                            <div className="mechanics-card-badge">
                                {t('workshop.mechanics_page.services.premium.badge')}
                            </div>

                            <div className="mechanics-card-header">
                                <div>
                                    <h2 className="mechanics-card-title-premium">{t('workshop.mechanics_page.services.premium.title')}</h2>
                                    <p className="mechanics-card-subtitle">{t('workshop.mechanics_page.services.premium.subtitle')}</p>
                                </div>
                                <div className="mechanics-card-price">80€</div>
                            </div>

                            <div className="mechanics-card-features">
                                <div className="mechanics-card-feature">
                                    <span className="material-symbols-outlined mechanics-card-feature-icon-premium">precision_manufacturing</span>
                                    <span className="mechanics-card-feature-text-premium">{t('workshop.mechanics_page.services.premium.features.0')}</span>
                                </div>
                                <div className="mechanics-card-feature">
                                    <span className="material-symbols-outlined mechanics-card-feature-icon-premium">build_circle</span>
                                    <span className="mechanics-card-feature-text-premium">{t('workshop.mechanics_page.services.premium.features.1')}</span>
                                </div>
                                <div className="mechanics-card-feature">
                                    <span className="material-symbols-outlined mechanics-card-feature-icon-premium">blur_on</span>
                                    <span className="mechanics-card-feature-text-premium">{t('workshop.mechanics_page.services.premium.features.2')}</span>
                                </div>
                                <div className="mechanics-card-feature">
                                    <span className="material-symbols-outlined mechanics-card-feature-icon-premium">cable</span>
                                    <span className="mechanics-card-feature-text-premium">{t('workshop.mechanics_page.services.premium.features.3')}</span>
                                </div>
                                <div className="mechanics-card-feature">
                                    <span className="material-symbols-outlined mechanics-card-feature-icon-premium">verified</span>
                                    <span className="mechanics-card-feature-text-premium">{t('workshop.mechanics_page.services.premium.features.4')}</span>
                                </div>
                            </div>

                            <button
                                className="mechanics-btn-premium"
                                onClick={() => navigate('/contact', { state: { subject: 'workshop', service: t('workshop.mechanics_page.services.premium.title') } })}
                            >
                                {t('workshop.mechanics_page.services.premium.btn')}
                            </button>
                        </div>
                    </div>
                </section>

                {/* Technical Specs Section (Asymmetric) */}
                <section className="mechanics-specs">
                    <div className="mechanics-specs-main">
                        <div>
                            <h3 className="mechanics-specs-title">{t('workshop.mechanics_page.specs.title')}</h3>
                            <p className="mechanics-specs-desc">
                                {t('workshop.mechanics_page.specs.desc')}
                            </p>
                        </div>

                        <div className="mechanics-specs-grid">
                            <div>
                                <div className="mechanics-specs-value">0.01mm</div>
                                <div className="mechanics-specs-label">{t('workshop.mechanics_page.specs.tolerance')}</div>
                            </div>
                            <div>
                                <div className="mechanics-specs-value">24h</div>
                                <div className="mechanics-specs-label">{t('workshop.mechanics_page.specs.turnaround')}</div>
                            </div>
                            <div>
                                <div className="mechanics-specs-value">100%</div>
                                <div className="mechanics-specs-label">{t('workshop.mechanics_page.specs.certified')}</div>
                            </div>
                            <div>
                                <div className="mechanics-specs-value">Genuine</div>
                                <div className="mechanics-specs-label">{t('workshop.mechanics_page.specs.parts')}</div>
                            </div>
                        </div>
                    </div>

                    <div className="mechanics-cta-card">
                        <div className="mechanics-cta-content">
                            <span className="material-symbols-outlined mechanics-cta-icon">calendar_month</span>
                            <h4 className="mechanics-cta-title">{t('workshop.mechanics_page.cta.title')}</h4>
                            <p className="mechanics-cta-subtitle">{t('workshop.mechanics_page.cta.subtitle')}</p>
                            <a
                                className="mechanics-cta-link"
                                onClick={(e) => { e.preventDefault(); navigate('/contact', { state: { subject: 'workshop' } }); }}
                            >
                                {t('workshop.mechanics_page.cta.btn')}
                            </a>
                        </div>
                        {/* Ghost image in background */}
                        <span className="material-symbols-outlined mechanics-cta-ghost-icon">settings</span>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Mechanics;
