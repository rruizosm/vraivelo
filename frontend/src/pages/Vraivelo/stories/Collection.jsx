import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { stories } from '../../../data/stories';
import '../Vraivelo.css';

const Collection = () => {
    const navigate = useNavigate();
    const story = stories.find(s => s.id === 'gallery1');

    if (!story) return null;

    return (
        <div className="story-detail-page collection-page">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="story-hero"
                style={{ backgroundImage: `url(${story.image})` }}
            >
                <div className="story-hero-overlay">
                    <button onClick={() => navigate('/vraivelo')} className="back-link">
                        <ArrowLeft size={20} />
                        Back to Stories
                    </button>
                    <div className="hero-content">
                        <span className="hero-category">{story.category}</span>
                        <h1 className="hero-title">{story.title}</h1>
                    </div>
                </div>
            </motion.div>

            {/* Collection often has no text content, just the hero or maybe a gallery later */}
            <div className="story-content-container">
                <p className="text-center italic text-gray-500">Collection gallery coming soon...</p>
            </div>
        </div>
    );
};

export default Collection;
