import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import './Shop.css';

const categories = ['All', 'Road', 'Gravel', 'MTB', 'E-Bike'];

const bikes = [
    { id: 1, brand: 'Berria', model: 'Belador Allroad 8', category: 'Gravel', price: '€3,299', new: true },
    { id: 2, brand: 'Liv', model: 'Langma Advanced Pro', category: 'Road', price: '€2,899', new: false },
    { id: 3, brand: 'Giant', model: 'Propel Advanced SL', category: 'Road', price: '€4,500', new: true },
    { id: 4, brand: 'Aurum', model: 'Magma HSP', category: 'MTB', price: '€8,099', new: false },
    { id: 5, brand: 'MMR', model: 'Adrenaline 00', category: 'MTB', price: '€3,599', new: false },
    { id: 6, brand: 'Berria', model: 'Mako Hybrid 11', category: 'E-Bike', price: '€5,999', new: true },
];

const Shop = () => {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredBikes = activeCategory === 'All'
        ? bikes
        : bikes.filter(bike => bike.category === activeCategory);

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

                <div className="filters-container">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`filter-btn ${activeCategory === cat ? 'active' : 'inactive'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

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
    );
};

export default Shop;
