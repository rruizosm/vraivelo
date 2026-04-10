import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Use a small timeout to ensure DOM has updated before scrolling
        // This is especially needed for mobile views and smooth scrolling issues
        setTimeout(() => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'auto'
            });
            // Fallback for some mobile browsers
            if (document.documentElement) {
                document.documentElement.scrollTop = 0;
            }
            if (document.body) {
                document.body.scrollTop = 0;
            }
        }, 10);
    }, [pathname]);

    return null;
};

export default ScrollToTop;
