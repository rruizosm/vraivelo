import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './StravaTeam.css';

const StravaTeam = () => {
    const { t } = useTranslation();

    return (
        <div className="st-page">
            <div className="st-wrapper">

                {/* ===== Hero ===== */}
                <header className="st-hero">
                    <div className="st-hero-bg">
                        <img
                            alt="Group of cyclists riding on a scenic road with mountains in the background"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8_fX-hDK6iOMjniUbX64sJjZZmsMEKEX3d_6f2K4MTQMaipwYBU9eYcdOu4mHrB4uScOLtd95Hv2frZyz1MuRI0HlwWF2VV6xRBAMPMaAhqgd7WyVLmVeFmZt4BNqdHhjYkTZxzmd_Bq94mgUVl6hwq_hORw1ywLqx22717tJe_K1XddTTBKUnH1YsjuhOu6tzgjGN7mXKZs2TUmzGG36mjmnLVHv3hVJj-w2Mov88P3qunYFCdqgCnAURJyCdp-05AXKVzz9EIkg"
                        />
                        <div className="st-hero-overlay-dark"></div>
                        <div className="st-hero-overlay-gradient"></div>
                    </div>
                    <div className="st-hero-content">
                        <div className="st-hero-inner">
                            <div className="st-community-badge">
                                <span className="material-symbols-outlined">groups</span>
                                <span>{t('strava.badge')}</span>
                            </div>
                            <h1 className="st-hero-title">
                                {t('strava.hero_title_1')} <br />
                                <span className="st-accent">Vraivelo</span> <br />
                                {t('strava.hero_title_2')}
                            </h1>
                            <p className="st-hero-desc">
                                {t('strava.hero_desc')}
                            </p>
                            <div className="st-hero-buttons">
                                <a href="https://www.strava.com/clubs/1327818" target="_blank" rel="noopener noreferrer" className="st-btn-primary">
                                    <span>{t('strava.join_strava')}</span>
                                    <span className="material-symbols-outlined">arrow_forward</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </header>

                {/* ===== Stats Bar ===== */}
                <div className="st-stats-bar-wrapper">
                    <div className="st-stats-bar">
                        <div className="st-stat-item">
                            <span className="st-stat-value">+300</span>
                            <span className="st-stat-label">{t('strava.stats.members')}</span>
                        </div>
                        <div className="st-stat-item">
                            <span className="st-stat-value">+100k</span>
                            <span className="st-stat-label">{t('strava.stats.weekly_km')}</span>
                        </div>
                        <div className="st-stat-item">
                            <span className="st-stat-value">+50</span>
                            <span className="st-stat-label">{t('strava.stats.routes')}</span>
                        </div>
                    </div>
                </div>

                {/* ===== Story Description ===== */}
                <section className="st-story-section">
                    <div className="st-story-container">
                        <div className="st-story-header">
                            <h2 className="st-story-subheading">{t('strava.story.subheading')}</h2>
                            <h3 className="st-story-heading">{t('strava.story.heading')}</h3>
                            <div className="st-story-divider"></div>
                        </div>
                        <div className="st-story-prose">
                            <p>{t('strava.story.p1')}</p>
                            <p>{t('strava.story.p2')}</p>
                            <p>{t('strava.story.p3')}</p>
                            <p>{t('strava.story.p4')}</p>
                            <p>{t('strava.story.p5')}</p>
                        </div>
                    </div>
                </section>

                {/* ===== Club Section ===== */}
                <section className="st-club-section">
                    <div className="st-club-grid">
                        {/* Left column */}
                        <div className="st-club-left">
                            <div className="st-club-intro">
                                <h2 className="st-club-title">
                                    {t('strava.club.title_prefix')} <br /><span className="st-accent">{t('strava.club.title_highlight')}</span>
                                </h2>
                                <p className="st-club-desc">
                                    {t('strava.club.desc')}
                                </p>
                            </div>
                            <div className="st-features-list">
                                <div className="st-feature-item">
                                    <div className="st-feature-icon-box">
                                        <span className="material-symbols-outlined">monitoring</span>
                                    </div>
                                    <div>
                                        <h3 className="st-feature-title">{t('strava.club.track_title')}</h3>
                                        <p className="st-feature-desc">{t('strava.club.track_desc')}</p>
                                    </div>
                                </div>
                                <div className="st-feature-item">
                                    <div className="st-feature-icon-box">
                                        <span className="material-symbols-outlined">emoji_events</span>
                                    </div>
                                    <div>
                                        <h3 className="st-feature-title">{t('strava.club.compete_title')}</h3>
                                        <p className="st-feature-desc">{t('strava.club.compete_desc')}</p>
                                    </div>
                                </div>
                                <div className="st-feature-item">
                                    <div className="st-feature-icon-box">
                                        <span className="material-symbols-outlined">notifications_active</span>
                                    </div>
                                    <div>
                                        <h3 className="st-feature-title">{t('strava.club.updated_title')}</h3>
                                        <p className="st-feature-desc">{t('strava.club.updated_desc')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right column – Strava card */}
                        <div className="st-club-right">
                            <div className="st-club-right-blur-1"></div>
                            <div className="st-club-right-blur-2"></div>
                            <div className="st-strava-card">
                                <div className="st-strava-card-bar"></div>
                                <div className="st-card-header">
                                    <div className="st-card-profile">
                                        <div className="st-card-avatar">
                                            <span className="material-symbols-outlined">pedal_bike</span>
                                        </div>
                                        <div>
                                            <h4 className="st-card-name">{t('strava.card.club_name')}</h4>
                                            <span className="st-card-verified">{t('strava.card.verified')}</span>
                                        </div>
                                    </div>
                                    <button className="st-card-follow-btn">{t('strava.card.follow')}</button>
                                </div>

                                <div className="st-leaderboard">
                                    <h5 className="st-leaderboard-title">{t('strava.card.leaderboard')}</h5>
                                    <div className="st-leaderboard-list">
                                        <div className="st-leaderboard-row">
                                            <div className="st-leaderboard-user">
                                                <span className="st-leaderboard-rank rank-1">1</span>
                                                <img className="st-leaderboard-avatar" alt="David Gijon" src="/stories/strava_user/david.jpg" />
                                                <span className="st-leaderboard-name">David Gijon VRAIVELO🛠️</span>
                                            </div>
                                            <span className="st-leaderboard-km">342 km</span>
                                        </div>
                                        <div className="st-leaderboard-row">
                                            <div className="st-leaderboard-user">
                                                <span className="st-leaderboard-rank rank-other">2</span>
                                                <img className="st-leaderboard-avatar" alt="Juan Diego Cárdenas Porras" src="/stories/strava_user/juan.jpg" />
                                                <span className="st-leaderboard-name">Juan Diego Cárdenas Porras</span>
                                            </div>
                                            <span className="st-leaderboard-km">298 km</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="st-card-map">
                                    <img alt="Recent activity map" src="/stories/mapa.png" />
                                    <div className="st-card-map-overlay">
                                        <div>
                                            <p className="st-card-map-label">{t('strava.card.recent_activity')}</p>
                                            <p className="st-card-map-title">{t('strava.card.sunday_spin')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===== Gallery Section ===== */}
                <section id="gallery" className="st-gallery-section">
                    <div className="st-gallery-container">
                        <div className="st-gallery-header">
                            <div className="st-gallery-header-left">
                                <div className="st-gallery-watermark">{t('strava.gallery.watermark')}</div>
                                <h2 className="st-gallery-title">
                                    {t('strava.gallery.title_prefix')} <br /><span className="st-accent">{t('strava.gallery.title_highlight')}</span>
                                </h2>
                                <p className="st-gallery-subtitle">
                                    {t('strava.gallery.subtitle')}
                                </p>
                            </div>
                        </div>

                        <div className="st-gallery-grid">
                            {/* Row 1: large left + tall right */}
                            <div className="st-gallery-item st-gallery-item-1">
                                <img alt="Mid-Ride Breaks" src="/stories/social_ride_1.jpg" />
                                <div className="st-gallery-overlay"></div>
                                <div className="st-gallery-caption">
                                    <span className="st-gallery-tag">{t('strava.gallery.community')}</span>
                                </div>
                            </div>

                            <div className="st-gallery-item st-gallery-item-2">
                                <img alt="Cycling group" src="/stories/social_ride_2.jpg" />
                                <div className="st-gallery-overlay"></div>
                            </div>

                            {/* Row 2: small left + wide right */}
                            <div className="st-gallery-item st-gallery-item-3">
                                <img alt="Scenic road" src="/stories/social_ride_3.jpg" />
                                <div className="st-gallery-overlay"></div>
                            </div>

                            <div className="st-gallery-item st-gallery-item-4">
                                <img alt="Group ride scenery" src="/stories/social_ride_4.jpg" />
                                <div className="st-gallery-overlay"></div>
                            </div>

                            {/* Row 3: full-width bottom */}
                            <div className="st-gallery-item st-gallery-item-5">
                                <img alt="Post-Ride Cheers" src="/stories/social_ride_5.jpg" />
                                <div className="st-gallery-overlay"></div>
                                <div className="st-gallery-caption">
                                    <h3>{t('strava.gallery.post_ride_title')}</h3>
                                    <p>{t('strava.gallery.post_ride_desc')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===== Footer ===== */}
                <footer className="st-footer">
                    <div className="st-footer-decor">
                        <div className="st-footer-circle-1"></div>
                        <div className="st-footer-circle-2"></div>
                    </div>
                    <div className="st-footer-content">
                        <div className="st-footer-icon-box">
                            <span className="material-symbols-outlined">local_activity</span>
                        </div>
                        <h2 className="st-footer-title">
                            {t('strava.cta.title_prefix')} <span className="st-gradient-text">{t('strava.cta.title_highlight')}</span>
                        </h2>
                        <p className="st-footer-desc">
                            {t('strava.cta.desc')}
                        </p>
                        <div className="st-footer-buttons">
                            <button className="st-footer-btn-primary">{t('strava.cta.join_club')}</button>
                            <button className="st-footer-btn-outline">{t('strava.cta.follow_ig')}</button>
                        </div>
                        <div className="st-footer-bottom">
                            <div className="st-footer-social">
                                <a href="#">
                                    <span className="sr-only">Facebook</span>
                                    <svg fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                                </a>
                                <a href="#">
                                    <span className="sr-only">Instagram</span>
                                    <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                                </a>
                            </div>
                            <p className="st-footer-copyright">
                                {t('strava.cta.copyright')}
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default StravaTeam;
