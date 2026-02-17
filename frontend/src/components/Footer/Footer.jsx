import { Instagram, MapPin, Phone, Mail, Bike, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Footer.css';

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-grid">
                    {/* Brand */}
                    <div className="footer-brand-col">
                        <div className="brand-logo">
                            <span>vraivēlo</span>
                        </div>
                        <p className="brand-desc">
                            {t('footer.brand_desc')}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="footer-col-title">{t('footer.explore')}</h4>
                        <ul className="footer-links-list">
                            <li><Link to="/workshop" className="footer-link">{t('footer.workshop_services')}</Link></li>
                            <li><Link to="/shop" className="footer-link">{t('footer.new_bikes')}</Link></li>
                            <li><Link to="/about" className="footer-link">{t('footer.about_us')}</Link></li>
                            <li><Link to="/contact" className="footer-link">{t('navbar.contact')}</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="footer-col-title">{t('footer.visit_us')}</h4>
                        <ul className="footer-contact-list">
                            <li className="contact-item">
                                <MapPin className="contact-item-icon" size={18} />
                                <span>Carrer Pau vila i dinares 10, <br />17003 Girona</span>
                            </li>
                            <li className="contact-item">
                                <Phone className="contact-item-icon" size={18} />
                                <span>+34 657 317 270</span>
                            </li>
                            <li className="contact-item">
                                <Clock className="contact-item-icon" size={18} />
                                <span>{t('footer.hours_label')}<br /> {t('footer.hours_morning')}<br /> {t('footer.hours_afternoon')}</span>
                            </li>
                            <li className="contact-item">
                                <Mail className="contact-item-icon" size={18} />
                                <span>info@vraivelo.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Socials */}
                    <div>
                        <h4 className="footer-col-title">{t('footer.follow_us')}</h4>
                        <div className="social-icons">
                            <a href="#" className="social-link">
                                <Instagram size={20} />
                            </a>
                            {/* Add more socials if needed */}
                        </div>
                    </div>
                </div>

                <div className="footer-copyright">
                    <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
