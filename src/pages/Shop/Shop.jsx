import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import './Shop.css';

const categories = ['All', 'Road', 'MTB', 'Gravel', 'E-Bike', 'Time Trial'];

const bikes = [
    // Berria
    { id: 101, brand: 'Berria', model: 'Belador Pro', category: 'Road', price: '€2,600 – €4,500', new: true, desc: 'Aero road frame with fully internal cabling in Keronite finish.' },
    { id: 102, brand: 'Berria', model: 'Mako', category: 'MTB', price: '€3,900 – €10,300', new: false, desc: 'Full suspension XC bike with integrated rear shock.' },
    { id: 103, brand: 'Berria', model: 'Bravo', category: 'MTB', price: '€1,599 – €3,250', new: false, desc: 'Hardtail MTB with Softex carbon flex pivot.' },
    { id: 104, brand: 'Berria', model: 'Allroad', category: 'Gravel', price: '€1,600 – €3,200', new: false, desc: 'Gravel bike with flared handlebars for dusty trails.' },
    { id: 105, brand: 'Berria', model: 'Belador Hybrid', category: 'E-Bike', price: '€5,300 – €6,300', new: true, desc: 'E-Road bike with integrated motor in downtube.' },

    // Factor
    { id: 201, brand: 'Factor', model: 'OSTRO VAM', category: 'Road', price: '€10,500 – €12,000', new: true, desc: 'Flagship aero racer in Chrome/Raw Carbon.' },
    { id: 202, brand: 'Factor', model: 'O2 VAM', category: 'Road', price: '€7,500 – €11,000', new: false, desc: 'Ultra-lightweight climbing bike.' },
    { id: 203, brand: 'Factor', model: 'HANZO', category: 'Time Trial', price: '€7,500 (Frame)', new: false, desc: 'Aggressive TT bike with airfoil shapes.' },
    { id: 204, brand: 'Factor', model: 'OSTRO Gravel', category: 'Gravel', price: '€8,800 – €10,000', new: true, desc: 'Aero-gravel frame for rough terrain.' },
    { id: 205, brand: 'Factor', model: 'ONE', category: 'Road', price: '€8,200 – €13,000', new: false, desc: 'Distinctive Twin Vane split downtube.' },

    // Giant
    { id: 301, brand: 'Giant', model: 'TCR Advanced SL 0', category: 'Road', price: '€8,500 – €11,500', new: true, desc: 'Classic climbing racer with ISP.' },
    { id: 302, brand: 'Giant', model: 'Propel Advanced Pro', category: 'Road', price: '€5,500 – €7,000', new: false, desc: 'Pure aero bike with deep-section rims.' },
    { id: 303, brand: 'Giant', model: 'Defy Advanced', category: 'Road', price: '€2,800 – €4,500', new: false, desc: 'Endurance geometry for long-distance comfort.' },
    { id: 304, brand: 'Giant', model: 'Revolt Advanced Pro', category: 'Gravel', price: '€4,500 – €7,000', new: true, desc: 'Gravel bike with flip-chip dropout.' },
    { id: 305, brand: 'Giant', model: 'Trance X', category: 'MTB', price: '€3,500 – €5,500', new: false, desc: 'Full suspension trail bike with Maestro linkage.' },

    // Liv
    { id: 401, brand: 'Liv', model: 'Langma Advanced SL', category: 'Road', price: '€6,600 – €8,300', new: true, desc: 'Lightweight women\'s climbing frame.' },
    { id: 402, brand: 'Liv', model: 'EnviLiv Advanced Pro', category: 'Road', price: '€4,200 – €6,500', new: false, desc: 'Aggressive sprinter\'s aero bike.' },
    { id: 403, brand: 'Liv', model: 'Avail Advanced', category: 'Road', price: '€2,300 – €4,400', new: false, desc: 'Endurance road bike with comfort geometry.' },
    { id: 404, brand: 'Liv', model: 'Devote Advanced', category: 'Gravel', price: '€2,500 – €3,800', new: false, desc: 'Adventure gravel bike with extra mounts.' },
    { id: 405, brand: 'Liv', model: 'Pique Advanced 29', category: 'MTB', price: '€5,800 – €8,300', new: true, desc: 'Fast XC MTB with 29-inch wheels.' },

    // MMR
    { id: 501, brand: 'MMR', model: 'Adrenaline SL', category: 'Road', price: '€5,500 – €8,700', new: true, desc: 'Lightweight carbon road bike.' },
    { id: 502, brand: 'MMR', model: 'Adrenaline Aero', category: 'Road', price: '€3,600 – €5,400', new: false, desc: 'Aggressive aero profile.' },
    { id: 503, brand: 'MMR', model: 'Grand Tour', category: 'Road', price: '€2,700 – €4,000', new: false, desc: 'Relaxed endurance geometry.' },
    { id: 504, brand: 'MMR', model: 'Kenta SL', category: 'MTB', price: '€4,500 – €9,999', new: true, desc: 'Full suspension race bike.' },
    { id: 505, brand: 'MMR', model: 'X-Tour', category: 'Gravel', price: '€2,500 – €3,500', new: false, desc: 'Rugged carbon gravel bike.' },

    // Aurum
    { id: 601, brand: 'Aurum', model: 'Magma V2', category: 'Road', price: '€8,500 – €11,000', new: true, desc: 'Flagship road bike in Carbon Black.' },
    { id: 602, brand: 'Aurum', model: 'Magma Essentia', category: 'Road', price: '€5,400 – €7,200', new: false, desc: 'Identical shape to V2, accessible build.' },
    { id: 603, brand: 'Aurum', model: 'Manto', category: 'Gravel', price: '€5,000 – €8,000', new: true, desc: 'Beefed-up Magma for gravel.' },
    { id: 604, brand: 'Aurum', model: 'Magma "Tenerife"', category: 'Road', price: '€12,000+', new: true, desc: 'Special Alberto Contador edition.' },
    { id: 605, brand: 'Aurum', model: 'V Anniversary', category: 'Road', price: 'Collector Price', new: true, desc: 'Exclusive limited run design.' },
];
const brandsList = [...new Set(bikes.map(bike => bike.brand))];

const Shop = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [activeBrands, setActiveBrands] = useState([]);

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
                            >
                                <div className="bike-image-wrapper">
                                    <span className="bike-placeholder-text">
                                        {bike.brand.charAt(0)}
                                    </span>
                                    {bike.new && (
                                        <span className="new-badge">
                                            NEW
                                        </span>
                                    )}
                                </div>
                                <div className="bike-info">
                                    <p className="bike-brand">{bike.brand}</p>
                                    <h3 className="bike-model">{bike.model}</h3>
                                    <p className="bike-desc">{bike.desc}</p>
                                    <div className="bike-price-row">
                                        <span className="bike-price">{bike.price}</span>
                                        <ArrowRight size={18} className="bike-arrow" />
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
