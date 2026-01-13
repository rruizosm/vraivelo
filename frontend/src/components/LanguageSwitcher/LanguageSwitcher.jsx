import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };

    return (
        <div className="language-switcher">
            <button
                className={`lang-btn ${i18n.language === 'en' ? 'active' : ''}`}
                onClick={() => changeLanguage('en')}
                aria-label="English"
            >
                EN
            </button>
            <span className="divider">|</span>
            <button
                className={`lang-btn ${i18n.language === 'es' ? 'active' : ''}`}
                onClick={() => changeLanguage('es')}
                aria-label="Español"
            >
                ES
            </button>
            <span className="divider">|</span>
            <button
                className={`lang-btn ${i18n.language === 'ca' ? 'active' : ''}`}
                onClick={() => changeLanguage('ca')}
                aria-label="Català"
            >
                CA
            </button>
        </div>
    );
};

export default LanguageSwitcher;
