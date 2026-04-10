import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronRight, ChevronLeft, ZoomIn, Banknote, RefreshCcw, Loader, ShoppingBag, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../../supabase';
import { useCart } from '../../context/CartContext';
import { clothes } from '../../data/clothes';
import SEOHead from '../../components/SEOHead/SEOHead';
import { getDiscountedPrice } from '../../lib/priceUtils';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { t, i18n } = useTranslation();
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
                // Left join with bike_variants
                const { data: bikeData, error: bikeError } = await supabase
                    .from('bikes')
                    .select('*, bike_variants(*)')
                    .eq('id', id)
                    .single();

                if (!bikeError && bikeData) {
                    // Format bike_variants to match the standard variant structure used by clothes
                    if (bikeData.bike_variants && bikeData.bike_variants.length > 0) {
                        bikeData.variants = bikeData.bike_variants.map(bv => ({
                            color: bv.color_name.toLowerCase(),
                            colorName: bv.color_name,
                            hex: bv.color_hex,
                            images: bv.image_url ? [bv.image_url] : []
                        }));
                    }
                    // Identity flag for bikes
                    bikeData.isBikeData = true;

                    setBike(bikeData);

                    // Default to first variant color if available
                    if (bikeData.variants && bikeData.variants.length > 0) {
                        setSelectedColor(bikeData.variants[0]);
                    }

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
                    const category = productData.Type || productData.type;
                    let specs = productData.Specs || productData.specs || [];

                    if (typeof specs === 'string') {
                        try { specs = JSON.parse(specs.replace(/'/g, '"')); } catch { specs = [specs]; }
                    }
                    if (category === 'Wheels') {
                        specs = [...specs, 'Hub: DT SWISS'];
                    }

                    // Normalize column names to match component expectations
                    setBike({
                        id: productData.id,
                        model: productData.Product || productData.product,
                        category: category,
                        price: productData.Price || productData.price,
                        old_price: productData.OldPrice || productData.oldprice || null,
                        size: productData.Size || productData.size,
                        description: productData.Description || productData.description,
                        image_url: productData["Image URL"] || productData["image url"] || productData.image_url,
                        color: productData.Colors || productData.colors,
                        specs: specs,
                        // Localization Schema (Supporting both legacy and new column names)
                        description_es: productData.description_es || productData.Description_es || productData.description_spanish,
                        description_en: productData.description_en || productData.Description_en || productData.description_english,
                        description_ca: productData.description_ca || productData.Description_ca || productData.description_catalan,
                        long_description: productData.long_description || productData.Long_description,
                        long_description_es: productData.long_description_es || productData.Long_description_es || productData.Long_description_ES,
                        long_description_ca: productData.long_description_ca || productData.Long_description_ca || productData.Long_description_CA,
                        specs_es: productData.specs || productData.Specs || productData.specs,
                        specs_en: productData.specs_en || productData.Specs_en || productData.specs_english,
                        specs_ca: productData.specs_ca || productData.Specs_ca || productData.specs_catalan,
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

    // Dynamically map text fields via i18n
    const currentLang = i18n?.language?.toLowerCase().split('-')[0] || 'en';
    const langMap = { 'es': 'spanish', 'en': 'english', 'ca': 'catalan' };
    const fullLangName = langMap[currentLang];
    const descLangKey = currentLang === 'ca' ? 'cat' : currentLang;

    const displayDescription =
        bike?.[`description_${fullLangName}`] ||
        bike?.[`description_${descLangKey}`] ||
        bike?.[`description_${currentLang}`] ||
        bike?.description;
    const displayLongDescription =
        bike?.[`long_description_${descLangKey}`] ||
        bike?.[`long_description_${currentLang}`] ||
        bike?.long_description;

    let displaySpecs = bike?.specs || [];
    const fullSpecName = langMap[currentLang];
    const specLangKey = currentLang === 'ca' ? 'cat' : currentLang;

    const localizedSpecs =
        bike?.[`specs_${fullSpecName}`] ||
        bike?.[`Specs_${fullSpecName}`] ||
        bike?.[`specs_${specLangKey}`] ||
        bike?.[`Specs_${specLangKey}`] ||
        bike?.[`specs_${currentLang}`];

    if (localizedSpecs) {
        if (typeof localizedSpecs === 'string') {
            try { displaySpecs = JSON.parse(localizedSpecs.replace(/'/g, '"')); } catch { displaySpecs = [localizedSpecs]; }
        } else if (Array.isArray(localizedSpecs)) {
            displaySpecs = localizedSpecs;
        }
    }

    // Parse colors: similar logic to sizes
    const parseColors = () => {
        if (bike?.variants) return bike.variants; // From local data (clothes)
        const bikeColors = bike?.Colors || bike?.colors || bike?.Color || bike?.color;

        if (bikeColors) {
            if (Array.isArray(bikeColors)) return bikeColors;
            if (typeof bikeColors === 'string') {
                try {
                    return JSON.parse(bikeColors.replace(/'/g, '"'));
                } catch {
                    if (bikeColors.includes(',')) {
                        return bikeColors.split(',').map(c => c.trim());
                    }
                    return [bikeColors];
                }
            }
        }
        return [];
    };
    const colors = parseColors();


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
                    onClick={() => navigate(location.state?.from === 'other-products' ? '/other-products' : '/shop')}
                    className="flex items-center gap-2 px-6 py-2 bg-[var(--primary)] text-white rounded-full hover:bg-opacity-90 transition-all"
                >
                    <ArrowLeft size={20} />
                    {location.state?.from === 'other-products' ? t('product.back_to_other_products') : t('product.back_to_shop')}
                </button>
            </div>
        );
    }

    return (
        <div className="product-detail-container">
            <SEOHead
                titleKey="seo.product_detail.title"
                descriptionKey="seo.product_detail.description"
                path={`/shop/${id}`}
                ogImage={bike.image_url}
                tOptions={{ name: bike.model }}
            />
            <div className="product-detail-content">
                {/* Left column: image + description */}
                <div className="product-left-column">
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

                </div>

                {/* Info Section */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="product-info-section"
                >
                    <button onClick={() => navigate(location.state?.from === 'other-products' ? '/other-products' : '/shop')} className="back-btn">
                        <ArrowLeft size={20} />
                        {location.state?.from === 'other-products' ? t('product.back_to_other_products') : t('product.back_to_shop')}
                    </button>

                    <div>
                        {bike.brand && <p className="product-brand">{bike.brand}</p>}
                        <h1 className="product-title">{bike.model}</h1>
                        {bike.category === 'Wheels' && <p style={{ color: '#64748b', fontSize: '0.875rem', fontWeight: 500, marginTop: '0.25rem', marginBottom: '0.5rem', letterSpacing: '0.025em' }}>Hub: DT SWISS</p>}
                        {bike.category && <p className="product-category">{bike.category}</p>}
                        {/* {bike.color && !bike.variants && <p className="text-sm text-gray-400 mt-1">Color: {bike.color}</p>} */}
                        {(() => {
                            const isBikeOrProduct = bike.category !== 'Clothes' && bike.category !== 'Other Products';
                            const hasDiscount = isBikeOrProduct;
                            const discountedPrice = hasDiscount ? getDiscountedPrice(bike.price) : bike.price;

                            if (!hasDiscount || discountedPrice === bike.price) {
                                return (
                                    <>
                                        {bike.old_price && (
                                            <p style={{ textDecoration: 'line-through', color: '#9ca3af', fontSize: '1.1rem', marginBottom: '0.25rem', fontWeight: 500 }}>
                                                {bike.old_price}
                                            </p>
                                        )}
                                        <p className="product-price" style={bike.old_price ? { marginTop: 0 } : {}}>{bike.price}</p>
                                        {bike.isBikeData && (
                                            <div className="purchase-perks-banner">
                                                <div className="perk-item">
                                                    <Banknote size={18} className="perk-icon" />
                                                    <span>{t('product.finance_option')}</span>
                                                </div>
                                                <div className="perk-item">
                                                    <RefreshCcw size={18} className="perk-icon" />
                                                    <span>{t('product.trade_in_option')}</span>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                );
                            }
                            return (
                                <div className="flex flex-col mt-2">
                                    {bike.old_price && (
                                        <span style={{ textDecoration: 'line-through', color: '#9ca3af', fontSize: '1.1rem', fontWeight: 500, marginBottom: '0.25rem' }}>
                                            {bike.old_price}
                                        </span>
                                    )}
                                    <div className="flex items-center gap-3">
                                        <span className="product-price-new">{bike.price}</span>
                                        {/* <span className="product-price-new">{discountedPrice}</span> */}
                                    </div>
                                    {bike.isBikeData && (
                                        <div className="purchase-perks-banner">
                                            <div className="perk-item">
                                                <Banknote size={18} className="perk-icon" />
                                                <span>{t('product.finance_option')}</span>
                                            </div>
                                            <div className="perk-item">
                                                <RefreshCcw size={18} className="perk-icon" />
                                                <span>{t('product.trade_in_option')}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })()}
                    </div>


                    {/* Options */}
                    <div className="product-options">

                        {/* Color Selection */}
                        {(bike.variants || colors.length > 0) && (
                            <div className="option-group">
                                <div className="option-header">
                                    <span className="option-label">{t('product.available_colors')}: <span style={{ color: 'var(--primary)' }}>{selectedColor?.colorName || selectedColor}</span></span>
                                </div>
                                <div className="color-selector flex gap-3">
                                    {bike.variants ? (
                                        // Clothes / items with complex variants
                                        bike.variants.map((variant) => (
                                            <button
                                                key={variant.color}
                                                className={`color-btn ${selectedColor?.color === variant.color ? 'active' : ''}`}
                                                style={{ backgroundColor: variant.hex }}
                                                onClick={() => setSelectedColor(variant)}
                                                title={variant.colorName}
                                            />
                                        ))
                                    ) : (
                                        // Bikes / items with simple color strings
                                        colors.map((color, idx) => {
                                            if (!color) return null;
                                            return (
                                                <button
                                                    key={idx}
                                                    className={`size-btn ${selectedColor === color ? 'active' : ''}`}
                                                    onClick={() => setSelectedColor(color)}
                                                    style={{ textTransform: 'capitalize' }}
                                                >
                                                    {color}
                                                </button>
                                            );
                                        })
                                    )}
                                </div>
                            </div>
                        )}

                        {sizes && sizes.length > 0 && (
                            <div className="option-group">
                                <div className="option-header">
                                    <span className="option-label">{t('product.available_sizes')}</span>
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
                        )}

                        {isCartEnabled ? (
                            <button
                                onClick={() => {
                                    if (selectedSize) {
                                        const isBikeOrProduct = bike.category !== 'Clothes' && bike.category !== 'Other Products';
                                        addToCart({
                                            id: bike.id,
                                            brand: bike.brand || '',
                                            model: bike.model,
                                            price: isBikeOrProduct ? getDiscountedPrice(bike.price) : bike.price,
                                            image: displayImage,
                                            size: selectedSize,
                                            color: selectedColor?.colorName || (typeof selectedColor === 'string' ? selectedColor : null),
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
                                onClick={() => navigate('/contact', { state: { subject: (bike.category === 'Clothes' || bike.category === 'Other Products') ? 'parts' : 'bikes', message: `${t('product.contact_message') || 'Hi, I\'m interested in'} ${bike.model}` } })}
                                className="add-to-cart-btn"
                            >
                                <Mail size={20} />
                                {t('product.contact_us') || 'Contact Us'}
                            </button>
                        )}
                    </div>
                </motion.div>
            </div>

            {/* Description Section */}
            {(displayDescription || displayLongDescription) && (
                <div className="product-description-section" style={{ maxWidth: 'var(--container-width)', margin: '4rem auto 0', padding: '0 1.5rem' }}>
                    <div className="product-description-below" style={{ borderTop: 'none', paddingTop: 0 }}>
                        {displayDescription && <p className="product-description">{displayDescription}</p>}
                        {displayLongDescription && <p className="product-description" style={{ marginTop: '0.75rem' }}>{displayLongDescription}</p>}
                    </div>
                </div>
            )}

            {/* Specs Section */}
            {displaySpecs.length > 0 && (
                <div className="product-specs-section">
                    <div className="product-specs">
                        <h3 className="specs-title">{t('product.specifications')}</h3>
                        <div className="specs-grid">
                            {displaySpecs.map((spec, index) => (
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
