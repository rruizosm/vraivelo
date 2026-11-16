// Site-wide feature flags
// Set to true to enable shopping cart and purchasing functionality
// Set to false to disable cart, hide "Add to Cart" buttons, and hide the cart icon
export const CART_ENABLED = false;

// Bikes highlighted on the home page and listed first in the shop ("Destacadas").
// These are `bikes.id` values from Supabase, in display order. Ids that are no longer
// active are skipped, so it is safe to leave old ones here. Edit freely.
export const FEATURED_BIKE_IDS = [313, 331, 308, 123, 114, 119, 106, 317];

// Images for each featured box on the home carousel (from public/bikes/, see its README):
//   photo → lifestyle photo shown by default
//   bike  → the exact bike (catalogue shot) revealed on hover
// Bikes not listed here use their `image_url` from the database on a light background.
export const FEATURED_BIKE_MEDIA = {
    313: { photo: '/bikes/giant/tcr/_family/lifestyle/01.webp', bike: '/bikes/giant/tcr/tcr-advanced-2/stealth-chrome.jpg' },
    331: { photo: '/bikes/giant/revolt/_family/lifestyle/17.webp', bike: '/bikes/giant/revolt/revolt-advanced-3/aquarium.jpg' },
    308: { photo: '/bikes/giant/anthem/_family/lifestyle/12.webp', bike: '/bikes/giant/anthem/anthem-advanced-sl-3/carbon-moon-dust.jpg' },
    123: { photo: '/bikes/berria/nexxen/_family/lifestyle/01.webp', bike: '/bikes/berria/nexxen/nexxen-adv-plus-deore/black.webp' },
    114: { photo: '/bikes/berria/belador/_family/lifestyle/01.webp', bike: '/bikes/berria/belador/belador-pro-105/black.webp' },
    119: { photo: '/bikes/berria/naii/_family/lifestyle/01.webp', bike: '/bikes/berria/naii/naii-grx800/orange.webp' },
    106: { photo: '/bikes/berria/allroad/_family/lifestyle/08.webp', bike: '/bikes/berria/allroad/allroad-adv-grx400/cover.webp' },
    317: { photo: '/bikes/giant/tcr/tcr-advanced-pro-0-di2/lifestyle/01.webp', bike: '/bikes/giant/tcr/tcr-advanced-pro-0-di2/mercury-glare-chrome.jpg' },
};
