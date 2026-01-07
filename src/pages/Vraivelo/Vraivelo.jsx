import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './Vraivelo.css';

const Vraivelo = () => {
    const { t } = useTranslation();

    return (
        <div className="vraivelo-page">
            <div className="vraivelo-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="vraivelo-header"
                >
                    <h1 className="vraivelo-title">{t('vraivelo.title')}</h1>
                    <p className="vraivelo-subtitle">
                        {t('vraivelo.subtitle')}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="vraivelo-section"
                >
                    <h2>{t('vraivelo.how_it_started.title')}</h2>
                    <p className="vraivelo-text">
                        {t('vraivelo.how_it_started.text')}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="vraivelo-section"
                >
                    <h2>{t('vraivelo.who_we_are.title')}</h2>
                    <p className="vraivelo-text">
                        {t('vraivelo.who_we_are.text')}
                    </p>
                    <div className="team-grid">
                        <div className="team-card">
                            <div className="team-avatar">R</div>
                            <h3 className="team-name">Ruben Ruiz</h3>
                            <p className="team-role">{t('vraivelo.team.ruben_role')}</p>
                            <p className="vraivelo-text" style={{ fontSize: '0.9rem' }}>
                                {t('vraivelo.team.ruben_desc')}
                            </p>
                        </div>
                        {/* Add more team members here if needed */}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="vraivelo-section"
                >
                    <h2>{t('vraivelo.what_we_do.title')}</h2>
                    <p className="vraivelo-text">
                        {t('vraivelo.what_we_do.text')}
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default Vraivelo;
