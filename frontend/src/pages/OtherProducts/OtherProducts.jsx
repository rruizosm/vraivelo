import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ShoppingBag, Loader, Mail, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase';
import { clothes } from '../../data/clothes';
import { useTranslation } from 'react-i18next';
import SEOHead from '../../components/SEOHead/SEOHead';
import '../Shop/Shop.css'; // Reuse Shop styles

const ProductCard = ({ product, addToCart, navigate, t, isCartEnabled }) => {
    // Local state for the displayed image to allow color preview
    const [currentImage, setCurrentImage] = useState(product.image_url);

    const handleProductClick = () => {
        navigate(`/shop/${product.id}`, { state: { from: 'other-products' } });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bike-card group"
            onClick={handleProductClick}
            style={{ cursor: 'pointer' }}
        >
            <div className="bike-image-wrapper">
                {currentImage ? (
                    <img src={currentImage} alt={product.model} className="bike-image" />
                ) : (
                    <span className="bike-placeholder-text">
                        {product.model ? product.model.charAt(0) : '?'}
                    </span>
                )}
                {product.is_new && (
                    <span className="new-badge">
                        {t('other_products.new')}
                    </span>
                )}
            </div>
            <div className="bike-info">
                {product.brand && <p className="bike-brand">{product.brand}</p>}
                <h3 className="bike-model">{product.model}</h3>

                {/* Color Options Preview */}
                {product.variants && (
                    <div className="flex flax-wrap gap-2 mt-2 mb-2 items-center">
                        <span className="text-xs text-gray-500 mr-1">{t('other_products.colors')}</span>
                        {product.variants.map(variant => (
                            <div
                                key={variant.color}
                                className="w-5 h-5 rounded-full border-2 border-gray-200 shadow-sm hover:border-[var(--primary)] hover:scale-110 transition-all cursor-pointer"
                                style={{ backgroundColor: variant.hex }}
                                title={variant.colorName}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (variant.images && variant.images.length > 0) {
                                        setCurrentImage(variant.images[0]);
                                    }
                                }}
                            />
                        ))}
                    </div>
                )}

                <div className="bike-price-row">
                    <div className="flex flex-col justify-center">
                        {product.old_price && (
                            <span style={{ textDecoration: 'line-through', color: '#9ca3af', fontSize: '1rem', lineHeight: '1', marginBottom: '0.2rem' }}>
                                {product.old_price}
                            </span>
                        )}
                        <span className="bike-price-new" style={product.old_price ? { lineHeight: '1' } : {}}>{product.price}</span>
                    </div>
                    {isCartEnabled && (
                        <button
                            className="add-cart-btn-small"
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/shop/${product.id}`, { state: { from: 'other-products' } });
                            }}
                        >
                            <ShoppingBag size={18} />
                        </button>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

const OtherProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState(() => sessionStorage.getItem('otherProducts_activeCategory') || 'All');
    const [expandedFilters, setExpandedFilters] = useState({ category: true });
    const [searchQuery, setSearchQuery] = useState('');

    const toggleSection = (section) => {
        setExpandedFilters(prev => ({ ...prev, [section]: !prev[section] }));
    };

    useEffect(() => {
        sessionStorage.setItem('otherProducts_activeCategory', activeCategory);
    }, [activeCategory]);
    const { addToCart, isCartEnabled } = useCart();
    const navigate = useNavigate();
    const { t } = useTranslation();

    // Fetch products from Supabase
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .eq('Active', true)
                    .order('id', { ascending: true });

                if (error) throw error;

                // Normalize Supabase column names to component format
                // Handle both PascalCase and lowercase column names
                const normalized = (data || []).map(p => {
                    const category = p.Type || p.type;
                    let specs = p.Specs || p.specs || [];

                    if (typeof specs === 'string') {
                        try { specs = JSON.parse(specs.replace(/'/g, '"')); } catch { specs = [specs]; }
                    }
                    if (category === 'Wheels') {
                        specs = [...specs, 'Hub: DT SWISS'];
                    }

                    return {
                        id: p.id,
                        model: p.Product || p.product,
                        category: category,
                        price: p.Price || p.price,
                        old_price: p.OldPrice || p.oldprice || null,
                        size: p.Size || p.size,
                        description: p.Description || p.description,
                        image_url: p["Image URL"] || p["image url"] || p.image_url,
                        color: p.Color || p.color,
                        specs: specs,
                        // Localization Schema
                        description_spanish: p.description_spanish,
                        description_english: p.description_english,
                        description_catalan: p.description_catalan,
                        specs_spanish: p.specs_spanish,
                        specs_english: p.specs_english,
                        specs_catalan: p.specs_catalan,
                    };
                });

                setProducts(normalized);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Combine Supabase products with local clothes data
    const allProducts = [...products, ...clothes];

    // Category key mapping for translation
    const categoryKeyMap = {
        'All': 'other_products.all',
        'Clothes': 'other_products.clothes',
        'Wheels': 'other_products.wheels',
    };

    // Helper to dynamically translate category names from DB if needed
    const translateCategory = (cat) => {
        if (categoryKeyMap[cat]) return t(categoryKeyMap[cat]);
        const dynamicKey = `other_products.${cat.toLowerCase().replace(/\s+/g, '_')}`;
        const translated = t(dynamicKey);
        // If translation is the key itself (meaning it was not found), return the original category text
        return translated !== dynamicKey ? translated : cat;
    };

    // We only define 'All' as fixed. The rest come dynamically from the data
    const baseCategories = ['All'];
    const dataCategories = allProducts.map(p => p.category).filter(c => c && c !== 'Other Products');
    const categories = [...new Set([...baseCategories, ...dataCategories])];

    const filteredProducts = allProducts.filter(product => {
        const matchCategory = activeCategory === 'All' ||
            product.category === activeCategory ||
            (activeCategory === 'Clothes' && product.category === 'Other Products');

        const q = searchQuery.trim().toLowerCase();
        const matchSearch = !q ||
            (product.brand || '').toLowerCase().includes(q) ||
            (product.model || '').toLowerCase().includes(q);

        return matchCategory && matchSearch;
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader className="animate-spin text-[var(--primary)]" size={48} />
            </div>
        );
    }

    return (
        <div className="shop-container">
            <SEOHead titleKey="seo.other_products.title" descriptionKey="seo.other_products.description" path="/other-products" />
            <div className="shop-content">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="shop-header"
                >
                    <span className="shop-badge">
                        {t('other_products.badge')}
                    </span>
                    <h1 className="shop-title">
                        {t('other_products.title_prefix')} <span className="text-[var(--primary)]">{t('other_products.title_highlight')}</span>
                    </h1>
                </motion.div>

                <div className="shop-layout">
                    {/* SIDEBAR FILTERS */}
                    <aside className="shop-sidebar">
                        {/* Category Filter */}
                        <div className="filter-group accordion-group">
                            <button className="filter-accordion-header" onClick={() => toggleSection('category')}>
                                <h3 className="filter-title">{t('other_products.category')}</h3>
                                {expandedFilters.category ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </button>
                            {expandedFilters.category && (
                                <div className="filter-options-content">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => setActiveCategory(cat)}
                                            className={`sidebar-filter-btn ${activeCategory === cat ? 'active' : ''}`}
                                        >
                                            <div className={`checkbox ${activeCategory === cat ? 'checked' : ''}`} />
                                            {translateCategory(cat)}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </aside>

                    {/* PRODUCTS GRID */}
                    <div style={{ width: '100%' }}>
                        {/* Search Bar */}
                        <div className="shop-search-bar">
                            <Search size={18} className="shop-search-icon" />
                            <input
                                id="shop-search-input"
                                type="text"
                                className="shop-search-input"
                                placeholder={t('other_products.search_placeholder')}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {searchQuery && (
                                <button className="shop-search-clear" onClick={() => setSearchQuery('')} aria-label="Clear search">
                                    ✕
                                </button>
                            )}
                        </div>
                        <div style={{ paddingBottom: '1rem', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                            {filteredProducts.length} {filteredProducts.length === 1 ? t('other_products.product_listed') : t('other_products.products_listed')}
                        </div>
                        <div className="bikes-grid">
                            {filteredProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    addToCart={addToCart}
                                    navigate={navigate}
                                    t={t}
                                    isCartEnabled={isCartEnabled}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OtherProducts;
