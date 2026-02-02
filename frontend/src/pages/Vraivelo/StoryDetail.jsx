import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Origins from './stories/Origins';
import Identity from './stories/Identity';
import VraiveloWeekend from './stories/VraiveloWeekend';
import Team from './stories/Team';
import Collection from './stories/Collection';
import Lifestyle from './stories/Lifestyle';
import VraiveloBerria from './stories/VraiveloBerria';

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
        case 'who':
            return <Identity />;
        case 'vv_weekend':
            return <VraiveloWeekend />;
        case 'team':
            return <Team />;
        case 'gallery1':
            return <Collection />;
        case 'gallery2':
            return <Lifestyle />;
        case 'berria':
            return <VraiveloBerria />;
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
