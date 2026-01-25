import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    ChevronDown,
    CheckCircle2
} from 'lucide-react';
import './Origins.css';

const Hero = () => {
    return (
        <header className="origins-hero">
            <div className="origins-hero-bg">
                <img
                    src="../public/stories/vraivelo_taller.jpeg"
                    alt="Workshop"
                />
            </div>
            <div className="origins-hero-content">
                <Link to="/vraivelo" className="origins-back-link">
                    <ArrowLeft /> Back to stories
                </Link>
                <h1 className="origins-hero-title">
                    ORIGINS
                </h1>
                <p className="origins-hero-desc">
                    From competitive racing to precision mechanics. The story behind the workshop.
                </p>
                <div className="origins-scrolldown">
                    <ChevronDown />
                </div>
            </div>
        </header>
    );
};

const IntroSection = () => {
    return (
        <section className="origins-intro">
            <div className="origins-intro-container">
                <div className="origins-separator"></div>
                <h2 className="origins-intro-title">
                    <span style={{ color: '#00a9d4', fontWeight: 600 }}>Vraivēlo</span> was born from a lifetime spent on the bicycle.
                </h2>
                <p className="origins-intro-text">
                    David, founder of the workshop, grew up in Badalona and started pedaling barely three years later.
                    What began as a childhood passion turned into a competitive career in mountain biking and later
                    road cycling, moving through sub23 and elite categories to become part of a professional team.
                </p>
            </div>
        </section>
    );
};

const CompetitiveEra = () => {
    return (
        <section className="origins-competitive">
            <div className="origins-grid">
                <div className="order-2 lg:order-1">
                    <span className="origins-label">The Competitive Era</span>
                    <h3 className="origins-heading">
                        Pushing Limits on the Track
                    </h3>
                    <p className="origins-text">
                        Competitive cycling demands more than just physical endurance; it requires a deep understanding of the machine.
                        Years of pushing bikes to their limits in grueling conditions taught David the crucial relationship
                        between rider and equipment.
                    </p>
                    <div className="origins-quote-block">
                        "Every adjustment, every repair, and every recommendation comes from real experience in training,
                        races, and long hours on the bike."
                    </div>
                    <span className="origins-author">— David, Founder</span>
                </div>

                <div className="origins-images-collage order-1 lg:order-2">
                    <div className="space-y-4 pt-12" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingTop: '3rem' }}>
                        <img
                            src="../public/david_competitor/14.PNG"
                            alt="MTB"
                            className="origins-img-rounded origins-img-tall"
                        />
                        <img
                            src="../public/david_competitor/4.PNG"
                            alt="Race Action"
                            className="origins-img-rounded origins-img-short"
                        />
                    </div>
                    <div className="space-y-4" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <img
                            src="../public/david_competitor/11.PNG"
                            alt="Rider"
                            className="origins-img-rounded origins-img-short"
                        />
                        <img
                            src="../public/david_competitor/8.PNG"
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
    return (
        <section className="origins-quote-banner">
            <img
                src="../public/david_vraivelo/david_vraivelo_1.jpeg"
                alt="Riding Scene"
                className="origins-quote-bg"
            />
            <div className="origins-quote-content">
                <h2 className="origins-quote-title">
                    "Having lived cycling from within marked the difference."
                </h2>
            </div>
        </section>
    );
};

const GallerySection = () => {
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

    return (
        <section className="origins-bridging reversed">
            <div className="origins-grid">
                {/* Empty Text Column */}
                <div className="space-y-10" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                    <div>
                        <span className="origins-label">A New Challenge</span>
                        <h3 className="origins-heading">Vraivēlo Grows</h3>
                        <div className="origins-text">
                            <p style={{ marginBottom: '1.5rem' }}>
                                Only a year after opening our doors, <span style={{ color: '#00a9d4', fontWeight: 600 }}>Vraivēlo</span> experienced unstoppable growth.
                                The recognition of our hard work and the high demand meant that our original shop was becoming
                                too small for the growing community that placed its trust in us. We knew we had to find a space
                                that truly lived up to that trust
                            </p>
                            <p style={{ marginBottom: '1.5rem' }}>
                                This led us to our new location at <strong>Carrer Pau vila i dinares 10</strong>. This move marked the beginning of an exciting new
                                chapter: while continuing to provide a high-quality workshop, we evolved to offer our clients the
                                very best in bicycles, components, and cycling apparel.
                            </p>
                            <p>
                                This project fuels our passion to keep working and delivering the excellence that defines <span style={{ color: '#00a9d4', fontWeight: 600 }}>Vraivēlo</span>.
                                With this new stage come new sporting and professional challenges, all driven by the same goal: to
                                offer our customers nothing but the best.
                            </p>
                        </div>
                    </div>

                    <div className="origins-features-list">
                        {[
                            "Expert Mechanics",
                            "Pro-level Care",
                            "Girona Based",
                            "Bike Shop",
                        ].map((feature) => (
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
                        <span className="origins-badge-text">Specialized Workshop</span>
                    </div>
                </div>

                <div className="space-y-10" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                    <div>
                        <span className="origins-label">A New Chapter</span>
                        <h3 className="origins-heading">Bridging the Gap</h3>
                        <div className="origins-text">
                            <p style={{ marginBottom: '1.5rem' }}>
                                After closing that sporting chapter, the bicycle remained the center of everything,
                                this time from the technical side. Years of experience in workshops and specialized stores
                                allowed for the detection of something clear: there was a lack of real attention
                                to the cyclist and their bicycle.
                            </p>
                            <p>
                                In December 2023, in Girona, <span style={{ color: '#00a9d4', fontWeight: 600 }}>Vraivēlo</span> was born as a response to that need.
                                A workshop created to care for bicycles with the same respect and demand
                                with which one trains to compete.
                            </p>
                        </div>
                    </div>

                    <div className="origins-features-list">
                        {[
                            "Expert Mechanics",
                            "Pro-level Care",
                            "Girona Based"
                        ].map((feature) => (
                            <div key={feature} className="origins-feature-item">
                                <CheckCircle2 className="origins-feature-check" />
                                <span className="origins-feature-label">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
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
