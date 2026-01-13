import { loadStripe } from '@stripe/stripe-js';

const key = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
console.log("Stripe Key:", key ? "Loaded" : "Missing");
export const stripePromise = loadStripe(key);
