import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';
import './VraiveloBerria.css';

const VraiveloBerria = () => {
    const { t } = useTranslation();

    // Smooth scroll for anchor links
    const handleScroll = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="berria-page">
            <div className="relative flex w-full flex-col">
                <main className="berria-main">
                    <section className="berria-hero-section">
                        <div className="berria-hero-bg-wrapper">
                            <img
                                alt="Girona Experience Hero"
                                className="berria-hero-img"
                                src="/vraivelo_berria/Girona/DSC00196.jpeg"
                            />
                            <div className="berria-hero-overlay"></div>
                        </div>
                        <div className="berria-hero-content">
                            <Link to="/vraivelo" className="berria-back-link">
                                <ArrowLeft /> {t('origins.hero.back')}
                            </Link>
                            <span className="berria-badge">{t('berria.hero.badge')}</span>
                            <h1 className="berria-hero-title">
                                {t('berria.hero.title')}
                            </h1>
                            <p className="berria-hero-desc">
                                {t('berria.hero.desc')}
                            </p>
                        </div>
                    </section>

                    <div id="story" className="berria-story-container">
                        <article className="berria-article">
                            <div className="berria-article-header">
                                <h2 className="berria-subheading">{t('berria.article.subheading')}</h2>
                                <h3 className="berria-heading">
                                    {t('berria.article.heading')}
                                </h3>
                                <div className="berria-divider"></div>
                            </div>
                            <div className="berria-prose">
                                <p>
                                    {t('berria.article.p1')}
                                    <br /><br />{t('berria.article.p2')}
                                    <br /><br />{t('berria.article.p3')}
                                </p>
                                <div className="berria-stats-grid">
                                    <div className="berria-stat-card">
                                        <span className="material-symbols-outlined berria-stat-icon">directions_bike</span>
                                        <span className="berria-stat-value">{t('berria.stats.s1_val')}</span>
                                        <span className="berria-stat-label">{t('berria.stats.s1_label')}</span>
                                    </div>
                                    <div className="berria-stat-card">
                                        <span className="material-symbols-outlined berria-stat-icon">explore</span>
                                        <span className="berria-stat-value">{t('berria.stats.s2_val')}</span>
                                        <span className="berria-stat-label">{t('berria.stats.s2_label')}</span>
                                    </div>
                                    <div className="berria-stat-card">
                                        <span className="material-symbols-outlined berria-stat-icon">settings_suggest</span>
                                        <span className="berria-stat-value">{t('berria.stats.s3_val')}</span>
                                        <span className="berria-stat-label">{t('berria.stats.s3_label')}</span>
                                    </div>
                                </div>
                                <p>
                                    {t('berria.article.p4')}
                                    <br /><br />
                                    {t('berria.article.p5')}
                                    <br /><br />
                                    {t('berria.article.p6')}
                                </p>
                            </div>
                        </article>

                        <div className="berria-features-container">
                            <div className="berria-feature-row">
                                <div className="berria-feature-icon-box">
                                    <span className="material-symbols-outlined berria-feature-icon">biotech</span>
                                </div>
                                <div className="berria-feature-content">
                                    <h4>{t('berria.features.f1_title')}</h4>
                                    <p>{t('berria.features.f1_desc')}</p>
                                </div>
                            </div>
                            <div className="berria-feature-row">
                                <div className="berria-feature-icon-box">
                                    <span className="material-symbols-outlined berria-feature-icon">map</span>
                                </div>
                                <div className="berria-feature-content">
                                    <h4>{t('berria.features.f2_title')}</h4>
                                    <p>{t('berria.features.f2_desc')}</p>
                                </div>
                            </div>
                            <div className="berria-feature-row">
                                <div className="berria-feature-icon-box">
                                    <span className="material-symbols-outlined berria-feature-icon">build_circle</span>
                                </div>
                                <div className="berria-feature-content">
                                    <h4>{t('berria.features.f3_title')}</h4>
                                    <p>{t('berria.features.f3_desc')}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <section id="gallery" className="berria-gallery-section">
                        <div className="berria-gallery-container">
                            <div className="berria-gallery-header">
                                <h2 className="berria-gallery-title">{t('berria.gallery.title')}</h2>
                                <p className="berria-gallery-subtitle">{t('berria.gallery.subtitle')}</p>
                            </div>
                            <div className="berria-gallery-grid">
                                <div className="berria-gallery-item">
                                    <div className="berria-img-card aspect-4-5">
                                        <img alt={t('berria.gallery.c1')} src="/vraivelo_berria/Girona/DSC00322.jpeg" />
                                    </div>
                                    <p className="berria-img-caption">{t('berria.gallery.c1')}</p>
                                </div>
                                <div className="berria-gallery-item md-offset">
                                    <div className="berria-img-card aspect-4-5">
                                        <img alt={t('berria.gallery.c2')} src="/vraivelo_berria/Girona/DSC00346.jpeg" />
                                    </div>
                                    <p className="berria-img-caption">{t('berria.gallery.c2')}</p>
                                </div>
                                <div className="berria-gallery-item md-span-2">
                                    <div className="berria-img-card aspect-video">
                                        <img alt={t('berria.gallery.c3')} src="/vraivelo_berria/Girona/DSC00343.jpeg" />
                                    </div>
                                    <p className="berria-img-caption">{t('berria.gallery.c3')}</p>
                                </div>
                                <div className="berria-gallery-item">
                                    <div className="berria-img-card aspect-square">
                                        <img alt={t('berria.gallery.c4')} src="/vraivelo_berria/Girona/DSC00369.jpeg" />
                                    </div>
                                    <p className="berria-img-caption">{t('berria.gallery.c4')}</p>
                                </div>
                                <div className="berria-gallery-item">
                                    <div className="berria-img-card aspect-square">
                                        <img alt={t('berria.gallery.c5')} src="/vraivelo_berria/Girona/DSC00245.jpeg" />
                                    </div>
                                    <p className="berria-img-caption">{t('berria.gallery.c5')}</p>
                                </div>
                                <div className="berria-gallery-item md-span-2">
                                    <div className="berria-img-card fixed-h-600">
                                        <img alt={t('berria.gallery.c6')} src="/vraivelo_berria/Girona/DSC00329.jpeg" />
                                    </div>
                                    <p className="berria-img-caption">{t('berria.gallery.c6')}</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                <footer className="berria-footer">
                    <div className="berria-footer-content">
                        <div className="berria-brand-row">
                            <div className="berria-brand-item">
                                <span className="material-symbols-outlined berria-brand-icon">home_repair_service</span>
                                <span className="berria-brand-text">VRAIVELO</span>
                            </div>
                            <div className="berria-vl"></div>
                            <div className="berria-brand-item">
                                <span className="material-symbols-outlined berria-brand-icon">bolt</span>
                                <span className="berria-brand-text">BERRIA</span>
                            </div>
                        </div>
                        <div className="berria-footer-text-group">
                            <p className="berria-footer-quote">
                                {t('berria.footer.quote')}
                            </p>

                            <p className="berria-copyright">
                                {t('berria.footer.copyright')}
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default VraiveloBerria;
