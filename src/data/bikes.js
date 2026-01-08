//berria
import berriaAllroadImg from '../../public/berria/berria_allroad.webp';
import berriaNaiiImg from '../../public/berria/berria_naii.webp';
import berriaMakoImg from '../../public/berria/berria_mako_pro.webp';
import berriaTaurusImg from '../../public/berria/berria_taurus_adv.webp';
import berriaBeladorProRivalImg from '../../public/berria/berria_belador_rival.webp';
import berriaBeladorPro105Img from '../../public/berria/berria_belador_pro_105.webp';
import berriaBeladorProUltegraImg from '../../public/berria/berria_belador_pro_ultegra.webp';

//giant
import giantAdvancedProAxsImg from '../../public/giant/giant_advanced_pro_axs.png';
import giantAdvancedPro0Img from '../../public/giant/giant_tcr_advanced_pro1_di2.png';

//mmr
import mmrAdrenaline30Plus from '../../public/mmr/mmr_adrenaline_30_plus.png';
import mmrAdrenalineBordeaux from '../../public/mmr/mmr_adrenaline_bordeaux.png';

import { image } from 'framer-motion/client';

export const categories = ['All', 'Road', 'MTB', 'Gravel', 'E-Bike', 'Time Trial'];

export const bikes = [
    // Berria
    {
        id: 106,
        brand: 'Berria',
        model: 'Allroad Adv GRX400',
        category: 'Gravel',
        price: '3000€',
        new: true,
        desc: 'Bicicleta Gravel con transmisión Shimano GRX400.',
        image: berriaAllroadImg,
        specs: [
            'Frame: Allroad HPR 2G, Gravel Type 1-2 Geometry BGC, Aluminum 3BS 6061 Hydroforming, Full internal cable system ICS2, Headset semi integrated OH2S 1-1/2" - 1-1/2", Flat Mount 140mm, 700x42c maximum tyre, Thru axle 12x142mm, UDH Standard',
            'Fork: Allroad EVO 3, full carbon, internal cable system ICS2, 1-1/8" - 1-1/2" Tapered, Flat Mount Standard max. 160mm disc, 700x50c maximum tyre, 51mm fork rake, 395mm axle to crown, Thru axle 12x100mm',
            'Material: Aluminum 3BS 6061 Hydroforming',
            'Handlebar: Avanforce 3 Gravel, Alloy 6061, Ø31.8, width: 400, 420, 440mm',
            'Seatpost: Avanforce AF3, Aluminum 6061, 0 offset, Ø27.2, length: 350, 400mm',
            'Saddle: Selle Royal 2058HRN, Steel rails, length: 285mm, width: 145mm',
            'Derailleur Hanger: Universal Derailleur Hanger',
            'Wheels: Avanforce Sniper24 700C, 12x100, Thru Axle 12x142mm, SH11 Rear Hub, Center Lock, internal width 24mm',
            'Shifters: SHIMANO GRX400, ST-RX400, 10s',
            'Rear Derailleur: SHIMANO GRX400, RD-RX400, 10s',
            'Front Derailleur: SHIMANO GRX400, FD-RX400, 10s',
            'Crankset: SHIMANO GRX FC-RX600-10, Crankset 46/30T, 170-172.5-175mm',
            'Chain: CN-HG54, 116 Links',
            'Cassette: CS-HG62-10, 11-36T',
            'Bottom Bracket: Shimano BB86 Press Fit, Black',
            'Brakes: SHIMANO BR-RX400, Hydraulic Disc Brake',
        ],
        colors: ["#EF4444", "#FFFFFF", "#000000"],
        sizes: ["S"]
    },
    {
        id: 107,
        brand: 'Berria',
        model: 'Naii BR Rival XPLR',
        category: 'Gravel',
        price: 'Consultar',
        new: true,
        desc: 'Fast Gravel bike con SRAM Rival XPLR AXS.',
        image: berriaNaiiImg,
        specs: [
            "Frame: Naii Carbon",
            "Groupset: SRAM Rival XPLR AXS",
            "Size: S"
        ],
        colors: ["#EF4444", "#FFFFFF", "#000000"],
        sizes: ["S"]
    },
    {
        id: 108,
        brand: 'Berria',
        model: 'Mako Pro XO AXS',
        category: 'MTB',
        price: 'Consultar',
        new: true,
        desc: 'MTB doble suspensión con SRAM XO AXS.',
        image: berriaMakoImg,
        specs: [
            "Frame: Mako Carbon",
            "Groupset: SRAM XO AXS",
            "Size: M"
        ],
        colors: ["#EF4444", "#FFFFFF", "#000000"],
        sizes: ["M"]
    },
    {
        id: 109,
        brand: 'Berria',
        model: 'Taurus Adv SX',
        category: 'MTB',
        price: 'Consultar',
        new: true,
        desc: 'MTB rígida con SRAM SX Eagle.',
        image: berriaTaurusImg,
        specs: [
            "Frame: Aluminum 3BS",
            "Fork: RockShox Judy TK",
            "Groupset: SRAM SX Eagle",
            "Size: S"
        ],
        colors: ["#EF4444", "#FFFFFF", "#000000"],
        sizes: ["S"]
    },
    {
        id: 110,
        brand: 'Berria',
        model: 'Belador Pro Ultegra Di2',
        category: 'Road',
        price: 'Consultar',
        new: true,
        desc: 'Bicicleta de carretera aero con Ultegra Di2.',
        image: berriaBeladorProUltegraImg,
        specs: [
            "Frame: Belador Carbon",
            "Groupset: Shimano Ultegra Di2",
            "Size: M"
        ],
        colors: ["#EF4444", "#FFFFFF", "#000000"],
        sizes: ["M"]
    },
    {
        id: 111,
        brand: 'Berria',
        model: 'Belador Pro Rival AXS',
        category: 'Road',
        price: 'Consultar',
        new: true,
        desc: 'Bicicleta de carretera aero con Rival AXS.',
        image: berriaBeladorProRivalImg,
        specs: [
            "Frame: Belador Carbon",
            "Groupset: SRAM Rival AXS",
            "Size: S"
        ],
        colors: ["#EF4444", "#FFFFFF", "#000000"],
        sizes: ["S"]
    },
    {
        id: 112,
        brand: 'Berria',
        model: 'Belador Pro 105 Di2',
        category: 'Road',
        price: 'Consultar',
        new: true,
        desc: 'Bicicleta de carretera aero con 105 Di2.',
        image: berriaBeladorPro105Img,
        specs: [
            "Frame: Belador Carbon",
            "Groupset: Shimano 105 Di2",
            "Size: M"
        ],
        colors: ["#EF4444", "#FFFFFF", "#000000"],
        sizes: ["M"]
    },

    // Giant
    {
        id: 306,
        brand: 'Giant',
        model: 'TCR Advanced Pro 0-AXS',
        category: 'Road',
        price: 'Consultar',
        new: true,
        desc: 'TCR Advanced Pro con SRAM Force AXS.',
        image: giantAdvancedProAxsImg,
        specs: ["Frame: Advanced Composite", "Groupset: SRAM Force AXS", "Size: ML"],
        colors: ["#EF4444", "#FFFFFF", "#000000"],
        sizes: ["M", "L"]
    },
    {
        id: 307,
        brand: 'Giant',
        model: 'TCR Advanced Pro 1-Di2',
        category: 'Road',
        price: 'Consultar',
        new: true,
        desc: 'TCR Advanced Pro con Shimano 105 Di2.',
        image: giantAdvancedPro0Img,
        specs: ["Frame: Advanced Composite", "Groupset: Shimano 105 Di2", "Size: S"],
        colors: ["#EF4444", "#FFFFFF", "#000000"],
        sizes: ["S"]
    },

    // MMR
    {
        id: 506,
        brand: 'MMR',
        model: 'Adrenaline 30 Plus Carbon',
        category: 'Road',
        price: 'Consultar',
        new: true,
        desc: 'Bicicleta de carretera carbono 2025.',
        image: mmrAdrenaline30Plus,
        specs: ["Frame: Carbon", "Size: S"],
        colors: ["#EF4444", "#FFFFFF", "#000000"],
        sizes: ["S"]
    },
    {
        id: 507,
        brand: 'MMR',
        model: 'Adrenaline SL 00 Bordeaux',
        category: 'Road',
        price: 'Consultar',
        new: true,
        desc: 'Edición especial Bordeaux con Metron RS.',
        image: mmrAdrenalineBordeaux,
        specs: ["Frame: Carbon SL", "Wheels: Metron RS", "Size: S"],
        colors: ["#EF4444", "#FFFFFF", "#000000"],
        sizes: ["S"]
    }

];
