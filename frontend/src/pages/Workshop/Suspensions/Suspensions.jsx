import React from 'react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../../../components/SEOHead/SEOHead';
import '../Workshop.css';
import './Suspensions.css';

const Suspensions = () => {
    const navigate = useNavigate();

    return (
        <div className="workshop-page suspensions-page">
            <SEOHead titleKey="seo.workshop.title" descriptionKey="seo.workshop.description" path="/workshop/suspensions" />

            <main className="suspensions-main">
                {/* Hero Section */}
                <header className="suspensions-hero">
                    <div className="suspensions-hero-text">
                        <div className="suspensions-hero-label">
                            <div className="suspensions-hero-bar"></div>
                            <span className="suspensions-hero-category">Mechanical Excellence</span>
                        </div>
                        <h1 className="suspensions-hero-title">
                            Suspension <br/> Systems.
                        </h1>
                        <p className="suspensions-hero-desc">
                            Elevating your ride through clinical precision. Our specialized suspension atelier focuses on hydraulic integrity, friction reduction, and bespoke tuning for elite performance.
                        </p>
                    </div>
                    <div className="suspensions-hero-img-col">
                        <div className="suspensions-hero-img-container">
                            <img alt="Bicycle suspension detail" className="suspensions-hero-img" data-alt="Close up of high-end mountain bike suspension fork" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJfVp3Aj0JzccIYUcAO_FV9lMSbU3n11U9cSclHRzAJz1p89mV8ARP3UGUe8C5017DIem_rhJEAL6WR4vUfk6qDNZy1TvtFmomOYWLwjGSJIErhpbf2GK9FjX4uTcUC40w1TK378xN1jN3-hMB5YMe0vuPXkfwiZZ0VIrDC18svFZWndE5lVeC3JQsqmpjsvP7YIL57Hj7LQ5SS5uHghpr4VTZAqD07IzHTkIBdK8FnHUA0yUqbsrqiMuFCG5PP07J9uazdABAWvE" />
                            <div className="suspensions-hero-img-overlay"></div>
                        </div>
                        <div className="suspensions-glass-panel">
                            <span className="suspensions-glass-val">0.01mm</span>
                            <p className="suspensions-glass-desc">The tolerance we maintain for air-spring piston alignment.</p>
                        </div>
                    </div>
                </header>

                {/* Service Matrix */}
                <section className="suspensions-services">
                    <div className="suspensions-services-grid">
                        {/* Basic Maintenance Card */}
                        <div className="suspensions-card-basic">
                            <div className="suspensions-card-header">
                                <div>
                                    <h3 className="suspensions-card-title">Basic Maintenance</h3>
                                    <span className="suspensions-card-subtitle">Standard Interval Service</span>
                                </div>
                                <div className="suspensions-card-price-container">
                                    <span className="suspensions-card-price">60€</span>
                                    <p className="suspensions-card-price-label">Starting At</p>
                                </div>
                            </div>
                            
                            <div className="suspensions-card-features">
                                <div className="suspensions-card-feature">
                                    <span className="suspensions-card-feature-icon">cleaning_services</span>
                                    <span className="suspensions-card-feature-text">General external cleaning &amp; inspection</span>
                                </div>
                                <div className="suspensions-card-feature">
                                    <span className="suspensions-card-feature-icon">water_drop</span>
                                    <span className="suspensions-card-feature-text">Lower leg fluid replacement</span>
                                </div>
                                <div className="suspensions-card-feature">
                                    <span className="suspensions-card-feature-icon">settings_input_component</span>
                                    <span className="suspensions-card-feature-text">Foam ring saturation</span>
                                </div>
                                <div className="suspensions-card-feature disabled">
                                    <span className="suspensions-card-feature-icon">opacity</span>
                                    <span className="suspensions-card-feature-text">Full damper bleed &amp; rebuild</span>
                                </div>
                            </div>
                            
                            <button 
                                className="suspensions-btn-basic"
                                onClick={() => navigate('/contact', { state: { subject: 'workshop', service: 'Basic Maintenance (Suspensions)' } })}
                            >
                                Select Plan
                            </button>
                        </div>

                        {/* Full Maintenance Card (Most Popular) */}
                        <div className="suspensions-card-premium">
                            <div className="suspensions-card-badge">
                                <span className="suspensions-card-badge-text">Most Popular</span>
                            </div>
                            
                            <div className="suspensions-card-header">
                                <div className="suspensions-card-header-premium">
                                    <div className="suspensions-card-header-bar"></div>
                                    <div>
                                        <h3 className="suspensions-card-title">Full Maintenance</h3>
                                        <span className="suspensions-card-subtitle">Annual Performance Rebuild</span>
                                    </div>
                                </div>
                                <div className="suspensions-card-price-container">
                                    <span className="suspensions-card-price">100€</span>
                                    <p className="suspensions-card-price-label">Starting At</p>
                                </div>
                            </div>
                            
                            <div className="suspensions-card-features">
                                <div className="suspensions-card-feature">
                                    <span className="suspensions-card-feature-icon" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                                    <span className="suspensions-card-feature-text premium">Complete ultrasonic cleaning</span>
                                </div>
                                <div className="suspensions-card-feature">
                                    <span className="suspensions-card-feature-icon">published_with_changes</span>
                                    <span className="suspensions-card-feature-text premium">Full seal &amp; wiper replacement</span>
                                </div>
                                <div className="suspensions-card-feature">
                                    <span className="suspensions-card-feature-icon">opacity</span>
                                    <span className="suspensions-card-feature-text premium">Hydraulic damper rebuild &amp; vacuum bleed</span>
                                </div>
                                <div className="suspensions-card-feature">
                                    <span className="suspensions-card-feature-icon">precision_manufacturing</span>
                                    <span className="suspensions-card-feature-text premium">Bushing play calibration</span>
                                </div>
                                <div className="suspensions-card-feature">
                                    <span className="suspensions-card-feature-icon">monitoring</span>
                                    <span className="suspensions-card-feature-text premium">Nitrogen charging (if applicable)</span>
                                </div>
                            </div>
                            
                            <button 
                                className="suspensions-btn-premium"
                                onClick={() => navigate('/contact', { state: { subject: 'workshop', service: 'Full Maintenance (Suspensions)' } })}
                            >
                                Book Full Service
                            </button>
                        </div>
                    </div>
                </section>

                {/* Signature Section: Process */}
                <section className="suspensions-process">
                    <div className="suspensions-process-header">
                        <h2 className="suspensions-process-title">The Precision <br/> Protocol.</h2>
                        <div className="suspensions-process-header-bar"></div>
                    </div>
                    
                    <div className="suspensions-process-steps">
                        <div>
                            <span className="suspensions-step-number">01</span>
                            <h4 className="suspensions-step-title">Diagnostic Intake</h4>
                            <p className="suspensions-step-desc">We measure sag, rebound speeds, and compression damping before any work begins to establish a performance baseline.</p>
                        </div>
                        <div>
                            <span className="suspensions-step-number">02</span>
                            <h4 className="suspensions-step-title">Surgical Clean</h4>
                            <p className="suspensions-step-desc">Components are stripped and placed in an ultrasonic bath to remove micro-particulates that standard cleaning misses.</p>
                        </div>
                        <div>
                            <span className="suspensions-step-number">03</span>
                            <h4 className="suspensions-step-title">Fluid Dynamics</h4>
                            <p className="suspensions-step-desc">We use premium Motorex or Maxima oils, precisely measured to manufacturer specs for consistent thermal stability.</p>
                        </div>
                        <div>
                            <span className="suspensions-step-number">04</span>
                            <h4 className="suspensions-step-title">Dyno Testing</h4>
                            <p className="suspensions-step-desc">Every rebuilt unit is tested on our hand-operated dyno to ensure clicker settings and lockout functions are perfect.</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Suspensions;
