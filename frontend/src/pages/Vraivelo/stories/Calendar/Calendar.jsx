import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { StoryPage, StoryHero, StorySection, StoryHeading, StoryCTA, StoryButton } from '../StoryKit';

// type in the data → colour/legend key
const TYPE_KEY = { carretera: 'road', road: 'road', gravel: 'gravel', taller: 'workshop', weekend: 'weekend' };
const WEEKDAYS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

const MonthBlock = ({ monthName, startingEmptyDays, totalDays, highlightDays = [], t }) => {
    const cells = [];
    for (let i = 0; i < startingEmptyDays; i++) cells.push(<span key={`e-${i}`} className="sk-cal-day is-empty" aria-hidden="true" />);
    for (let d = 1; d <= totalDays; d++) {
        const h = highlightDays.find((x) => x.day === d);
        const key = h ? TYPE_KEY[h.type] : null;
        cells.push(
            <span
                key={d}
                className={`sk-cal-day${key ? ` is-${key}` : ''}`}
                title={key ? t(`calendar.hero.legend.${key}`) : undefined}
            >
                {d}
            </span>,
        );
    }
    return (
        <div className="sk-cal-month">
            <h3 className="sk-cal-month-name">{monthName}</h3>
            <div className="sk-cal-grid">
                {WEEKDAYS.map((w, i) => <span key={i} className="sk-cal-weekday" aria-hidden="true">{w}</span>)}
                {cells}
            </div>
        </div>
    );
};

const EventCard = ({ event, index, t }) => {
    const key = TYPE_KEY[event.type.toLowerCase()] || 'road';
    return (
        <motion.article
            className="sk-event"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="sk-event-media">
                <img src={event.imgSrc} alt={event.imgAlt} loading="lazy" decoding="async" />
                <span className={`sk-event-tag is-${key}`}>{t(`calendar.eventsData.${index}.type`)}</span>
            </div>
            <div className="sk-event-body">
                <p className="sk-event-date">{event.date}</p>
                <h3 className="sk-event-title">{t(`calendar.eventsData.${index}.title`)}</h3>
                <p className="sk-event-desc">{t(`calendar.eventsData.${index}.desc`)}</p>
                <StoryButton to="/contact" state={{ subject: 'event', message: `${t(`calendar.eventsData.${index}.title`)} · ${event.date}` }}>
                    {t('calendar.btn')}
                </StoryButton>
            </div>
        </motion.article>
    );
};

const calendarMonthsData = [
    {
        monthName: 'Abril',
        startingEmptyDays: 2,
        totalDays: 30,
        highlightDays: [
            { day: 11, type: 'carretera' },
            { day: 16, type: 'taller' }
        ]
    },
    {
        monthName: 'Mayo',
        startingEmptyDays: 4,
        totalDays: 31,
        highlightDays: [
            { day: 17, type: 'gravel' }
        ]
    },
    {
        monthName: 'Junio',
        startingEmptyDays: 0,
        totalDays: 30,
        highlightDays: [
            { day: 6, type: 'weekend' },
            { day: 7, type: 'weekend' }
        ]
    },
    {
        monthName: 'Julio',
        startingEmptyDays: 2,
        totalDays: 31,
        highlightDays: [
            { day: 4, type: 'gravel' }
        ]
    },
    {
        monthName: 'Agosto',
        startingEmptyDays: 5,
        totalDays: 31,
        highlightDays: [
            { day: 22, type: 'carretera' }
        ]
    },
    {
        monthName: 'Septiembre',
        startingEmptyDays: 1,
        totalDays: 30,
        highlightDays: [
            { day: 5, type: 'weekend' },
            { day: 6, type: 'weekend' }
        ]
    },
    {
        monthName: 'Octubre',
        startingEmptyDays: 3,
        totalDays: 31,
        highlightDays: [
            { day: 3, type: 'gravel' }
        ]
    },
    {
        monthName: 'Diciembre',
        startingEmptyDays: 1,
        totalDays: 31,
        highlightDays: [
            { day: 5, type: 'carretera' }
        ]
    }
];

const eventsData = [
    {
        imgSrc: "/stories/strava_team.jpg",
        imgAlt: "cinematic shot of cyclists riding",
        type: "Road",
        date: "11 Abril",
        title: "Social Ride carretera",
        description: "Una salida matutina por los puertos clásicos. Velocidad controlada, café obligatorio al terminar."
    },
    {
        imgSrc: "/stories/web/formacion.webp",
        imgAlt: "close up of bicycle gears",
        type: "Taller",
        date: "16 Abril",
        title: "Formación mecánica básica",
        description: "Aprende los ajustes fundamentales y reparación de pinchazos en ruta con nuestros mecánicos expertos."
    },
    {
        imgSrc: "/vraivelo_berria/Girona/DSC00347.jpeg",
        imgAlt: "gravel bike",
        type: "Gravel",
        date: "17 Mayo",
        title: "Social Ride gravel",
        description: "Explora caminos secundarios y pistas forestales en nuestra salida mensual de gravel."
    },
    {
        imgSrc: "/vraivelo_weekend/vv_3.jpeg",
        imgAlt: "group of cyclists",
        type: "Weekend",
        date: "06-07 Junio",
        title: "Vraivelo Weekend",
        description: "Dos días de ruta épica con estancia en hotel boutique y gastronomía local curada."
    },
    {
        imgSrc: "/stories/social_ride_2.jpg",
        imgAlt: "group of cyclists",
        type: "Gravel",
        date: "4 Julio",
        title: "Social Ride gravel",
        description: "Explora caminos secundarios y pistas forestales en nuestra salida mensual de gravel."
    },
    {
        imgSrc: "/vraivelo_berria/Girona/DSC00333.jpeg",
        imgAlt: "group of cyclists",
        type: "Road",
        date: "22 Agosto",
        title: "Social Ride carretera",
        description: "Una salida matutina por los puertos clásicos. Velocidad controlada, café obligatorio al terminar."
    },
    {
        imgSrc: "/vraivelo_weekend/vv_6.jpeg",
        imgAlt: "group of cyclists",
        type: "Weekend",
        date: "05-06 Septiembre",
        title: "Vraivelo Weekend",
        description: "Dos días de ruta épica con estancia en hotel boutique y gastronomía local curada."
    },
    {
        imgSrc: "/stories/social_ride_3.jpg",
        imgAlt: "group of cyclists",
        type: "Weekend",
        date: "03 Octubre",
        title: "Social Ride Gravel",
        description: "Explora caminos secundarios y pistas forestales en nuestra salida mensual de gravel."
    },
    {
        imgSrc: "/vraivelo_weekend/vv_1.jpeg",
        imgAlt: "group of cyclists",
        type: "Weekend",
        date: "07 Noviembre",
        title: "Social Ride Carretera",
        description: "Explora caminos secundarios y pistas forestales en nuestra salida mensual de gravel."
    },
    {
        imgSrc: "/stories/social_ride_4.jpg",
        imgAlt: "group of cyclists",
        type: "Weekend",
        date: "05 Diciembre",
        title: "Social Ride Carretera",
        description: "Explora caminos secundarios y pistas forestales en nuestra salida mensual de gravel."
    }
];

const Calendar = () => {
    const { t } = useTranslation();
    const legend = ['road', 'gravel', 'workshop', 'weekend'];

    return (
        <StoryPage id="calendar">
            <StoryHero
                image="/vraivelo_berria/Girona/DSC00343.jpeg"
                position="center 55%"
                eyebrow={t('calendar.eyebrow')}
                title={t('calendar.hero.title')}
                desc={t('calendar.hero.desc')}
            >
                <StoryButton href="#calendar-events" light>{t('calendar.events_title')}</StoryButton>
            </StoryHero>

            <StorySection tone="beige">
                <StoryHeading
                    eyebrow={t('calendar.year_eyebrow')}
                    title={t('calendar.year_title')}
                    aside={(
                        <ul className="sk-cal-legend">
                            {legend.map((k) => (
                                <li key={k}><span className={`sk-cal-dot is-${k}`} aria-hidden="true" />{t(`calendar.hero.legend.${k}`)}</li>
                            ))}
                        </ul>
                    )}
                />
                <div className="sk-cal-months">
                    {calendarMonthsData.map((m) => (
                        <MonthBlock key={m.monthName} {...m} t={t} monthName={t(`calendar.months.${m.monthName}`, { defaultValue: m.monthName })} />
                    ))}
                </div>
            </StorySection>

            <StorySection id="calendar-events">
                <StoryHeading eyebrow={t('calendar.events_eyebrow')} title={t('calendar.events_title')} />
                <div className="sk-events">
                    {eventsData.map((event, index) => <EventCard key={index} event={event} index={index} t={t} />)}
                </div>
            </StorySection>

            <StoryCTA eyebrow={t('calendar.cta.eyebrow')} title={t('calendar.cta.title')} text={t('calendar.cta.text')}>
                <StoryButton href="https://www.strava.com/clubs/1327818" light>Strava</StoryButton>
                <StoryButton to="/contact" state={{ subject: 'event' }} light>{t('calendar.btn')}</StoryButton>
            </StoryCTA>
        </StoryPage>
    );
};

export default Calendar;
