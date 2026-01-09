import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowRight, Loader, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase';
import { useTranslation } from 'react-i18next';
import './Shop.css';

const categories = ['All', 'Road', 'MTB', 'Gravel', 'E-Bike', 'Time Trial'];

const Shop = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [bikes, setBikes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');
    const [activeBrands, setActiveBrands] = useState([]);

    // Fetch bikes from Supabase
    useEffect(() => {
        const fetchBikes = async () => {
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('bikes')
                    .select('*')
                    .order('brand', { ascending: true });

                if (error) throw error;
                setBikes(data || []);
            } catch (error) {
                console.error('Error fetching bikes:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBikes();
    }, []);

    // Derive detailed brands list from fetched data
    const brandsList = [...new Set(bikes.map(bike => bike.brand))];

    const toggleBrand = (brand) => {
        if (activeBrands.includes(brand)) {
            setActiveBrands(activeBrands.filter(b => b !== brand));
        } else {
            setActiveBrands([...activeBrands, brand]);
        }
    };

    const filteredBikes = bikes.filter(bike => {
        const matchCategory = activeCategory === 'All' || bike.category === activeCategory;
        const matchBrand = activeBrands.length === 0 || activeBrands.includes(bike.brand);
        return matchCategory && matchBrand;
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
                        PREMIUM COLLECTION
                    </span>
                    <h1 className="shop-title">
                        Our <span className="text-[var(--primary)]">Bikes</span>
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

                    {/* BIKES GRID */}
                    <div className="bikes-grid">
                        {filteredBikes.map((bike, index) => (
                            <motion.div
                                key={bike.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="bike-card group"
                                onClick={() => navigate(`/shop/${bike.id}`)}
                            >
                                <div className="bike-image-wrapper">
                                    {bike.quantity === 0 && (
                                        <span className="sold-badge-card">
                                            {t('product.sold')}
                                        </span>
                                    )}
                                    {bike.image_url ? (
                                        <img src={bike.image_url} alt={bike.model} className="bike-image" />
                                    ) : (
                                        <span className="bike-placeholder-text">
                                            {bike.brand.charAt(0)}
                                        </span>
                                    )}
                                    {bike.is_new && bike.quantity !== 0 && (
                                        <span className="new-badge">
                                            NEW
                                        </span>
                                    )}
                                </div>
                                <div className="bike-info">
                                    <p className="bike-brand">{bike.brand}</p>
                                    <h3 className="bike-model">{bike.model}</h3>
                                    <p className="bike-desc">{bike.description}</p>
                                    <div className="bike-price-row">
                                        <span className="bike-price">{bike.price}</span>
                                        <button
                                            className="add-cart-btn-small"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/shop/${bike.id}`);
                                            }}
                                            title={t('product.view_details')}
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

export default Shop;
