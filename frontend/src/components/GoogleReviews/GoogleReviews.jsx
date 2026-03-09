import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import './GoogleReviews.css';

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
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" alt="Google" width="20" height="20" />
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
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" alt="Google" width="16" height="16" />
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
