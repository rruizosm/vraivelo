import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ShoppingBag, Loader, Mail, ChevronDown, ChevronUp } from 'lucide-react';
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
                    <span className="bike-price">{product.price}</span>
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
                    .order('id', { ascending: true });

                if (error) throw error;

                console.log('Raw Supabase data:', data);

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
                        size: p.Size || p.size,
                        description: p.Description || p.description,
                        image_url: p["Image URL"] || p["image url"] || p.image_url,
                        color: p.Color || p.color,
                        specs: specs,
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

    // Fixed categories + any additional ones from the data (exclude 'Other Products')
    const baseCategories = ['All', 'Clothes', 'Wheels'];
    const dataCategories = allProducts.map(p => p.category).filter(c => c && c !== 'Other Products');
    const categories = [...new Set([...baseCategories, ...dataCategories])];

    const filteredProducts = allProducts.filter(product => {
        const matchCategory = activeCategory === 'All' ||
            product.category === activeCategory ||
            (activeCategory === 'Clothes' && product.category === 'Other Products');

        return matchCategory;
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
                                            {categoryKeyMap[cat] ? t(categoryKeyMap[cat]) : cat}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </aside>

                    {/* PRODUCTS GRID */}
                    <div style={{ width: '100%' }}>
                        <div style={{ paddingBottom: '1rem', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                            {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'} Listed
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
