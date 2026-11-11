import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const SITE_NAME = 'Vraivelo';
const SITE_URL = 'https://vraivelo.com';
const DEFAULT_OG_IMAGE = `${SITE_URL}/vv_logo_2.png`;

// Amplify serves the prerendered pages at "/route/" (it 301-redirects "/route" to it),
// so canonical URLs always end with a slash to match the URL Google actually indexes.
export const canonicalPath = (path = '/') => {
    if (!path || path === '/') return '/';
    return path.endsWith('/') ? path : `${path}/`;
};

const absoluteUrl = (url) => {
    if (!url) return DEFAULT_OG_IMAGE;
    if (/^https?:\/\//.test(url)) return url;
    return `${SITE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
};

const SEOHead = ({ titleKey, descriptionKey, title: rawTitle, description: rawDescription, path = '', ogImage, ogType = 'website', tOptions = {}, noindex = false }) => {
    const { t, i18n } = useTranslation();

    const title = rawTitle || t(titleKey, tOptions);
    const description = rawDescription || t(descriptionKey, tOptions);
    const canonicalUrl = `${SITE_URL}${canonicalPath(path)}`;
    const image = absoluteUrl(ogImage);

    return (
        <Helmet>
            {/* Language */}
            <html lang={i18n.language} />

            {/* Primary Meta Tags */}
            <title>{title}</title>
            <meta name="description" content={description} />
            {noindex && <meta name="robots" content="noindex, follow" />}

            {/* Canonical */}
            <link rel="canonical" href={canonicalUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:locale" content={i18n.language === 'ca' ? 'ca_ES' : i18n.language === 'es' ? 'es_ES' : 'en_US'} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={canonicalUrl} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </Helmet>
    );
};

export default SEOHead;
