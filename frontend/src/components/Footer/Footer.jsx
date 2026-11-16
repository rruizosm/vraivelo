import { Instagram, Youtube, MapPin, Phone, Clock, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Footer.css';

const Footer = () => {
    const { t } = useTranslation();

    const links = [
        { to: '/shop/', label: t('footer.new_bikes') },
        { to: '/workshop', label: t('footer.workshop_services') },
        { to: '/other-products', label: t('footer.other_products') },
        { to: '/vraivelo', label: t('footer.vraivelo') },
        { to: '/contact', label: t('navbar.contact') },
    ];

    return (
        <footer className="ft">
            {/* top row: tagline + contact link, then the official dealer line */}
            <div className="ft-top">
                <p className="ft-tagline">{t('footer.tagline')}</p>
                <Link to="/contact" className="ft-cta">
                    {t('footer.contact_cta')}
                    <ArrowUpRight size={22} aria-hidden="true" />
                </Link>
            </div>

            <div className="ft-grid">
                <div className="ft-col">
                    <h2 className="ft-title">{t('footer.official')}</h2>
                    <p className="ft-brands">
                        <span>Giant</span>
                        <span className="ft-dot" aria-hidden="true" />
                        <span>Berria</span>
                    </p>
                    <p className="ft-desc">{t('footer.brand_desc')}</p>
                </div>

                <nav className="ft-col" aria-label={t('footer.explore')}>
                    <h2 className="ft-title">{t('footer.explore')}</h2>
                    <ul className="ft-list">
                        {links.map((l) => (
                            <li key={l.to}><Link to={l.to} className="ft-link">{l.label}</Link></li>
                        ))}
                    </ul>
                </nav>

                <div className="ft-col">
                    <h2 className="ft-title">{t('footer.visit_us')}</h2>
                    <ul className="ft-list ft-contact">
                        <li>
                            <MapPin size={18} aria-hidden="true" />
                            <a className="ft-link" href="https://www.google.com/maps?cid=18416816163622140385" target="_blank" rel="noopener noreferrer">
                                Carrer Pau Vila i Dinarès 10<br />17003 Girona
                            </a>
                        </li>
                        <li>
                            <Phone size={18} aria-hidden="true" />
                            <a className="ft-link" href="tel:+34657317270">+34 657 317 270</a>
                        </li>
                        <li>
                            <Clock size={18} aria-hidden="true" />
                            <span>{t('footer.hours_label')}<br />{t('footer.hours_morning')} · {t('footer.hours_afternoon')}</span>
                        </li>
                    </ul>
                </div>

                <div className="ft-col">
                    <h2 className="ft-title">{t('footer.follow_us')}</h2>
                    <ul className="ft-list">
                        <li>
                            <a href="https://www.instagram.com/vraivelo/" target="_blank" rel="noopener noreferrer" className="ft-social">
                                <Instagram size={20} aria-hidden="true" /> Instagram
                            </a>
                        </li>
                        <li>
                            <a href="https://www.youtube.com/@VRAIVELO" target="_blank" rel="noopener noreferrer" className="ft-social">
                                <Youtube size={20} aria-hidden="true" /> YouTube
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* giant wordmark across the full width */}
            <p className="ft-wordmark" aria-hidden="true">vraivēlo</p>

            <div className="ft-bottom">
                <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
                <p>Girona · Costa Brava</p>
            </div>
        </footer>
    );
};

export default Footer;
