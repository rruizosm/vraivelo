import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import '../Shop/Shop.css'; // Reuse Shop styles

const categories = ['All', 'Nutrition', 'Components', 'Electronics', 'Clothing', 'Maintenance'];

const products = [
    // ... existing products ...
    // 226ers (Nutrition)
    { id: 101, brand: '226ers', model: 'Energy Gel Bio', category: 'Nutrition', price: '€2.50', image: 'E', desc: 'Organic energy gel with complex carbohydrates.', new: true },
    { id: 102, brand: '226ers', model: 'Isotonic Drink', category: 'Nutrition', price: '€22.00', image: 'I', desc: 'Hydration powder with mineral salts and vitamins.', new: false },
    { id: 103, brand: '226ers', model: 'Recovery Drink', category: 'Nutrition', price: '€28.00', image: 'R', desc: 'Post-workout recovery shake with protein.', new: false },

    // Cycling Parts (Components)
    { id: 201, brand: 'Cycling Parts', model: 'Ceramic Bearings', category: 'Components', price: '€85.00', image: 'B', desc: 'High-performance ceramic bearings for hubs.', new: true },
    { id: 202, brand: 'Cycling Parts', model: 'Carbon Bottle Cage', category: 'Components', price: '€35.00', image: 'C', desc: 'Ultra-lightweight carbon fiber bottle cage.', new: false },

    // Klinpig (Maintenance)
    { id: 301, brand: 'Klinpig', model: 'Bike Cleaner', category: 'Maintenance', price: '€12.99', image: 'K', desc: 'Biodegradable cleaning formula for all bikes.', new: false },
    { id: 302, brand: 'Klinpig', model: 'Chain Lube Ceramic', category: 'Maintenance', price: '€15.50', image: 'L', desc: 'Long-lasting ceramic chain lubricant.', new: true },

    // Garmin (Electronics)
    { id: 401, brand: 'Garmin', model: 'Edge 1040 Solar', category: 'Electronics', price: '€749.99', image: 'G', desc: 'Ultimate GPS bike computer with solar charging.', new: true },
    { id: 402, brand: 'Garmin', model: 'Varia RTL515', category: 'Electronics', price: '€199.99', image: 'V', desc: 'Rearview radar and tail light.', new: false },
    { id: 403, brand: 'Garmin', model: 'Rally RS200', category: 'Electronics', price: '€1,099.99', image: 'P', desc: 'Dual-sensing power meter pedals.', new: false },

    // Shimano (Components)
    { id: 501, brand: 'Shimano', model: 'Dura-Ace Di2 Group', category: 'Components', price: '€3,899.00', image: 'S', desc: '12-speed wireless electronic groupset.', new: true },
    { id: 502, brand: 'Shimano', model: 'Ultegra Pedals', category: 'Components', price: '€145.00', image: 'P', desc: 'Carbon composite body SPD-SL pedals.', new: false },
    { id: 503, brand: 'Shimano', model: 'RC9 S-PHYRE', category: 'Clothing', price: '€359.95', image: 'S', desc: 'Top-tier road racing shoes.', new: false },

    // G-Sport (Clothing)
    { id: 601, brand: 'G-Sport', model: 'Pro Team Jersey', category: 'Clothing', price: '€89.00', image: 'J', desc: 'Aerodynamic fit jersey for high performance.', new: true },
    { id: 602, brand: 'G-Sport', model: 'Bib Shorts Elite', category: 'Clothing', price: '€120.00', image: 'B', desc: 'Comfortable bib shorts with premium chamois.', new: false },
];

const brandsList = [...new Set(products.map(p => p.brand))];

const OtherProducts = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [activeBrands, setActiveBrands] = useState([]);
    const { addToCart } = useCart();

    const toggleBrand = (brand) => {
        if (activeBrands.includes(brand)) {
            setActiveBrands(activeBrands.filter(b => b !== brand));
        } else {
            setActiveBrands([...activeBrands, brand]);
        }
    };

    const filteredProducts = products.filter(product => {
        const matchCategory = activeCategory === 'All' || product.category === activeCategory;
        const matchBrand = activeBrands.length === 0 || activeBrands.includes(product.brand);
        return matchCategory && matchBrand;
    });

    return (
        <div className="shop-container">
            <div className="shop-content">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="shop-header"
                >
                    <span className="shop-badge">
                        ACCESSORIES & COMPONENTS
                    </span>
                    <h1 className="shop-title">
                        Other <span className="text-[var(--primary)]">Products</span>
                    </h1>
                </motion.div>

                <div className="shop-layout">
                    {/* SIDEBAR FILTERS */}
                    <aside className="shop-sidebar">
                        <div className="filter-group">
                            <h3 className="filter-title">Category</h3>
                            <div className="filter-options">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`sidebar-filter-btn ${activeCategory === cat ? 'active' : ''}`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="filter-group">
                            <h3 className="filter-title">Brands</h3>
                            <div className="filter-options">
                                {brandsList.map((brand) => (
                                    <button
                                        key={brand}
                                        onClick={() => toggleBrand(brand)}
                                        className={`sidebar-filter-btn ${activeBrands.includes(brand) ? 'active' : ''}`}
                                    >
                                        <div className={`checkbox ${activeBrands.includes(brand) ? 'checked' : ''}`} />
                                        {brand}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* PRODUCTS GRID */}
                    <div className="bikes-grid">
                        {filteredProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="bike-card group"
                            >
                                <div className="bike-image-wrapper">
                                    <span className="bike-placeholder-text">
                                        {product.image}
                                    </span>
                                    {product.new && (
                                        <span className="new-badge">
                                            NEW
                                        </span>
                                    )}
                                </div>
                                <div className="bike-info">
                                    <p className="bike-brand">{product.brand}</p>
                                    <h3 className="bike-model">{product.model}</h3>
                                    <p className="bike-desc">{product.desc}</p>
                                    <div className="bike-price-row">
                                        <span className="bike-price">{product.price}</span>
                                        <button
                                            className="add-cart-btn-small"
                                            onClick={() => addToCart({
                                                id: product.id,
                                                brand: product.brand,
                                                model: product.model,
                                                price: product.price,
                                                image: null, // No real image url
                                                type: 'other'
                                            })}
                                        >
                                            <ShoppingBag size={18} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OtherProducts;
