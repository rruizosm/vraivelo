import React from 'react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../../../components/SEOHead/SEOHead';
import '../Workshop.css';
import './RearShock.css';

const RearShock = () => {
    const navigate = useNavigate();

    return (
        <div className="workshop-page rs-page">
            <SEOHead titleKey="seo.workshop.title" descriptionKey="seo.workshop.description" path="/workshop/rear-shock" />

            <main className="rs-main">
                {/* Hero Section */}
                <div className="rs-hero">
                    <div className="rs-hero-text">
                        <div className="rs-hero-label">
                            <div className="rs-hero-bar"></div>
                            <span className="rs-hero-category">Suspension Excellence</span>
                        </div>
                        <h1 className="rs-hero-title">
                            Rear Shock <br/>Engineering.
                        </h1>
                        <p className="rs-hero-desc">
                            Precision tuning for high-performance damping. We treat every shock absorber as a unique mechanical masterpiece, restoring factory performance through clinical maintenance.
                        </p>
                    </div>
                    <div className="rs-hero-img-col">
                        <div className="rs-hero-img-container">
                            <img alt="Rear shock detail" className="rs-hero-img" data-alt="Technical close-up of mountain bike rear shock internal components" src="https://lh3.googleusercontent.com/aida-public/AB6AXuABNe2Y8i_lLott0oC0NhYwlRnYO5KG_WNM8gmbCt7qpQ3h7Q-j7D8FPbTXmQFP6QkL-RMYajj2fxikF2rANDqPOon8wDuo4lJrEsWZiwEfnwwunXM84XlXV2b73lF0LW2cJvgVfzbR3uW6iMM8NmO3ok-dhfi_qoF2uRc_9QvXwG8nI7pmDiN7wB-4wXN-UBjZ9pISIoxE-tJudELl0oEh7HpBJGr0VnM0T60oZlCr5NbFri4qyEJmsb2mpyEyR0R8MQLvxy5BtSI" />
                        </div>
                        <div className="rs-hero-badge">
                            <span className="rs-hero-badge-text">Certified Workshop</span>
                        </div>
                    </div>
                </div>

                {/* Service Detail: Bento Grid */}
                <div className="rs-bento">
                    {/* Main Service Card */}
                    <div className="rs-bento-main">
                        <div className="rs-bento-main-bg">
                            <span className="rs-bento-main-bg-text">01</span>
                        </div>
                        <div className="rs-bento-main-header">
                            <h2 className="rs-bento-main-title">Shock Maintenance</h2>
                            <p className="rs-bento-main-subtitle">Standard Interval 50h/100h Service</p>
                        </div>
                        <div className="rs-bento-main-grid">
                            <div>
                                <h3 className="rs-bento-list-title">Service Scope</h3>
                                <ul className="rs-bento-list">
                                    <li className="rs-bento-list-item">
                                        <span className="rs-bento-list-icon">cleaning_services</span>
                                        <span className="rs-bento-list-text">Complete clinical cleaning of all internal damping systems</span>
                                    </li>
                                    <li className="rs-bento-list-item">
                                        <span className="rs-bento-list-icon">settings_input_component</span>
                                        <span className="rs-bento-list-text">Full O-ring and dynamic seal replacement with premium kits</span>
                                    </li>
                                    <li className="rs-bento-list-item">
                                        <span className="rs-bento-list-icon">oil_barrel</span>
                                        <span className="rs-bento-list-text">Vacuum-bled oil replacement for cavitation-free performance</span>
                                    </li>
                                    <li className="rs-bento-list-item">
                                        <span className="rs-bento-list-icon">precision_manufacturing</span>
                                        <span className="rs-bento-list-text">Bushings inspection and tolerance verification</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="rs-bento-pricing">
                                <div className="rs-bento-pricing-container">
                                    <p className="rs-bento-pricing-label">Total Investment</p>
                                    <div className="rs-bento-pricing-value">80€</div>
                                    <p className="rs-bento-pricing-extra">+ Parts (Seal Kits approx. 25€)</p>
                                </div>
                                <button className="rs-btn-book" onClick={() => navigate('/contact', { state: { subject: 'workshop', service: 'Rear Shock Maintenance' } })}>
                                    Book Maintenance
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Info */}
                    <div className="rs-sidebar">
                        <div className="rs-sidebar-card1">
                            <h4 className="rs-sidebar-title">Precision Guarantee</h4>
                            <p className="rs-sidebar-desc">
                                Every shock serviced at the Atelier undergoes a 24-hour nitrogen pressure test and dyno-simulation to ensure no leaks and consistent damping curves.
                            </p>
                        </div>
                        <div className="rs-sidebar-card2">
                            <h4 className="rs-sidebar-title">Lead Time</h4>
                            <div className="rs-sidebar-lead-time">
                                <span className="rs-sidebar-lead-icon">schedule</span>
                                <span className="rs-sidebar-lead-val">48 - 72 Hours</span>
                            </div>
                            <p className="rs-sidebar-lead-extra">Express same-day service available for +40€.</p>
                        </div>
                        <div className="rs-sidebar-img-container">
                            <img alt="Macro photo of specialized cycling tools for shock servicing" className="rs-sidebar-img" data-alt="Macro photo of specialized cycling tools for shock servicing" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDz5g2J5vssCg5GAGJADGeTS3dNiqo1j7pasIX-AkFpxXXNZoM1QFzAPjC57lQxFdOsMrmPzE_Rrx4GB3DrvrZEF3piRniu7byG7smOgV7Wa9z5YHE6VFqUFu9njxE3UZH_eUFaiaE5GkcYg2Ky7ilMAwYZfufLnNLkt4Mx-DwmHWnRzlzCsNNdBCdvMPpIeD5cJoQ0XkKFQeXzyOB5C3pmxfObKfDg43Ci_i8c3cBud6-WcgZVeDGWjZOMQ-eaSTdXMNYsDiwgycM" />
                        </div>
                    </div>
                </div>

                {/* Technical Specs Section */}
                <div className="rs-specs">
                    <h3 className="rs-specs-title">Service Matrix</h3>
                    <div className="rs-specs-grid">
                        <div className="rs-spec-card rs-spec-card-1">
                            <span className="rs-spec-step">Step 01</span>
                            <p className="rs-spec-name">Degrease &amp; Strip</p>
                        </div>
                        <div className="rs-spec-card rs-spec-card-2">
                            <span className="rs-spec-step">Step 02</span>
                            <p className="rs-spec-name">Internal Inspection</p>
                        </div>
                        <div className="rs-spec-card rs-spec-card-3">
                            <span className="rs-spec-step">Step 03</span>
                            <p className="rs-spec-name">IFP Charging</p>
                        </div>
                        <div className="rs-spec-card rs-spec-card-4">
                            <span className="rs-spec-step">Step 04</span>
                            <p className="rs-spec-name">Torque Calibration</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default RearShock;
