import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Wrench, ShoppingBag, ShieldCheck, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Home.css';

const heroImages = [
    "/home_images/vraivelo_home7.jpeg",
    "/home_images/vraivelo_home10.jpeg",
    "/home_images/vraivelo_home11.jpeg",
    "/home_images/vraivelo_home12.jpeg",
];

const brands = [
    { name: 'Giant', id: 1 },
    { name: 'Berria', id: 2 },
    { name: 'MMR', id: 3 },
];

const partnerBrands = [
    { name: 'Julbo', id: 4 },
    { name: 'Klinpig', id: 5 },
    { name: '226ers', id: 6 },
    { name: 'High Level', id: 7 },
];

const Home = () => {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % heroImages.length);
        }, 6000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="home-container">
            {/* HERO SECTION */}
            <section className="hero-section">
                {/* Background Loop */}
                <div className="hero-bg">
                    <AnimatePresence mode='popLayout'>
                        <motion.img
                            key={currentImage}
                            src={heroImages[currentImage]}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.5 }}
                            className="hero-bg-image"
                            alt="Cycling background"
                        />
                    </AnimatePresence>
                </div>

                <div className="hero-bg-overlay">
                    <div className="hero-glow-blob-1" />
                    <div className="hero-glow-blob-2" />
                </div>
                {/* Darker overlay for text readability over images */}
                <div className="hero-radial-overlay" style={{ background: 'radial-gradient(circle at center, rgba(0,0,0,0.3) 0%, var(--bg-dark) 90%)' }} />

                {/* Grid Pattern Overlay */}
                <div className="hero-grid-pattern" />

                {/* Content */}
                <div className="hero-content">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="hero-badge-wrapper"
                    >
                        <span className="hero-badge">
                            AUTHORIZED DEALER • EXPERT WORKSHOP
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="hero-title"
                    >
                        RIDE{' '}
                        <span className="relative inline-block">
                            <span className="text-gradient-reality">
                                REALITY
                            </span>
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="hero-subtitle"
                    >
                        Not just a bike shop. A sanctuary for performance, precision, and passion.
                        Official partner of <span className="highlight-primary">Giant</span>, <span className="highlight-primary">Berria</span> & <span className="highlight-primary">MMR</span>
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="hero-actions"
                    >
                        <Link to="/shop">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="btn-hero-primary group"
                            >
                                Explore Bikes
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </Link>
                        <Link to="/workshop">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="btn-hero-outline"
                            >
                                Book Service <Wrench size={18} />
                            </motion.button>
                        </Link>
                    </motion.div>

                    {/* Scroll Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                        className="scroll-indicator"
                    >
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="scroll-indicator-inner"
                        >
                            <span className="scroll-text">Scroll</span>
                            <ChevronDown size={20} />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <section className="brands-section">
                <div className="brands-container">
                    <p className="brands-title">
                        Trusted Partners
                    </p>
                    <div className="brands-grid">
                        {brands.map((brand, index) => (
                            <motion.span
                                key={brand.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="brand-item"
                            >
                                {brand.name}
                            </motion.span>
                        ))}
                    </div>
                </div>
            </section>

            {/* PARTNER BRANDS MARQUEE */}
            <section className="brands-section" style={{ borderTop: 'none', padding: '1.5rem' }}>
                <div className="brands-container">
                    <div className="brands-grid">
                        {partnerBrands.map((brand, index) => (
                            <motion.span
                                key={brand.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="brand-item"
                                style={{ fontSize: '1.5rem', opacity: 0.7 }}
                            >
                                {brand.name}
                            </motion.span>
                        ))}
                    </div>
                </div>
            </section>

            {/* VALUE PROPS */}
            <section className="value-props-section">
                <div className="value-props-container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="value-props-header"
                    >
                        <h2 className="section-title">
                            Why <span className="highlight-primary">Vraivelo</span>?
                        </h2>
                        <p className="section-subtitle">
                            We combine expert craftsmanship with genuine passion for cycling.
                        </p>
                    </motion.div>

                    <div className="value-props-grid">
                        <ValueCard
                            icon={<Wrench size={32} strokeWidth={1.5} />}
                            title="Expert Workshop"
                            desc="State-of-the-art tools and certified mechanics for top-tier maintenance and repairs."
                            delay={0}
                        />
                        <ValueCard
                            icon={<ShoppingBag size={32} strokeWidth={1.5} />}
                            title="Premium Selection"
                            desc="Curated collection of the world's finest bicycles and professional-grade gear."
                            delay={0.1}
                        />
                        <ValueCard
                            icon={<ShieldCheck size={32} strokeWidth={1.5} />}
                            title="Vraivelo Guarantee"
                            desc="We stand behind every service and sale. Quality and satisfaction, always."
                            delay={0.2}
                        />
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="cta-section">
                <div className="cta-bg" />
                <div className="cta-bg-glow">
                    <div className="cta-glow-blob" />
                </div>
                <div className="cta-content">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="cta-title"
                    >
                        Ready to Elevate Your Ride?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="cta-text"
                    >
                        Visit our workshop or explore our collection of premium bicycles.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <Link to="/contact">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="btn-cta"
                            >
                                Get in Touch
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

const ValueCard = ({ icon, title, desc, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
        whileHover={{ y: -8 }}
        className="value-card group"
    >
        <div className="value-card-icon group-hover:bg-[var(--primary-glow)] group-hover:text-[var(--primary)]">
            {icon}
        </div>
        <h3 className="card-title">{title}</h3>
        <p className="card-desc">{desc}</p>
    </motion.div>
);

export default Home;
