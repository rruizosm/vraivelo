import { useTranslation } from 'react-i18next';
import {
    StoryPage, StoryHero, StorySection, StoryHeading, StoryProse, StoryStats, StorySplit, StoryPhoto,
    StoryPoints, StoryGallery, StoryQuote, StoryCTA, StoryButton,
} from '../StoryKit';

const G = '/vraivelo_berria/Girona/';

const VraiveloBerria = () => {
    const { t } = useTranslation();

    return (
        <StoryPage id="berria">
            <StoryHero
                image={`${G}DSC00196.jpeg`}
                position="center 55%"
                eyebrow={t('berria.hero.badge')}
                title={t('berria.hero.title')}
                desc={t('berria.hero.desc')}
            />

            <StorySection>
                <StorySplit
                    reverse
                    sticky
                    media={<StoryPhoto src="/stories/web/berria-ajuste-bici.webp" alt={t('berria.article.photo_alt')} position="center 40%" />}
                >
                    <StoryHeading eyebrow={t('berria.article.subheading')} title={t('berria.article.heading')} />
                    <StoryProse lead>
                        <p>{t('berria.article.p1')}</p>
                        <p>{t('berria.article.p2')}</p>
                        <p>{t('berria.article.p3')}</p>
                    </StoryProse>
                </StorySplit>
            </StorySection>

            <StorySection tone="dark">
                <StoryStats
                    items={[1, 2, 3].map((n) => ({ value: t(`berria.stats.s${n}_val`), label: t(`berria.stats.s${n}_label`) }))}
                />
                <StorySplit
                    sticky
                    media={<StoryPhoto src="/stories/web/berria-ruta-gravel.webp" alt={t('berria.article.photo2_alt')} position="center 65%" tall={false} />}
                >
                    <StoryProse>
                        <p>{t('berria.article.p4')}</p>
                        <p>{t('berria.article.p5')}</p>
                        <p>{t('berria.article.p6')}</p>
                    </StoryProse>
                </StorySplit>
            </StorySection>

            <StorySection>
                <StoryHeading eyebrow={t('berria.features.eyebrow')} title={t('berria.features.title')} />
                <StoryPoints
                    items={[1, 2, 3].map((n) => ({ title: t(`berria.features.f${n}_title`), desc: t(`berria.features.f${n}_desc`) }))}
                />
            </StorySection>

            <StorySection tone="beige">
                <StoryHeading eyebrow={t('berria.gallery.eyebrow')} title={t('berria.gallery.title')} aside={t('berria.gallery.subtitle')} />
                <StoryGallery
                    images={[
                        { src: `${G}DSC00322.jpeg`, caption: t('berria.gallery.c1'), span: 'tall' },
                        { src: `${G}DSC00343.jpeg`, caption: t('berria.gallery.c3'), span: 'big' },
                        { src: `${G}DSC00346.jpeg`, caption: t('berria.gallery.c2'), span: 'tall' },
                        { src: `${G}DSC00369.jpeg`, caption: t('berria.gallery.c4'), span: 'tall' },
                        { src: `${G}DSC00329.jpeg`, caption: t('berria.gallery.c6'), span: 'big' },
                        { src: `${G}DSC00245.jpeg`, caption: t('berria.gallery.c5'), span: 'tall' },
                    ]}
                />
            </StorySection>

            <StoryQuote image={`${G}DSC00339.jpeg`} position="center 60%" quote={t('berria.footer.quote')} author="Vraivēlo × Berria · Girona" />

            <StoryCTA eyebrow={t('berria.cta.eyebrow')} title={t('berria.cta.title')} text={t('berria.cta.text')}>
                <StoryButton to="/shop/?marca=Berria" light>{t('berria.cta.bikes')}</StoryButton>
                <StoryButton to="/vraivelo/calendar/" light>{t('berria.cta.calendar')}</StoryButton>
            </StoryCTA>
        </StoryPage>
    );
};

export default VraiveloBerria;
