import { useTranslation, Trans } from 'react-i18next';
import {
    StoryPage, StoryHero, StorySection, StoryHeading, StoryProse, StorySplit, StoryPhoto,
    StoryGallery, StoryCTA, StoryButton,
} from '../StoryKit';

const W = '/vraivelo_weekend/';
const bold = { b: <strong />, 1: <strong /> };

const VraiveloWeekend = () => {
    const { t } = useTranslation();

    return (
        <StoryPage id="vv_weekend">
            <StoryHero
                image={`${W}vv_5.jpeg`}
                position="center 40%"
                eyebrow={t('weekend.eyebrow')}
                title={t('weekend.headline')}
                desc={t('weekend.subtitle_1')}
            >
                <StoryButton href="#weekend-video" light>{t('weekend.watch_video')}</StoryButton>
            </StoryHero>

            <StorySection>
                <StorySplit
                    reverse
                    sticky
                    media={<StoryPhoto src="/stories/web/weekend-viaducto.webp" alt={t('weekend.photo_alt')} position="center 60%" />}
                >
                    <StoryHeading eyebrow={t('weekend.story_eyebrow')} title={t('weekend.subtitle_1')} />
                    <StoryProse lead>
                        <p>{t('weekend.p1')}</p>
                        <p>{t('weekend.p2')}</p>
                        <p>{t('weekend.p3')}</p>
                        <p>{t('weekend.p4')}</p>
                    </StoryProse>
                </StorySplit>
            </StorySection>

            {/* The video of the trip */}
            <StorySection tone="dark" id="weekend-video">
                <StoryHeading light eyebrow={t('weekend.video_eyebrow')} title={t('weekend.video_title')} />
                <div className="sk-video">
                    <iframe
                        src="https://www.youtube-nocookie.com/embed/GmX04cXlMf4?rel=0"
                        title={t('weekend.video_title')}
                        loading="lazy"
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            </StorySection>

            <StorySection tone="beige">
                <StoryHeading eyebrow={t('weekend.gallery.title')} title={t('weekend.gallery_title')} />
                <StoryGallery
                    images={[
                        { src: '/stories/web/weekend-4.webp', span: 'big' },
                        { src: `${W}vv_1.jpeg`, span: 'tall' },
                        { src: `${W}vv_2.jpeg`, span: 'tall' },
                        { src: '/stories/web/weekend-3.webp', span: 'tall' },
                        { src: `${W}vv_6.jpeg`, span: 'tall' },
                        { src: `${W}vv_7.jpeg`, span: 'tall' },
                        { src: '/stories/web/weekend-8.webp', span: 'tall' },
                    ].map((img) => ({ ...img, alt: t('weekend.gallery_alt') }))}
                />
            </StorySection>

            <StoryCTA
                eyebrow={t('weekend.subtitle_2')}
                title={t('weekend.cta_title')}
                text={(
                    <>
                        <p><Trans i18nKey="weekend.p5" components={bold} /></p>
                        <p><Trans i18nKey="weekend.p6" components={bold} /></p>
                    </>
                )}
            >
                <StoryButton href="https://www.instagram.com/vraivelo/" light>Instagram</StoryButton>
                <StoryButton href="https://www.strava.com/clubs/1327818" light>Strava</StoryButton>
            </StoryCTA>
        </StoryPage>
    );
};

export default VraiveloWeekend;
