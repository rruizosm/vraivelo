import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import './GoogleReviews.css';

const GoogleIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    <path fill="none" d="M0 0h48v48H0z"/>
  </svg>
);

const reviewsData = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 }
];

const GoogleReviews = () => {
    const { t } = useTranslation();

    return (
        <section className="google-reviews-section">
            <div className="google-reviews-container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="google-reviews-header"
                >
                    <h2 className="section-title">
                        {t('home.reviews.title')} <span className="highlight-primary">{t('home.reviews.title_highlight')}</span>
                    </h2>
                    <p className="section-subtitle">
                        {t('home.reviews.subtitle')}
                    </p>

                    <div className="google-rating-summary">
                        <div className="google-score">4.8</div>
                        <div className="google-stars">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} size={20} fill="#fbbc04" color="#fbbc04" />
                            ))}
                        </div>
                        <div className="google-count">
                            {t('home.reviews.based_on')} 88 {t('home.reviews.reviews_text')}
                        </div>
                        <div className="google-logo">
                            <GoogleIcon size={20} />
                        </div>
                    </div>
                </motion.div>

                <div className="google-reviews-grid">
                    {reviewsData.map((review, index) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                            className="google-review-card"
                        >
                            <div className="review-header">
                                <div className="reviewer-avatar">
                                    {t(`home.reviews.items.${review.id}.name`).charAt(0)}
                                </div>
                                <div className="reviewer-info">
                                    <div className="reviewer-name">{t(`home.reviews.items.${review.id}.name`)}</div>
                                    <div className="review-date">{t(`home.reviews.items.${review.id}.date`)}</div>
                                </div>
                                <div className="review-google-icon">
                                    <GoogleIcon size={16} />
                                </div>
                            </div>
                            <div className="review-stars">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star key={star} size={14} fill="#fbbc04" color="#fbbc04" />
                                ))}
                            </div>
                            <p className="review-text">
                                "{t(`home.reviews.items.${review.id}.text`)}"
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GoogleReviews;
