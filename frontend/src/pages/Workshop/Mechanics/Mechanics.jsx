import ServicePage from '../ServicePage/ServicePage';

// Tune-up and maintenance. Text keys are relative to `ns` (see ServicePage).
const CONFIG = {
    ns: 'workshop.mechanics_page',
    seo: { titleKey: 'seo.workshop_mechanics.title', descriptionKey: 'seo.workshop_mechanics.description', path: '/workshop/mechanics' },
    image: '/workshop/puesta-a-punto.webp',
    imagePosition: '22% 50%',
    plans: [
        { base: 'services.basic', price: '40€' },
        { base: 'services.premium', price: '80€', featured: true, badge: 'services.premium.badge' },
    ],
    process: {
        title: 'specs.title',
        desc: 'specs.desc',
        items: [
            { value: '0,01 mm', title: 'specs.tolerance' },
            { value: '24 h', title: 'specs.turnaround' },
            { value: '100 %', title: 'specs.certified' },
            { value: '@specs.parts_value', title: 'specs.parts' },
        ],
    },
};

const Mechanics = () => <ServicePage config={CONFIG} />;

export default Mechanics;
