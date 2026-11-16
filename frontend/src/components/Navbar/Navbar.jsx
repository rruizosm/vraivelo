import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Mail, ArrowRight, ArrowUpRight, CalendarCheck, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import { useCart } from '../../context/CartContext';
import './Navbar.css';

// Below this scroll offset the home navbar stays dark/translucent over the hero photo
const OVERLAY_LIMIT = 24;

const Navbar = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const { toggleCart, cartCount, isCartEnabled } = useCart();

    const [isOpen, setIsOpen] = useState(false);
    const [atTop, setAtTop] = useState(true);
    const [hovered, setHovered] = useState(null);

    // The bar is always visible; scrolling only switches it from dark glass to white
    useEffect(() => {
        const onScroll = () => setAtTop(window.scrollY <= OVERLAY_LIMIT);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Close the mobile menu on every route change (adjusting state during render)
    const [prevPath, setPrevPath] = useState(location.pathname);
    if (prevPath !== location.pathname) {
        setPrevPath(location.pathname);
        setIsOpen(false);
    }

    const isHome = location.pathname === '/';
    const mode = isOpen ? 'is-open' : isHome && atTop ? 'is-overlay' : 'is-solid';

    const navLinks = [
        { name: t('navbar.home'), path: '/' },
        { name: t('navbar.workshop'), path: '/workshop' },
        { name: t('navbar.bikes'), path: '/shop' },
        { name: t('navbar.other_products'), path: '/other-products' },
        { name: t('navbar.vraivelo'), path: '/vraivelo' },
    ];

    // Product pages live under /shop/, but belong to "Other products" when the item isn't a bike
    // (ProductDetail records that in the router state)
    const inOtherProducts = location.pathname.startsWith('/shop/') && location.state?.from === 'other-products';

    const isActive = (path) => {
        if (path === '/') return location.pathname === '/';
        if (inOtherProducts) return path === '/other-products';
        return location.pathname === path || location.pathname.startsWith(`${path}/`);
    };

    return (
        <nav className={`navbar ${mode}`}>
            <div className="container navbar-container">
                {/* Logo */}
                <Link to="/" className="logo-link" aria-label="Vraivēlo">
                    <span className="logo-text">
                        vraiv<span className="logo-e">ē</span>lo
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="nav-desktop">
                    <ul className="nav-links" onMouseLeave={() => setHovered(null)}>
                        {navLinks.map((link) => {
                            const active = isActive(link.path);
                            return (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className={`nav-link ${active ? 'active' : ''}`}
                                        aria-current={active ? 'page' : undefined}
                                        onMouseEnter={() => setHovered(link.path)}
                                        onFocus={() => setHovered(link.path)}
                                    >
                                        <AnimatePresence>
                                            {hovered === link.path && (
                                                <motion.span
                                                    layoutId="navHover"
                                                    className="nav-hover-pill"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                                                />
                                            )}
                                        </AnimatePresence>
                                        <span className="nav-link-text" data-text={link.name}>
                                            <span>{link.name}</span>
                                        </span>
                                        {active && (
                                            <motion.span
                                                layoutId="navActive"
                                                className="nav-active-bar"
                                                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                            />
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    {isCartEnabled && (
                        <button onClick={toggleCart} className="cart-btn-nav" aria-label="Cart">
                            <ShoppingBag size={20} />
                            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                        </button>
                    )}

                    <span className="nav-sep" aria-hidden="true" />
                    <LanguageSwitcher />

                    <Link to="/contact" className="nav-cta">
                        <CalendarCheck size={17} className="nav-cta-icon" />
                        <span>{t('navbar.book_service')}</span>
                        <ArrowRight size={16} className="nav-cta-arrow" />
                    </Link>
                </div>

                {/* Mobile controls */}
                <div className="mobile-toggle-wrapper">
                    {isCartEnabled ? (
                        <button onClick={toggleCart} className="cart-btn-nav" aria-label="Cart">
                            <ShoppingBag size={20} />
                            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                        </button>
                    ) : (
                        <Link to="/contact" className="cart-btn-nav" aria-label={t('navbar.contact')}>
                            <Mail size={20} />
                        </Link>
                    )}
                    <LanguageSwitcher />
                    <button
                        className={`mobile-toggle ${isOpen ? 'open' : ''}`}
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Menu"
                        aria-expanded={isOpen}
                    >
                        <span className="burger" aria-hidden="true">
                            <span /><span /><span />
                        </span>
                    </button>
                </div>
            </div>

            {/* Amber separator line, on the dark and the white navbar */}
            <div className="nav-line" aria-hidden="true" />

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="mobile-menu"
                    >
                        <div className="mobile-menu-content">
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={link.path}
                                    initial={{ opacity: 0, x: -24 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.05 + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <Link
                                        to={link.path}
                                        className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
                                    >
                                        <span className="mobile-nav-index">0{index + 1}</span>
                                        <span className="mobile-nav-name">{link.name}</span>
                                        <ArrowUpRight size={22} className="mobile-nav-arrow" />
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                className="mobile-menu-actions"
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <Link to="/contact" className="mobile-nav-btn">
                                    <CalendarCheck size={18} /> {t('navbar.book_service')}
                                </Link>
                                <a href="tel:+34657317270" className="mobile-nav-call">
                                    <Phone size={18} /> +34 657 317 270
                                </a>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
