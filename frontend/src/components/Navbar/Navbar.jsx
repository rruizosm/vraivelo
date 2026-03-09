import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import { useCart } from '../../context/CartContext';
import './Navbar.css';

const Navbar = () => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const { toggleCart, cartCount, isCartEnabled } = useCart();

    useEffect(() => setIsOpen(false), [location]);

    const navLinks = [
        { name: t('navbar.home'), path: '/' },
        { name: t('navbar.workshop'), path: '/workshop' },
        { name: t('navbar.bikes'), path: '/shop' },
        { name: t('navbar.other_products'), path: '/other-products' },
        { name: t('navbar.vraivelo'), path: '/vraivelo' },
        { name: t('navbar.contact'), path: '/contact' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="navbar scrolled"
        >
            <div className="container navbar-container">
                {/* Logo */}
                <Link to="/" className="logo-link group" >
                    {/* <div className="logo-icon-wrapper">
                        <Bike
                            className="logo-icon"
                            size={36}
                            strokeWidth={1.5}
                        />
                        <div className="logo-glow" />
                    </div> */}
                    <span className="logo-text">
                        vraivēlo
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="nav-desktop">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className="nav-link group"
                        >
                            <span className={`nav-link-text ${location.pathname === link.path ? 'active' : ''} `}>
                                {link.name}
                            </span>
                            {location.pathname === link.path && (
                                <motion.div
                                    layoutId="activeNav"
                                    className="nav-active-dot"
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                            )}
                        </Link>
                    ))}

                    {isCartEnabled ? (
                        <button onClick={toggleCart} className="cart-btn-nav relative">
                            <ShoppingBag size={20} />
                            {cartCount > 0 && (
                                <span className="cart-badge">{cartCount}</span>
                            )}
                        </button>
                    ) : (
                        // <Link to="/contact" className="cart-btn-nav relative">
                        //     <Mail size={20} />
                        // </Link>
                        <></>
                    )}

                    <Link to="/contact" className="nav-btn-link">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="nav-btn"
                        >
                            {t('navbar.book_service')}
                        </motion.button>
                    </Link>

                    <LanguageSwitcher />
                </div>

                {/* Mobile Toggle */}
                <div className="mobile-toggle-wrapper">
                    {isCartEnabled ? (
                        <button onClick={toggleCart} className="cart-btn-nav relative mr-2">
                            <ShoppingBag size={20} />
                            {cartCount > 0 && (
                                <span className="cart-badge">{cartCount}</span>
                            )}
                        </button>
                    ) : (
                        <Link to="/contact" className="cart-btn-nav relative mr-2">
                            <Mail size={20} />
                        </Link>
                    )}
                    <LanguageSwitcher />
                    <button
                        className="mobile-toggle"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mobile-menu"
                    >
                        <div className="mobile-menu-content">
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={link.path}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link
                                        to={link.path}
                                        className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''} `}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.button
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                className="mobile-nav-btn"
                            >
                                {t('navbar.book_service')}
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
