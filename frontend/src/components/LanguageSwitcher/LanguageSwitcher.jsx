import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { localizePath } from '../../lib/lang';
import './LanguageSwitcher.css';

const OPTIONS = [
    { lang: 'en', label: 'EN', name: 'English' },
    { lang: 'es', label: 'ES', name: 'Español' },
    { lang: 'ca', label: 'CA', name: 'Català' },
];

// Each language has its own URLs (/shop/, /ca/shop/, /en/shop/). The buttons are plain links
// to the same page in the other language: a full page load, and links Google can follow.
const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const { pathname, search, hash } = useLocation(); // route path, without the /ca or /en prefix

    return (
        <div className="language-switcher">
            {OPTIONS.map(({ lang, label, name }, i) => (
                <React.Fragment key={lang}>
                    {i > 0 && <span className="divider">|</span>}
                    <a
                        className={`lang-btn ${i18n.language === lang ? 'active' : ''}`}
                        href={`${localizePath(pathname, lang)}${search}${hash}`}
                        hrefLang={lang}
                        lang={lang}
                        aria-label={name}
                        aria-current={i18n.language === lang ? 'true' : undefined}
                    >
                        {label}
                    </a>
                </React.Fragment>
            ))}
        </div>
    );
};

export default LanguageSwitcher;
