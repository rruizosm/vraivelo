import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ShoppingBag, Loader, Mail } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase';
import { clothes } from '../../data/clothes';
import { useTranslation } from 'react-i18next';
import '../Shop/Shop.css'; // Reuse Shop styles

const ProductCard = ({ product, addToCart, navigate, t, isCartEnabled }) => {
    // Local state for the displayed image to allow color preview
    const [currentImage, setCurrentImage] = useState(product.image_url);

    const handleProductClick = () => {
        navigate(`/shop/${product.id}`);
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
                                navigate(`/shop/${product.id}`);
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
    const [activeCategory, setActiveCategory] = useState('All');
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
                const normalized = (data || []).map(p => ({
                    id: p.id,
                    model: p.Product || p.product,
                    category: p.Type || p.type,
                    price: p.Price || p.price,
                    size: p.Size || p.size,
                    description: p.Description || p.description,
                    image_url: p["Image URL"] || p["image url"] || p.image_url,
                    color: p.Color || p.color,
                    specs: p.Specs || p.specs,
                }));

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
                        <div className="filter-group">
                            <h3 className="filter-title">{t('other_products.category')}</h3>
                            <div className="filter-options">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`sidebar-filter-btn ${activeCategory === cat ? 'active' : ''}`}
                                    >
                                        {categoryKeyMap[cat] ? t(categoryKeyMap[cat]) : cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* PRODUCTS GRID */}
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
    );
};

export default OtherProducts;
