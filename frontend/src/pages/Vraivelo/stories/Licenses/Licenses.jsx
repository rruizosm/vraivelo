import React from 'react';
import './Licenses.css';

const Licenses = () => {
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
                        <h1 className="licenses-title">Federarse en Ciclismo.</h1>
                        <p className="licenses-subtitle">
                            La seguridad de rodar protegido. Únete a la comunidad de la Federació Catalana de Ciclisme y accede a competiciones, seguros especializados y ventajas exclusivas Vraivelo.
                        </p>
                        <div className="licenses-hero-actions">
                            <a className="licenses-btn-primary editorial-shadow" href="#licencias">Explorar Opciones</a>
                        </div>
                    </div>
                </div>
            </header>

            {/* License Options Grid */}
            <section className="licenses-options-section" id="licencias">
                <div className="licenses-options-header">
                    <div className="licenses-options-title-col">
                        <h2>Descubre todas las licencias disponibles</h2>
                        <p>Cuatro modalidades diseñadas para adaptarse a tu nivel de compromiso y estilo de vida sobre las dos ruedas.</p>
                    </div>
                </div>

                <div className="licenses-grid">
                    {/* Licencia Competitiva */}
                    <div className="license-card competitive editorial-shadow">
                        <div>
                            <div className="license-card-header">
                                <span className="license-tag-compet">Ideal para dorsal</span>
                                <span className="license-price">142€<span className="license-price-period">/ año</span></span>
                            </div>
                            <h3>Licencia Competitiva</h3>
                            <p className="license-desc">Para Elit, Master 30/40/50 que buscan el máximo nivel de exigencia en competición oficial.</p>
                            <ul className="license-features">
                                <li>
                                    <span className="material-symbols-outlined">verified</span> Validada para calendario UCI y Nacional
                                </li>
                                <li>
                                    <span className="material-symbols-outlined">medical_services</span> Cobertura médica completa + RC ilimitada
                                </li>
                                <li>
                                    <span className="material-symbols-outlined">emoji_events</span> Acceso a rankings y podios oficiales
                                </li>
                                <li>
                                    <span className="material-symbols-outlined">sell</span> Soci Vraivelo: -10€ Dto.
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Licencia No Competitiva UCI */}
                    <div className="license-card competitive editorial-shadow">
                        <div>
                            <div className="license-card-header">
                                <span className="license-tag-compet">Ideal cicloturismo</span>
                                <span className="license-price">142€<span className="license-price-period">/ año</span></span>
                            </div>
                            <h3>Licencia no Competitiva UCI</h3>
                            <p className="license-desc">Libertad total para tus entrenamientos y marchas fuera de Cataluña.</p>
                            <ul className="license-features">
                                <li>
                                    <span className="material-symbols-outlined">public</span> Ámbito: Internacional / UCI
                                </li>
                                <li>
                                    <span className="material-symbols-outlined">security</span> Seguro: Accidentes + RC
                                </li>
                                <li>
                                    <span className="material-symbols-outlined">sell</span> Soci Vraivelo: -10€ Dto.
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Licencia Cicloturista FCC */}
                    <div className="license-card competitive editorial-shadow">
                        <div>
                            <div className="license-card-header">
                                <span className="license-tag-compet">Ideal marchas</span>
                                <span className="license-price">123€<span className="license-price-period">/ año</span></span>
                            </div>
                            <h3>Cicloturista FCC</h3>
                            <p className="license-desc">Perfecta para disfrutar de las marchas catalanas y salidas grupales sin el estrés de la competición.</p>
                            <ul className="license-features">
                                <li>
                                    <span className="material-symbols-outlined">map</span> Ámbito: Cataluña
                                </li>
                                <li>
                                    <span className="material-symbols-outlined">security</span> Seguro: Accidentes + RC
                                </li>
                                <li>
                                    <span className="material-symbols-outlined">groups</span> Perfecto para salidas grupales
                                </li>
                                <li>
                                    <span className="material-symbols-outlined">sell</span> Soci Vraivelo: -10€ Dto.
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Targeta Bici */}
                    <div className="license-card competitive editorial-shadow">
                        <div>
                            <div className="license-card-header">
                                <span className="license-tag-compet">Para moverte con tranquilidad</span>
                                <span className="license-price">44€/55€<span className="license-price-period">/ año</span></span>
                            </div>
                            <h3>Targeta Bici</h3>
                            <p className="license-desc">Tu escudo en la ciudad. Pensada para el ciclista urbano y recreacional que prioriza la Responsabilidad Civil.</p>
                            <ul className="license-features">
                                <li>
                                    <span className="material-symbols-outlined">security</span> Seguro Responsabilidad Civil
                                </li>
                                <li>
                                    <span className="material-symbols-outlined">support_agent</span> Asistencia: Plus 24h/7d
                                </li>
                                <li style={{ fontWeight: 600 }}>
                                    <span className="material-symbols-outlined">info</span> * No incluye cobertura médica
                                </li>
                                <li>
                                    <span className="material-symbols-outlined">sell</span> Soci Vraivelo: -10€ Dto.
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
                        <h2 className="licenses-info-title">¿Por qué federarse es el mejor "upgrade" para tu bici?</h2>
                        <div className="licenses-benefits-list">
                            <div className="licenses-benefit-item">
                                <div className="benefit-number">01</div>
                                <div className="benefit-content">
                                    <h4>Seguro de Accidentes</h4>
                                    <p>Asistencia médica ilimitada en centros concertados. Olvídate de copagos o límites en caso de caída entrenando.</p>
                                </div>
                            </div>
                            <div className="licenses-benefit-item">
                                <div className="benefit-number">02</div>
                                <div className="benefit-content">
                                    <h4>Defensa Jurídica</h4>
                                    <p>Acceso a servicios legales especializados en accidentes de tráfico para proteger tus derechos como ciclista.</p>
                                </div>
                            </div>
                            <div className="licenses-benefit-item">
                                <div className="benefit-number">03</div>
                                <div className="benefit-content">
                                    <h4>Apoyo al Ciclismo Base</h4>
                                    <p>Tu cuota ayuda a mantener las escuelas de ciclismo y el mantenimiento de rutas en toda Cataluña.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="licenses-cta-section">
                <div className="licenses-cta-container">
                    <h2>¿Listo para dar el paso?</h2>
                    <p>Nuestro equipo en el taller te ayudará con todo el papeleo. Puedes tramitarla online ahora mismo o pasar por Vraivelo para asesorarte.</p>
                    <div className="licenses-cta-buttons">
                        <button className="licenses-btn-secondary">Contactar con la Tienda</button>
                    </div>
                </div>
                <div className="licenses-cta-divider"></div>
                <div className="licenses-cta-circle"></div>
            </section>
        </div>
    );
};

export default Licenses;
