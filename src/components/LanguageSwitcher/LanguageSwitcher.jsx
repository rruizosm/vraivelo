import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const langs = ['en', 'es', 'ca'];
        const currentIndex = langs.indexOf(i18n.language);
        const nextIndex = (currentIndex + 1) % langs.length;
        i18n.changeLanguage(langs[nextIndex]);
    };

    return (
        <button
            className="language-switcher"
            onClick={toggleLanguage}
            aria-label="Switch Language"
        >
            <span className={i18n.language === 'en' ? 'active' : ''}>EN</span>
            <span className="divider">|</span>
            <span className={i18n.language === 'es' ? 'active' : ''}>ES</span>
            <span className="divider">|</span>
            <span className={i18n.language === 'ca' ? 'active' : ''}>CA</span>
        </button>
    );
};

export default LanguageSwitcher;
