import { motion } from 'framer-motion';
import { Wrench, Settings, Zap, Check } from 'lucide-react';
import './Workshop.css';

const services = [
    {
        icon: <Wrench size={28} strokeWidth={1.5} />,
        title: "Basic Tune-Up",
        price: "€45",
        popular: false,
        features: ["Brake Adjustment", "Gear Indexing", "Chain Lubrication", "Safety Check"]
    },
    {
        icon: <Settings size={28} strokeWidth={1.5} />,
        title: "Advanced Overhaul",
        price: "€90",
        popular: true,
        features: ["Deep Clean", "Bottom Bracket Service", "Headset Service", "Wheel Truing", "Cable Replacement"]
    },
    {
        icon: <Zap size={28} strokeWidth={1.5} />,
        title: "Pro Race Prep",
        price: "€150",
        popular: false,
        features: ["Full Strip Down", "Ceramic Bearing Upgrade", "Hydraulic Bleed", "Electronic Shifting Diagnostics", "Weight Optimization"]
    }
];

const Workshop = () => {
    return (
        <div className="workshop-container">
            <div className="workshop-content-container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="workshop-header"
                >
                    <span className="workshop-badge">
                        PROFESSIONAL SERVICES
                    </span>
                    <h1 className="workshop-title">
                        Workshop <span className="text-[var(--primary)]">Services</span>
                    </h1>
                    <p className="workshop-subtitle">
                        Our certified mechanics treat every bike as if it were their own. Precision, care, and speed — every time.
                    </p>
                </motion.div>

                <div className="services-grid">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className={`service-card ${service.popular ? 'popular' : 'standard'}`}
                        >
                            {service.popular && (
                                <div className="popular-badge">
                                    MOST POPULAR
                                </div>
                            )}

                            <div className="service-card-header">
                                <div className={`service-icon-wrapper ${service.popular ? 'popular' : 'standard'}`}>
                                    {service.icon}
                                </div>
                                <div className="text-right">
                                    <div className={`service-price ${service.popular ? 'popular' : ''}`}>
                                        {service.price}
                                    </div>
                                </div>
                            </div>

                            <h3 className="service-title">{service.title}</h3>

                            <ul className="service-features-list">
                                {service.features.map((feat, i) => (
                                    <li key={i} className="service-feature-item">
                                        <Check size={18} className={`service-feature-icon ${service.popular ? 'popular' : ''}`} />
                                        {feat}
                                    </li>
                                ))}
                            </ul>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`btn-book-service ${service.popular ? 'btn-book-popular' : 'btn-book-standard'}`}
                            >
                                Book Now
                            </motion.button>
                        </motion.div>
                    ))}
                </div>

                {/* Additional Info */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="custom-info-section"
                >
                    <div className="custom-info-grid">
                        <div className="custom-info-content">
                            <h3>Need Something Custom?</h3>
                            <p>
                                We offer bespoke services for unique builds, vintage restorations, and competition preparation.
                                Contact us for a personalized quote.
                            </p>
                        </div>
                        <div className="custom-info-actions">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="btn-custom-quote"
                            >
                                Request Custom Quote
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Workshop;
