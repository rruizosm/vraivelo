import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEOHead from '../../components/SEOHead/SEOHead';
import './Workshop.css';

const Workshop = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className="workshop-page">
            <SEOHead titleKey="seo.workshop.title" descriptionKey="seo.workshop.description" path="/workshop" />

            {/* Main Content: Service Matrix */}
            <main className="workshop-main">

                <section className="workshop-membership">
                    <header className="workshop-header" style={{ maxWidth: '100%' }}>
                        <div className="workshop-header-top" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div className="workshop-header-bar"></div>
                                <h1 className="workshop-title">
                                    {t('workshop.discipline.title_1')} <br />
                                    <span>{t('workshop.discipline.title_2')}</span>
                                </h1>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', marginTop: '1rem', marginBottom: '1rem' }}>
                                <button
                                    className="workshop-membership-btn-main"
                                    style={{ margin: 0, display: 'inline-block', width: 'auto', whiteSpace: 'nowrap' }}
                                    onClick={() => {
                                        const section = document.getElementById('membership-plans');
                                        if (section) {
                                            section.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }}
                                >
                                    {t('workshop.discipline.become_member')}
                                </button>
                            </div>
                        </div>
                        <p className="workshop-subtitle" style={{ maxWidth: '42rem' }}>
                            {t('workshop.discipline.subtitle')}
                        </p>
                    </header>

                    {/* Service Matrix: Three Workshop Types */}
                    <div className="workshop-grid">
                        {/* Card 1: Tune-up and Mechanics */}
                        <div className="workshop-card workshop-card-offset-0">
                            <div className="workshop-card-image-wrapper">
                                <img alt="Mechanic working on a road bike frame" className="workshop-card-image" style={{ objectPosition: 'center 40%' }} data-alt="Professional mechanic adjusting a high-end bicycle" src="/david_vraivelo/workshop.png" />
                            </div>
                            <div className="workshop-card-content">
                                <div className="workshop-card-header">
                                    <div className="workshop-card-icon-wrapper">
                                        <span className="workshop-card-icon material-symbols-outlined">build</span>
                                    </div>
                                    <span className="workshop-badge workshop-badge-essential">
                                        {t('workshop.discipline.cards.mechanics.badge')}
                                    </span>
                                </div>
                                <h3 className="workshop-card-title">{t('workshop.discipline.cards.mechanics.title')}</h3>
                                <p className="workshop-card-desc">
                                    {t('workshop.discipline.cards.mechanics.desc')}
                                </p>
                                <button
                                    className="workshop-card-button"
                                    onClick={() => navigate('/workshop/mechanics')}
                                >
                                    {t('workshop.discipline.view_services')}
                                    <span className="material-symbols-outlined">arrow_forward</span>
                                </button>
                            </div>
                        </div>

                        {/* Card 2: Suspensions */}
                        <div className="workshop-card workshop-card-offset-0">
                            <div className="workshop-card-image-wrapper">
                                <img alt="Detail of a front suspension fork" className="workshop-card-image" data-alt="Close up of mountain bike suspension fork" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-JIvKXUaopcCv6bDrNu7gB36yXcI9p9t1c6Mn7e3qpQ2TFDWe8StMOasYS5gwQ43ixmETPDsNkAt49hr6FmjCbCW6fp82rULhbmqywfvMgbiV5F7ctqXZRDnCy2N3ROlBMbgnreNpy1XJwl9cgA5WSpK8eAW8uzHPrInWtH7FqpIf7IppD9fPBlti67XCCNsZWWhPNhq0tZWl1xkgPk0clxik7_WHTBZWThgQ2c__3AAdFuGp9xjJBH-yAK3Z941pmMrKbQragnE" />
                            </div>
                            <div className="workshop-card-content">
                                <div className="workshop-card-header">
                                    <div className="workshop-card-icon-wrapper">
                                        <span className="workshop-card-icon material-symbols-outlined">fork_left</span>
                                    </div>
                                    <span className="workshop-badge workshop-badge-advanced">
                                        {t('workshop.discipline.cards.suspensions.badge')}
                                    </span>
                                </div>
                                <h3 className="workshop-card-title">{t('workshop.discipline.cards.suspensions.title')}</h3>
                                <p className="workshop-card-desc">
                                    {t('workshop.discipline.cards.suspensions.desc')}
                                </p>
                                <button
                                    className="workshop-card-button"
                                    onClick={() => navigate('/workshop/suspensions')}
                                >
                                    {t('workshop.discipline.view_services')}
                                    <span className="material-symbols-outlined">arrow_forward</span>
                                </button>
                            </div>
                        </div>

                        {/* Card 3: Rear Shock */}
                        <div className="workshop-card workshop-card-offset-0">
                            <div className="workshop-card-image-wrapper">
                                <img alt="Rear mountain bike shock absorber" className="workshop-card-image" data-alt="Technical view of a rear shock absorber" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHFOeISpRsD7H1LAo_8okbl8jzohLe3P6Cy7ftPCps83EZGn3R5clCq3mQNwsWRoaaToxqRWR7RzvekQHw7hu98swtsbXgTm63jbOaBSBXdBV8abgGzQq_bef-cMaXMnZLY7owv62rRlsl_vRiRffafEZ6-h9zfELq6nLoa9wCKiUBdpVMGEurdLRFzKy3KLAz9BXeUBx8qguVhMtNCxZp_YnjkyRQVmaAGsTZtwsloz9n0wmUKmKcUc4bOCx6Q1VJzwKzceLbRfs" />
                            </div>
                            <div className="workshop-card-content">
                                <div className="workshop-card-header">
                                    <div className="workshop-card-icon-wrapper">
                                        <span className="workshop-card-icon material-symbols-outlined">settings_input_component</span>
                                    </div>
                                    <span className="workshop-badge workshop-badge-expert">
                                        {t('workshop.discipline.cards.rear_shock.badge')}
                                    </span>
                                </div>
                                <h3 className="workshop-card-title">{t('workshop.discipline.cards.rear_shock.title')}</h3>
                                <p className="workshop-card-desc">
                                    {t('workshop.discipline.cards.rear_shock.desc')}
                                </p>
                                <button
                                    className="workshop-card-button"
                                    onClick={() => navigate('/workshop/rear-shock')}
                                >
                                    {t('workshop.discipline.view_services')}
                                    <span className="material-symbols-outlined">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Membership Plans Section */}
                <section id="membership-plans" className="workshop-membership">
                    <div className="workshop-membership-hero">
                        <div className="workshop-membership-title-container">
                            <h2 className="workshop-membership-title">
                                {t('workshop.membership.title_1')}<br />
                                <span className="workshop-membership-title-highlight">{t('workshop.membership.title_2')}</span>
                            </h2>
                        </div>
                    </div>

                    <div className="workshop-pricing-section">
                        <div className="workshop-pricing-stripe"></div>
                        <div className="workshop-pricing-container">
                            <div className="workshop-pricing-grid">

                                {/* Card 1: Pelotón Rider */}
                                <div className="workshop-plan-card workshop-plan-basic">
                                    <div className="workshop-plan-header">
                                        <div className="workshop-plan-icon-wrapper workshop-plan-icon-basic">
                                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '24px', height: '24px' }} xmlns="http://www.w3.org/2000/svg"><path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                                        </div>
                                        <h3 className="workshop-plan-name">{t('workshop.membership.plans.peloton.name')}</h3>
                                        <div className="workshop-plan-price-wrap">
                                            <span className="workshop-plan-price">{t('workshop.membership.plans.peloton.price')}</span>
                                            <span className="workshop-plan-period">{t('workshop.membership.plans.peloton.period')}</span>
                                        </div>
                                    </div>
                                    <ul className="workshop-plan-features">
                                        <li className="workshop-plan-feature">
                                            <svg className="workshop-plan-feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                                            <span className="workshop-plan-feature-text">{t('workshop.membership.plans.peloton.f1')}</span>
                                        </li>
                                        <li className="workshop-plan-feature">
                                            <svg className="workshop-plan-feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                                            <span className="workshop-plan-feature-text">{t('workshop.membership.plans.peloton.f2')}</span>
                                        </li>
                                        <li className="workshop-plan-feature">
                                            <svg className="workshop-plan-feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                                            <span className="workshop-plan-feature-text">{t('workshop.membership.plans.peloton.f3')}</span>
                                        </li>
                                        <li className="workshop-plan-feature">
                                            <svg className="workshop-plan-feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                                            <span className="workshop-plan-feature-text">{t('workshop.membership.plans.peloton.f4')}</span>
                                        </li>
                                    </ul>
                                    <button className="workshop-plan-btn" onClick={() => navigate('/contact', { state: { subject: 'workshop', service: 'Membership: Pelotón Rider' } })}>
                                        {t('workshop.membership.join_now')} <span className="workshop-plan-btn-icon">→</span>
                                    </button>
                                </div>

                                {/* Card 2: Pro Performance */}
                                <div className="workshop-plan-card workshop-plan-pro">
                                    <div className="workshop-plan-badge-pro">{t('workshop.membership.recommended')}</div>
                                    <div className="workshop-plan-header">
                                        <div className="workshop-plan-icon-wrapper workshop-plan-icon-pro">
                                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '24px', height: '24px' }} xmlns="http://www.w3.org/2000/svg"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                                        </div>
                                        <h3 className="workshop-plan-name">{t('workshop.membership.plans.pro.name')}</h3>
                                        <div className="workshop-plan-price-wrap">
                                            <span className="workshop-plan-price">{t('workshop.membership.plans.pro.price')}</span>
                                            <span className="workshop-plan-period">{t('workshop.membership.plans.pro.period')}</span>
                                        </div>
                                    </div>
                                    <ul className="workshop-plan-features">
                                        <li className="workshop-plan-feature">
                                            <svg className="workshop-plan-feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                                            <span className="workshop-plan-feature-text">{t('workshop.membership.plans.pro.f1')}</span>
                                        </li>
                                        <li className="workshop-plan-feature">
                                            <svg className="workshop-plan-feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                                            <span className="workshop-plan-feature-text">{t('workshop.membership.plans.pro.f2')}</span>
                                        </li>
                                        <li className="workshop-plan-feature">
                                            <svg className="workshop-plan-feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                                            <span className="workshop-plan-feature-text">{t('workshop.membership.plans.pro.f3')}</span>
                                        </li>
                                        <li className="workshop-plan-feature">
                                            <svg className="workshop-plan-feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                                            <span className="workshop-plan-feature-text">{t('workshop.membership.plans.pro.f4')}</span>
                                        </li>
                                        <li className="workshop-plan-feature">
                                            <svg className="workshop-plan-feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                                            <span className="workshop-plan-feature-text">{t('workshop.membership.plans.pro.f5')}</span>
                                        </li>
                                    </ul>
                                    <button className="workshop-plan-btn" onClick={() => navigate('/contact', { state: { subject: 'workshop', service: 'Membership: Pro Performance' } })}>
                                        {t('workshop.membership.join_now')} <span className="workshop-plan-btn-icon">→</span>
                                    </button>
                                </div>

                                {/* Card 3: Elite Factory */}
                                <div className="workshop-plan-card workshop-plan-elite">
                                    <div className="workshop-plan-header-elite">
                                        <div className="workshop-plan-badge-elite">{t('workshop.membership.premium')}</div>
                                        <div className="workshop-plan-icon-wrapper workshop-plan-icon-elite">
                                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '24px', height: '24px' }} xmlns="http://www.w3.org/2000/svg"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                                        </div>
                                        <h3 className="workshop-plan-name-elite">{t('workshop.membership.plans.elite.name')}</h3>
                                    </div>
                                    <div className="workshop-plan-body-elite">
                                        <div className="workshop-plan-price-wrap-elite">
                                            <span className="workshop-plan-price">{t('workshop.membership.plans.elite.price')}</span>
                                            <span className="workshop-plan-period">{t('workshop.membership.plans.elite.period')}</span>
                                        </div>
                                        <ul className="workshop-plan-features">
                                            <li className="workshop-plan-feature">
                                                <svg className="workshop-plan-feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                                                <span className="workshop-plan-feature-text">{t('workshop.membership.plans.elite.f1')}</span>
                                            </li>
                                            <li className="workshop-plan-feature">
                                                <svg className="workshop-plan-feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                                                <span className="workshop-plan-feature-text">{t('workshop.membership.plans.elite.f2')}</span>
                                            </li>
                                            <li className="workshop-plan-feature">
                                                <svg className="workshop-plan-feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                                                <span className="workshop-plan-feature-text">{t('workshop.membership.plans.elite.f3')}</span>
                                            </li>
                                            <li className="workshop-plan-feature">
                                                <svg className="workshop-plan-feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                                                <span className="workshop-plan-feature-text">{t('workshop.membership.plans.elite.f4')}</span>
                                            </li>
                                            <li className="workshop-plan-feature">
                                                <svg className="workshop-plan-feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                                                <span className="workshop-plan-feature-text">{t('workshop.membership.plans.elite.f5')}</span>
                                            </li>
                                        </ul>
                                        <button className="workshop-plan-btn" onClick={() => navigate('/contact', { state: { subject: 'workshop', service: 'Membership: Elite Factory' } })}>
                                            {t('workshop.membership.join_now')} <span className="workshop-plan-btn-icon">→</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Workshop;
