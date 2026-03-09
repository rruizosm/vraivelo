import { motion } from 'framer-motion';
import { Wrench, Settings, Zap, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../../components/SEOHead/SEOHead';
import './Workshop.css';

const Workshop = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const serviceCategories = t('workshop.categories', { returnObjects: true });

    // Helper to map icon string to component
    const getIcon = (type) => {
        switch (type) {
            case 'wrench': return <Wrench size={28} strokeWidth={1.5} />;
            case 'settings': return <Settings size={28} strokeWidth={1.5} />;
            case 'zap': return <Zap size={28} strokeWidth={1.5} />;
            default: return <Wrench size={28} strokeWidth={1.5} />;
        }
    };

    return (
        <div className="workshop-container">
            <SEOHead titleKey="seo.workshop.title" descriptionKey="seo.workshop.description" path="/workshop" />
            <div className="workshop-content-container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="workshop-header"
                >
                    <span className="workshop-badge">
                        {t('workshop.badge')}
                    </span>
                    <h1 className="workshop-title">
                        {t('workshop.title')} <span className="workshop-text-highlight">{t('workshop.title_highlight')}</span>
                    </h1>
                    <p className="workshop-subtitle">
                        {t('workshop.subtitle')}
                    </p>
                </motion.div>

                <div className="workshop-categories">
                    {serviceCategories.map((category, catIndex) => (
                        <div key={catIndex} className="category-section">
                            <motion.h2
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: catIndex * 0.2, duration: 0.5 }}
                                className="category-title"
                            >
                                {category.title}
                            </motion.h2>

                            <div className="services-grid">
                                {category.services.map((service, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: (catIndex * 0.2) + (index * 0.1), duration: 0.6 }}
                                        className={`service-card ${service.popular ? 'popular' : 'standard'}`}
                                    >
                                        {service.popular && (
                                            <div className="popular-badge">
                                                {t('workshop.most_popular')}
                                            </div>
                                        )}

                                        <div className="service-card-header">
                                            <div className={`service-icon-wrapper ${service.popular ? 'popular' : 'standard'}`}>
                                                {getIcon(service.icon_type)}
                                            </div>
                                            <div className="text-right">
                                                <div className={`service-price ${service.popular ? 'popular' : ''}`}>
                                                    {service.price}
                                                </div>
                                            </div>
                                        </div>

                                        <h3 className="service-title">{service.title}</h3>

                                        <p className="service-description mb-6 text-gray-500 text-sm">
                                            {service.description}
                                        </p>

                                        <ul className="service-features-list">
                                            {service.features.map((feat, i) => (
                                                <li key={i} className="service-feature-item">
                                                    <Check size={18} className={`service-feature-icon ${service.popular ? 'popular' : ''}`} />
                                                    <span className="text-sm">{feat}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className={`btn-book-service ${service.popular ? 'btn-book-popular' : 'btn-book-standard'}`}
                                            onClick={() => navigate('/contact', {
                                                state: {
                                                    subject: 'workshop',
                                                    service: service.title
                                                }
                                            })}
                                        >
                                            {t('workshop.book_now')}
                                        </motion.button>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Additional Info */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="custom-info-section"
                >
                    <div className="custom-info-grid">
                        <div className="custom-info-content">
                            <h3>{t('workshop.custom.title')}</h3>
                            <p>
                                {t('workshop.custom.text')}
                            </p>
                        </div>
                        <div className="custom-info-actions">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="btn-custom-quote"
                                onClick={() => navigate('/contact', {
                                    state: {
                                        subject: 'workshop',
                                        service: 'custom'
                                    }
                                })}
                            >
                                {t('workshop.custom.button')}
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Workshop;
