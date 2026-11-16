import ServicePage from '../ServicePage/ServicePage';

// Rear shock servicing. Text keys are relative to `ns` (see ServicePage).
const CONFIG = {
    ns: 'workshop.rear_shock_page',
    seo: { titleKey: 'seo.workshop_rear_shock.title', descriptionKey: 'seo.workshop_rear_shock.description', path: '/workshop/rear-shock' },
    image: '/workshop/amortiguadores.webp',
    imagePosition: 'center 45%',
    fact: { value: 'bento.sidebar.lead_time.val', label: 'bento.sidebar.lead_time.title' },
    plans: [
        { base: 'bento.main', price: '80€', featured: true, extra: 'bento.main.pricing_extra' },
    ],
    process: {
        title: 'specs.title',
        items: [1, 2, 3, 4].map((n) => ({ title: `specs.steps.${n}.name` })),
    },
    notes: [
        { title: 'bento.sidebar.guarantee.title', desc: 'bento.sidebar.guarantee.desc' },
        { title: 'bento.sidebar.lead_time.title', value: 'bento.sidebar.lead_time.val', desc: 'bento.sidebar.lead_time.extra' },
    ],
};

const RearShock = () => <ServicePage config={CONFIG} />;

export default RearShock;
