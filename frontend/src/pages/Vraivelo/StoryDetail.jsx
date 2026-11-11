import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEOHead from '../../components/SEOHead/SEOHead';
import { stories } from '../../data/stories';
import Origins from './stories/Origins/Origins';
import VraiveloWeekend from './stories/VraiveloWeekend/VraiveloWeekend';
import VraiveloBerria from './stories/VraiveloBerria/VraiveloBerria';
import StravaTeam from './stories/StravaTeam/StravaTeam';
import Calendar from './stories/Calendar/Calendar';
import Licenses from './stories/Licenses/Licenses';

// Map IDs to Components
const STORY_COMPONENTS = {
    start: Origins,
    vv_weekend: VraiveloWeekend,
    berria: VraiveloBerria,
    strava_team: StravaTeam,
    calendar: Calendar,
    licenses: Licenses,
};

const formatTitle = (title = '') =>
    title.toLowerCase().replace(/(^|\s)\S/g, (c) => c.toUpperCase());

const StoryDetail = () => {
    const { id } = useParams();
    const { i18n } = useTranslation();

    const StoryComponent = STORY_COMPONENTS[id];

    // Invalid or missing id: go back to the Vraivelo main page
    if (!StoryComponent) return <Navigate to="/vraivelo" replace />;

    const story = (stories[i18n.language] || stories.en).find((s) => s.id === id);
    const name = formatTitle(story?.title || id);

    return (
        <>
            <SEOHead
                titleKey="seo.story.title"
                descriptionKey="seo.story.description"
                tOptions={{ name }}
                path={`/vraivelo/${id}`}
                ogImage={story?.image}
                ogType="article"
            />
            <StoryComponent />
        </>
    );
};

export default StoryDetail;
