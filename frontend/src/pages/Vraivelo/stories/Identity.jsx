import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { stories } from '../../../data/stories';
import '../Vraivelo.css';

const Identity = () => {
    const navigate = useNavigate();
    const story = stories.find(s => s.id === 'who');

    if (!story) return null;

    return (
        <div className="story-detail-page identity-page">
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

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="story-content-container"
            >
                <div className="story-body">
                    <ReactMarkdown
                        components={{
                            img: ({ node, ...props }) => (
                                <span className="story-image-wrapper">
                                    <img {...props} className="story-inline-image" alt={props.alt || ''} />
                                    {props.alt && <span className="image-caption">{props.alt}</span>}
                                </span>
                            )
                        }}
                    >
                        {story.content}
                    </ReactMarkdown>
                </div>
            </motion.div>
        </div>
    );
};

export default Identity;
