import { useTranslation, Trans } from 'react-i18next';
import {
    StoryPage, StoryHero, StorySection, StoryHeading, StoryProse, StorySplit, StoryPhoto,
    StorySlideshow, StoryChecks, StoryQuote, StoryCTA, StoryButton,
} from '../StoryKit';

const vrai = { vrai: <span className="sk-accent" />, vraiWhite: <span className="sk-accent" />, bold: <strong /> };
const list = (value) => (Array.isArray(value) ? value : []);

const FIRST_SHOP = ['/primer_local/local_11.jpeg', '/primer_local/local_3.jpeg', '/primer_local/local_4.jpeg', '/primer_local/local_5.jpeg', '/primer_local/local_14.jpeg'];
const NEW_SHOP = ['/david_vraivelo/local.jpeg', '/david_vraivelo/local_2.jpeg', '/david_vraivelo/local_3.jpeg'];

const Origins = () => {
    const { t } = useTranslation();

    return (
        <StoryPage id="start">
            <StoryHero
                image="/stories/vraivelo_taller.jpeg"
                position="center 55%"
                eyebrow={t('origins.eyebrow')}
                title={t('origins.hero.title')}
                desc={t('origins.hero.desc')}
            />

            {/* Intro */}
            <StorySection>
                <StorySplit
                    reverse
                    media={<StoryPhoto src="/stories/web/origins-victoria.webp" alt={t('origins.intro.photo_alt')} position="center 30%" tall={false} />}
                >
                    <StoryProse lead>
                        <p><Trans i18nKey="origins.intro.title" components={vrai} /></p>
                        <p>{t('origins.intro.text')}</p>
                    </StoryProse>
                </StorySplit>
            </StorySection>

            {/* Racing years */}
            <StorySection tone="beige">
                <StorySplit
                    reverse
                    media={(
                        <div className="sk-collage">
                            <img src="/david_competitor/14.PNG" alt={t('origins.competitive.alt_mtb')} loading="lazy" />
                            <img src="/david_competitor/4.PNG" alt="" loading="lazy" />
                            <img src="/david_competitor/8.PNG" alt="" loading="lazy" />
                            <img src="/david_competitor/11.PNG" alt="" loading="lazy" />
                        </div>
                    )}
                >
                    <StoryHeading eyebrow={t('origins.competitive.label')} title={t('origins.competitive.heading')} />
                    <StoryProse><p>{t('origins.competitive.text')}</p></StoryProse>
                    <blockquote className="sk-pull">
                        <p>{t('origins.competitive.quote')}</p>
                        <footer>{t('origins.competitive.author')}</footer>
                    </blockquote>
                </StorySplit>
            </StorySection>

            <StoryQuote image="/david_vraivelo/david_vraivelo_1.jpeg" position="center 35%" quote={t('origins.quote_banner.title')} author="David · Vraivēlo" />

            {/* The first workshop */}
            <StorySection>
                <StorySplit media={<StorySlideshow images={FIRST_SHOP} badge={t('origins.bridging.badge')} />}>
                    <StoryHeading eyebrow={t('origins.building.label')} title={t('origins.building.heading')} />
                    <StoryProse>
                        <p>{t('origins.building.text_1')}</p>
                        <p><Trans i18nKey="origins.building.text_2" components={vrai} /></p>
                    </StoryProse>
                    <StoryChecks items={list(t('origins.building.features', { returnObjects: true }))} />
                </StorySplit>
            </StorySection>

            {/* The new shop */}
            <StorySection tone="beige">
                <StorySplit reverse media={<StorySlideshow images={NEW_SHOP} />}>
                    <StoryHeading eyebrow={t('origins.bridging.label')} title={t('origins.bridging.heading')} />
                    <StoryProse>
                        <p><Trans i18nKey="origins.bridging.text_1" components={vrai} /></p>
                        <p><Trans i18nKey="origins.bridging.text_2" components={vrai} /></p>
                        <p><Trans i18nKey="origins.bridging.text_3" components={vrai} /></p>
                    </StoryProse>
                    <StoryChecks items={list(t('origins.bridging.features', { returnObjects: true }))} />
                </StorySplit>
            </StorySection>

            <StoryCTA eyebrow={t('origins.cta.eyebrow')} title={t('origins.cta.title')} text={t('origins.cta.text')}>
                <StoryButton to="/workshop" light>{t('origins.cta.workshop')}</StoryButton>
                <StoryButton to="/contact" light>{t('origins.cta.contact')}</StoryButton>
            </StoryCTA>
        </StoryPage>
    );
};

export default Origins;
