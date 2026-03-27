import React from 'react';
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

const EventCard = ({ event }) => {
    return (
        <div className="cal-event-card">
            <div className="cal-event-img-container">
                <img
                    src={event.imgSrc}
                    className="cal-event-img"
                    alt={event.imgAlt}
                />
                <div className={`cal-event-tag cal-tag-${event.type.toLowerCase()}`}>{event.type}</div>
            </div>
            <div className="cal-event-content">
                <div>
                    <span className="cal-event-date">{event.date}</span>
                    <h4 className="cal-event-name">{event.title}</h4>
                    <p className="cal-event-desc">{event.description}</p>
                </div>
                <div className="cal-event-actions">
                    <button className="cal-btn-primary">Reservar</button>
                    <a href="#" className="cal-btn-link">Ver más</a>
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
        imgSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZAp80VntOmCOJvOMeRLPp7vNlB9bAWSj4ZVHGIYD6NVL-Us3zxn_IdVqvwor8oMo9QuE_BY6n2y6msUJTyuKueYmJnkxTk5cjgvA45Wppwb8DTvukRi7UaBhXDTJ8q7fnZBJsklWeMiTdweLn0jW_EQ2tCbU6eN-Lem5alJT-ef8Kq7b8vOwsoCfQP5VUjtkV0_jsiyxUAP-OsV8LWCQsVFyVjDr-UkExg16ZXADCSWkS4-xpBNprmJqiKohA1rxZetHulkr67GE",
        imgAlt: "cinematic shot of cyclists riding",
        type: "Road",
        date: "11 Abril",
        title: "Social Ride carretera",
        description: "Una salida matutina por los puertos clásicos. Velocidad controlada, café obligatorio al terminar."
    },
    {
        imgSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdmNwUwFVUd6fZrBVVpgSr6vvWuglrzQLHfG3rXX-csTWk2AOhBx4UVPplTiErzZ7Vgx993uXtoz0ZHZcY_PzVaYP7zr2K0sQRAQKlS6vIqhtXPDwd_Jm0iTPAW-YjiRBCMgcy17rEYZHkJAjeYGdY-2HuGs22SnTpuPiQOfZN5NSuHqWwdQz-1CKcHW0EgurccuVOgq75GW15bdaQb_9lG3hjlKtejiDVQEhvQXBbjGfnA0IKiCNEZSsG1HOUybkdAca0ywiHAyM",
        imgAlt: "close up of bicycle gears",
        type: "Taller",
        date: "16 Abril",
        title: "Formación mecánica básica",
        description: "Aprende los ajustes fundamentales y reparación de pinchazos en ruta con nuestros mecánicos expertos."
    },
    {
        imgSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuB5Lqfj6pIYfZbTNjsQWhM71dmWtYn9zmFZwyicNU9khrDjKnp0YoKmEnCjxbWQupttlguD7IdFT9k_14Ir9TaD2uK_Xx25q032h28lS8cbOHy8aanDFUgZAKaBHYo-ilPCbA4lnmR0iCl4Q8_E6iOz2aP5G9N58XWqzYZdtrZ5Ks6A1fhbs3NzwLJaR8yY_kLKE794cJN3DUQ5ENG4WoDEDCoRGgFrNawPUvYjd1UqUQqpL-AaZ8LGaaCP0ViDimU_91Prpe3KGy4",
        imgAlt: "gravel bike",
        type: "Gravel",
        date: "17 Mayo",
        title: "Social Ride gravel",
        description: "Explora caminos secundarios y pistas forestales en nuestra salida mensual de gravel."
    },
    {
        imgSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-S7TCcvra9oDN52ox9C9l8sL5xmjOvqt3-aKiQz13dedbGLSvNfwWwCXYsVIkZ90t1NSuVLzIiCsvG0Ix3pgK5gvphRx6HUs2fpjIk9aJazIhOXc1xf1EbImoGucENEXPmLb4r9Ebag8m0dt81PAt5VYCD7nZXg8oCL0Z-QHh5TjOP6WuNCZ54Hw3yU8c6hhn9irlMQMm2whhWXf9Szu6YEtQFfe7LoCoiDm_oQvh4v-rAuqsixq5UCkoVCFd_v2SSPE-xHoA2zA",
        imgAlt: "group of cyclists",
        type: "Weekend",
        date: "06-07 Junio",
        title: "Vraivelo Weekend",
        description: "Dos días de ruta épica con estancia en hotel boutique y gastronomía local curada."
    },
    {
        imgSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-S7TCcvra9oDN52ox9C9l8sL5xmjOvqt3-aKiQz13dedbGLSvNfwWwCXYsVIkZ90t1NSuVLzIiCsvG0Ix3pgK5gvphRx6HUs2fpjIk9aJazIhOXc1xf1EbImoGucENEXPmLb4r9Ebag8m0dt81PAt5VYCD7nZXg8oCL0Z-QHh5TjOP6WuNCZ54Hw3yU8c6hhn9irlMQMm2whhWXf9Szu6YEtQFfe7LoCoiDm_oQvh4v-rAuqsixq5UCkoVCFd_v2SSPE-xHoA2zA",
        imgAlt: "group of cyclists",
        type: "Gravel",
        date: "5 Julio",
        title: "Social Ride gravel",
        description: "Explora caminos secundarios y pistas forestales en nuestra salida mensual de gravel."
    },
    {
        imgSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-S7TCcvra9oDN52ox9C9l8sL5xmjOvqt3-aKiQz13dedbGLSvNfwWwCXYsVIkZ90t1NSuVLzIiCsvG0Ix3pgK5gvphRx6HUs2fpjIk9aJazIhOXc1xf1EbImoGucENEXPmLb4r9Ebag8m0dt81PAt5VYCD7nZXg8oCL0Z-QHh5TjOP6WuNCZ54Hw3yU8c6hhn9irlMQMm2whhWXf9Szu6YEtQFfe7LoCoiDm_oQvh4v-rAuqsixq5UCkoVCFd_v2SSPE-xHoA2zA",
        imgAlt: "group of cyclists",
        type: "Weekend",
        date: "06-07 Junio",
        title: "Vraivelo Weekend",
        description: "Dos días de ruta épica con estancia en hotel boutique y gastronomía local curada."
    },
    {
        imgSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-S7TCcvra9oDN52ox9C9l8sL5xmjOvqt3-aKiQz13dedbGLSvNfwWwCXYsVIkZ90t1NSuVLzIiCsvG0Ix3pgK5gvphRx6HUs2fpjIk9aJazIhOXc1xf1EbImoGucENEXPmLb4r9Ebag8m0dt81PAt5VYCD7nZXg8oCL0Z-QHh5TjOP6WuNCZ54Hw3yU8c6hhn9irlMQMm2whhWXf9Szu6YEtQFfe7LoCoiDm_oQvh4v-rAuqsixq5UCkoVCFd_v2SSPE-xHoA2zA",
        imgAlt: "group of cyclists",
        type: "Weekend",
        date: "06-07 Junio",
        title: "Vraivelo Weekend",
        description: "Dos días de ruta épica con estancia en hotel boutique y gastronomía local curada."
    },
    {
        imgSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-S7TCcvra9oDN52ox9C9l8sL5xmjOvqt3-aKiQz13dedbGLSvNfwWwCXYsVIkZ90t1NSuVLzIiCsvG0Ix3pgK5gvphRx6HUs2fpjIk9aJazIhOXc1xf1EbImoGucENEXPmLb4r9Ebag8m0dt81PAt5VYCD7nZXg8oCL0Z-QHh5TjOP6WuNCZ54Hw3yU8c6hhn9irlMQMm2whhWXf9Szu6YEtQFfe7LoCoiDm_oQvh4v-rAuqsixq5UCkoVCFd_v2SSPE-xHoA2zA",
        imgAlt: "group of cyclists",
        type: "Weekend",
        date: "06-07 Junio",
        title: "Vraivelo Weekend",
        description: "Dos días de ruta épica con estancia en hotel boutique y gastronomía local curada."
    }
];

const Calendar = () => {
    return (
        <main className="cal-main">
            {/* Hero Section */}
            <section style={{ backgroundColor: 'lightblue' }}>
                <section className="cal-max-width cal-hero-section">
                    <div className="cal-hero-content">
                        <h1 className="cal-hero-title">Calendario 2026</h1>
                        <p className="cal-hero-desc">
                            Únete a la comunidad Vraivelo en la carretera y el gravel. Un viaje curado a través de los paisajes más impresionantes, diseñado para ciclistas que valoran la precisión, el esfuerzo y la camaradería.
                        </p>
                    </div>
                    <div className="cal-hero-legend">
                        <div className="cal-legend-item">
                            <span className="cal-legend-dot val-bg-secondary-fixed-dim"></span>
                            <span className="cal-legend-text">Carretera</span>
                        </div>
                        <div className="cal-legend-item">
                            <span className="cal-legend-dot val-bg-tertiary-fixed-dim"></span>
                            <span className="cal-legend-text">Gravel</span>
                        </div>
                        <div className="cal-legend-item">
                            <span className="cal-legend-dot val-bg-primary-container"></span>
                            <span className="cal-legend-text">Taller</span>
                        </div>
                    </div>
                </section>

                {/* Calendar Grid Section */}
                <section className="cal-max-width cal-grid-section">
                    <div className="cal-grid-container">
                        {calendarMonthsData.map((data, index) => (
                            <MonthBlock key={index} {...data} />
                        ))}
                    </div>
                </section>
            </section>

            {/* Event Details Section */}
            <section className="cal-max-width cal-events-wrapper">
                <h2 className="cal-events-title">Próximos Encuentros</h2>

                <div className="cal-event-list">
                    {eventsData.map((event, index) => (
                        <EventCard key={index} event={event} />
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Calendar;
