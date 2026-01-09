import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag, Plus, Minus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Cart.css';

const Cart = () => {
    const { cartItems, isCartOpen, toggleCart, removeFromCart, updateQuantity, cartTotal } = useCart();
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        className="cart-backdrop"
                    />

                    {/* Cart Sidebar */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="cart-sidebar"
                    >
                        <div className="cart-header">
                            <h2 className="cart-title">Your Cart ({cartItems.length})</h2>
                            <button onClick={toggleCart} className="close-cart-btn">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="cart-items">
                            {cartItems.length === 0 ? (
                                <div className="cart-empty">
                                    <ShoppingBag size={48} className="text-gray-300 mb-4" />
                                    <p>Your cart is empty</p>
                                    <button onClick={() => { toggleCart(); navigate('/shop'); }} className="start-shopping-btn">
                                        Start Shopping
                                    </button>
                                </div>
                            ) : (
                                cartItems.map((item) => (
                                    <div key={`${item.id}-${item.size}-${item.type}`} className="cart-item">
                                        <div className="cart-item-image">
                                            <img src={item.image} alt={item.model} />
                                        </div>
                                        <div className="cart-item-details">
                                            <h3 className="cart-item-title">{item.model}</h3>
                                            <p className="cart-item-brand">{item.brand}</p>
                                            {item.size && <p className="cart-item-variant">Size: {item.size}</p>}
                                            <p className="cart-item-price">{item.price}</p>
                                            {item.maxQuantity !== undefined && item.quantity >= item.maxQuantity && (
                                                <p className="text-xs text-red-500 font-medium mt-1">Max stock reached</p>
                                            )}

                                            <div className="cart-item-controls">
                                                <div className="quantity-controls">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.size, item.type, item.quantity - 1)}
                                                        className="qty-btn"
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="qty-value">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.size, item.type, item.quantity + 1)}
                                                        className={`qty-btn ${item.maxQuantity !== undefined && item.quantity >= item.maxQuantity ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                        disabled={item.maxQuantity !== undefined && item.quantity >= item.maxQuantity}
                                                        title={item.maxQuantity !== undefined && item.quantity >= item.maxQuantity ? "Max stock reached" : ""}
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.id, item.size, item.type)}
                                                    className="remove-item-btn"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {cartItems.length > 0 && (
                            <div className="cart-footer">
                                <div className="cart-total">
                                    <span>Total</span>
                                    <span className="total-amount">{cartTotal.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</span>
                                </div>
                                <button
                                    className="checkout-btn"
                                    onClick={() => {
                                        toggleCart();
                                        navigate('/checkout');
                                    }}
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Cart;
