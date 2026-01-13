import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Clock, Send } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    return (
        <div className="contact-container">
            <div className="contact-content">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="contact-header"
                >
                    <span className="contact-badge">
                        GET IN TOUCH
                    </span>
                    <h1 className="contact-title">
                        Let's <span className="text-[var(--primary)]">Connect</span>
                    </h1>
                    <p className="text-[var(--text-muted)] max-w-xl mx-auto text-lg">
                        Have a question about a bike? Need to schedule a specific service? We're here to help.
                    </p>
                </motion.div>

                <div className="contact-grid">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="contact-info-col"
                    >
                        <ContactCard
                            icon={<MapPin size={24} strokeWidth={1.5} />}
                            title="Visit Our Shop"
                            lines={["Carrer Pau vila i dinares 10,", "17003 Girona"]}
                        />
                        <ContactCard
                            icon={<Phone size={24} strokeWidth={1.5} />}
                            title="Call Us"
                            lines={["+34 657 317 270"]}
                        />
                        <ContactCard
                            icon={<Mail size={24} strokeWidth={1.5} />}
                            title="Email Us"
                            lines={["info@vraivelo.com"]}
                        />
                        <ContactCard
                            icon={<Clock size={24} strokeWidth={1.5} />}
                            title="Opening Hours"
                            lines={["Monday to Friday:", "9:00 - 13:00", "16:00 - 19:00"]}
                        />
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="contact-form-col"
                    >
                        <h3 className="contact-form-title">Send a Message</h3>
                        <form className="contact-form">
                            <div className="form-group-row">
                                <div className="form-group">
                                    <label className="form-label">First Name</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="John"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Last Name</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Email Address</label>
                                <input
                                    type="email"
                                    className="form-input"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Subject</label>
                                <select
                                    className="form-input"
                                    style={{ appearance: 'none', cursor: 'pointer' }}
                                >
                                    <option value="">Select a topic</option>
                                    <option value="workshop">Workshop Service</option>
                                    <option value="bikes">Bike Inquiry</option>
                                    <option value="parts">Parts & Accessories</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Message</label>
                                <textarea
                                    rows="4"
                                    className="form-textarea"
                                    placeholder="Tell us how we can help..."
                                />
                            </div>

                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                className="btn-submit"
                            >
                                Send Message <Send size={18} />
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

const ContactCard = ({ icon, title, lines }) => (
    <div className="contact-card">
        <div className="contact-card-icon">
            {icon}
        </div>
        <div className="contact-card-content">
            <h4 className="contact-card-title">{title}</h4>
            {lines.map((line, i) => (
                <p key={i} className="contact-card-line">{line}</p>
            ))}
        </div>
    </div>
);

export default Contact;
