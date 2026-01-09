import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ZoomIn, Loader, ShoppingBag } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../../supabase';
import { useCart } from '../../context/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { addToCart } = useCart();
    const [bike, setBike] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState(null);

    useEffect(() => {
        const fetchBike = async () => {
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('bikes')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) {
                    throw error;
                }
                setBike(data);
            } catch (error) {
                console.error('Error fetching bike:', error);
                setBike(null);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchBike();
        }
    }, [id]);


    // Default options if not provided in data
    const sizes = bike?.sizes || ['S', 'M', 'L', 'XL'];
    const specs = bike?.specs || ['Frame: Standard Carbon', 'Groupset: Standard Mix', 'Warranty: 2 Years'];

    if (loading) {
        return (
            <div className="product-detail-container flex items-center justify-center min-h-[60vh]">
                <Loader className="animate-spin text-[var(--primary)]" size={48} />
            </div>
        );
    }

    if (!bike) {
        return (
            <div className="product-detail-container flex flex-col items-center justify-center gap-4">
                <h2>Product not found</h2>
                <button
                    onClick={() => navigate('/shop')}
                    className="flex items-center gap-2 px-6 py-2 bg-[var(--primary)] text-white rounded-full hover:bg-opacity-90 transition-all"
                >
                    <ArrowLeft size={20} />
                    Back to Shop
                </button>
            </div>
        );
    }

    return (
        <div className="product-detail-container">
            <div className="product-detail-content">
                {/* Image Section */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="product-image-section"
                >
                    {bike.quantity === 0 && (
                        <span className="sold-badge">
                            {t('product.sold')}
                        </span>
                    )}
                    {bike.image_url ? (
                        <img src={bike.image_url} alt={bike.model} className="product-detail-image" />
                    ) : (
                        <span className="product-placeholder-text">
                            {bike.brand.charAt(0)}
                        </span>
                    )}
                    <button
                        className="image-zoom-btn"
                        onClick={() => {
                            if (bike.image_url) window.open(bike.image_url, '_blank');
                        }}
                        title={t('product.info') || "View image"}
                    >
                        <ZoomIn size={24} />
                    </button>
                </motion.div>

                {/* Info Section */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="product-info-section"
                >
                    <button onClick={() => navigate('/shop')} className="back-btn">
                        <ArrowLeft size={20} />
                        Back to Shop
                    </button>

                    <div>
                        <p className="product-brand">{bike.brand}</p>
                        <h1 className="product-title">{bike.model}</h1>
                        <p className="product-category">{bike.category}</p>
                        <p className="product-price">{bike.price}</p>
                    </div>

                    <p className="product-description">{bike.description}</p>

                    {/* Options */}
                    <div className="product-options">
                        <div className="option-group">
                            <div className="option-header">
                                <span className="option-label">Select Size</span>
                                {bike.quantity !== undefined && (
                                    <span className="stock-display">
                                        {t('product.stock')}: <span className="stock-value">{bike.quantity}</span>
                                    </span>
                                )}
                            </div>
                            <div className="size-selector">
                                {(bike.sizes || ['S', 'M', 'L', 'XL']).map(size => (
                                    <button
                                        key={size}
                                        className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                                        onClick={() => setSelectedSize(prev => prev === size ? null : size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                if (selectedSize) {
                                    addToCart({
                                        id: bike.id,
                                        brand: bike.brand,
                                        model: bike.model,
                                        price: bike.price,
                                        image: bike.image_url,
                                        size: selectedSize,
                                        type: 'bike',
                                        maxQuantity: bike.quantity
                                    });
                                }
                            }}
                            disabled={!selectedSize || bike.quantity === 0}
                            className={`add-to-cart-btn ${(!selectedSize || bike.quantity === 0) ? 'disabled' : ''}`}
                        >
                            <ShoppingBag size={20} />
                            {bike.quantity === 0 ? t('product.sold') : t('product.add_to_cart') || "Add to Cart"}
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Specs Section */}
            <div className="product-specs-section">
                <div className="product-specs">
                    <h3 className="specs-title">{t('product.specifications')}</h3>
                    <div className="specs-grid">
                        {specs.map((spec, index) => {
                            const [label, ...valueParts] = spec.split(':');
                            const value = valueParts.join(':').trim();
                            const translationKey = `product.specs.${label.toLowerCase().trim().replace(/ /g, '_')}`;

                            return (
                                <div key={index} className="spec-item">
                                    <span className="spec-label">{t(translationKey, { defaultValue: label })}</span>
                                    <span className="spec-value">{value || spec}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
