import { useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './Success.css';

const Success = () => {
    const { clearCart } = useCart();
    const { t } = useTranslation();

    useEffect(() => {
        // Clear cart on successful payment
        clearCart();
    }, []);

    return (
        <div className="success-container">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="success-content"
            >
                <div className="success-icon-wrapper">
                    <CheckCircle size={64} className="success-icon" />
                </div>
                <h1>{t('success.title')}</h1>
                <p>{t('success.message')}</p>
                <a href="/shop" className="btn-primary">{t('success.continue')}</a>
            </motion.div>
        </div>
    );
};

export default Success;
