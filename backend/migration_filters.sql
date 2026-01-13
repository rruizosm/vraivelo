-- Add on_sale and coming_soon columns
ALTER TABLE public.bikes ADD COLUMN IF NOT EXISTS on_sale boolean DEFAULT false;
ALTER TABLE public.bikes ADD COLUMN IF NOT EXISTS coming_soon boolean DEFAULT false;

-- Update some bikes for testing purposes
-- On Sale: Berria Naii (107), Berria Belador Pro Ultegra (110), Giant TCR Advanced Pro 1 (307)
UPDATE public.bikes SET on_sale = true WHERE id IN (107, 110, 307);

-- Coming Soon: Berria Mako (108), Berria Belador Pro Rival (111), MMR Adrenaline SL (507)
UPDATE public.bikes SET coming_soon = true WHERE id IN (108, 111, 507);
