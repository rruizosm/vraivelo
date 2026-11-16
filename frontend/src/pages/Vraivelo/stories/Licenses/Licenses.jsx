import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import {
    StoryPage, StoryHero, StorySection, StoryHeading, StorySplit, StoryPoints, StoryCTA, StoryButton,
} from '../StoryKit';

// Licences handled with the Federació Catalana de Ciclisme. `features` = how many lines the card has.
const LICENSES = [
    { key: 'competitive', price: '142€', features: 4, featured: true },
    { key: 'noncompetitive', price: '142€', features: 3 },
    { key: 'cicloturista', price: '123€', features: 4 },
    { key: 'targeta', price: '44€ / 55€', features: 4 },
];

const Licenses = () => {
    const { t } = useTranslation();

    return (
        <StoryPage id="licenses">
            <StoryHero
                image="/stories/web/licenses.webp"
                position="center 45%"
                eyebrow={t('licenses.eyebrow')}
                title={t('licenses.hero.title')}
                desc={t('licenses.hero.subtitle')}
            >
                <StoryButton href="#licencias" light>{t('licenses.hero.cta')}</StoryButton>
            </StoryHero>

            <StorySection tone="beige" id="licencias">
                <StoryHeading eyebrow={t('licenses.grid.eyebrow')} title={t('licenses.grid.title')} aside={t('licenses.grid.subtitle')} />
                <div className="sk-licenses">
                    {LICENSES.map((l, i) => {
                        const base = `licenses.cards.${l.key}`;
                        const title = t(`${base}.title`);
                        return (
                            <motion.article
                                key={l.key}
                                className={`sk-license${l.featured ? ' sk-license--featured' : ''}`}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <p className="sk-license-badge">
                                    {l.featured && <Star size={13} fill="currentColor" aria-hidden="true" />}
                                    {t(`${base}.badge`)}
                                </p>
                                <h3 className="sk-license-title">{title}</h3>
                                <p className="sk-license-desc">{t(`${base}.desc`)}</p>
                                <p className="sk-license-price">
                                    <span>{l.price}</span>
                                    <small>{t(`${base}.period`)}</small>
                                </p>
                                <ul className="sk-license-features">
                                    {Array.from({ length: l.features }, (_, n) => (
                                        <li key={n}><Check size={16} strokeWidth={2.5} aria-hidden="true" /> {t(`${base}.features.${n}`)}</li>
                                    ))}
                                </ul>
                                <StoryButton to="/contact" state={{ subject: 'licenses', message: title }} light={l.featured}>
                                    {t('licenses.cta.btn')}
                                </StoryButton>
                            </motion.article>
                        );
                    })}
                </div>
            </StorySection>

            <StorySection>
                <StorySplit
                    media={(
                        <div className="sk-frame sk-frame--tall">
                            <img src="/stories/web/licenses-story.webp" alt="" loading="lazy" decoding="async" />
                        </div>
                    )}
                >
                    <StoryHeading eyebrow={t('licenses.info.eyebrow')} title={t('licenses.info.title')} />
                    <StoryPoints
                        columns={1}
                        items={[1, 2, 3].map((n) => ({ title: t(`licenses.info.b${n}.title`), desc: t(`licenses.info.b${n}.desc`) }))}
                    />
                </StorySplit>
            </StorySection>

            <StoryCTA eyebrow={t('licenses.eyebrow')} title={t('licenses.cta.title')} text={t('licenses.cta.desc')}>
                <StoryButton to="/contact" state={{ subject: 'licenses' }} light>{t('licenses.cta.btn')}</StoryButton>
            </StoryCTA>
        </StoryPage>
    );
};

export default Licenses;
