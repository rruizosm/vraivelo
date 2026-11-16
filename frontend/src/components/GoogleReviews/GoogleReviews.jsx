import { useTranslation } from 'react-i18next';
import { Star, ArrowUpRight } from 'lucide-react';
import './GoogleReviews.css';

// Google Business profile of Vraivelo (Girona)
const GOOGLE_REVIEWS_URL = 'https://www.google.com/maps?cid=18416816163622140385';

// Rating summary as shown on Google Maps. Update by hand when it changes.
const RATING = { score: 4.8, count: 97 };

// Five-star reviews copied from the public Google profile (Nov 2026), in their original language.
// Long ones are shortened with "[…]" and spelling is lightly fixed; the wording is the reviewer's own.
const REVIEWS = [
    { name: "Paco C.", text: "¡Excelente experiencia! La atención en esta tienda es de 10. Me ayudaron a elegir la bici perfecta sin presión y respondiendo todas mis dudas. […] Su servicio postventa lo merece: se han hecho cargo de todo sin poner ni una sola pega ni excusa." },
    { name: "Maria Luisa C.", text: "El mejor taller de bicicletas de Girona. Después de haber probado muchísimos, sin duda Vraivelo va a ser mi taller de referencia. David es encantador, detallista con la bici, la cuida como si fuese la suya." },
    { name: "Jordi F.", text: "Experiencia increíble. Rapidez impresionante, trato excepcional con el cliente, taller impoluto y explicaciones detalladas sobre la reparación en todo momento." },
    { name: "Salvador P.", text: "Mi taller de referencia desde que abrieron. David es un tío meticuloso, profesional y siempre dispuesto a encontrar una solución rápida y eficaz a cualquier problema. ¡100% recomendable!" },
    { name: "Cristina F.", text: "¡Trato y asesoramiento genial! Quería una bicicleta de carretera nueva y, con las características y el presupuesto que tenía, me recomendaron una Liv. No podría haber hecho una mejor compra." },
    { name: "Guillem O.", text: "Mi taller de confianza desde que abrió. Pulcro con su trabajo, detallista, eficaz y eficiente. El trato con el cliente es también uno de sus puntos fuertes y diferenciales." },
    { name: "Marta R.", text: "Compré una bici de segunda mano y todo ha sido genial. David súper atento, me ayudó con todo y el envío a Mallorca llegó perfecto. Muy contenta, ¡100% recomendable!" },
    { name: "German R.", text: "Aparte de la reparación, me hizo un diagnóstico de la bici y de lo que había que hacer para tenerla perfecta. Quedé muy satisfecho con el resultado: la bici como nueva, y me la entregó en muy poco tiempo." },
    { name: "Rubén E.", text: "Rápido, eficaz y se nota que le gusta lo que hace. Le pone pasión y trata tu bicicleta como si fuese la suya, y eso no se ve en muchos sitios. Para mí, el top de Girona." },
    { name: "Núria S.", text: "Fui a mirar una bici a Vraivelo y acabé comprando dos. Un trato muy cercano y profesional. Están atentos a cualquier duda e imprevisto que puedas tener. ¡Muy recomendables!" },
    { name: "Mat S.", text: "Necesitaba sustituir una pieza para un viaje al día siguiente. No la encontraba en ninguna otra tienda de Girona y me la consiguieron e instalaron muy rápido. Además, fueron sinceros: no necesitaba una pieza de gama superior." },
    { name: "Toni C.", text: "Hoy he llevado mi bici por primera vez y el resultado ha sido perfecto, más de lo esperado. Servicio rápido, profesional, amable y cercano. David te hace sentir como en casa." },
    { name: "Daniel H.", text: "Muy profesional en la primera visita de mi bici: me la ha revisado a fondo y la ha dejado impoluta. Muy recomendable." },
    { name: "Adrià P.", text: "El mejor taller de la ciudad. Mecánica excelente. Trato y atención increíbles. Laura y David, un 10." },
    { name: "Manel F.", text: "Nada más entrar el trato es muy agradable. Necesitaba una revisión y una puesta a punto, y enseguida vio qué le faltaba y qué se podía mejorar. Fantástico sitio para llevar la bici y para que te asesoren." },
    { name: "Josep D.", text: "Trato muy cercano, profesional y un gran servicio. De confianza y a un precio muy competitivo. Te asesora desinteresadamente. Sin duda, el mejor sitio de Girona." },
    { name: "Margarita M.", text: "¡La atención al cliente es excelente! David muy amable, he llevado mi bici dos veces y me ha solucionado el problema el mismo día. Lo recomiendo al 100%." },
    { name: "Jordi B.", text: "Gran profesionalidad, atención personalizada y buen servicio. Te informan en todo momento de cómo van las reparaciones. Muy recomendable." },
];

const GoogleIcon = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
);

const Stars = ({ size }) => (
    <span className="rv-stars" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} size={size} fill="#FBBC04" color="#FBBC04" />
        ))}
    </span>
);

const ReviewCard = ({ review }) => (
    <figure className="rv-card">
        <Stars size={16} />
        <blockquote className="rv-text">“{review.text}”</blockquote>
        <figcaption className="rv-author">
            <span className="rv-avatar" aria-hidden="true">{review.name.charAt(0)}</span>
            <span className="rv-name">{review.name}</span>
            <GoogleIcon size={16} />
        </figcaption>
    </figure>
);

const GoogleReviews = () => {
    const { t, i18n } = useTranslation();
    const score = RATING.score.toLocaleString(i18n.language, { minimumFractionDigits: 1 });

    return (
        <section className="rv-section" aria-labelledby="rv-title">
            <div className="rv-header">
                <div>
                    <p className="rv-eyebrow">
                        <span className="cb-eyebrow-bar" aria-hidden="true" />
                        {t('home.reviews.eyebrow')}
                    </p>
                    <h2 id="rv-title" className="rv-title">
                        {t('home.reviews.title')} {t('home.reviews.title_highlight')}
                    </h2>
                </div>

                {/* the big numbers: average score and total reviews */}
                <a className="rv-summary" href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer">
                    <span className="rv-stat">
                        <span className="rv-stat-value">{score}</span>
                        <span className="rv-stat-label">
                            <Stars size={18} />
                            {t('home.reviews.average')}
                        </span>
                    </span>
                    <span className="rv-stat">
                        <span className="rv-stat-value">{RATING.count}</span>
                        <span className="rv-stat-label">
                            <GoogleIcon size={18} />
                            {t('home.reviews.reviews_on_google')}
                            <ArrowUpRight size={16} aria-hidden="true" />
                        </span>
                    </span>
                </a>
            </div>

            {/* same endless left-moving row as the featured bikes: list rendered twice, track slides one copy */}
            <div className="rv-marquee">
                <div className="rv-track" style={{ '--rv-duration': `${REVIEWS.length * 8}s` }}>
                    {[0, 1].map((copy) => (
                        <ul className="rv-list" key={copy} aria-hidden={copy === 1 || undefined}>
                            {REVIEWS.map((review) => (
                                <li key={review.name} className="rv-item">
                                    <ReviewCard review={review} />
                                </li>
                            ))}
                        </ul>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GoogleReviews;
