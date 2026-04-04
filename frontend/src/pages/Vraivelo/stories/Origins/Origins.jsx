import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    ChevronDown,
    CheckCircle2
} from 'lucide-react';
import { Trans, useTranslation } from 'react-i18next';
import './Origins.css';

const Hero = () => {
    const { t } = useTranslation();
    return (
        <header className="origins-hero">
            <div className="origins-hero-bg">
                <img
                    src="/stories/vraivelo_taller.jpeg"
                    alt="Workshop"
                />
            </div>
            <div className="origins-hero-content">
                <Link to="/vraivelo" className="origins-back-link">
                    <ArrowLeft /> {t('origins.hero.back')}
                </Link>
                <h1 className="origins-hero-title">
                    {t('origins.hero.title')}
                </h1>
                <p className="origins-hero-desc">
                    {t('origins.hero.desc')}
                </p>
                <div className="origins-scrolldown">
                    <ChevronDown />
                </div>
            </div>
        </header>
    );
};

const IntroSection = () => {
    const { t } = useTranslation();
    return (
        <section className="origins-intro">
            <div className="origins-intro-container">
                <div className="origins-separator"></div>
                <h2 className="origins-intro-title">
                    <Trans i18nKey="origins.intro.title" components={{ vraiWhite: <span style={{ color: 'var(--primary)', fontWeight: 600 }} /> }}>
                        <vraiWhite>Vraivēlo</vraiWhite> was born from a lifetime spent on the bicycle.
                    </Trans>
                </h2>
                <p className="origins-intro-text">
                    {t('origins.intro.text')}
                </p>
            </div>
        </section >
    );
};

const CompetitiveEra = () => {
    const { t } = useTranslation();
    return (
        <section className="origins-competitive">
            <div className="origins-grid">
                <div className="order-2 lg:order-1">
                    <span className="origins-label">{t('origins.competitive.label')}</span>
                    <h3 className="origins-heading">
                        {t('origins.competitive.heading')}
                    </h3>
                    <p className="origins-text">
                        {t('origins.competitive.text')}
                    </p>
                    <div className="origins-quote-block">
                        {t('origins.competitive.quote')}
                    </div>
                    <span className="origins-author">{t('origins.competitive.author')}</span>
                </div>

                <div className="origins-images-collage order-1 lg:order-2">
                    <div className="space-y-4 pt-12" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingTop: '3rem' }}>
                        <img
                            src="/david_competitor/14.PNG"
                            alt="MTB"
                            className="origins-img-rounded origins-img-tall"
                        />
                        <img
                            src="/david_competitor/4.PNG"
                            alt="Race Action"
                            className="origins-img-rounded origins-img-short"
                        />
                    </div>
                    <div className="space-y-4" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <img
                            src="/david_competitor/11.PNG"
                            alt="Rider"
                            className="origins-img-rounded origins-img-short"
                        />
                        <img
                            src="/david_competitor/8.PNG"
                            alt="Kit"
                            className="origins-img-rounded origins-img-tall"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

const QuoteBanner = () => {
    const { t } = useTranslation();
    return (
        <section className="origins-quote-banner">
            <img
                src="/david_vraivelo/david_vraivelo_1.jpeg"
                alt="Riding Scene"
                className="origins-quote-bg"
            />
            <div className="origins-quote-content">
                <h2 className="origins-quote-title">
                    {t('origins.quote_banner.title')}
                </h2>
            </div>
        </section>
    );
};

const GallerySection = () => {
    const { t } = useTranslation();
    const images = [
        "/david_vraivelo/local.jpeg",
        "/david_vraivelo/local_2.jpeg",
        "/david_vraivelo/local_3.jpeg",

    ];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [images.length]);

    const features = t('origins.bridging.features', { returnObjects: true }) || [];

    return (
        <section className="origins-bridging reversed">
            <div className="origins-grid">
                {/* Empty Text Column */}
                <div className="space-y-10" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                    <div>
                        <span className="origins-label">{t('origins.bridging.label')}</span>
                        <h3 className="origins-heading">{t('origins.bridging.heading')}</h3>
                        <div className="origins-text">
                            <p style={{ marginBottom: '1.5rem' }}>
                                <Trans i18nKey="origins.bridging.text_1" components={{ vrai: <span style={{ color: 'var(--primary)', fontWeight: 600 }} /> }}>
                                    Only a year after opening our doors, <vrai>Vraivēlo</vrai> experienced unstoppable growth. The recognition of our hard work and the high demand meant that our original shop was becoming too small for the growing community that placed its trust in us. We knew we had to find a space that truly lived up to that trust.
                                </Trans>
                            </p>
                            <p style={{ marginBottom: '1.5rem' }}>
                                <Trans i18nKey="origins.bridging.text_2" components={{ bold: <span style={{ fontWeight: 600 }} /> }}>
                                    This led us to our new location at <bold>Carrer Pau vila i dinares 10</bold>. This move marked the beginning of an exciting new chapter: while continuing to provide a high-quality workshop, we evolved to offer our clients the very best in bicycles, components, and cycling apparel.
                                </Trans>
                            </p>
                            <p>
                                <Trans i18nKey="origins.bridging.text_3" components={{ vrai: <span style={{ color: 'var(--primary)', fontWeight: 600 }} /> }}>
                                    This project fuels our passion to keep working and delivering the excellence that defines <vrai>Vraivēlo</vrai>. With this new stage come new sporting and professional challenges, all driven by the same goal: to offer our customers nothing but the best.
                                </Trans>
                            </p>
                        </div>
                    </div>

                    <div className="origins-features-list">
                        {Array.isArray(features) && features.map((feature) => (
                            <div key={feature} className="origins-feature-item">
                                <CheckCircle2 className="origins-feature-check" />
                                <span className="origins-feature-label">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="origins-feature-img-wrapper">
                    <AnimatePresence mode="popLayout">
                        <motion.img
                            key={currentIndex}
                            src={images[currentIndex]}
                            alt="Workshop Gallery"
                            className="origins-slide-img"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                        />
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

const BridgingTheGap = () => {
    const { t } = useTranslation();
    const images = [
        "/primer_local/local_11.jpeg",
        "/primer_local/local_3.jpeg",
        "/primer_local/local_4.jpeg",
        "/primer_local/local_5.jpeg",
        "/primer_local/local_14.jpeg"
    ];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [images.length]);

    const features = t('origins.building.features', { returnObjects: true }) || [];

    return (
        <section className="origins-bridging">
            <div className="origins-grid">
                <div className="origins-feature-img-wrapper">
                    <AnimatePresence mode="popLayout">
                        <motion.img
                            key={currentIndex}
                            src={images[currentIndex]}
                            alt="Workshop Slideshow"
                            className="origins-slide-img"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                        />
                    </AnimatePresence>
                    <div className="origins-badge">
                        <span className="origins-badge-text">{t('origins.bridging.badge')}</span>
                    </div>
                </div>

                <div className="space-y-10" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                    <div>
                        <span className="origins-label">{t('origins.building.label')}</span>
                        <h3 className="origins-heading">{t('origins.building.heading')}</h3>
                        <div className="origins-text">
                            <p style={{ marginBottom: '1.5rem' }}>
                                {t('origins.building.text_1')}
                            </p>
                            <p>
                                <Trans i18nKey="origins.building.text_2" components={{ vrai: <span style={{ color: 'var(--primary)', fontWeight: 600 }} /> }}>
                                    In December 2023, in Girona, <vrai>Vraivēlo</vrai> was born as a response to that need. A workshop created to care for bicycles with the same respect and demand with which one trains to compete.
                                </Trans>
                            </p>
                        </div>
                    </div>

                    <div className="origins-features-list">
                        {Array.isArray(features) && features.map((feature) => (
                            <div key={feature} className="origins-feature-item">
                                <CheckCircle2 className="origins-feature-check" />
                                <span className="origins-feature-label">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section >
    );
};


const Origins = () => {
    return (
        <div className="origins-page">
            <Hero />
            <main>
                <IntroSection />
                <CompetitiveEra />
                <QuoteBanner />
                <BridgingTheGap />
                <GallerySection />
            </main>
        </div>
    );
};

export default Origins;
