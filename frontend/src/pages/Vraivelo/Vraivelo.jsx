import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { stories } from '../../data/stories';
import './Vraivelo.css';

const Vraivelo = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleStoryClick = (story) => {
        if (story.content) {
            navigate(`/vraivelo/${story.id}`);
        }
    };

    return (
        <div className="vraivelo-page">
            <div className="stories-grid">
                {stories.map((story, index) => (
                    <motion.div
                        key={story.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`story-card ${story.size}`}
                        onClick={() => handleStoryClick(story)}
                        style={{ backgroundImage: `url(${story.image})` }}
                    >
                        <div className="story-overlay">
                            <span className="story-category">{story.category}</span>
                            <h2 className="story-title">{story.title}</h2>
                            {story.content && (
                                <button className="read-more-btn">
                                    Read Story <ArrowRight size={16} />
                                </button>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Vraivelo;
