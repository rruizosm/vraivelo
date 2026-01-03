import { Instagram, MapPin, Phone, Mail, Bike } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-grid">
                    {/* Brand */}
                    <div className="footer-brand-col">
                        <div className="brand-logo">
                            <Bike className="text-[var(--primary)]" />
                            <span>vraivēlo</span>
                        </div>
                        <p className="brand-desc">
                            Premium cycling workshop and retailer. Official partner of Berria, Liv, Giant, MMR, & Aurum.
                            Elevate your ride.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="footer-col-title">Explore</h4>
                        <ul className="footer-links-list">
                            <li><Link to="/workshop" className="footer-link">Workshop Services</Link></li>
                            <li><Link to="/shop" className="footer-link">New Bikes</Link></li>
                            <li><Link to="/about" className="footer-link">About Us</Link></li>
                            <li><Link to="/contact" className="footer-link">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="footer-col-title">Visit Us</h4>
                        <ul className="footer-contact-list">
                            <li className="contact-item">
                                <MapPin className="contact-item-icon" size={18} />
                                <span>123 Cycling Avenue,<br />Bike City, BC 12345</span>
                            </li>
                            <li className="contact-item">
                                <Phone className="contact-item-icon" size={18} />
                                <span>+34 123 456 789</span>
                            </li>
                            <li className="contact-item">
                                <Mail className="contact-item-icon" size={18} />
                                <span>info@vraivelo.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Socials */}
                    <div>
                        <h4 className="footer-col-title">Follow Us</h4>
                        <div className="social-icons">
                            <a href="#" className="social-link">
                                <Instagram size={20} />
                            </a>
                            {/* Add more socials if needed */}
                        </div>
                    </div>
                </div>

                <div className="footer-copyright">
                    <p>&copy; {new Date().getFullYear()} Vraivelo. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
