import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEOHead from '../../../components/SEOHead/SEOHead';
import '../Workshop.css';
import './RearShock.css';

const RearShock = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className="workshop-page rs-page">
            <SEOHead titleKey="seo.workshop.title" descriptionKey="seo.workshop.description" path="/workshop/rear-shock" />

            <main className="rs-main">
                {/* Hero Section */}
                <div className="rs-hero">
                    <div className="rs-hero-text">
                        <div className="rs-hero-label">
                            <div className="rs-hero-bar"></div>
                            <span className="rs-hero-category">{t('workshop.rear_shock_page.hero.category')}</span>
                        </div>
                        <h1
                            className="rs-hero-title"
                            dangerouslySetInnerHTML={{ __html: t('workshop.rear_shock_page.hero.title') }}
                        />
                        <p className="rs-hero-desc">
                            {t('workshop.rear_shock_page.hero.desc')}
                        </p>
                    </div>
                    <div className="rs-hero-img-col">
                        <div className="rs-hero-img-container">
                            <img alt="Rear shock detail" className="rs-hero-img" data-alt="Technical close-up of mountain bike rear shock internal components" src="https://lh3.googleusercontent.com/aida-public/AB6AXuABNe2Y8i_lLott0oC0NhYwlRnYO5KG_WNM8gmbCt7qpQ3h7Q-j7D8FPbTXmQFP6QkL-RMYajj2fxikF2rANDqPOon8wDuo4lJrEsWZiwEfnwwunXM84XlXV2b73lF0LW2cJvgVfzbR3uW6iMM8NmO3ok-dhfi_qoF2uRc_9QvXwG8nI7pmDiN7wB-4wXN-UBjZ9pISIoxE-tJudELl0oEh7HpBJGr0VnM0T60oZlCr5NbFri4qyEJmsb2mpyEyR0R8MQLvxy5BtSI" />
                        </div>
                        <div className="rs-hero-badge">
                            <span className="rs-hero-badge-text">{t('workshop.rear_shock_page.hero.badge')}</span>
                        </div>
                    </div>
                </div>

                {/* Service Detail: Bento Grid */}
                <div className="rs-bento">
                    {/* Main Service Card */}
                    <div className="rs-bento-main">
                        <div className="rs-bento-main-header">
                            <h2 className="rs-bento-main-title">{t('workshop.rear_shock_page.bento.main.title')}</h2>
                        </div>
                        <div className="rs-bento-main-grid">
                            <div>
                                <h3 className="rs-bento-list-title">{t('workshop.rear_shock_page.bento.main.list_title')}</h3>
                                <ul className="rs-bento-list">
                                    <li className="rs-bento-list-item">
                                        <span className="rs-bento-list-icon">cleaning_services</span>
                                        <span className="rs-bento-list-text">{t('workshop.rear_shock_page.bento.main.features.0')}</span>
                                    </li>
                                    <li className="rs-bento-list-item">
                                        <span className="rs-bento-list-icon">settings_input_component</span>
                                        <span className="rs-bento-list-text">{t('workshop.rear_shock_page.bento.main.features.1')}</span>
                                    </li>
                                    <li className="rs-bento-list-item">
                                        <span className="rs-bento-list-icon">oil_barrel</span>
                                        <span className="rs-bento-list-text">{t('workshop.rear_shock_page.bento.main.features.2')}</span>
                                    </li>
                                    <li className="rs-bento-list-item">
                                        <span className="rs-bento-list-icon">precision_manufacturing</span>
                                        <span className="rs-bento-list-text">{t('workshop.rear_shock_page.bento.main.features.3')}</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="rs-bento-pricing">
                                <div className="rs-bento-pricing-container">
                                    <p className="rs-bento-pricing-label">{t('workshop.rear_shock_page.bento.main.pricing_label')}</p>
                                    <div className="rs-bento-pricing-value">80€</div>
                                    <p className="rs-bento-pricing-extra">{t('workshop.rear_shock_page.bento.main.pricing_extra')}</p>
                                </div>
                                <button className="rs-btn-book" onClick={() => navigate('/contact', { state: { subject: 'workshop', service: t('workshop.rear_shock_page.bento.main.title') } })}>
                                    {t('workshop.rear_shock_page.bento.main.btn')}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Info */}
                    <div className="rs-sidebar">
                        <div className="rs-sidebar-card1">
                            <h4 className="rs-sidebar-title">{t('workshop.rear_shock_page.bento.sidebar.guarantee.title')}</h4>
                            <p className="rs-sidebar-desc">
                                {t('workshop.rear_shock_page.bento.sidebar.guarantee.desc')}
                            </p>
                        </div>
                        <div className="rs-sidebar-card2">
                            <h4 className="rs-sidebar-title">{t('workshop.rear_shock_page.bento.sidebar.lead_time.title')}</h4>
                            <div className="rs-sidebar-lead-time">
                                <span className="rs-sidebar-lead-icon">schedule</span>
                                <span className="rs-sidebar-lead-val">{t('workshop.rear_shock_page.bento.sidebar.lead_time.val')}</span>
                            </div>
                            <p className="rs-sidebar-lead-extra">{t('workshop.rear_shock_page.bento.sidebar.lead_time.extra')}</p>
                        </div>
                        <div className="rs-sidebar-img-container">
                            <img alt="Macro photo of specialized cycling tools for shock servicing" className="rs-sidebar-img" data-alt="Macro photo of specialized cycling tools for shock servicing" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDz5g2J5vssCg5GAGJADGeTS3dNiqo1j7pasIX-AkFpxXXNZoM1QFzAPjC57lQxFdOsMrmPzE_Rrx4GB3DrvrZEF3piRniu7byG7smOgV7Wa9z5YHE6VFqUFu9njxE3UZH_eUFaiaE5GkcYg2Ky7ilMAwYZfufLnNLkt4Mx-DwmHWnRzlzCsNNdBCdvMPpIeD5cJoQ0XkKFQeXzyOB5C3pmxfObKfDg43Ci_i8c3cBud6-WcgZVeDGWjZOMQ-eaSTdXMNYsDiwgycM" />
                        </div>
                    </div>
                </div>

                {/* Technical Specs Section */}
                <div className="rs-specs">
                    <h3 className="rs-specs-title">{t('workshop.rear_shock_page.specs.title')}</h3>
                    <div className="rs-specs-grid">
                        <div className="rs-spec-card rs-spec-card-1">
                            <span className="rs-spec-icon">cleaning_services</span>
                            <span className="rs-spec-step">{t('workshop.rear_shock_page.specs.steps.1.step')}</span>
                            <p className="rs-spec-name">{t('workshop.rear_shock_page.specs.steps.1.name')}</p>
                        </div>
                        <span className="rs-spec-arrow">arrow_forward</span>
                        <div className="rs-spec-card rs-spec-card-2">
                            <span className="rs-spec-icon">manage_search</span>
                            <span className="rs-spec-step">{t('workshop.rear_shock_page.specs.steps.2.step')}</span>
                            <p className="rs-spec-name">{t('workshop.rear_shock_page.specs.steps.2.name')}</p>
                        </div>
                        <span className="rs-spec-arrow">arrow_forward</span>
                        <div className="rs-spec-card rs-spec-card-3">
                            <span className="rs-spec-icon">speed</span>
                            <span className="rs-spec-step">{t('workshop.rear_shock_page.specs.steps.3.step')}</span>
                            <p className="rs-spec-name">{t('workshop.rear_shock_page.specs.steps.3.name')}</p>
                        </div>
                        <span className="rs-spec-arrow">arrow_forward</span>
                        <div className="rs-spec-card rs-spec-card-4">
                            <span className="rs-spec-icon">precision_manufacturing</span>
                            <span className="rs-spec-step">{t('workshop.rear_shock_page.specs.steps.4.step')}</span>
                            <p className="rs-spec-name">{t('workshop.rear_shock_page.specs.steps.4.name')}</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default RearShock;
