import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { bikes } from '../../data/bikes';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const bike = bikes.find(b => b.id === parseInt(id));

    const [selectedSize, setSelectedSize] = useState(null);


    // Default options if not provided in data
    const sizes = bike?.sizes || ['S', 'M', 'L', 'XL'];

    const specs = bike?.specs || ['Frame: Standard Carbon', 'Groupset: Standard Mix', 'Warranty: 2 Years'];

    if (!bike) {
        return (
            <div className="product-detail-container flex items-center justify-center">
                <h2>Product not found</h2>
                <button onClick={() => navigate('/shop')}>Back to Shop</button>
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
                    {bike.image ? (
                        <img src={bike.image} alt={bike.model} className="product-detail-image" />
                    ) : (
                        <span className="product-placeholder-text">
                            {bike.brand.charAt(0)}
                        </span>
                    )}
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

                    <p className="product-description">{bike.desc}</p>

                    {/* Options */}
                    <div className="product-options">
                        <div className="option-group">
                            <span className="option-label">Select Size</span>
                            <div className="size-selector">
                                {sizes.map(size => (
                                    <button
                                        key={size}
                                        className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>


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
