import { useTranslation } from 'react-i18next';
import {
    StoryPage, StoryHero, StorySection, StoryHeading, StoryProse, StoryStats, StoryPoints,
    StorySplit, StoryPhoto, StoryGallery, StoryCTA, StoryButton,
} from '../StoryKit';

const STRAVA_CLUB = 'https://www.strava.com/clubs/1327818';
const INSTAGRAM = 'https://www.instagram.com/vraivelo/';

const StravaTeam = () => {
    const { t } = useTranslation();

    return (
        <StoryPage id="strava_team">
            <StoryHero
                image="/stories/strava_team.jpg"
                position="center 40%"
                eyebrow={t('strava.badge')}
                title={`${t('strava.hero_title_1')} ${t('strava.hero_title_2')}`}
                desc={t('strava.hero_desc')}
            >
                <StoryButton href={STRAVA_CLUB} light>{t('strava.join_strava')}</StoryButton>
            </StoryHero>

            <StorySection tone="dark">
                <StoryStats
                    items={[
                        { value: '+300', label: t('strava.stats.members') },
                        { value: '+100k', label: t('strava.stats.weekly_km') },
                        { value: '+50', label: t('strava.stats.routes') },
                    ]}
                />
            </StorySection>

            <StorySection>
                <StorySplit
                    reverse
                    sticky
                    media={<StoryPhoto src="/stories/web/strava-salida-club.webp" alt={t('strava.story.photo_alt')} position="center 70%" />}
                >
                    <StoryHeading eyebrow={t('strava.story.subheading')} title={t('strava.story.heading')} />
                    <StoryProse lead>
                        {[1, 2, 3, 4, 5].map((n) => <p key={n}>{t(`strava.story.p${n}`)}</p>)}
                    </StoryProse>
                </StorySplit>
            </StorySection>

            {/* The club on Strava */}
            <StorySection tone="beige">
                <StorySplit
                    reverse
                    media={(
                        <div className="sk-club-card">
                            <div className="sk-club-card-head">
                                <span className="sk-club-avatar" aria-hidden="true">V</span>
                                <div>
                                    <p className="sk-club-name">{t('strava.card.club_name')}</p>
                                    <p className="sk-club-verified">{t('strava.card.verified')}</p>
                                </div>
                                <a className="sk-club-follow" href={STRAVA_CLUB} target="_blank" rel="noopener noreferrer">{t('strava.card.follow')}</a>
                            </div>
                            <p className="sk-club-label">{t('strava.card.leaderboard')}</p>
                            <ol className="sk-club-board">
                                <li>
                                    <span className="sk-club-rank is-first">1</span>
                                    <img src="/stories/strava_user/david.jpg" alt="" />
                                    <span className="sk-club-rider">David Gijon</span>
                                    <span className="sk-club-km">342 km</span>
                                </li>
                                <li>
                                    <span className="sk-club-rank">2</span>
                                    <img src="/stories/strava_user/juan.jpg" alt="" />
                                    <span className="sk-club-rider">Juan Diego Cárdenas</span>
                                    <span className="sk-club-km">298 km</span>
                                </li>
                            </ol>
                            <div className="sk-club-map">
                                <img src="/stories/mapa.png" alt="" loading="lazy" />
                                <p>
                                    <small>{t('strava.card.recent_activity')}</small>
                                    {t('strava.card.sunday_spin')}
                                </p>
                            </div>
                        </div>
                    )}
                >
                    <StoryHeading eyebrow="Strava" title={`${t('strava.club.title_prefix')} ${t('strava.club.title_highlight')}`} />
                    <StoryProse><p>{t('strava.club.desc')}</p></StoryProse>
                    <StoryPoints
                        columns={1}
                        items={[
                            { title: t('strava.club.track_title'), desc: t('strava.club.track_desc') },
                            { title: t('strava.club.compete_title'), desc: t('strava.club.compete_desc') },
                            { title: t('strava.club.updated_title'), desc: t('strava.club.updated_desc') },
                        ]}
                    />
                </StorySplit>
            </StorySection>

            <StorySection>
                <StoryHeading
                    eyebrow={t('strava.gallery.watermark')}
                    title={`${t('strava.gallery.title_prefix')} ${t('strava.gallery.title_highlight')}`}
                    aside={t('strava.gallery.subtitle')}
                />
                <StoryGallery
                    images={[
                        { src: '/stories/social_ride_1.jpg', span: 'big', caption: t('strava.gallery.community'), alt: t('strava.gallery.community') },
                        { src: '/stories/social_ride_2.jpg', span: 'tall' },
                        { src: '/stories/social_ride_3.jpg', span: 'tall' },
                        { src: '/stories/social_ride_4.jpg', span: 'tall', position: 'center 30%' },
                        { src: '/stories/social_ride_5.jpg', span: 'full', caption: t('strava.gallery.post_ride_title'), desc: t('strava.gallery.post_ride_desc') },
                    ]}
                />
            </StorySection>

            <StoryCTA
                eyebrow={t('strava.badge')}
                title={`${t('strava.cta.title_prefix')} ${t('strava.cta.title_highlight')}`}
                text={t('strava.cta.desc')}
            >
                <StoryButton href={STRAVA_CLUB} light>{t('strava.cta.join_club')}</StoryButton>
                <StoryButton href={INSTAGRAM} light>{t('strava.cta.follow_ig')}</StoryButton>
            </StoryCTA>
        </StoryPage>
    );
};

export default StravaTeam;
