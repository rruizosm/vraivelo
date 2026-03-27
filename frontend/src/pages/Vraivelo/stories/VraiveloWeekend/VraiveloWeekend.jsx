import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Play, Volume2, Settings, Maximize2 } from 'lucide-react'; // Using Lucide icons instead of Material Symbols
import './VraiveloWeekend.css';


const VraiveloWeekend = () => {
    return (
        <div className="weekend-story-page">
            {/* Media Player Section - Full Viewport */}
            {/* Media Player Section - Full Viewport */}
            <div className="weekend-media-player">
                <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/GmX04cXlMf4?autoplay=0&controls=1&rel=0"
                    title="Vraivelo Weekend Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                ></iframe>
            </div>

            <div className="weekend-container">
                {/* Back Link Overlay
                <div className="weekend-header-overlay">
                    <Link to="/vraivelo" className="weekend-back-link-light">
                        <ArrowLeft size={20} /> Back to stories
                    </Link>
                </div> */}
                {/* Headline Section */}
                <div className="weekend-headline-section">
                    <h1 className="weekend-headline">
                        Vraivēlo Weekend
                    </h1>
                    <h3 className='weekend-headline-subtitle'>Un fin de semana rumbo a Francia</h3>
                </div>

                {/* Body Text */}
                <div className="weekend-body-section">
                    <p className="weekend-body-text">
                        El año pasado organizamos una salida diferente desde Vraivēlo. No se trataba de una ruta más, sino de una pequeña aventura en dos días, pensada para disfrutar del ciclismo con calma, seguridad y buen ambiente.
                        <br /><br />La salida fue programada y guiada por David, con un grupo reducido de 8 ciclistas. Limitamos las plazas para poder controlar el ritmo, minimizar riesgos y asegurarnos de que todos viviéramos la experiencia de la mejor manera posible. El recorrido estaba planificado desde el inicio: horarios, etapas y paradas, con destino final en Francia.
                        <br /><br />Salimos juntos desde la tienda y, desde el primer kilómetro, se respiraba algo especial. Carreteras secundarias, paisajes que iban cambiando poco a poco y la sensación de estar compartiendo algo más que kilómetros. La ruta fue exigente, tanto física como mentalmente, pero siempre rodando en grupo y apoyándonos unos a otros. Durante todo el fin de semana contamos con coche de asistencia, que nos dio soporte constante. Comida, bebida, apoyo logístico y ropa de recambio cuando el tiempo se complicó —porque sí, la lluvia también quiso formar parte de la aventura—. Gracias a esto, los ciclistas solo tuvimos que preocuparnos de pedalear y disfrutar.
                        <br /><br />Por la noche nos alojamos en un hotel, donde tocó recuperar fuerzas, compartir anécdotas del día. Al día siguiente emprendimos el camino de vuelta, con el cansancio acumulado, pero con la satisfacción de haber vivido algo especial. No fue una salida fácil, ni pretendía serlo. Fue una experiencia real, bien organizada y compartida entre personas con la misma pasión por el ciclismo.
                    </p>
                </div>
                <div className="weekend-headline-section">
                    <h3 className="weekend-headline-subtitle">
                        Lo que se viene
                    </h3>
                </div>
                <div className='weekend-body-section'>
                    <p className='weekend-body-text'>
                        Después de vivir algo así, era imposible no pensar en repetir. Este año estamos preparando <b style={{ color: '#000000' }}>dos Vraivēlo Weekends</b>, nuevas aventuras sobre la bicicleta, con el mismo cuidado por los detalles, el mismo espíritu de grupo y las mismas ganas de disfrutar del camino.
                        <br /><br />Si no quieres perdértelo, mantente atento a nuestras redes en <b style={{ color: '#000000' }}>@vraivelo</b> en Instagram y a nuestro club de <b style={{ color: '#000000' }}>Strava</b>, donde iremos compartiendo todas las novedades.
                    </p>
                </div>

                {/* Gallery Section Header */}
                <div className="weekend-gallery-header">
                    <h2>Event Gallery</h2>
                    <div className="weekend-separator"></div>
                    <a href="#" className="weekend-view-all">View All Photos</a>
                </div>

                {/* Image Grid */}
                <div className="weekend-gallery-grid">
                    <div className="weekend-gallery-item square">
                        <img src="/vraivelo_weekend/vv_1.jpeg" alt="" />
                    </div>
                    <div className="weekend-gallery-item square">
                        <img src="/vraivelo_weekend/vv_2.jpeg" alt="" />
                    </div>
                    <div className="weekend-gallery-item square">
                        <img src="/vraivelo_weekend/vv_3.jpeg" alt="" />
                    </div>
                    <div className="weekend-gallery-item wide">
                        <img src="/vraivelo_weekend/vv_4.jpeg" alt="" />
                    </div>
                    <div className="weekend-gallery-item video-col">
                        <img src="/vraivelo_weekend/vv_5.jpeg" alt="" />
                    </div>
                    <div className="weekend-gallery-item video-col">
                        <img src="/vraivelo_weekend/vv_6.jpeg" alt="" />
                    </div>
                    <div className="weekend-gallery-item video-col">
                        <img src="/vraivelo_weekend/vv_7.jpeg" alt="" />
                    </div>
                    <div className="weekend-gallery-item video-col">
                        <img src="/vraivelo_weekend/vv_8.jpeg" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VraiveloWeekend;
