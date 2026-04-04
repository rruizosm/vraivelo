import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import './Licenses.css';

const Licenses = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <div className="licenses-page">
            {/* Hero Section */}
            <header className="licenses-hero">
                <div className="licenses-hero-bg">
                    <img
                        alt="Cycling background"
                        className="licenses-hero-img"
                        src="/stories/licenses.jpg"
                    />
                </div>
                <div className="licenses-hero-gradient"></div>
                <div className="licenses-hero-content">
                    <div className="licenses-hero-text">
                        <h1 className="licenses-title">{t('licenses.hero.title')}</h1>
                        <p className="licenses-subtitle">
                            {t('licenses.hero.subtitle')}
                        </p>
                        <div className="licenses-hero-actions">
                            <a className="licenses-btn-primary editorial-shadow" href="#licencias">{t('licenses.hero.cta')}</a>
                        </div>
                    </div>
                </div>
            </header>

            {/* License Options Grid */}
            <section className="licenses-options-section" id="licencias">
                <div className="licenses-options-header">
                    <div className="licenses-options-title-col">
                        <h2>{t('licenses.grid.title')}</h2>
                        <p>{t('licenses.grid.subtitle')}</p>
                    </div>
                </div>

                <div className="licenses-grid">
                    {/* Licencia Competitiva */}
                    <div className="license-card competitive editorial-shadow">
                        <div>
                            <div className="license-card-header">
                                <span className="license-tag-compet">{t('licenses.cards.competitive.badge')}</span>
                                <span className="license-price">142€<span className="license-price-period">{t('licenses.cards.competitive.period')}</span></span>
                            </div>
                            <h3>{t('licenses.cards.competitive.title')}</h3>
                            <p className="license-desc">{t('licenses.cards.competitive.desc')}</p>
                            <ul className="license-features">
                                <li>
                                    <span className="material-symbols-outlined">verified</span> {t('licenses.cards.competitive.features.0')}
                                </li>
                                <li>
                                    <span className="material-symbols-outlined">medical_services</span> {t('licenses.cards.competitive.features.1')}
                                </li>
                                <li>
                                    <span className="material-symbols-outlined">emoji_events</span> {t('licenses.cards.competitive.features.2')}
                                </li>
                                <li>
                                    <span className="material-symbols-outlined">sell</span> {t('licenses.cards.competitive.features.3')}
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Licencia No Competitiva UCI */}
                    <div className="license-card competitive editorial-shadow">
                        <div>
                            <div className="license-card-header">
                                <span className="license-tag-compet">{t('licenses.cards.noncompetitive.badge')}</span>
                                <span className="license-price">142€<span className="license-price-period">{t('licenses.cards.noncompetitive.period')}</span></span>
                            </div>
                            <h3>{t('licenses.cards.noncompetitive.title')}</h3>
                            <p className="license-desc">{t('licenses.cards.noncompetitive.desc')}</p>
                            <ul className="license-features">
                                <li>
                                    <span className="material-symbols-outlined">public</span> {t('licenses.cards.noncompetitive.features.0')}
                                </li>
                                <li>
                                    <span className="material-symbols-outlined">security</span> {t('licenses.cards.noncompetitive.features.1')}
                                </li>
                                <li>
                                    <span className="material-symbols-outlined">sell</span> {t('licenses.cards.noncompetitive.features.2')}
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Licencia Cicloturista FCC */}
                    <div className="license-card competitive editorial-shadow">
                        <div>
                            <div className="license-card-header">
                                <span className="license-tag-compet">{t('licenses.cards.cicloturista.badge')}</span>
                                <span className="license-price">123€<span className="license-price-period">{t('licenses.cards.cicloturista.period')}</span></span>
                            </div>
                            <h3>{t('licenses.cards.cicloturista.title')}</h3>
                            <p className="license-desc">{t('licenses.cards.cicloturista.desc')}</p>
                            <ul className="license-features">
                                <li>
                                    <span className="material-symbols-outlined">map</span> {t('licenses.cards.cicloturista.features.0')}
                                </li>
                                <li>
                                    <span className="material-symbols-outlined">security</span> {t('licenses.cards.cicloturista.features.1')}
                                </li>
                                <li>
                                    <span className="material-symbols-outlined">groups</span> {t('licenses.cards.cicloturista.features.2')}
                                </li>
                                <li>
                                    <span className="material-symbols-outlined">sell</span> {t('licenses.cards.cicloturista.features.3')}
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Targeta Bici */}
                    <div className="license-card competitive editorial-shadow">
                        <div>
                            <div className="license-card-header">
                                <span className="license-tag-compet">{t('licenses.cards.targeta.badge')}</span>
                                <span className="license-price">44€/55€<span className="license-price-period">{t('licenses.cards.targeta.period')}</span></span>
                            </div>
                            <h3>{t('licenses.cards.targeta.title')}</h3>
                            <p className="license-desc">{t('licenses.cards.targeta.desc')}</p>
                            <ul className="license-features">
                                <li>
                                    <span className="material-symbols-outlined">security</span> {t('licenses.cards.targeta.features.0')}
                                </li>
                                <li>
                                    <span className="material-symbols-outlined">support_agent</span> {t('licenses.cards.targeta.features.1')}
                                </li>
                                <li style={{ fontWeight: 600 }}>
                                    <span className="material-symbols-outlined">info</span> {t('licenses.cards.targeta.features.2')}
                                </li>
                                <li>
                                    <span className="material-symbols-outlined">sell</span> {t('licenses.cards.targeta.features.3')}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Informational Section */}
            <section className="licenses-info-section">
                <div className="licenses-info-container">
                    <div className="licenses-info-image-col">
                        <div className="licenses-info-img-wrapper editorial-shadow">
                            <img alt="Cycling community" src="/stories/licenses_story.JPG" />
                        </div>
                    </div>
                    <div className="licenses-info-text-col">
                        <h2 className="licenses-info-title">{t('licenses.info.title')}</h2>
                        <div className="licenses-benefits-list">
                            <div className="licenses-benefit-item">
                                <div className="benefit-number">01</div>
                                <div className="benefit-content">
                                    <h4>{t('licenses.info.b1.title')}</h4>
                                    <p>{t('licenses.info.b1.desc')}</p>
                                </div>
                            </div>
                            <div className="licenses-benefit-item">
                                <div className="benefit-number">02</div>
                                <div className="benefit-content">
                                    <h4>{t('licenses.info.b2.title')}</h4>
                                    <p>{t('licenses.info.b2.desc')}</p>
                                </div>
                            </div>
                            <div className="licenses-benefit-item">
                                <div className="benefit-number">03</div>
                                <div className="benefit-content">
                                    <h4>{t('licenses.info.b3.title')}</h4>
                                    <p>{t('licenses.info.b3.desc')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="licenses-cta-section">
                <div className="licenses-cta-container">
                    <h2>{t('licenses.cta.title')}</h2>
                    <p>{t('licenses.cta.desc')}</p>
                    <div className="licenses-cta-buttons">
                        <button
                            className="licenses-btn-secondary"
                            onClick={() => navigate('/contact', { state: { subject: 'licenses' } })}
                        >
                            {t('licenses.cta.btn')}
                        </button>
                    </div>
                </div>
                <div className="licenses-cta-divider"></div>
                <div className="licenses-cta-circle"></div>
            </section>
        </div>
    );
};

export default Licenses;
