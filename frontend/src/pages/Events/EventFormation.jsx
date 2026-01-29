import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Wrench, CheckCircle, ChevronRight, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import './EventFormation.css';
import workshopImage from '../../../public/primer_local/local_11.jpeg';

const EventFormation = () => {
    return (
        <div className="event-formation-container">
            <div className="event-content-wrapper">

                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="event-hero"
                >
                    <span className="event-badge">
                        COMMUNITY EVENT
                    </span>
                    <h1 className="event-title">
                        Basics of Bicycle <span className="text-[var(--primary)]">Mechanics</span>
                    </h1>
                    <p className="event-subtitle">
                        Join us for a free, hands-on workshop designed to teach you the essential skills to keep your bike rolling smoothly.
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
                        <h3 className="detail-title">Date & Time</h3>
                        <p className="detail-text">Friday, February 20th, 2026</p>
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
                        <h3 className="detail-title">Location</h3>
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
                        <h3 className="detail-title">Cost</h3>
                        <p className="price-original">€45.00</p>
                        <p className="price-free">FREE</p>
                        <p className="price-note">Limited spots available</p>
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
                        <h3 className="snack-title">Fuel Up First!</h3>
                        <p className="snack-text">
                            Join us at 19:00 for an afternoon snack to start with more power!
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
                        <h2 className="section-title">What You Will Learn</h2>
                        <div className="learning-list">
                            {[
                                "How to clean your bike correctly",
                                "How to lubricate correctly",
                                "Repairing a flat tire",
                                "Adjusting the headset correctly",
                                "Theory and practice"
                            ].map((item, index) => (
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
                <h2 className="cta-title">Ready to Master Your Bike?</h2>
                <p className="cta-text">
                    Spots are strictly limited to ensure personal attention for every participant. Reserve your place today.
                </p>
                <Link to="/contact" state={{
                    subject: 'formation',
                    message: "Hi, I'm interested in being part of the Mechanics Workshop."
                }}>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="cta-button"
                    >
                        Register Now <ChevronRight size={20} />
                    </motion.button>
                </Link>
            </motion.div>

        </div>

    );
};

export default EventFormation;
