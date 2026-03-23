const fs = require('fs');
const path = require('path');

const localesPath = 'c:\\Users\\ruben\\OneDrive\\Escritorio\\Vraivelo\\frontend\\src\\locales';
const jsxPath = 'c:\\Users\\ruben\\OneDrive\\Escritorio\\Vraivelo\\frontend\\src\\pages\\Workshop\\Workshop.jsx';

function patchJson(lang, discipline, membership) {
    const file = path.join(localesPath, `${lang}.json`);
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    data.workshop.discipline = discipline;
    data.workshop.membership = membership;
    fs.writeFileSync(file, JSON.stringify(data, null, 4), 'utf8');
}

// EN
patchJson('en', {
    "title_1": "Select Your",
    "title_2": "Service Discipline",
    "subtitle": "Choose a specialized workshop category. Our mechanics are certified for high-performance tuning across all major mountain and road bicycle components.",
    "become_member": "Become a vraivelo Member",
    "view_services": "View Services",
    "cards": {
        "mechanics": {
            "badge": "Essential",
            "title": "Tune-up and Mechanics",
            "desc": "Comprehensive drivetrain cleaning, bolt torque verification, and precision shifting adjustments for daily performance."
        },
        "suspensions": {
            "badge": "Advanced",
            "title": "Suspensions",
            "desc": "Lower leg service, air spring volume tuning, and full damper rebuilds for Fox, RockShox, and Öhlins forks."
        },
        "rear_shock": {
            "badge": "Expert",
            "title": "Rear Shock",
            "desc": "Air sleeve maintenance, nitrogen charging, and bespoke shim stack re-valving for absolute rear-end traction control."
        }
    }
}, {
    "title_1": "vraivēlo",
    "title_2": "Membership Plans",
    "join_now": "Join Now",
    "recommended": "Recommended",
    "premium": "Premium",
    "plans": {
        "peloton": {
            "name": "Peloton Rider",
            "price": "69€",
            "period": "/year",
            "f1": "Free basic adjustments",
            "f2": "10% parts discount",
            "f3": "Workshop priority booking",
            "f4": "Access to official events and a private group"
        },
        "pro": {
            "name": "Pro Performance",
            "price": "129€",
            "period": "/year",
            "f1": "1 FREE annual full inspection (worth over €60)",
            "f2": "Priority service: 48–72 hours",
            "f3": "Discounts: 15% off labor + 10% off clothing and accessories",
            "f4": "50% off Social Rides, including coffee",
            "f5": "50% off training courses"
        },
        "elite": {
            "name": "Elite Factory",
            "price": "249€",
            "period": "/year",
            "f1": "2 FREE comprehensive annual inspections",
            "f2": "VIP Priority at the 24-Hour Repair Shop",
            "f3": "20% off labor, clothing, and parts",
            "f4": "Priority on vraivēlo weekends and training sessions",
            "f5": "1 exclusive experience per year for FREE"
        }
    }
});

// ES
patchJson('es', {
    "title_1": "Selecciona tu",
    "title_2": "Disciplina de Servicio",
    "subtitle": "Elige una categoría de taller especializada. Nuestros mecánicos están certificados para el ajuste de alto rendimiento en todos los principales componentes de bicicletas de montaña y carretera.",
    "become_member": "Hazte Miembro vraivelo",
    "view_services": "Ver Servicios",
    "cards": {
        "mechanics": {
            "badge": "Esencial",
            "title": "Puesta a Punto y Mecánica",
            "desc": "Limpieza integral de la transmisión, verificación de apriete de tornillería y ajustes precisos del cambio para el rendimiento diario."
        },
        "suspensions": {
            "badge": "Avanzado",
            "title": "Suspensiones",
            "desc": "Mantenimiento de botellas, ajuste de volumen de aire y reconstrucciones completas de cartuchos para horquillas Fox, RockShox y Öhlins."
        },
        "rear_shock": {
            "badge": "Experto",
            "title": "Amortiguador Trasero",
            "desc": "Mantenimiento de cámara de aire, carga de nitrógeno y re-valvulado de sistemas a medida para un control absoluto de la tracción trasera."
        }
    }
}, {
    "title_1": "vraivēlo",
    "title_2": "Planes de Membresía",
    "join_now": "Únete Ahora",
    "recommended": "Recomendado",
    "premium": "Premium",
    "plans": {
        "peloton": {
            "name": "Piloto de Pelotón",
            "price": "69€",
            "period": "/año",
            "f1": "Ajustes básicos gratuitos",
            "f2": "10% de descuento en piezas",
            "f3": "Reserva prioritaria en el taller",
            "f4": "Acceso a eventos oficiales y grupo privado"
        },
        "pro": {
            "name": "Rendimiento Pro",
            "price": "129€",
            "period": "/año",
            "f1": "1 inspección completa anual GRATIS (valor > 60€)",
            "f2": "Servicio prioritario: 48–72 horas",
            "f3": "Descuentos: 15% mano de obra + 10% accesorios",
            "f4": "50% de dto en Social Rides (café incluido)",
            "f5": "50% de dto en cursos de formación"
        },
        "elite": {
            "name": "Fábrica Élite",
            "price": "249€",
            "period": "/año",
            "f1": "2 inspecciones completas anuales GRATIS",
            "f2": "Prioridad VIP en taller 24 horas",
            "f3": "20% de descuento en mano de obra y piezas",
            "f4": "Prioridad en fines de semana vraivēlo",
            "f5": "1 experiencia exclusiva al año GRATIS"
        }
    }
});

// CA
patchJson('ca', {
    "title_1": "Selecciona la teva",
    "title_2": "Disciplina de Servei",
    "subtitle": "Tria una categoria de taller especialitzada. Els nostres mecànics estan certificats per a ajustos d'alt rendiment en tots els principals components de bicicletes de muntanya i carretera.",
    "become_member": "Fes-te Membre vraivelo",
    "view_services": "Veure Serveis",
    "cards": {
        "mechanics": {
            "badge": "Essencial",
            "title": "Mecànica i Posada a Punt",
            "desc": "Neteja integral de la transmissió, verificació de parell de collament i ajustos precisos del canvi per al rendiment diari."
        },
        "suspensions": {
            "badge": "Avançat",
            "title": "Suspensions",
            "desc": "Manteniment de botelles, ajust de volum d'aire i reconstruccions completes de cartutxos per a forquilles Fox, RockShox i Öhlins."
        },
        "rear_shock": {
            "badge": "Expert",
            "title": "Amortidor Posterior",
            "desc": "Manteniment de cambra d'aire, càrrega de nitrogen i re-valvulat de sistemes a mida per un control absolut de la tracció posterior."
        }
    }
}, {
    "title_1": "vraivēlo",
    "title_2": "Plans de Subscripció",
    "join_now": "Uneix-te Ara",
    "recommended": "Recomanat",
    "premium": "Premium",
    "plans": {
        "peloton": {
            "name": "Pilot de Pilot",
            "price": "69€",
            "period": "/any",
            "f1": "Ajustaments bàsics gratuïts",
            "f2": "10% de descompte en peces",
            "f3": "Reserva prioritària al taller",
            "f4": "Accés a esdeveniments oficials i grup privat"
        },
        "pro": {
            "name": "Rendiment Pro",
            "price": "129€",
            "period": "/any",
            "f1": "1 inspecció completa anual GRATIS (valor > 60€)",
            "f2": "Servei prioritari: 48–72 hores",
            "f3": "Descomptes: 15% mà d'obra + 10% accessoris",
            "f4": "50% de dte en Social Rides (cafè inclòs)",
            "f5": "50% de dte en cursos de formació"
        },
        "elite": {
            "name": "Fàbrica d'Elit",
            "price": "249€",
            "period": "/any",
            "f1": "2 inspeccions completes anuals GRATIS",
            "f2": "Prioritat VIP al taller 24 hores",
            "f3": "20% de descompte en mà d'obra i peces",
            "f4": "Prioritat en caps de setmana vraivēlo",
            "f5": "1 experiència exclusiva a l'any GRATIS"
        }
    }
});

let jsx = fs.readFileSync(jsxPath, 'utf8');

if (!jsx.includes("useTranslation")) {
    jsx = jsx.replace("import React from 'react';", "import React from 'react';\nimport { useTranslation } from 'react-i18next';");
}
if (!jsx.includes("const { t } = useTranslation();")) {
    jsx = jsx.replace("const navigate = useNavigate();", "const navigate = useNavigate();\n    const { t } = useTranslation();");
}

let replacements = [
    ["Select Your <br />", "{t('workshop.discipline.title_1')} <br />"],
    ["<span>Service Discipline</span>", "<span>{t('workshop.discipline.title_2')}</span>"],
    ["Become a vraivelo Member", "{t('workshop.discipline.become_member')}"],
    ["Choose a specialized workshop category. Our mechanics are certified for high-performance tuning across all major mountain and road bicycle components.", "{t('workshop.discipline.subtitle')}"],
    
    // Mechanics Card
    [">Essential<", ">{t('workshop.discipline.cards.mechanics.badge')}<"],
    [">Tune-up and Mechanics<", ">{t('workshop.discipline.cards.mechanics.title')}<"],
    [">\\s*Comprehensive drivetrain cleaning, bolt torque verification, and precision shifting adjustments for daily performance.\\s*<", ">{t('workshop.discipline.cards.mechanics.desc')}<"],
    
    // Suspensions Card
    [">Advanced<", ">{t('workshop.discipline.cards.suspensions.badge')}<"],
    [">Suspensions<", ">{t('workshop.discipline.cards.suspensions.title')}<"],
    [">\\s*Lower leg service, air spring volume tuning, and full damper rebuilds for Fox, RockShox, and Öhlins forks.\\s*<", ">{t('workshop.discipline.cards.suspensions.desc')}<"],
    
    // Shock Card
    [">Expert<", ">{t('workshop.discipline.cards.rear_shock.badge')}<"],
    [">Rear Shock<", ">{t('workshop.discipline.cards.rear_shock.title')}<"],
    [">\\s*Air sleeve maintenance, nitrogen charging, and bespoke shim stack re-valving for absolute rear-end traction control.\\s*<", ">{t('workshop.discipline.cards.rear_shock.desc')}<"],
    
    // Common View Services
    [">\\s*View Services\\s*", ">{t('workshop.discipline.view_services')}\n                                    "],
    
    // Membership
    ["vraivēlo<br />", "{t('workshop.membership.title_1')}<br />"],
    ["<span className=\"workshop-membership-title-highlight\">Membership Plans</span>", "<span className=\"workshop-membership-title-highlight\">{t('workshop.membership.title_2')}</span>"],
    
    // Peloton
    [">Peloton Rider<", ">{t('workshop.membership.plans.peloton.name')}<"],
    [">69€<", ">{t('workshop.membership.plans.peloton.price')}<"],
    [">/year<", ">{t('workshop.membership.plans.peloton.period')}<"],
    [">Free basic adjustments<", ">{t('workshop.membership.plans.peloton.f1')}<"],
    [">10% parts discount<", ">{t('workshop.membership.plans.peloton.f2')}<"],
    [">Workshop priority booking<", ">{t('workshop.membership.plans.peloton.f3')}<"],
    [">Access to official events and a private group<", ">{t('workshop.membership.plans.peloton.f4')}<"],
    
    // Pro
    [">Recommended<", ">{t('workshop.membership.recommended')}<"],
    [">Pro Performance<", ">{t('workshop.membership.plans.pro.name')}<"],
    [">129€<", ">{t('workshop.membership.plans.pro.price')}<"],
    [">1 FREE annual full inspection \\(worth over €60\\)<", ">{t('workshop.membership.plans.pro.f1')}<"],
    [">Priority service: 48–72 hours<", ">{t('workshop.membership.plans.pro.f2')}<"],
    [">Discounts: 15% off labor \\\\+ 10% off clothing and accessories<", ">{t('workshop.membership.plans.pro.f3')}<"],
    [">50% off Social Rides, including coffee<", ">{t('workshop.membership.plans.pro.f4')}<"],
    [">50% off training courses<", ">{t('workshop.membership.plans.pro.f5')}<"],
    
    // Elite
    [">Premium<", ">{t('workshop.membership.premium')}<"],
    [">Elite Factory<", ">{t('workshop.membership.plans.elite.name')}<"],
    [">249€<", ">{t('workshop.membership.plans.elite.price')}<"],
    [">2 FREE comprehensive annual inspections<", ">{t('workshop.membership.plans.elite.f1')}<"],
    [">VIP Priority at the 24-Hour Repair Shop<", ">{t('workshop.membership.plans.elite.f2')}<"],
    [">20% off labor, clothing, and parts<", ">{t('workshop.membership.plans.elite.f3')}<"],
    [">Priority on vraivēlo weekends and training sessions<", ">{t('workshop.membership.plans.elite.f4')}<"],
    [">1 exclusive experience per year for FREE<", ">{t('workshop.membership.plans.elite.f5')}<"],
    
    // Join Now
    [">\\s*Join Now", ">{t('workshop.membership.join_now')}"]
];

for (let [search, replace] of replacements) {
    let regex = new RegExp(search, "g");
    jsx = jsx.replace(regex, replace);
}

fs.writeFileSync(jsxPath, jsx, 'utf8');
console.log("Translation applied!");
