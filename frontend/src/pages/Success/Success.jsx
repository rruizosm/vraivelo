import { useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import './Success.css';

const Success = () => {
    const { clearCart } = useCart();

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
                <h1>Payment Successful!</h1>
                <p>Thank you for your purchase. Your order has been confirmed.</p>
                <a href="/shop" className="btn-primary">Continue Shopping</a>
            </motion.div>
        </div>
    );
};

export default Success;
