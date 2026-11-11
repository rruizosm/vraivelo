/**
 * Post-build SEO prerender.
 *
 * Why: the site is a client-side React app hosted on Amplify. Without a file at
 * /shop/index.html, /workshop/index.html, etc. Amplify answers every inner URL with an
 * HTTP 404 (the browser still shows the app, but Google refuses to index it).
 *
 * What it does, after `vite build`:
 *  - writes dist/<route>/index.html for every public route (static pages, every bike /
 *    product from Supabase, local clothes and the stories), each with its own <title>,
 *    description, canonical, Open Graph tags and JSON-LD;
 *  - puts a lightweight static version of the page (H1, intro, internal links) inside
 *    #root so crawlers see real content and links before JavaScript runs. React replaces
 *    it as soon as the app mounts;
 *  - regenerates dist/sitemap.xml with every URL.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

import { clothes } from '../src/data/clothes.js';
import { storiesEs } from '../src/data/stories_es.js';
import { productPath } from '../src/lib/productUrl.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const SITE = 'https://vraivelo.com';
const DEFAULT_IMAGE = `${SITE}/vv_logo_2.png`;

dotenv.config({ path: path.join(ROOT, '.env'), quiet: true });

const es = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/locales/es.json'), 'utf8'));
const seo = es.seo;

// ─── helpers ────────────────────────────────────────────────────────────────
const esc = (s = '') =>
    String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');

const canonicalPath = (p) => (p === '/' ? '/' : p.endsWith('/') ? p : `${p}/`);
const abs = (url) => {
    if (!url) return DEFAULT_IMAGE;
    if (/^https?:\/\//.test(url)) return url;
    return `${SITE}${url.startsWith('/') ? '' : '/'}${encodeURI(url)}`;
};
const fill = (tpl, name) => tpl.replace(/\{\{name\}\}/g, name);
const clip = (text, max = 155) => {
    const t = String(text || '').replace(/\s+/g, ' ').trim();
    if (t.length <= max) return t;
    return `${t.slice(0, max - 1).replace(/\s+\S*$/, '')}…`;
};
const parsePrice = (p) => {
    if (p == null) return null;
    const n = parseFloat(String(p).replace(/[^\d,.]/g, '').replace(/\.(?=\d{3}\b)/g, '').replace(',', '.'));
    return Number.isFinite(n) && n > 0 ? n.toFixed(2) : null;
};
const titleCase = (s = '') => s.toLowerCase().replace(/(^|\s)\S/g, (c) => c.toUpperCase());
const h1From = (title) => title.split(' | ')[0];
// specs/sizes come as arrays, JSON-ish strings ("['a','b']") or plain text
const toList = (value) => {
    if (!value) return [];
    if (Array.isArray(value)) return value.map(String).filter(Boolean);
    const text = String(value).trim();
    if (text.startsWith('[')) {
        try { return JSON.parse(text.replace(/'/g, '"')).map(String); } catch { /* fall through */ }
    }
    return [text];
};
const CATEGORY_ES = {
    Road: 'Bicicleta de carretera',
    MTB: 'Bicicleta de montaña (MTB)',
    Gravel: 'Bicicleta gravel',
    eBike: 'Bicicleta eléctrica',
    Kids: 'Bicicleta infantil',
    Wheels: 'Ruedas',
    Clothes: 'Ropa de ciclismo',
};

const NAV = [
    ['/', 'Inicio'],
    ['/workshop/', 'Taller de bicicletas'],
    ['/workshop/mechanics/', 'Reparación y puesta a punto'],
    ['/workshop/suspensions/', 'Mantenimiento de horquillas'],
    ['/workshop/rear-shock/', 'Mantenimiento de amortiguadores'],
    ['/shop/', 'Bicicletas'],
    ['/other-products/', 'Recambios y accesorios'],
    ['/vraivelo/', 'Nuestra historia'],
    ['/contact/', 'Contacto'],
];

const linkList = (items) =>
    `<ul>${items.map(([href, label]) => `<li><a href="${esc(href)}">${esc(label)}</a></li>`).join('')}</ul>`;

// ─── data ───────────────────────────────────────────────────────────────────
async function loadCatalog() {
    const url = process.env.VITE_SUPABASE_URL;
    const key = process.env.VITE_SUPABASE_ANON_KEY;
    if (!url || !key) {
        console.warn('[prerender] Supabase env vars missing: product pages will not be prerendered.');
        return { bikes: [], products: [] };
    }
    const supabase = createClient(url, key);
    const [b, p] = await Promise.all([
        supabase.from('bikes').select('*'),
        supabase.from('products').select('*'),
    ]);
    if (b.error) console.warn('[prerender] bikes:', b.error.message);
    if (p.error) console.warn('[prerender] products:', p.error.message);
    return { bikes: b.data || [], products: p.data || [] };
}

// ─── page model ─────────────────────────────────────────────────────────────
function buildPages({ bikes, products }) {
    const pages = [];
    const staticPage = (route, key, extra = {}) =>
        pages.push({
            route,
            title: seo[key].title,
            description: seo[key].description,
            h1: seo[key].h1 || h1From(seo[key].title),
            ...extra,
        });

    // Only what the shop actually shows (Active = true), like Shop.jsx / OtherProducts.jsx
    const activeBikes = bikes.filter((b) => b.Active !== false);
    const activeProducts = products.filter((p) => p.Active !== false);

    // ProductDetail looks the id up in clothes → bikes → products, so a product whose id
    // matches a bike id would show the bike. Skip those instead of indexing the wrong page.
    const bikeIds = new Set(bikes.map((b) => String(b.id)));
    const clothIds = new Set(clothes.map((c) => String(c.id)));
    const reachableProducts = activeProducts.filter((p) => {
        const id = String(p.id);
        if (bikeIds.has(id) || clothIds.has(id)) {
            console.warn(`[prerender] product ${id} ("${p.Product || p.product}") shares its id with a bike: skipped.`);
            return false;
        }
        return true;
    });

    const bikeLinks = activeBikes.map((b) => [productPath(b), b.model]);
    const productLinks = [
        ...reachableProducts.map((p) => [productPath(p), p.Product || p.product]),
        ...clothes.map((c) => [productPath(c), c.model]),
    ];
    const storyLinks = storiesEs.filter((s) => s.content).map((s) => [`/vraivelo/${s.id}/`, titleCase(s.title)]);

    staticPage('/', 'home', { priority: '1.0', changefreq: 'weekly' });
    staticPage('/shop/', 'shop', { links: bikeLinks, priority: '0.9', changefreq: 'weekly' });
    staticPage('/other-products/', 'other_products', { links: productLinks, priority: '0.8', changefreq: 'weekly' });
    staticPage('/workshop/', 'workshop', { priority: '0.9', changefreq: 'monthly' });
    staticPage('/workshop/mechanics/', 'workshop_mechanics', { priority: '0.8', changefreq: 'monthly' });
    staticPage('/workshop/suspensions/', 'workshop_suspensions', { priority: '0.8', changefreq: 'monthly' });
    staticPage('/workshop/rear-shock/', 'workshop_rear_shock', { priority: '0.8', changefreq: 'monthly' });
    staticPage('/contact/', 'contact', { priority: '0.7', changefreq: 'monthly' });
    staticPage('/vraivelo/', 'vraivelo', { links: storyLinks, priority: '0.6', changefreq: 'monthly' });

    for (const s of storiesEs.filter((x) => x.content)) {
        const name = titleCase(s.title);
        pages.push({
            route: `/vraivelo/${s.id}/`,
            title: fill(seo.story.title, name),
            description: fill(seo.story.description, name),
            h1: name,
            image: s.image,
            ogType: 'article',
            breadcrumb: [['Nuestra historia', '/vraivelo/'], [name]],
            priority: '0.5',
            changefreq: 'monthly',
        });
    }

    const productPage = ({ item, name, brand, category, price, description, longDescription, specs, sizes, image, inStock, parent }) => {
        const route = productPath(item);
        const typeLabel = CATEGORY_ES[category] || category;
        const desc = description
            ? clip(`${name}: ${description}`)
            : fill(seo.product_detail.description, name);
        const priceValue = parsePrice(price);
        const jsonLd = {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name,
            image: [abs(image)],
            description: clip(longDescription || description || desc, 1000),
            ...(brand ? { brand: { '@type': 'Brand', name: brand } } : {}),
            ...(typeLabel ? { category: typeLabel } : {}),
            ...(priceValue
                ? {
                    offers: {
                        '@type': 'Offer',
                        url: `${SITE}${route}`,
                        priceCurrency: 'EUR',
                        price: priceValue,
                        availability: inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
                        itemCondition: 'https://schema.org/NewCondition',
                        seller: { '@id': `${SITE}/#business` },
                    },
                }
                : {}),
        };
        pages.push({
            route,
            title: fill(seo.product_detail.title, name),
            description: desc,
            h1: name,
            intro: [brand, typeLabel, price].filter(Boolean).join(' · '),
            image,
            imageAlt: [name, typeLabel].filter(Boolean).join(' – '),
            paragraphs: [description, longDescription].filter((t, i, a) => t && a.indexOf(t) === i),
            specs: toList(specs),
            sizes: toList(sizes),
            ogType: 'product',
            jsonLd,
            breadcrumb: [parent, [name]],
            priority: '0.7',
            changefreq: 'weekly',
        });
    };

    const BIKES = ['Bicicletas', '/shop/'];
    const OTHER = ['Recambios y accesorios', '/other-products/'];

    for (const b of activeBikes) {
        productPage({
            item: b,
            name: b.model,
            brand: b.brand,
            category: b.category,
            price: b.price,
            description: b.description_es || b.description,
            longDescription: b.long_description_es,
            specs: b.specs_es || b.specs,
            sizes: b.sizes,
            image: b.image_url,
            inStock: b.quantity !== 0,
            parent: BIKES,
        });
    }
    for (const p of reachableProducts) {
        productPage({
            item: p,
            name: p.Product || p.product,
            brand: p.Brand || p.brand,
            category: p.Type || p.type,
            price: p.Price || p.price,
            description: p.description_spanish || p.description_es || p.Description || p.description,
            longDescription: p.long_description_es || p.Long_description_es,
            specs: p.Specs || p.specs,
            sizes: p.Size || p.size,
            image: p['Image URL'] || p['image url'] || p.image_url,
            inStock: p.quantity !== 0,
            parent: OTHER,
        });
    }
    for (const c of clothes) {
        productPage({
            item: c,
            name: c.model,
            brand: c.brand,
            category: c.category,
            price: c.price,
            description: c.description,
            longDescription: c.long_description,
            specs: c.specs,
            sizes: c.variants?.[0]?.sizes,
            image: c.variants?.[0]?.images?.[0] || c.image_url,
            inStock: true,
            parent: OTHER,
        });
    }

    return pages;
}

// ─── rendering ──────────────────────────────────────────────────────────────
function headFor(page) {
    const url = `${SITE}${canonicalPath(page.route)}`;
    const image = abs(page.image);
    const tags = [
        `<title>${esc(page.title)}</title>`,
        `<meta name="description" content="${esc(page.description)}" data-rh="true" />`,
        `<link rel="canonical" href="${url}" data-rh="true" />`,
        `<meta property="og:type" content="${page.ogType || 'website'}" data-rh="true" />`,
        `<meta property="og:site_name" content="Vraivelo" data-rh="true" />`,
        `<meta property="og:url" content="${url}" data-rh="true" />`,
        `<meta property="og:title" content="${esc(page.title)}" data-rh="true" />`,
        `<meta property="og:description" content="${esc(page.description)}" data-rh="true" />`,
        `<meta property="og:image" content="${esc(image)}" data-rh="true" />`,
        `<meta property="og:locale" content="es_ES" data-rh="true" />`,
        `<meta name="twitter:card" content="summary_large_image" data-rh="true" />`,
        `<meta name="twitter:title" content="${esc(page.title)}" data-rh="true" />`,
        `<meta name="twitter:description" content="${esc(page.description)}" data-rh="true" />`,
        `<meta name="twitter:image" content="${esc(image)}" data-rh="true" />`,
    ];
    const ld = [];
    if (page.jsonLd) ld.push(page.jsonLd);
    if (page.breadcrumb) {
        const items = [['Inicio', '/'], ...page.breadcrumb];
        ld.push({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: items.map(([name, href], i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name,
                ...(href ? { item: `${SITE}${href}` } : {}),
            })),
        });
    }
    for (const obj of ld) {
        // "<" escaped so a product description can never close the script tag
        tags.push(`<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`);
    }
    return tags.join('\n  ');
}

function productBody(page) {
    const img = page.image
        ? `<img src="${esc(abs(page.image))}" alt="${esc(page.imageAlt)}" width="640" style="max-width:100%;height:auto" />`
        : '';
    const text = page.paragraphs.map((p) => `<p>${esc(p)}</p>`).join('');
    const sizes = page.sizes.length ? `<h2>Tallas</h2><p>${page.sizes.map(esc).join(', ')}</p>` : '';
    const specs = page.specs.length ? `<h2>Especificaciones</h2><ul>${page.specs.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : '';
    const cta = '<p>Disponible en Vraivelo, tienda de bicicletas en Girona. <a href="/contact/">Consulta disponibilidad o reserva una prueba</a>.</p>';
    return img + text + sizes + specs + cta;
}

function shellFor(page) {
    const crumbs = page.breadcrumb
        ? `<nav aria-label="breadcrumb"><a href="/">Inicio</a>${page.breadcrumb
            .map(([name, href]) => ` › ${href ? `<a href="${href}">${esc(name)}</a>` : esc(name)}`)
            .join('')}</nav>`
        : '';
    return `<div class="seo-shell" style="max-width:960px;margin:0 auto;padding:96px 16px 48px;font-family:Inter,system-ui,sans-serif;color:#475569;background:#f8fafc;min-height:100vh">
<header><a href="/" style="color:#0f172a;font-weight:700;text-decoration:none">Vraivelo</a><nav aria-label="principal">${linkList(NAV)}</nav></header>
<main>${crumbs}<h1 style="color:#0f172a">${esc(page.h1)}</h1>${page.intro ? `<p>${esc(page.intro)}</p>` : ''}${page.paragraphs ? productBody(page) : `<p>${esc(page.description)}</p>`}${page.links?.length ? linkList(page.links) : ''}</main>
<footer><p>Vraivelo · Carrer Pau Vila i Dinarès 10, 17003 Girona · <a href="tel:+34657317270">+34 657 317 270</a> · <a href="mailto:info@vraivelo.com">info@vraivelo.com</a></p></footer>
</div>`;
}

function render(template, page) {
    const html = template
        .replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, headFor(page))
        .replace('<!--seo:shell-->', shellFor(page));
    if (html === template) throw new Error('SEO markers not found in dist/index.html');
    return html;
}

function sitemap(pages) {
    const today = new Date().toISOString().slice(0, 10);
    const urls = pages
        .map(
            (p) => `  <url>
    <loc>${SITE}${canonicalPath(p.route)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
        )
        .join('\n');
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

// ─── main ───────────────────────────────────────────────────────────────────
const templatePath = path.join(DIST, 'index.html');
const template = fs.readFileSync(templatePath, 'utf8');
if (!template.includes('<!--seo:start-->') || !template.includes('<!--seo:shell-->')) {
    throw new Error('dist/index.html has no SEO markers: was it already prerendered?');
}

const pages = buildPages(await loadCatalog());
for (const page of pages) {
    const out = page.route === '/' ? templatePath : path.join(DIST, page.route, 'index.html');
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, render(template, page));
}
fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemap(pages));

console.log(`[prerender] ${pages.length} pages written, sitemap.xml updated.`);
