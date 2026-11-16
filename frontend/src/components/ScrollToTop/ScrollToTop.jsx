import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

// Scroll position of every page visited in this session, by history entry.
const positions = new Map();

// The jump must not be animated by `scroll-behavior: smooth` (index.css): otherwise the
// new page is seen sliding up from where the old one was. behavior 'instant' does that in
// current browsers; older Safari rejects the value, so smooth scrolling is also switched
// off inline for the moment of the jump.
const jump = (top) => {
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    void getComputedStyle(root).scrollBehavior; // apply the inline style before scrolling
    try {
        window.scrollTo({ top, left: 0, behavior: 'instant' });
    } catch {
        window.scrollTo(0, top);
    }
    root.style.scrollBehavior = previous;
};

/**
 * New page (link click): start at the top, before it is painted.
 * Back / forward: return to where you were on that page (e.g. the spot in the bike list).
 */
const ScrollToTop = () => {
    const location = useLocation();
    const navigationType = useNavigationType();
    const keyRef = useRef(location.key);
    const pathRef = useRef(location.pathname);

    // the router handles scrolling, not the browser
    useEffect(() => {
        if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
    }, []);

    // remember the position of the current page while the user scrolls
    useEffect(() => {
        const save = () => positions.set(keyRef.current, window.scrollY);
        window.addEventListener('scroll', save, { passive: true });
        return () => window.removeEventListener('scroll', save);
    }, []);

    useLayoutEffect(() => {
        const samePath = pathRef.current === location.pathname;
        keyRef.current = location.key;
        pathRef.current = location.pathname;

        if (navigationType === 'POP' && positions.has(location.key)) {
            const y = positions.get(location.key);
            jump(y);
            // the page may still be growing (images, data): try again for up to half a second
            let tries = 0;
            let timer = 0;
            const retry = () => {
                if (Math.abs(window.scrollY - y) < 2 || tries++ >= 10) return;
                jump(y);
                timer = setTimeout(retry, 50);
            };
            timer = setTimeout(retry, 50);
            return () => clearTimeout(timer);
        }
        // query-string or hash-only changes keep the position, as before
        if (!samePath) jump(0);
    }, [location.key, location.pathname, navigationType]);

    return null;
};

export default ScrollToTop;
