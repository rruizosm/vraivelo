import React from 'react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../../../components/SEOHead/SEOHead';
import '../Workshop.css';
import './Mechanics.css';

const Mechanics = () => {
    const navigate = useNavigate();

    return (
        <div className="workshop-page mechanics-page">
            <SEOHead titleKey="seo.workshop.title" descriptionKey="seo.workshop.description" path="/workshop/mechanics" />

            <main className="mechanics-main">
                {/* Hero Section */}
                <section className="mechanics-hero">
                    <div className="mechanics-hero-grid">
                        <div>
                            <div className="mechanics-hero-label">
                                <div className="mechanics-hero-bar"></div>
                                <span className="mechanics-hero-category">Mechanical Excellence</span>
                            </div>
                            <h1 className="mechanics-hero-title">
                                Precision <br />Tune-ups
                            </h1>
                            <p className="mechanics-hero-desc">
                                Our atelier specializes in high-performance maintenance. We treat every bicycle as a masterpiece of engineering, ensuring every gear shift is silent and every brake pull is surgical.
                            </p>
                        </div>
                        <div className="mechanics-hero-image-wrapper">
                            <img alt="Bicycle Workshop" className="mechanics-hero-image" data-alt="Close up of a professional bike mechanic working on a drivetrain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHE6cCi5Oq2pVlORlHyry9Bvxyw2iwbsaAUzXQOtdlHAJh-xSyuIuUle8ExYEQoIxZsgZ_68jkfOsBB_yV7DmW4LLmESz3h4F18rpQlABBNbSQwUuc-z8ncucNhl0AeW1Gs18IM56p1y_BiEC7PcuoA-7RHBF_cC3smdbKxHSEPcoH0-X3O1kffxk9B6PlnuA0dGGdAcRbxITLvuSjX_GeHliACJ8QnUJFQ_rDulWEOKBVUkDfFB9g_pONZJh25NAWDzbjH6qv6Eo" />
                            <div className="mechanics-hero-image-overlay"></div>
                        </div>
                    </div>
                </section>

                {/* Service Matrix */}
                <section className="mechanics-services">
                    <div className="mechanics-services-grid">
                        {/* Basic Tune-up Card */}
                        <div className="mechanics-card-basic">
                            <div className="mechanics-card-header">
                                <div>
                                    <h2 className="mechanics-card-title">Basic Tune-up</h2>
                                    <p className="mechanics-card-subtitle">Routine maintenance for daily riders.</p>
                                </div>
                                <div className="mechanics-card-price">40€</div>
                            </div>
                            
                            <div className="mechanics-card-features">
                                <div className="mechanics-card-feature">
                                    <span className="material-symbols-outlined mechanics-card-feature-icon">settings</span>
                                    <span className="mechanics-card-feature-text">Drivetrain indexing &amp; adjustment</span>
                                </div>
                                <div className="mechanics-card-feature">
                                    <span className="material-symbols-outlined mechanics-card-feature-icon">emergency_home</span>
                                    <span className="mechanics-card-feature-text">Brake safety inspection &amp; alignment</span>
                                </div>
                                <div className="mechanics-card-feature">
                                    <span className="material-symbols-outlined mechanics-card-feature-icon">cleaning_services</span>
                                    <span className="mechanics-card-feature-text">Frame wipe-down &amp; inspection</span>
                                </div>
                                <div className="mechanics-card-feature">
                                    <span className="material-symbols-outlined mechanics-card-feature-icon">tire_repair</span>
                                    <span className="mechanics-card-feature-text">Tire pressure &amp; wear check</span>
                                </div>
                            </div>
                            
                            <button 
                                className="mechanics-btn-basic"
                                onClick={() => navigate('/contact', { state: { subject: 'workshop', service: 'Basic Tune-up' } })}
                            >
                                Book Basic Service
                            </button>
                        </div>

                        {/* Full Overhaul Card */}
                        <div className="mechanics-card-premium">
                            <div className="mechanics-card-badge">
                                Most Popular
                            </div>
                            
                            <div className="mechanics-card-header">
                                <div>
                                    <h2 className="mechanics-card-title-premium">Full Overhaul</h2>
                                    <p className="mechanics-card-subtitle">Complete disassembly &amp; restoration.</p>
                                </div>
                                <div className="mechanics-card-price">80€</div>
                            </div>
                            
                            <div className="mechanics-card-features">
                                <div className="mechanics-card-feature">
                                    <span className="material-symbols-outlined mechanics-card-feature-icon-premium">precision_manufacturing</span>
                                    <span className="mechanics-card-feature-text-premium">Full drivetrain deep clean (Sonic bath)</span>
                                </div>
                                <div className="mechanics-card-feature">
                                    <span className="material-symbols-outlined mechanics-card-feature-icon-premium">build_circle</span>
                                    <span className="mechanics-card-feature-text-premium">Bottom bracket &amp; headset service</span>
                                </div>
                                <div className="mechanics-card-feature">
                                    <span className="material-symbols-outlined mechanics-card-feature-icon-premium">blur_on</span>
                                    <span className="mechanics-card-feature-text-premium">Wheel truing (Precision radial/lateral)</span>
                                </div>
                                <div className="mechanics-card-feature">
                                    <span className="material-symbols-outlined mechanics-card-feature-icon-premium">cable</span>
                                    <span className="mechanics-card-feature-text-premium">Replacement of all inner cables</span>
                                </div>
                                <div className="mechanics-card-feature">
                                    <span className="material-symbols-outlined mechanics-card-feature-icon-premium">verified</span>
                                    <span className="mechanics-card-feature-text-premium">Full component torque verification</span>
                                </div>
                            </div>
                            
                            <button 
                                className="mechanics-btn-premium"
                                onClick={() => navigate('/contact', { state: { subject: 'workshop', service: 'Full Overhaul' } })}
                                >
                                Book Full Overhaul
                            </button>
                        </div>
                    </div>
                </section>

                {/* Technical Specs Section (Asymmetric) */}
                <section className="mechanics-specs">
                    <div className="mechanics-specs-main">
                        <div>
                            <h3 className="mechanics-specs-title">Engineering is in the details.</h3>
                            <p className="mechanics-specs-desc">
                                Our workshop uses professional-grade torque wrenches, ultrasonic cleaners, and genuine manufacturers' parts to ensure your warranty remains intact and your performance maximized.
                            </p>
                        </div>
                        
                        <div className="mechanics-specs-grid">
                            <div>
                                <div className="mechanics-specs-value">0.01mm</div>
                                <div className="mechanics-specs-label">Tolerance</div>
                            </div>
                            <div>
                                <div className="mechanics-specs-value">24h</div>
                                <div className="mechanics-specs-label">Turnaround</div>
                            </div>
                            <div>
                                <div className="mechanics-specs-value">100%</div>
                                <div className="mechanics-specs-label">Certified</div>
                            </div>
                            <div>
                                <div className="mechanics-specs-value">Genuine</div>
                                <div className="mechanics-specs-label">Parts</div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mechanics-cta-card">
                        <div className="mechanics-cta-content">
                            <span className="material-symbols-outlined mechanics-cta-icon">calendar_month</span>
                            <h4 className="mechanics-cta-title">Ready to Ride?</h4>
                            <p className="mechanics-cta-subtitle">Schedule your atelier visit today.</p>
                            <a 
                                className="mechanics-cta-link"
                                onClick={(e) => { e.preventDefault(); navigate('/contact', { state: { subject: 'workshop' } }); }}
                            >
                                Check Availability
                            </a>
                        </div>
                        {/* Ghost image in background */}
                        <span className="material-symbols-outlined mechanics-cta-ghost-icon">settings</span>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Mechanics;
