import ServicePage from '../ServicePage/ServicePage';

// Fork servicing. Text keys are relative to `ns` (see ServicePage).
const CONFIG = {
    ns: 'workshop.suspensions_page',
    seo: { titleKey: 'seo.workshop_suspensions.title', descriptionKey: 'seo.workshop_suspensions.description', path: '/workshop/suspensions' },
    image: '/workshop/horquillas.webp',
    imagePosition: 'center 40%',
    fact: { value: 'glass_panel.val', label: 'glass_panel.desc' },
    plans: [
        // the basic service does not include the cartridge rebuild (4th line)
        { base: 'services.basic', price: '60€', from: true, excluded: [3] },
        { base: 'services.premium', price: '100€', from: true, featured: true, badge: 'services.premium.badge' },
    ],
    process: {
        title: 'process.title',
        items: [1, 2, 3, 4].map((n) => ({ title: `process.steps.${n}.title`, desc: `process.steps.${n}.desc` })),
    },
};

const Suspensions = () => <ServicePage config={CONFIG} />;

export default Suspensions;
