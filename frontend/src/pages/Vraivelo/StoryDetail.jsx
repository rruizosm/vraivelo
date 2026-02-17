import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Origins from './stories/Origins';
import VraiveloWeekend from './stories/VraiveloWeekend';
import VraiveloBerria from './stories/VraiveloBerria';
import StravaTeam from './stories/StravaTeam';

const StoryDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Prevent error if id is undefined for some reason, though router usually handles this
    useEffect(() => {
        if (!id) navigate('/vraivelo');
    }, [id, navigate]);

    // Map IDs to Components
    switch (id) {
        case 'start':
            return <Origins />;
        case 'vv_weekend':
            return <VraiveloWeekend />;
        case 'berria':
            return <VraiveloBerria />;
        case 'strava_team':
            return <StravaTeam />;
        default:
            // If the ID is invalid, redirect back to Vraivelo main page
            // We use useEffect to avoid side-effects during render, 
            // but returning null renders nothing while redirecting.
            // A clearer way is to render a Navigate component if using v6+, 
            // but since we imported useNavigate, we can do this:
            useEffect(() => {
                navigate('/vraivelo');
            }, [navigate]);
            return null;
    }
};

export default StoryDetail;
