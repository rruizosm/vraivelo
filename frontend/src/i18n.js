import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import es from './locales/es.json';

// Spanish is the site's language and ships with the app. Catalan and English (~65 KB each)
// are downloaded only when a visitor switches to them: see loadLanguage().
const LOADERS = {
    ca: () => import('./locales/ca.json'),
    en: () => import('./locales/en.json'),
};

i18n
    .use(initReactI18next)
    .init({
        resources: {
            es: {
                translation: es
            }
        },
        lng: 'es', // default language
        fallbackLng: 'es', // Spanish has every key
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

/** Make sure a language's texts are loaded, then switch to it. */
export const changeLanguage = async (lng) => {
    if (!i18n.hasResourceBundle(lng, 'translation') && LOADERS[lng]) {
        const { default: texts } = await LOADERS[lng]();
        i18n.addResourceBundle(lng, 'translation', texts);
    }
    return i18n.changeLanguage(lng);
};

export default i18n;
