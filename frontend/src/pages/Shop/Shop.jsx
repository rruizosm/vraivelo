import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Loader, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase';
import { useTranslation } from 'react-i18next';
import SEOHead from '../../components/SEOHead/SEOHead';
import './Shop.css';

const categories = ['All', 'Road', 'MTB', 'Gravel', 'eBike', 'Kids'];

// ─── Per-card component so each card has its own hover-color state ────────────
const BikeCard = ({ bike, index, navigate, t }) => {
    const variants = (bike.bike_variants || []).map(bv => ({
        color: bv.color_name,
        hex: bv.color_hex,
        image: bv.image_url,
    }));
    const hasVariants = variants.length > 1;

    const [previewImage, setPreviewImage] = useState(bike.image_url || null);
    const [activeVariant, setActiveVariant] = useState(null);

    const handleSwatchEnter = (v) => {
        setActiveVariant(v.color);
        if (v.image) setPreviewImage(v.image);
    };

    const handleSwatchLeave = () => {
        setActiveVariant(null);
        setPreviewImage(bike.image_url || null);
    };

    return (
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
                    <span className="sold-badge-card">{t('product.sold')}</span>
                )}
                {previewImage ? (
                    <img src={previewImage} alt={bike.model} className="bike-image" />
                ) : (
                    <span className="bike-placeholder-text">{bike.brand.charAt(0)}</span>
                )}
                {bike.is_new && bike.quantity !== 0 && (
                    <span className="new-badge">NEW</span>
                )}
            </div>

            <div className="bike-info">
                <p className="bike-brand">{bike.brand}</p>
                <h3 className="bike-model">{bike.model}</h3>

                <div className="bike-price-row">
                    <span className="bike-price-new">{bike.price}</span>

                    {/* Color swatches */}
                    {hasVariants && (
                        <div
                            className="bike-card-swatches"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {variants.map((v) => (
                                <div
                                    key={v.color}
                                    className={`bike-card-swatch ${activeVariant === v.color ? 'active' : ''
                                        }`}
                                    style={{ backgroundColor: v.hex || '#ccc' }}
                                    title={v.color}
                                    onMouseEnter={() => handleSwatchEnter(v)}
                                    onMouseLeave={handleSwatchLeave}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

const Shop = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [bikes, setBikes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState(() => sessionStorage.getItem('shop_activeCategory') || 'All');
    const [activeBrands, setActiveBrands] = useState(() => {
        const saved = sessionStorage.getItem('shop_activeBrands');
        return saved ? JSON.parse(saved) : [];
    });
    const [priceRange, setPriceRange] = useState([0, 15000]);
    const [activeMaterials, setActiveMaterials] = useState(() => {
        const saved = sessionStorage.getItem('shop_activeMaterials');
        return saved ? JSON.parse(saved) : [];
    });
    const [expandedFilters, setExpandedFilters] = useState({
        price: true,
        material: true,
        category: true,
        brand: true
    });
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        sessionStorage.setItem('shop_activeCategory', activeCategory);
        sessionStorage.setItem('shop_activeBrands', JSON.stringify(activeBrands));
        sessionStorage.setItem('shop_activeMaterials', JSON.stringify(activeMaterials));
    }, [activeCategory, activeBrands, activeMaterials]);

    // Fetch bikes from Supabase
    useEffect(() => {
        const fetchBikes = async () => {
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('bikes')
                    .select('*, bike_variants(*)')
                    .eq('Active', true)
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

    const toggleMaterial = (material) => {
        if (activeMaterials.includes(material)) {
            setActiveMaterials(activeMaterials.filter(m => m !== material));
        } else {
            setActiveMaterials([...activeMaterials, material]);
        }
    };

    const toggleSection = (section) => {
        setExpandedFilters(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const parsePrice = (priceStr) => {
        if (!priceStr) return 0;
        const s = String(priceStr).replace(/[^\d.,]/g, '');
        return Number(s.replace(/\./g, '').replace(/,/g, ''));
    };

    const filteredBikes = bikes.filter(bike => {
        const matchCategory = activeCategory === 'All' || bike.category === activeCategory;
        const matchBrand = activeBrands.length === 0 || activeBrands.includes(bike.brand);
        const matchMaterial = activeMaterials.length === 0 || activeMaterials.some(mat =>
            (bike.Material || '').toLowerCase() === mat.toLowerCase()
        );
        const bikePrice = parsePrice(bike.price);
        const matchPrice = bikePrice >= priceRange[0] && bikePrice <= priceRange[1];
        const q = searchQuery.trim().toLowerCase();
        const matchSearch = !q ||
            (bike.brand || '').toLowerCase().includes(q) ||
            (bike.model || '').toLowerCase().includes(q);

        return matchCategory && matchBrand && matchMaterial && matchPrice && matchSearch;
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
            <SEOHead titleKey="seo.shop.title" descriptionKey="seo.shop.description" path="/shop" />
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

                        {/* Frame Material Filter */}
                        <div className="filter-group accordion-group">
                            <button className="filter-accordion-header" onClick={() => toggleSection('material')}>
                                <h3 className="filter-title">Frame Material</h3>
                                {expandedFilters.material ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </button>
                            {expandedFilters.material && (
                                <div className="filter-options-content">
                                    {['Carbon', 'Aluminum'].map((mat) => (
                                        <button
                                            key={mat}
                                            onClick={() => toggleMaterial(mat)}
                                            className={`sidebar-filter-btn ${activeMaterials.includes(mat) ? 'active' : ''}`}
                                        >
                                            <div className={`checkbox ${activeMaterials.includes(mat) ? 'checked' : ''}`} />
                                            {mat}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Category Filter */}
                        <div className="filter-group accordion-group">
                            <button className="filter-accordion-header" onClick={() => toggleSection('category')}>
                                <h3 className="filter-title">Category</h3>
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
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Brands Filter */}
                        <div className="filter-group accordion-group">
                            <button className="filter-accordion-header" onClick={() => toggleSection('brand')}>
                                <h3 className="filter-title">Brands</h3>
                                {expandedFilters.brand ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </button>
                            {expandedFilters.brand && (
                                <div className="filter-options-content">
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
                            )}
                        </div>

                        {/* Price Range Filter */}
                        <div className="filter-group accordion-group">
                            <button className="filter-accordion-header" onClick={() => toggleSection('price')}>
                                <h3 className="filter-title">Price Range</h3>
                                {expandedFilters.price ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </button>
                            {expandedFilters.price && (
                                <div className="filter-options-content">
                                    <div className="range-slider-container">
                                        <div className="range-slider-track">
                                            <div className="range-slider-fill" style={{ left: `${(priceRange[0] / 15000) * 100}%`, width: `${((priceRange[1] - priceRange[0]) / 15000) * 100}%` }}></div>
                                        </div>
                                        <input type="range" min="0" max="15000" step="500" value={priceRange[0]} onChange={(e) => {
                                            const val = Math.min(Number(e.target.value), priceRange[1] - 500);
                                            setPriceRange([val, priceRange[1]]);
                                        }} />
                                        <input type="range" min="0" max="15000" step="500" value={priceRange[1]} onChange={(e) => {
                                            const val = Math.max(Number(e.target.value), priceRange[0] + 500);
                                            setPriceRange([priceRange[0], val]);
                                        }} />
                                    </div>
                                    <div className="range-slider-labels">
                                        <span>{priceRange[0].toLocaleString('de-DE')} €</span>
                                        <span>{priceRange[1].toLocaleString('de-DE')} €</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </aside>

                    {/* BIKES GRID AREA */}
                    <div style={{ width: '100%' }}>
                        {/* Search Bar */}
                        <div className="shop-search-bar">
                            <Search size={18} className="shop-search-icon" />
                            <input
                                id="shop-search-input"
                                type="text"
                                className="shop-search-input"
                                placeholder={t('shop.search_placeholder')}
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
                            {filteredBikes.length} {filteredBikes.length === 1 ? 'Bike' : 'Bikes'} Listed
                        </div>
                        <div className="bikes-grid">
                            {filteredBikes.map((bike, index) => (
                                <BikeCard
                                    key={bike.id}
                                    bike={bike}
                                    index={index}
                                    navigate={navigate}
                                    t={t}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;
