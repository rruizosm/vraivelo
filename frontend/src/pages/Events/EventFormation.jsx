import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Wrench, CheckCircle, ChevronRight, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEOHead from '../../components/SEOHead/SEOHead';
import './EventFormation.css';
// Image referenced directly from public folder
const workshopImage = "/primer_local/local_11.jpeg";

const EventFormation = () => {
    const { t } = useTranslation();

    return (
        <div className="event-formation-container">
            <SEOHead titleKey="seo.event_formation.title" descriptionKey="seo.event_formation.description" path="/event-formation" />
            <div className="event-content-wrapper">

                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="event-hero"
                >
                    <span className="event-badge">
                        {t('event_formation.badge')}
                    </span>
                    <h1 className="event-title">
                        {t('event_formation.title_prefix')} <span className="text-[var(--primary)]">{t('event_formation.title_highlight')}</span>
                    </h1>
                    <p className="event-subtitle">
                        {t('event_formation.subtitle')}
                    </p>
                </motion.div>

                {/* Details Grid */}
                <div className="event-details-grid">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="detail-card"
                    >
                        <div className="detail-icon-wrapper blue">
                            <Calendar size={28} strokeWidth={1.5} />
                        </div>
                        <h3 className="detail-title">{t('event_formation.date_time')}</h3>
                        <p className="detail-text">{t('event_formation.date_value')}</p>
                        <p className="detail-text highlight">19:00</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="detail-card"
                    >
                        <div className="detail-icon-wrapper red">
                            <MapPin size={28} strokeWidth={1.5} />
                        </div>
                        <h3 className="detail-title">{t('event_formation.location')}</h3>
                        <p className="detail-text">Vraivēlo</p>
                        <p className="detail-text">Carrer Pau Vila i Dinarès 10, 17003 Girona</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="detail-card"
                    >
                        <div className="detail-icon-wrapper green">
                            <AlertCircle size={28} strokeWidth={1.5} />
                        </div>
                        <h3 className="detail-title">{t('event_formation.cost')}</h3>
                        <p className="price-free" style={{ marginBottom: "0.25rem", fontSize: "1.5rem" }}>{t('event_formation.free')}</p>
                        <p className="price-free" style={{ fontSize: "1.2rem", color: "var(--cal-color-on-surface-variant)" }}>{t('event_formation.regular_price')}</p>
                        <p className="price-note" style={{ marginTop: "0.75rem" }}>{t('event_formation.limited_spots')}</p>
                    </motion.div>
                </div>

                {/* Snack Alert */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="snack-card"
                >
                    <div className="snack-icon-wrapper">
                        <span style={{ fontSize: '1.75rem' }}>☕</span>
                    </div>
                    <div className="snack-content">
                        <h3 className="snack-title">{t('event_formation.snack_title')}</h3>
                        <p className="snack-text">
                            {t('event_formation.snack_text')}
                        </p>
                    </div>
                </motion.div>

                {/* Content Section */}
                <div className="curriculum-section">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="section-title">{t('event_formation.learn_title')}</h2>
                        <div className="learning-list">
                            {(t('event_formation.learn_items', { returnObjects: true }) || []).map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="learning-item"
                                    whileHover={{ x: 5 }}
                                >
                                    <div className="learning-item-icon">
                                        <CheckCircle size={20} />
                                    </div>
                                    <span className="learning-item-text">{item}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="equipment-card"
                    >
                        <div className="equipment-card-bg">
                            <img src={workshopImage} alt="Workshop tools" className="equipment-image" />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* CTA Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="event-cta-box"
            >
                <h2 className="cta-title">{t('event_formation.cta_title')}</h2>
                <p className="cta-text">
                    {t('event_formation.cta_text')}
                </p>
                <Link to="/contact" state={{
                    subject: 'formation',
                    message: t('event_formation.contact_message')
                }}>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="cta-button"
                    >
                        {t('event_formation.register')} <ChevronRight size={20} />
                    </motion.button>
                </Link>
            </motion.div>

        </div>

    );
};

export default EventFormation;
