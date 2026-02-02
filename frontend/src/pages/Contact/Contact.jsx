import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Clock, Send } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Contact.css';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const initialSubject = location.state?.subject || "";
    const initialMessage = location.state?.message || "";
    const initialService = location.state?.service || "";

    const [subject, setSubject] = useState(initialSubject);
    const [workshopService, setWorkshopService] = useState(initialService);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const workshopCategories = t('workshop.categories', { returnObjects: true });

    const getAllServices = () => {
        if (!Array.isArray(workshopCategories)) return [];
        return workshopCategories.flatMap(cat => cat.services || []);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const firstName = formData.get('firstName');
        const lastName = formData.get('lastName');
        const msgSubject = formData.get('subject');
        const message = formData.get('message');

        // Validation
        if (!firstName || !lastName || !msgSubject || !message) {
            alert(t('contact.form.validation_error') || "Please fill in all required fields.");
            return;
        }

        // EmailJS parameters
        const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_nkbfvfn";
        const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (!templateID || !publicKey) {
            alert("EmailJS configuration missing (Template ID or Public Key). Please check .env file.");
            console.error("Missing EmailJS keys in .env");
            return;
        }

        setIsSubmitting(true);

        emailjs.sendForm(serviceID, templateID, e.target, publicKey)
            .then((result) => {
                setIsSubmitting(false);
                setIsSuccess(true);
                e.target.reset();
                setSubject("");
                setWorkshopService("");

                // Redirect after 2 seconds to show success message
                /* setTimeout(() => {
                    navigate('/');
                }, 2000); */
            }, (error) => {
                setIsSubmitting(false);
                alert("Failed to send message. Please try again later.");
                console.error("EmailJS Error:", error.text);
            });
    };

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
                        {t('contact.badge')}
                    </span>
                    <h1 className="contact-title">
                        {t('contact.title')} <span className="text-[var(--primary)]">{t('contact.title_highlight')}</span>
                    </h1>
                    <p className="contact-description">
                        {t('contact.description')}
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
                            title={t('contact.info.visit')}
                            lines={["Carrer Pau vila i dinares 10,", "17003 Girona"]}
                        />
                        <ContactCard
                            icon={<Phone size={24} strokeWidth={1.5} />}
                            title={t('contact.info.call')}
                            lines={["+34 657 317 270"]}
                        />
                        <ContactCard
                            icon={<Mail size={24} strokeWidth={1.5} />}
                            title={t('contact.info.email')}
                            lines={["info@vraivelo.com"]}
                        />
                        <ContactCard
                            icon={<Clock size={24} strokeWidth={1.5} />}
                            title={t('contact.info.hours')}
                            lines={t('contact.info.hours_text', { returnObjects: true })}
                        />
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="contact-form-col"
                    >
                        <h3 className="contact-form-title">{t('contact.form.title')}</h3>
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-group-row">
                                <div className="form-group">
                                    <label className="form-label">{t('contact.form.first_name')}</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        className="form-input"
                                        placeholder={t('contact.form.placeholders.first_name')}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">{t('contact.form.last_name')}</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        className="form-input"
                                        placeholder={t('contact.form.placeholders.last_name')}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">{t('contact.form.email')}</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-input"
                                    value="info@vraivelo.com"
                                    readOnly
                                    style={{ opacity: 0.7, cursor: 'not-allowed' }}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">{t('contact.form.subject')}</label>
                                <select
                                    name="subject"
                                    className="form-input"
                                    style={{ appearance: 'none', cursor: 'pointer' }}
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    required
                                >
                                    <option value="">{t('contact.form.subjects.default')}</option>
                                    <option value="workshop">{t('contact.form.subjects.workshop')}</option>
                                    <option value="formation">{t('contact.form.subjects.formation')}</option>
                                    <option value="bikes">{t('contact.form.subjects.bikes')}</option>
                                    <option value="parts">{t('contact.form.subjects.parts')}</option>
                                    <option value="other">{t('contact.form.subjects.other')}</option>
                                </select>
                            </div>

                            {subject === 'workshop' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="form-group"
                                >
                                    <label className="form-label">{t('contact.form.service')}</label>
                                    <select
                                        name="service"
                                        className="form-input"
                                        style={{ appearance: 'none', cursor: 'pointer' }}
                                        value={workshopService}
                                        onChange={(e) => setWorkshopService(e.target.value)}
                                    >
                                        <option value="">{t('contact.form.services.default')}</option>
                                        {getAllServices().map((service, index) => (
                                            <option key={index} value={service.title}>
                                                {service.title} - {service.price}
                                            </option>
                                        ))}
                                        <option value="custom">{t('contact.form.services.custom')}</option>
                                    </select>
                                </motion.div>
                            )}

                            <div className="form-group">
                                <label className="form-label">{t('contact.form.message')}</label>
                                <textarea
                                    name="message"
                                    rows="4"
                                    className="form-textarea"
                                    placeholder={t('contact.form.placeholders.message')}
                                    defaultValue={initialMessage}
                                    required
                                />
                            </div>

                            <motion.button
                                type="submit"
                                disabled={isSubmitting || isSuccess}
                                whileHover={{ scale: (isSubmitting || isSuccess) ? 1 : 1.01 }}
                                whileTap={{ scale: (isSubmitting || isSuccess) ? 1 : 0.99 }}
                                className="btn-submit"
                                style={{
                                    backgroundColor: isSuccess ? '#22c55e' : undefined,
                                    cursor: (isSubmitting || isSuccess) ? 'default' : 'pointer'
                                }}
                            >
                                {isSuccess ? (
                                    <>Message Successfully Sent</>
                                ) : isSubmitting ? (
                                    <>Sending...</>
                                ) : (
                                    <>{t('contact.form.submit')} <Send size={18} /></>
                                )}
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
