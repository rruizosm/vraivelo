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

        try {
            // 1. Create a checkout session via Supabase Edge Function
            const { data, error: functionError } = await supabase.functions.invoke('payment', {
                body: { cartItems },
            });

            if (functionError) throw functionError;
            if (data?.error) throw new Error(data.error);

            // 2. Redirect to Stripe Checkout
            const stripe = await stripePromise;
            const { error: stripeError } = await stripe.redirectToCheckout({
                sessionId: data.sessionId,
            });

            if (stripeError) throw stripeError;

        } catch (err) {
            console.error('Checkout error:', err);
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="checkout-container empty">
                <h2>Your cart is empty</h2>
                <a href="/shop" className="btn-primary">Return to Shop</a>
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
                <h1>Checkout</h1>

                <div className="checkout-summary">
                    <h2>Order Summary</h2>
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
                        <span>Total:</span>
                        <span>{cartTotal.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</span>
                    </div>
                </div>

                {error && <div className="error-message">{error}</div>}

                <button
                    onClick={handleCheckout}
                    disabled={loading}
                    className="pay-btn"
                >
                    {loading ? <Loader className="animate-spin" /> : <><Lock size={18} /> Pay with Stripe</>}
                </button>

                <p className="secure-text">
                    <Lock size={14} /> Payments are secure and encrypted.
                </p>
            </motion.div>
        </div>
    );
};

export default Checkout;
