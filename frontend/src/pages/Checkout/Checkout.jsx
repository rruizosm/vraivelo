import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { supabase } from '../../supabase';
import { stripePromise } from '../../lib/stripe';
import { motion } from 'framer-motion';
import { Loader, Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './Checkout.css';

const Checkout = () => {
    const { cartItems, cartTotal } = useCart();
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCheckout = async () => {
        setLoading(true);
        setError(null);
        console.log("Starting checkout...");

        try {
            // 1. Create a checkout session via Supabase Edge Function
            console.log("Invoking repayment function...");
            const { data, error: functionError } = await supabase.functions.invoke('payment', {
                body: { cartItems },
            });
            console.log("Payment function response:", { data, functionError });

            if (functionError) throw functionError;
            if (data?.error) throw new Error(data.error);

            // 2. Redirect to Stripe Checkout
            console.log("Redirecting to Stripe with session:", data.sessionId);
            // 2. Redirect to Stripe Checkout using the URL from the backend
            if (data?.url) {
                console.log("Redirecting to:", data.url);
                window.location.href = data.url;
            } else {
                throw new Error("No checkout URL returned from backend.");
            }

        } catch (err) {
            console.error('Checkout error:', err);
            // Check if it's the match error and log more info
            if (err.message && err.message.includes("match")) {
                console.error("Match error detected. Stack:", err.stack);
            }
            alert(`Error Detail: ${err.message}`); // Show alert to user to report
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="checkout-container empty">
                <h2>{t('checkout_page.empty_title')}</h2>
                <a href="/shop" className="btn-primary">{t('checkout_page.return_shop')}</a>
            </div>
        );
    }

    return (
        <div className="checkout-container">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="checkout-content"
            >
                <h1>{t('checkout_page.title')}</h1>

                <div className="checkout-summary">
                    <h2>{t('checkout_page.order_summary')}</h2>
                    <div className="summary-items">
                        {cartItems.map((item, index) => (
                            <div key={index} className="summary-item">
                                <span className="item-name">{item.model} ({item.size})</span>
                                <span className="item-qty">x{item.quantity}</span>
                                <span className="item-price">{item.price}</span>
                            </div>
                        ))}
                    </div>
                    <div className="summary-total">
                        <span>{t('checkout_page.total')}</span>
                        <span>{cartTotal.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</span>
                    </div>
                </div>

                {error && <div className="error-message">{error}</div>}

                <button
                    onClick={handleCheckout}
                    disabled={loading}
                    className="pay-btn"
                >
                    {loading ? <Loader className="animate-spin" /> : <><Lock size={18} /> {t('checkout_page.pay_stripe')}</>}
                </button>

                <p className="secure-text">
                    <Lock size={14} /> {t('checkout_page.secure_text')}
                </p>
            </motion.div>
        </div>
    );
};

export default Checkout;
