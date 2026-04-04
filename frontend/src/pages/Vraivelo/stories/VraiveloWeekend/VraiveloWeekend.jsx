import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Play, Volume2, Settings, Maximize2 } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';
import './VraiveloWeekend.css';


const VraiveloWeekend = () => {
    const { t } = useTranslation();
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
                        {t('weekend.headline')}
                    </h1>
                    <h3 className='weekend-headline-subtitle'>{t('weekend.subtitle_1')}</h3>
                </div>

                {/* Body Text */}
                <div className="weekend-body-section">
                    <p className="weekend-body-text">
                        {t('weekend.p1')}
                        <br /><br />{t('weekend.p2')}
                        <br /><br />{t('weekend.p3')}
                        <br /><br />{t('weekend.p4')}
                    </p>
                </div>
                <div className="weekend-headline-section">
                    <h3 className="weekend-headline-subtitle">
                        {t('weekend.subtitle_2')}
                    </h3>
                </div>
                <div className='weekend-body-section'>
                    <p className='weekend-body-text'>
                        <Trans i18nKey="weekend.p5">
                            Después de vivir algo así, era imposible no pensar en repetir. Este año estamos preparando <b style={{ color: '#000000' }}>dos Vraivēlo Weekends</b>, nuevas aventuras sobre la bicicleta, con el mismo cuidado por los detalles, el mismo espíritu de grupo y las mismas ganas de disfrutar del camino.
                        </Trans>
                        <br /><br />
                        <Trans i18nKey="weekend.p6">
                            Si no quieres perdértelo, mantente atento a nuestras redes en <b style={{ color: '#000000' }}>@vraivelo</b> en Instagram y a nuestro club de <b style={{ color: '#000000' }}>Strava</b>, donde iremos compartiendo todas las novedades.
                        </Trans>
                    </p>
                </div>

                {/* Gallery Section Header */}
                <div className="weekend-gallery-header">
                    <h2>{t('weekend.gallery.title')}</h2>
                    <div className="weekend-separator"></div>
                    <a href="#" className="weekend-view-all">{t('weekend.gallery.btn')}</a>
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
