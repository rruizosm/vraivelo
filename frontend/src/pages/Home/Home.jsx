import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Wrench, ShoppingBag, ShieldCheck, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead/SEOHead';
import GoogleReviews from '../../components/GoogleReviews/GoogleReviews';
import './Home.css';

const brands = [
    { name: 'Giant', id: 1 },
    { name: 'Berria', id: 2 },
];

const partnerBrands = [
    { name: 'Julbo', id: 4 },
    { name: 'Klinpig', id: 5 },
    { name: '226ers', id: 6 },
    { name: 'High Level', id: 7 },
];

const Home = () => {
    const { t } = useTranslation();


    return (
        <div className="home-container">
            <SEOHead titleKey="seo.home.title" descriptionKey="seo.home.description" path="/" />
            {/* HERO SECTION */}
            <section className="hero-section">
                {/* Background Loop */}
                <div className="hero-bg">
                    <img src="/david_vraivelo/taller.png" alt="Cycling background" className="hero-bg-image" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="hero-top-badge"
                >
                    <span className="hero-badge">
                        {t('home.hero.badge')}
                    </span>
                </motion.div>

                {/* Content */}
                <div className="hero-content">

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="hero-title"
                    >
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="hero-subtitle"
                    >
                        {t('home.hero.subtitle')}
                        <br />
                        {t('home.hero.partners_prefix')} <span className="highlight-primary">Giant</span> & <span className="highlight-primary">Berria</span>
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
                                {t('home.hero.explore_btn')}
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </Link>
                        <Link to="/workshop">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="btn-hero-outline"
                            >
                                {t('home.hero.book_btn')} <Wrench size={18} />
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
                            <span className="scroll-text">{t('home.hero.scroll')}</span>
                            <ChevronDown size={20} />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <section className="brands-section">
                <div className="brands-container">
                    <p className="brands-title">
                        {t('home.brands.title')}
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
                            {t('home.values.title')} <span className="highlight-primary">{t('home.values.title_highlight')}</span>
                        </h2>
                        <p className="section-subtitle">
                            {t('home.values.subtitle')}
                        </p>
                    </motion.div>

                    <div className="value-props-grid">
                        <ValueCard
                            icon={<Wrench size={32} strokeWidth={1.5} />}
                            title={t('home.values.cards.workshop.title')}
                            desc={t('home.values.cards.workshop.desc')}
                            delay={0}
                        />
                        <ValueCard
                            icon={<ShoppingBag size={32} strokeWidth={1.5} />}
                            title={t('home.values.cards.selection.title')}
                            desc={t('home.values.cards.selection.desc')}
                            delay={0.1}
                        />
                        <ValueCard
                            icon={<ShieldCheck size={32} strokeWidth={1.5} />}
                            title={t('home.values.cards.guarantee.title')}
                            desc={t('home.values.cards.guarantee.desc')}
                            delay={0.2}
                        />
                    </div>
                </div>
            </section>

            {/* GOOGLE REVIEWS SECTION */}
            <GoogleReviews />

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
                        {t('home.cta.title')}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="cta-text"
                    >
                        {t('home.cta.text')}
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
                                {t('home.cta.button')}
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
