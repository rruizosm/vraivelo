import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check, ChevronDown } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEOHead from '../../components/SEOHead/SEOHead';
import '../Workshop/Workshop.css';
import './Contact.css';
import emailjs from '@emailjs/browser';

const ease = [0.22, 1, 0.36, 1];
const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=Carrer+Pau+Vila+i+Dinar%C3%A8s+10%2C+17003+Girona';

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
        const email = formData.get('email');
        const msgSubject = formData.get('subject');
        const formService = formData.get('service');
        const message = formData.get('message');

        // Validation
        if (!firstName || !lastName || !email || !msgSubject || !message) {
            alert(t('contact.form.validation_error', { defaultValue: "Please fill in all required fields." }));
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

        // Map subject to Spanish
        let spanishSubject = '';
        if (msgSubject && msgSubject !== '') {
            spanishSubject = t(`contact.form.subjects.${msgSubject}`, { lng: 'es' });
        } else {
            spanishSubject = t('contact.form.subjects.default', { lng: 'es' });
        }

        // Map service to Spanish
        let spanishService = formService || '';
        if (spanishService === 'custom') {
            spanishService = t('contact.form.services.custom', { lng: 'es' });
        } else if (spanishService) {
            const allServices = getAllServices();
            const serviceIndex = allServices.findIndex(s => s.title === spanishService);
            if (serviceIndex !== -1) {
                const workshopCategoriesEs = t('workshop.categories', { returnObjects: true, lng: 'es' });
                const allServicesEs = Array.isArray(workshopCategoriesEs) ? workshopCategoriesEs.flatMap(cat => cat.services || []) : [];
                if (allServicesEs[serviceIndex]) {
                    spanishService = allServicesEs[serviceIndex].title;
                }
            }
        }

        const currentTime = new Date().toLocaleString('es-ES', {
            dateStyle: 'medium',
            timeStyle: 'medium'
        });

        const templateParams = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            subject: spanishSubject,
            service: spanishService,
            message: message,
            time: currentTime
        };

        emailjs.send(serviceID, templateID, templateParams, publicKey)
            .then(() => {
                setIsSubmitting(false);
                setIsSuccess(true);
                e.target.reset();
                setSubject("");
                setWorkshopService("");
            }, (error) => {
                setIsSubmitting(false);
                alert("Failed to send message. Please try again later.");
                console.error("EmailJS Error:", error.text);
            });
    };

    const hours = t('contact.info.hours_text', { returnObjects: true });
    const hoursLines = Array.isArray(hours) ? hours : [];

    return (
        <div className="ct-page">
            <SEOHead titleKey="seo.contact.title" descriptionKey="seo.contact.description" path="/contact" />

            {/* HERO: big title on the left, short intro on the right */}
            <section className="ct-hero" aria-labelledby="ct-title">
                <motion.div
                    className="ct-hero-inner"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease }}
                >
                    <p className="ct-eyebrow">
                        <span className="ws-eyebrow-bar" aria-hidden="true" />
                        {t('contact.badge')}
                    </p>
                    <h1 id="ct-title" className="ct-title">
                        {t('contact.title')}{' '}
                        <span className="ct-title-accent">{t('contact.title_highlight')}</span>
                    </h1>
                    <p className="ct-desc">{t('contact.description')}</p>
                </motion.div>
            </section>

            {/* BODY: photo + form (contact info sits above the form) */}
            <section className="ct-body">
                <div className="ct-grid">
                    <motion.figure
                        className="ct-photo"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease }}
                    >
                        <img
                            src="/david_vraivelo/local_2.jpeg"
                            alt={t('contact.photo_alt')}
                            width="1200"
                            height="1600"
                            loading="eager"
                            decoding="async"
                        />
                    </motion.figure>

                    <motion.div
                        className="ct-form-col"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease }}
                    >
                        <h2 className="ct-form-title">{t('contact.form.title')}</h2>

                        <form className="ct-form" onSubmit={handleSubmit}>
                            <div className="ct-row">
                                <Field label={t('contact.form.first_name')} htmlFor="ct-first">
                                    <input id="ct-first" type="text" name="firstName" autoComplete="given-name"
                                        className="ct-input" placeholder={t('contact.form.placeholders.first_name')} required />
                                </Field>
                                <Field label={t('contact.form.last_name')} htmlFor="ct-last">
                                    <input id="ct-last" type="text" name="lastName" autoComplete="family-name"
                                        className="ct-input" placeholder={t('contact.form.placeholders.last_name')} required />
                                </Field>
                            </div>

                            <Field label={t('contact.form.email')} htmlFor="ct-email">
                                <input id="ct-email" type="email" name="email" autoComplete="email"
                                    className="ct-input" placeholder={t('contact.form.placeholders.email')} required />
                            </Field>

                            <Field label={t('contact.form.subject')} htmlFor="ct-subject">
                                <div className="ct-select">
                                    <select
                                        id="ct-subject"
                                        name="subject"
                                        className="ct-input"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        required
                                    >
                                        <option value="">{t('contact.form.subjects.default')}</option>
                                        <option value="workshop">{t('contact.form.subjects.workshop')}</option>
                                        <option value="bikes">{t('contact.form.subjects.bikes')}</option>
                                        <option value="parts">{t('contact.form.subjects.parts')}</option>
                                        <option value="member">{t('contact.form.subjects.member')}</option>
                                        <option value="licenses">{t('contact.form.subjects.licenses')}</option>
                                        <option value="other">{t('contact.form.subjects.other')}</option>
                                    </select>
                                    <ChevronDown size={18} aria-hidden="true" />
                                </div>
                            </Field>

                            {subject === 'workshop' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    transition={{ duration: 0.4, ease }}
                                >
                                    <Field label={t('contact.form.service')} htmlFor="ct-service">
                                        <div className="ct-select">
                                            <select
                                                id="ct-service"
                                                name="service"
                                                className="ct-input"
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
                                            <ChevronDown size={18} aria-hidden="true" />
                                        </div>
                                    </Field>
                                </motion.div>
                            )}

                            <Field label={t('contact.form.message')} htmlFor="ct-message">
                                <textarea
                                    id="ct-message"
                                    name="message"
                                    rows="4"
                                    className="ct-input ct-textarea"
                                    placeholder={t('contact.form.placeholders.message')}
                                    defaultValue={initialMessage}
                                    required
                                />
                            </Field>

                            <div className="ct-submit-row">
                                <button
                                    type="submit"
                                    disabled={isSubmitting || isSuccess}
                                    className={`ws-member ct-submit${isSuccess ? ' ct-submit--sent' : ''}`}
                                >
                                    <span className="ws-member-label">
                                        {isSuccess
                                            ? t('contact.form.sent')
                                            : isSubmitting
                                                ? t('contact.form.sending')
                                                : t('contact.form.submit')}
                                    </span>
                                    <span className="ws-member-icon" aria-hidden="true">
                                        {isSuccess ? <Check size={20} /> : <ArrowUpRight size={20} />}
                                    </span>
                                </button>
                                <p className="ct-status" role="status" aria-live="polite">
                                    {isSuccess ? t('contact.form.sent_note') : ''}
                                </p>
                            </div>
                        </form>

                        <div className="ct-info">
                            <div className="ct-info-col">
                                <InfoItem index="01" label={t('contact.info.visit')}>
                                    <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="ct-info-link">
                                        <span>Carrer Pau Vila i Dinarès{' '}10<br />17003 Girona</span>
                                        <ArrowUpRight size={18} aria-hidden="true" />
                                    </a>
                                </InfoItem>
                                <InfoItem index="02" label={t('contact.info.call')}>
                                    <a href="tel:+34657317270" className="ct-info-link">
                                        <span>+34 657 317 270</span>
                                        <ArrowUpRight size={18} aria-hidden="true" />
                                    </a>
                                </InfoItem>
                            </div>
                            <div className="ct-info-col">
                                <InfoItem index="03" label={t('contact.info.hours')}>
                                    <p className="ct-info-value">
                                        {hoursLines[0]}
                                        {hoursLines.slice(1).map((line, i) => (
                                            <span key={i} className="ct-info-hours">{line}</span>
                                        ))}
                                    </p>
                                </InfoItem>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

const InfoItem = ({ index, label, children }) => (
    <div className="ct-info-item">
        <p className="ct-info-label">
            <span className="ct-info-index">{index}</span>
            {label}
        </p>
        {children}
    </div>
);

const Field = ({ label, htmlFor, children }) => (
    <div className="ct-field">
        <label className="ct-label" htmlFor={htmlFor}>{label}</label>
        {children}
    </div>
);

export default Contact;
