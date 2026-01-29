import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import './EventBanner.css';

const EventBanner = () => {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="event-banner-wrapper">
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        className="event-banner-container"
                    >
                        <div className="event-banner-card">

                            <div className="banner-content-left">
                                <div className="banner-icon-wrapper">
                                    <Wrench size={22} />
                                </div>
                                <div className="banner-text-group">
                                    <h4 className="banner-title">
                                        Free Mechanics Workshop
                                    </h4>
                                    <p className="banner-subtitle">
                                        <span className="hidden sm:inline">Join us on </span>
                                        <span className="banner-date">Feb 15th</span>
                                        <span className="hidden sm:inline"> • Limited spots!</span>
                                    </p>
                                </div>
                            </div>

                            <div className="banner-actions">
                                <Link to="/event-formation" onClick={() => setIsVisible(false)}>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="btn-details"
                                    >
                                        Details
                                        <ArrowRight size={16} />
                                    </motion.button>
                                </Link>

                                <button
                                    onClick={() => setIsVisible(false)}
                                    className="btn-close"
                                    aria-label="Close banner"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default EventBanner;
