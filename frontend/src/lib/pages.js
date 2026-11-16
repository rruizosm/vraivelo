// Each page is its own JavaScript file, downloaded only when that page is visited
// (instead of one ~875 KB bundle with the whole site on the first visit).
import { createElement, lazy } from 'react';
import { matchPath } from 'react-router-dom';
import { BIKE_CATEGORIES } from './categories';

// A page whose file has already been downloaded (see preloadPage) renders directly.
// React.lazy alone would still pause it for one round on its first render, showing an
// empty page between the header and the footer.
const page = (load) => {
    let Loaded = null;
    let promise = null;
    const preload = () => {
        promise ??= load().then((module) => {
            Loaded = module.default;
            return module;
        });
        return promise;
    };
    const Lazy = lazy(preload);
    const Page = (props) => createElement(Loaded || Lazy, props);
    Page.preload = preload;
    return Page;
};

export const Home = page(() => import('../pages/Home/Home'));
export const Workshop = page(() => import('../pages/Workshop/Workshop'));
export const Mechanics = page(() => import('../pages/Workshop/Mechanics/Mechanics'));
export const Suspensions = page(() => import('../pages/Workshop/Suspensions/Suspensions'));
export const RearShock = page(() => import('../pages/Workshop/RearShock/RearShock'));
export const Shop = page(() => import('../pages/Shop/Shop'));
export const ProductDetail = page(() => import('../pages/ProductDetail/ProductDetail'));
export const OtherProducts = page(() => import('../pages/OtherProducts/OtherProducts'));
export const Checkout = page(() => import('../pages/Checkout/Checkout'));
export const Success = page(() => import('../pages/Success/Success'));
export const Contact = page(() => import('../pages/Contact/Contact'));
export const Vraivelo = page(() => import('../pages/Vraivelo/Vraivelo'));
export const StoryDetail = page(() => import('../pages/Vraivelo/StoryDetail'));

// Same patterns as the <Routes> in App.jsx, most specific first.
const ROUTES = [
    ['/', Home],
    ['/workshop', Workshop],
    ['/workshop/mechanics', Mechanics],
    ['/workshop/suspensions', Suspensions],
    ['/workshop/rear-shock', RearShock],
    ['/shop', Shop],
    ...BIKE_CATEGORIES.map((c) => [`/shop/${c.slug}`, Shop]),
    ['/shop/:id', ProductDetail],
    ['/other-products', OtherProducts],
    ['/checkout', Checkout],
    ['/success', Success],
    ['/contact', Contact],
    ['/vraivelo', Vraivelo],
    ['/vraivelo/:id', StoryDetail],
];

/**
 * Download the code of the page at `pathname` (resolves when it is ready).
 * Called before the first render so the prerendered HTML is replaced by the real page
 * directly, never by an empty placeholder.
 */
export const preloadPage = (pathname) => {
    const hit = ROUTES.find(([pattern]) => matchPath({ path: pattern, end: true }, pathname));
    return hit ? hit[1].preload().catch(() => {}) : Promise.resolve();
};
