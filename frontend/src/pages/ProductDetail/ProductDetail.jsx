import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ZoomIn, Loader, ShoppingBag, ChevronLeft, ChevronRight, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../../supabase';
import { useCart } from '../../context/CartContext';
import { clothes } from '../../data/clothes';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { addToCart, isCartEnabled } = useCart();
    const [bike, setBike] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const fetchBike = async () => {
            try {
                setLoading(true);

                // Check if it's a clothing item first (local data)
                const foundCloth = clothes.find(c => c.id === id);
                if (foundCloth) {
                    setBike(foundCloth);
                    // Default to first variant color if available
                    if (foundCloth.variants && foundCloth.variants.length > 0) {
                        setSelectedColor(foundCloth.variants[0]);
                    }
                    setLoading(false);
                    return;
                }

                // If not found in clothes, fetch from Supabase (bikes)
                const { data: bikeData, error: bikeError } = await supabase
                    .from('bikes')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (!bikeError && bikeData) {
                    setBike(bikeData);
                    setLoading(false);
                    return;
                }

                // If not found in bikes, try the products table
                const { data: productData, error: productError } = await supabase
                    .from('products')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (!productError && productData) {
                    // Normalize column names to match component expectations
                    setBike({
                        id: productData.id,
                        model: productData.Product || productData.product,
                        category: productData.Type || productData.type,
                        price: productData.Price || productData.price,
                        size: productData.Size || productData.size,
                        description: productData.Description || productData.description,
                        image_url: productData["Image URL"] || productData["image url"] || productData.image_url,
                        color: productData.Color || productData.color,
                        specs: productData.Specs || productData.specs,
                    });
                    setLoading(false);
                    return;
                }

                // Not found anywhere
                setBike(null);

            } catch (error) {
                console.error('Error fetching product:', error);
                setBike(null);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchBike();
        }
    }, [id]);

    // Reset image index when color changes
    useEffect(() => {
        setCurrentImageIndex(0);
    }, [selectedColor]);


    // Default options if not provided in data
    // Parse sizes: could be an array, a string like "[42,44,46]", or null
    const parseSizes = () => {
        if (selectedColor && selectedColor.sizes) return selectedColor.sizes;
        if (bike?.sizes) {
            if (Array.isArray(bike.sizes)) return bike.sizes;
            // Handle string format like "[42,44,46]"
            if (typeof bike.sizes === 'string' && bike.sizes.startsWith('[')) {
                try {
                    return JSON.parse(bike.sizes.replace(/'/g, '"'));
                } catch { return []; }
            }
            return [bike.sizes];
        }
        if (bike?.size) {
            if (Array.isArray(bike.size)) return bike.size;
            if (typeof bike.size === 'string' && bike.size.startsWith('[')) {
                try {
                    return JSON.parse(bike.size.replace(/'/g, '"'));
                } catch { return []; }
            }
            return [bike.size];
        }
        return [];
    };
    const sizes = parseSizes();
    const specs = bike?.specs || [];

    // Determine current images list
    const currentImages = selectedColor && selectedColor.images && selectedColor.images.length > 0
        ? selectedColor.images
        : (bike?.image_url ? [bike.image_url] : []);

    // Determine displayed image
    const displayImage = currentImages.length > 0 ? currentImages[currentImageIndex] : null;

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % currentImages.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
    };


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
                    className="product-image-section relative group"
                >
                    {bike.quantity === 0 && (
                        <span className="sold-badge">
                            {t('product.sold')}
                        </span>
                    )}

                    {/* Image Carousel */}
                    <div className="relative w-full h-full flex items-center justify-center">
                        <AnimatePresence mode='wait'>
                            {displayImage ? (
                                <motion.img
                                    key={displayImage}
                                    src={displayImage}
                                    alt={bike.model}
                                    className="product-detail-image"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                />
                            ) : (
                                <span className="product-placeholder-text">
                                    {(bike.brand || bike.model || '?').charAt(0)}
                                </span>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Carousel Controls */}
                    {currentImages.length > 1 && (
                        <>
                            <button
                                onClick={prevImage}
                                className="carousel-btn left"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button
                                onClick={nextImage}
                                className="carousel-btn right"
                            >
                                <ChevronRight size={24} />
                            </button>

                            {/* Pagination Dots */}
                            <div className="carousel-dots">
                                {currentImages.map((_, idx) => (
                                    <div
                                        key={idx}
                                        className={`carousel-dot ${idx === currentImageIndex ? 'active' : ''}`}
                                    />
                                ))}
                            </div>
                        </>
                    )}

                    <button
                        className="image-zoom-btn"
                        onClick={() => {
                            if (displayImage) window.open(displayImage, '_blank');
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
                        {bike.brand && <p className="product-brand">{bike.brand}</p>}
                        <h1 className="product-title">{bike.model}</h1>
                        {bike.category && <p className="product-category">{bike.category}</p>}
                        {/* {bike.color && !bike.variants && <p className="text-sm text-gray-400 mt-1">Color: {bike.color}</p>} */}
                        <p className="product-price">{bike.price}</p>
                    </div>

                    {bike.description && <p className="product-description">{bike.description}</p>}
                    {bike.long_description && <p className="product-description mt-2">{bike.long_description}</p>}

                    {/* Options */}
                    <div className="product-options">

                        {/* Color Selection (if variants exist) */}
                        {bike.variants && (
                            <div className="option-group">
                                <div className="option-header">
                                    <span className="option-label">Select Color: <span className="text-[var(--primary)]">{selectedColor?.colorName}</span></span>
                                </div>
                                <div className="color-selector flex gap-3">
                                    {bike.variants.map((variant) => (
                                        <button
                                            key={variant.color}
                                            className={`color-btn ${selectedColor?.color === variant.color ? 'active' : ''}`}
                                            style={{ backgroundColor: variant.hex }}
                                            onClick={() => setSelectedColor(variant)}
                                            title={variant.colorName}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

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
                                {sizes.map(size => (
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

                        {isCartEnabled ? (
                            <button
                                onClick={() => {
                                    if (selectedSize) {
                                        addToCart({
                                            id: bike.id,
                                            brand: bike.brand || '',
                                            model: bike.model,
                                            price: bike.price,
                                            image: displayImage,
                                            size: selectedSize,
                                            color: selectedColor ? selectedColor.colorName : null,
                                            type: bike.category === 'Other Products' ? 'clothes' : 'bike',
                                            maxQuantity: bike.quantity
                                        });
                                    }
                                }}
                                disabled={(sizes.length > 0 && !selectedSize) || bike.quantity === 0}
                                className={`add-to-cart-btn ${((sizes.length > 0 && !selectedSize) || bike.quantity === 0) ? 'disabled' : ''}`}
                            >
                                <ShoppingBag size={20} />
                                {bike.quantity === 0 ? t('product.sold') : t('product.add_to_cart') || "Add to Cart"}
                            </button>
                        ) : (
                            <button
                                onClick={() => navigate('/contact', { state: { subject: (bike.category === 'Clothes' || bike.category === 'Other Products' || bike.variants) ? 'parts' : 'bikes', message: `${t('product.contact_message') || 'Hi, I\'m interested in'} ${bike.model}` } })}
                                className="add-to-cart-btn"
                            >
                                <Mail size={20} />
                                {t('product.contact_us') || 'Contact Us'}
                            </button>
                        )}
                    </div>
                </motion.div>
            </div>

            {/* Specs Section */}
            {specs.length > 0 && (
                <div className="product-specs-section">
                    <div className="product-specs">
                        <h3 className="specs-title">{t('product.specifications')}</h3>
                        <div className="specs-grid">
                            {specs.map((spec, index) => (
                                <div key={index} className="spec-item">
                                    <span className="spec-label">{spec}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetail;
