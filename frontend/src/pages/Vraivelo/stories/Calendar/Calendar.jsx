import React from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './Calendar.css';

const MonthBlock = ({ monthName, startingEmptyDays, totalDays, highlightDays = [] }) => {
    const days = [];
    for (let i = 0; i < startingEmptyDays; i++) {
        days.push(<div key={`empty-${i}`}></div>);
    }
    for (let i = 1; i <= totalDays; i++) {
        const highlight = highlightDays.find(h => h.day === i);
        const className = `cal-day-cell${highlight ? ` highlight-${highlight.type}` : ''}`;
        days.push(<div key={`day-${i}`} className={className}>{i}</div>);
    }

    return (
        <div className="cal-month-block">
            <h3 className="cal-month-title">{monthName}</h3>
            <div className="cal-month-grid">
                <div className="cal-day-header">L</div>
                <div className="cal-day-header">M</div>
                <div className="cal-day-header">X</div>
                <div className="cal-day-header">J</div>
                <div className="cal-day-header">V</div>
                <div className="cal-day-header">S</div>
                <div className="cal-day-header">D</div>
                {days}
            </div>
        </div>
    );
};

const EventCard = ({ event, index }) => {
    const { t } = useTranslation();
    return (
        <div className="cal-event-card">
            <div className="cal-event-img-container">
                <img
                    src={event.imgSrc}
                    className="cal-event-img"
                    alt={event.imgAlt}
                />
                <div className={`cal-event-tag cal-tag-${event.type.toLowerCase()}`}>{t(`calendar.eventsData.${index}.type`)}</div>
            </div>
            <div className="cal-event-content">
                <div>
                    <span className="cal-event-date">{event.date}</span>
                    <h4 className="cal-event-name">{t(`calendar.eventsData.${index}.title`)}</h4>
                    <p className="cal-event-desc">{t(`calendar.eventsData.${index}.desc`)}</p>
                </div>
                <div className="cal-event-actions">
                    <Link to="/contact" state={{ subject: 'event' }} className="cal-btn-primary">{t('calendar.btn')}</Link>
                </div>
            </div>
        </div>
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
        imgSrc: "/stories/formacion.png",
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

    return (
        <section className="cal-main">
            {/* Hero Section */}
            <section className="cal-first-section">
                <section className="cal-max-width cal-hero-section">
                    <div className="cal-hero-content">
                        <h1 className="cal-hero-title">{t('calendar.hero.title')}</h1>
                        <p className="cal-hero-desc">
                            {t('calendar.hero.desc')}
                        </p>
                    </div>
                    <div className="cal-hero-legend">
                        <div className="cal-legend-item">
                            <span className="cal-legend-dot val-bg-road"></span>
                            <span className="cal-legend-text">{t('calendar.hero.legend.road')}</span>
                        </div>
                        <div className="cal-legend-item">
                            <span className="cal-legend-dot val-bg-gravel"></span>
                            <span className="cal-legend-text">{t('calendar.hero.legend.gravel')}</span>
                        </div>
                        <div className="cal-legend-item">
                            <span className="cal-legend-dot val-bg-taller"></span>
                            <span className="cal-legend-text">{t('calendar.hero.legend.workshop')}</span>
                        </div>
                        <div className="cal-legend-item">
                            <span className="cal-legend-dot val-bg-weekend"></span>
                            <span className="cal-legend-text">{t('calendar.hero.legend.weekend')}</span>
                        </div>
                    </div>
                </section>

                {/* Calendar Grid Section */}
                <section className="cal-max-width cal-grid-section">
                    <div className="cal-grid-container">
                        {calendarMonthsData.map((data, index) => (
                            <MonthBlock key={index} {...data} monthName={t(`calendar.months.${data.monthName}`, { defaultValue: data.monthName })} />
                        ))}
                    </div>
                </section>
            </section>

            {/* Event Details Section */}
            <section className="cal-max-width cal-events-wrapper">
                <h2 className="cal-events-title">{t('calendar.events_title')}</h2>

                <div className="cal-event-list">
                    {eventsData.map((event, index) => (
                        <EventCard key={index} event={event} index={index} />
                    ))}
                </div>
            </section>
        </section>
    );
};

export default Calendar;
