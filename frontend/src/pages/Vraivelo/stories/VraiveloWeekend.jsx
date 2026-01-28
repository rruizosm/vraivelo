import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    ArrowLeft,
    ChevronDown,
    CheckCircle2
} from 'lucide-react';
import './VraiveloWeekend.css';

const WeekendHero = () => {
    return (
        <header className="weekend-hero">
            <div className="weekend-hero-bg">
                <img
                    src="/home_images/vraivelo_home3.jpeg"
                    alt="Vraivelo Workshop"
                />
            </div>
            <div className="weekend-hero-content">
                <Link to="/vraivelo" className="weekend-back-link">
                    <ArrowLeft /> Back to stories
                </Link>
                <h1 className="weekend-hero-title">
                    WHAT WE DO
                </h1>
                <p className="weekend-hero-desc">
                    Comprehensive services tailored for modern cyclists. Precision, passion, and performance.
                </p>
                <div className="weekend-scrolldown">
                    <ChevronDown />
                </div>
            </div>
        </header>
    );
};

const WeekendIntro = () => {
    return (
        <section className="weekend-intro">
            <div className="weekend-intro-container">
                <div className="weekend-separator"></div>
                <h2 className="weekend-intro-title">
                    We offer a comprehensive range of services tailored to meet the needs of <span style={{ color: '#00a9d4', fontWeight: 600 }}>modern cyclists</span>.
                </h2>
                <p className="weekend-intro-text">
                    From basic tune-ups to full custom builds, suspension servicing, and electronic shifting diagnostics.
                    Our workshop is equipped with state-of-the-art tools and we stay updated with the latest technologies
                    to handle even the most advanced machines.
                </p>
            </div>
        </section>
    );
};

const ServicesSection = () => {
    const services = [
        "Full Custom Builds",
        "Suspension Servicing",
        "Electronic Diagnostics",
        "Precision Tune-ups",
        "Wheel Building",
        "Bike Fitting"
    ];

    return (
        <section className="weekend-section">
            <div className="weekend-grid">
                <div className="weekend-image-wrapper">
                    <img
                        src="/home_images/vraivelo_home12.jpeg"
                        alt="Mechanic at work"
                        className="weekend-image"
                    />
                </div>
                <div>
                    <span className="weekend-label">Our Expertise</span>
                    <h3 className="weekend-heading">
                        Precision Mechanics
                    </h3>
                    <p className="weekend-text">
                        Every bike that enters our shop is treated with the utmost care. We believe in transparency and
                        quality, ensuring that your machine performs at its absolute best, whether you are racing
                        or enjoying a weekend ride.
                    </p>
                    <div className="weekend-features-list">
                        {services.map((service, index) => (
                            <div key={index} className="weekend-feature-item">
                                <CheckCircle2 className="weekend-feature-check" />
                                <span className="weekend-feature-label">{service}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const VraiveloWeekend = () => {
    return (
        <div className="weekend-page">
            <WeekendHero />
            <main>
                <WeekendIntro />
                <ServicesSection />
            </main>
        </div>
    );
};

export default VraiveloWeekend;
