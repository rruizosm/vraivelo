import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './VraiveloBerria.css';

const VraiveloBerria = () => {

    // Smooth scroll for anchor links
    const handleScroll = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="berria-page">
            <div className="relative flex w-full flex-col">
                <main className="berria-main">
                    <section className="berria-hero-section">
                        <div className="berria-hero-bg-wrapper">
                            <img
                                alt="Girona Experience Hero"
                                className="berria-hero-img"
                                src="/vraivelo_berria/Girona/DSC00196.jpeg"
                            />
                            <div className="berria-hero-overlay"></div>
                        </div>
                        <div className="berria-hero-content">
                            <Link to="/vraivelo" className="berria-back-link">
                                <ArrowLeft /> Back to stories
                            </Link>
                            <span className="berria-badge">Girona Experience • Oct 2024</span>
                            <h1 className="berria-hero-title">
                                Vraivelo x Berria
                            </h1>
                            <p className="berria-hero-desc">
                                A retrospective look at our exclusive collaboration in the heart of Catalonia, where professional workshop expertise met high-performance bike engineering.
                            </p>
                        </div>
                    </section>

                    <div id="story" className="berria-story-container">
                        <article className="berria-article">
                            <div className="berria-article-header">
                                <h2 className="berria-subheading">The Collaboration</h2>
                                <h3 className="berria-heading">
                                    Berria Demo Tour en Vraivēlo

                                </h3>
                                <div className="berria-divider"></div>
                            </div>
                            <div className="berria-prose">
                                <p>
                                    Hay días que resumen muy bien lo que somos, el Berria Demo Tour en Vraivēlo fue uno de ellos.
                                    <br /><br />Cuando desde Berria nos propusieron formar parte de su Demo Tour, lo tuvimos claro desde el principio: queríamos que fuera una jornada abierta, cercana y fiel a nuestra manera de entender el ciclismo. No solo venir a probar bicicletas, sino crear una experiencia completa alrededor de ellas.
                                    <br /><br />Vraivēlo se convirtió ese día en el punto de partida y de regreso. El lugar donde se ajustaban bicis, se resolvían dudas, se compartían cafés y se respiraba esa mezcla de nervios y curiosidad previa a salir a rodar. Desde primera hora, el taller se llenó de ciclistas con ganas de probar, aprender y disfrutar, muchos de ellos habituales de la casa y otros que nos descubrían por primera vez. Las rutas estaban pensadas para sacar lo mejor de cada bicicleta. Grupos pequeños, salidas escalonadas y recorridos variados por los alrededores de Girona, combinando carreteras tranquilas y tramos donde realmente puedes entender cómo responde una bici cuando pedaleas de verdad. No había prisas ni presión, solo kilómetros para sentir sensaciones reales.
                                </p>
                                <div className="berria-stats-grid">
                                    <div className="berria-stat-card">
                                        <span className="material-symbols-outlined berria-stat-icon">directions_bike</span>
                                        <span className="berria-stat-value">4</span>
                                        <span className="berria-stat-label">Models Tested</span>
                                    </div>
                                    <div className="berria-stat-card">
                                        <span className="material-symbols-outlined berria-stat-icon">explore</span>
                                        <span className="berria-stat-value">13</span>
                                        <span className="berria-stat-label">Assistants</span>
                                    </div>
                                    <div className="berria-stat-card">
                                        <span className="material-symbols-outlined berria-stat-icon">settings_suggest</span>
                                        <span className="berria-stat-value">After Ride</span>
                                        <span className="berria-stat-label">Good coffe & company</span>
                                    </div>
                                </div>
                                <p>
                                    Durante toda la jornada, desde Vraivēlo junto con el equipo de Berria, nos encargamos de que todo fluyera: ajustes, cambios de talla, recomendaciones y acompañamiento constante. Porque para nosotros, una demo no es solo subirte a una bicicleta nueva, es entender si encaja contigo, con tu forma de rodar y con lo que buscas cuando sales a entrenar o a disfrutar.
                                    <br /><br />
                                    El Demo Tour con Berria encajó de forma natural porque compartimos una misma visión: el ciclismo se vive en la carretera, pero se construye en comunidad. Al final del día, cuando las bicicletas volvieron a sus soportes y la tienda recuperó la calma, quedó la sensación de haber vivido algo especial. Un día sencillo, bien hecho, y muy alineado con lo que es Vraivēlo: un espacio donde la bici es la protagonista, pero las personas lo son aún más.
                                    <br /><br />
                                    Muy atentos porque pronto tendremos una nueva edición de Berria Demo Tour.
                                </p>
                            </div>
                        </article>

                        <div className="berria-features-container">
                            <div className="berria-feature-row">
                                <div className="berria-feature-icon-box">
                                    <span className="material-symbols-outlined berria-feature-icon">biotech</span>
                                </div>
                                <div className="berria-feature-content">
                                    <h4>Product Testing</h4>
                                    <p>Exclusive access to Berria's latest carbon technology, rigorously tested on varied terrain.</p>
                                </div>
                            </div>
                            <div className="berria-feature-row">
                                <div className="berria-feature-icon-box">
                                    <span className="material-symbols-outlined berria-feature-icon">map</span>
                                </div>
                                <div className="berria-feature-content">
                                    <h4>Girona's Scenic Routes</h4>
                                    <p>Daily organized rides through medieval villages and coastal cliffs, guided by Vraivelo experts.</p>
                                </div>
                            </div>
                            <div className="berria-feature-row">
                                <div className="berria-feature-icon-box">
                                    <span className="material-symbols-outlined berria-feature-icon">build_circle</span>
                                </div>
                                <div className="berria-feature-content">
                                    <h4>Workshop Expertise</h4>
                                    <p>On-site mechanical support and personalized setup optimization by the Vraivelo crew.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <section id="gallery" className="berria-gallery-section">
                        <div className="berria-gallery-container">
                            <div className="berria-gallery-header">
                                <h2 className="berria-gallery-title">Visual Journal</h2>
                                <p className="berria-gallery-subtitle">Capturing the Berria performance in the Girona landscape</p>
                            </div>
                            <div className="berria-gallery-grid">
                                <div className="berria-gallery-item">
                                    <div className="berria-img-card aspect-4-5">
                                        <img alt="Berria bike detail" src="/vraivelo_berria/Girona/DSC00322.jpeg" />
                                    </div>
                                    <p className="berria-img-caption">Berria Belador Detail</p>
                                </div>
                                <div className="berria-gallery-item md-offset">
                                    <div className="berria-img-card aspect-4-5">
                                        <img alt="Cyclist in Girona" src="/vraivelo_berria/Girona/DSC00346.jpeg" />
                                    </div>
                                    <p className="berria-img-caption">Els Angels Descent</p>
                                </div>
                                <div className="berria-gallery-item md-span-2">
                                    <div className="berria-img-card aspect-video">
                                        <img alt="Girona landscape" src="/vraivelo_berria/Girona/DSC00343.jpeg" />
                                    </div>
                                    <p className="berria-img-caption">Morning in Girona</p>
                                </div>
                                <div className="berria-gallery-item">
                                    <div className="berria-img-card aspect-square">
                                        <img alt="Group ride" src="/vraivelo_berria/Girona/DSC00369.jpeg" />
                                    </div>
                                    <p className="berria-img-caption">The Girona Pelotón</p>
                                </div>
                                <div className="berria-gallery-item">
                                    <div className="berria-img-card aspect-square">
                                        <img alt="Social moment" src="/vraivelo_berria/Girona/DSC00245.jpeg" />
                                    </div>
                                    <p className="berria-img-caption">Post-Ride Discussion</p>
                                </div>
                                <div className="berria-gallery-item md-span-2">
                                    <div className="berria-img-card fixed-h-600">
                                        <img alt="Vraivelo support" src="/vraivelo_berria/Girona/DSC00329.jpeg" />
                                    </div>
                                    <p className="berria-img-caption">Scenic Testing Routes</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                <footer className="berria-footer">
                    <div className="berria-footer-content">
                        <div className="berria-brand-row">
                            <div className="berria-brand-item">
                                <span className="material-symbols-outlined berria-brand-icon">home_repair_service</span>
                                <span className="berria-brand-text">VRAIVELO</span>
                            </div>
                            <div className="berria-vl"></div>
                            <div className="berria-brand-item">
                                <span className="material-symbols-outlined berria-brand-icon">bolt</span>
                                <span className="berria-brand-text">BERRIA</span>
                            </div>
                        </div>
                        <div className="berria-footer-text-group">
                            <p className="berria-footer-quote">
                                "Thank you to everyone who joined us for the Vraivelo x Berria Girona Experience. We are proud to have shared these roads and these machines with you."
                            </p>
                            <div className="berria-social-links">
                                <a className="berria-social-link" href="#"><span className="material-symbols-outlined berria-social-icon">public</span></a>
                                <a className="berria-social-link" href="#"><span className="material-symbols-outlined berria-social-icon">camera</span></a>
                                <a className="berria-social-link" href="#"><span className="material-symbols-outlined berria-social-icon">mail</span></a>
                            </div>
                            <p className="berria-copyright">
                                © 2024 Vraivelo x Berria. All rights reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default VraiveloBerria;
