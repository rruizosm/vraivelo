import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { stories } from '../../../data/stories';
import '../Vraivelo.css';

const Lifestyle = () => {
    const navigate = useNavigate();
    const story = stories.find(s => s.id === 'gallery2');

    if (!story) return null;

    return (
        <div className="story-detail-page lifestyle-page">
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

            {/* Lifestyle often has no text content */}
            <div className="story-content-container">
                <p className="text-center italic text-gray-500">Lifestyle gallery coming soon...</p>
            </div>
        </div>
    );
};

export default Lifestyle;
