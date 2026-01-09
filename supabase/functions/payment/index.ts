import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Stripe } from "https://esm.sh/stripe@11.1.0?target=deno"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY')
        if (!STRIPE_SECRET_KEY) {
            throw new Error('STRIPE_SECRET_KEY is not set')
        }

        const stripe = new Stripe(STRIPE_SECRET_KEY, {
            apiVersion: '2022-11-15',
            httpClient: Stripe.createFetchHttpClient(),
        })

        const { cartItems } = await req.json()

        const lineItems = cartItems.map((item: any) => {
            // Parse price "3000€" -> 300000 (cents)
            // Removing non-numeric chars except period if present (assuming EUR without decimals usually but safer to parse)
            // Simplification: assuming integer price for now or simple parse.
            const priceString = item.price.replace(/[^0-9.]/g, '');
            let priceAmount = parseFloat(priceString);

            // Convert to cents
            const unitAmount = Math.round(priceAmount * 100);

            return {
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: `${item.model} (${item.brand})`,
                        description: item.size ? `Size: ${item.size}` : undefined,
                        images: item.image ? [item.image] : [], // Note: Stripe images must be public URLs
                    },
                    unit_amount: unitAmount,
                },
                quantity: item.quantity,
            }
        })

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${req.headers.get('origin')}/success`, // Redirects back to frontend
            cancel_url: `${req.headers.get('origin')}/shop`,
        })

        return new Response(
            JSON.stringify({ sessionId: session.id, url: session.url }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
        )
    } catch (error) {
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
        )
    }
})
