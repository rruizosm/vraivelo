import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEOHead from '../../../components/SEOHead/SEOHead';
import '../Workshop.css';
import './Suspensions.css';

const Suspensions = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className="workshop-page suspensions-page">
            <SEOHead titleKey="seo.workshop.title" descriptionKey="seo.workshop.description" path="/workshop/suspensions" />

            <main className="suspensions-main">
                {/* Hero Section */}
                <header className="suspensions-hero">
                    <div className="suspensions-hero-text">
                        <div className="suspensions-hero-label">
                            <div className="suspensions-hero-bar"></div>
                            <span className="suspensions-hero-category">{t('workshop.suspensions_page.hero.category')}</span>
                        </div>
                        <h1
                            className="suspensions-hero-title"
                            dangerouslySetInnerHTML={{ __html: t('workshop.suspensions_page.hero.title') }}
                        />
                        <p className="suspensions-hero-desc">
                            {t('workshop.suspensions_page.hero.desc')}
                        </p>
                    </div>
                    <div className="suspensions-hero-img-col">
                        <div className="suspensions-hero-img-container">
                            <img alt="Bicycle suspension detail" className="suspensions-hero-img" data-alt="Close up of high-end mountain bike suspension fork" src="/david_vraivelo/horquilla.png" />
                            <div className="suspensions-hero-img-overlay"></div>
                        </div>
                        <div className="suspensions-glass-panel">
                            <span className="suspensions-glass-val">{t('workshop.suspensions_page.glass_panel.val')}</span>
                            <p className="suspensions-glass-desc">{t('workshop.suspensions_page.glass_panel.desc')}</p>
                        </div>
                    </div>
                </header>

                {/* Service Matrix */}
                <section className="suspensions-services">
                    <div className="suspensions-services-grid">
                        {/* Basic Maintenance Card */}
                        <div className="suspensions-card-basic">
                            <div className="suspensions-card-header">
                                <div>
                                    <h3 className="suspensions-card-title">{t('workshop.suspensions_page.services.basic.title')}</h3>
                                    <span className="suspensions-card-subtitle">{t('workshop.suspensions_page.services.basic.subtitle')}</span>
                                </div>
                                <div className="suspensions-card-price-container">
                                    <span className="suspensions-card-price">60€</span>
                                    <p className="suspensions-card-price-label">Starting At</p>
                                </div>
                            </div>

                            <div className="suspensions-card-features">
                                <div className="suspensions-card-feature">
                                    <span className="suspensions-card-feature-icon">cleaning_services</span>
                                    <span className="suspensions-card-feature-text">{t('workshop.suspensions_page.services.basic.features.0')}</span>
                                </div>
                                <div className="suspensions-card-feature">
                                    <span className="suspensions-card-feature-icon">water_drop</span>
                                    <span className="suspensions-card-feature-text">{t('workshop.suspensions_page.services.basic.features.1')}</span>
                                </div>
                                <div className="suspensions-card-feature">
                                    <span className="suspensions-card-feature-icon">settings_input_component</span>
                                    <span className="suspensions-card-feature-text">{t('workshop.suspensions_page.services.basic.features.2')}</span>
                                </div>
                                <div className="suspensions-card-feature disabled">
                                    <span className="suspensions-card-feature-icon">opacity</span>
                                    <span className="suspensions-card-feature-text">{t('workshop.suspensions_page.services.basic.features.3')}</span>
                                </div>
                            </div>

                            <button
                                className="suspensions-btn-basic"
                                onClick={() => navigate('/contact', { state: { subject: 'workshop', service: t('workshop.suspensions_page.services.basic.title') } })}
                            >
                                {t('workshop.suspensions_page.services.basic.btn')}
                            </button>
                        </div>

                        {/* Full Maintenance Card (Most Popular) */}
                        <div className="suspensions-card-premium">
                            <div className="suspensions-card-badge">
                                <span className="suspensions-card-badge-text">{t('workshop.suspensions_page.services.premium.badge')}</span>
                            </div>

                            <div className="suspensions-card-header">
                                <div className="suspensions-card-header-premium">
                                    <div className="suspensions-card-header-bar"></div>
                                    <div>
                                        <h3 className="suspensions-card-title">{t('workshop.suspensions_page.services.premium.title')}</h3>
                                        <span className="suspensions-card-subtitle">{t('workshop.suspensions_page.services.premium.subtitle')}</span>
                                    </div>
                                </div>
                                <div className="suspensions-card-price-container">
                                    <span className="suspensions-card-price">100€</span>
                                    <p className="suspensions-card-price-label">Starting At</p>
                                </div>
                            </div>

                            <div className="suspensions-card-features">
                                <div className="suspensions-card-feature">
                                    <span className="suspensions-card-feature-icon" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                                    <span className="suspensions-card-feature-text premium">{t('workshop.suspensions_page.services.premium.features.0')}</span>
                                </div>
                                <div className="suspensions-card-feature">
                                    <span className="suspensions-card-feature-icon">published_with_changes</span>
                                    <span className="suspensions-card-feature-text premium">{t('workshop.suspensions_page.services.premium.features.1')}</span>
                                </div>
                                <div className="suspensions-card-feature">
                                    <span className="suspensions-card-feature-icon">opacity</span>
                                    <span className="suspensions-card-feature-text premium">{t('workshop.suspensions_page.services.premium.features.2')}</span>
                                </div>
                                <div className="suspensions-card-feature">
                                    <span className="suspensions-card-feature-icon">precision_manufacturing</span>
                                    <span className="suspensions-card-feature-text premium">{t('workshop.suspensions_page.services.premium.features.3')}</span>
                                </div>
                                <div className="suspensions-card-feature">
                                    <span className="suspensions-card-feature-icon">monitoring</span>
                                    <span className="suspensions-card-feature-text premium">{t('workshop.suspensions_page.services.premium.features.4')}</span>
                                </div>
                            </div>

                            <button
                                className="suspensions-btn-premium"
                                onClick={() => navigate('/contact', { state: { subject: 'workshop', service: t('workshop.suspensions_page.services.premium.title') } })}
                            >
                                {t('workshop.suspensions_page.services.premium.btn')}
                            </button>
                        </div>
                    </div>
                </section>

                {/* Signature Section: Process */}
                <section className="suspensions-process">
                    <div className="suspensions-process-header">
                        <h2
                            className="suspensions-process-title"
                            dangerouslySetInnerHTML={{ __html: t('workshop.suspensions_page.process.title') }}
                        />
                        <div className="suspensions-process-header-bar"></div>
                    </div>

                    <div className="suspensions-process-steps">
                        <div>
                            <span className="suspensions-step-number">01</span>
                            <h4 className="suspensions-step-title">{t('workshop.suspensions_page.process.steps.1.title')}</h4>
                            <p className="suspensions-step-desc">{t('workshop.suspensions_page.process.steps.1.desc')}</p>
                        </div>
                        <div>
                            <span className="suspensions-step-number">02</span>
                            <h4 className="suspensions-step-title">{t('workshop.suspensions_page.process.steps.2.title')}</h4>
                            <p className="suspensions-step-desc">{t('workshop.suspensions_page.process.steps.2.desc')}</p>
                        </div>
                        <div>
                            <span className="suspensions-step-number">03</span>
                            <h4 className="suspensions-step-title">{t('workshop.suspensions_page.process.steps.3.title')}</h4>
                            <p className="suspensions-step-desc">{t('workshop.suspensions_page.process.steps.3.desc')}</p>
                        </div>
                        <div>
                            <span className="suspensions-step-number">04</span>
                            <h4 className="suspensions-step-title">{t('workshop.suspensions_page.process.steps.4.title')}</h4>
                            <p className="suspensions-step-desc">{t('workshop.suspensions_page.process.steps.4.desc')}</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Suspensions;
