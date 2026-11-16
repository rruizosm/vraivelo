import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { stories } from '../../data/stories';
import SEOHead from '../../components/SEOHead/SEOHead';
import { StoryCard } from './stories/StoryKit';
import './Vraivelo.css';

// Vraivēlo stories: the same grid of square / tall blocks as before; each block is a real link
// (StoryCard) with the site's hover (photo zoom, darker shade, "Leer historia" sliding up).
const Vraivelo = () => {
    const { t, i18n } = useTranslation();
    const currentStories = (stories[i18n.language] || stories.en).filter((s) => s.content);

    return (
        <div className="vraivelo-page">
            <SEOHead titleKey="seo.vraivelo.title" descriptionKey="seo.vraivelo.description" path="/vraivelo" />
            <h1 className="vraivelo-sr-only">{t('vraivelo.title')}</h1>
            <div className="stories-grid">
                {currentStories.map((story, index) => (
                    <motion.div
                        key={story.id}
                        className={`story-cell ${story.size}`}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <StoryCard story={story} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Vraivelo;
