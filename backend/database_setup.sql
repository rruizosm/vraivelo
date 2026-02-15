-- Create the bikes table
-- We match the structure of the existing bikes.js data
create table public.bikes (
  id bigint primary key, -- Keeping original IDs (101, 102...)
  brand text not null,
  model text not null,
  category text not null,
  price text,
  is_new boolean default false, -- Mapped from 'new'
  description text, -- Mapped from 'desc'
  image_url text, -- Mapped from 'image'
  specs text[],
  colors text[],
  sizes text[]
);

-- Enable Row Level Security (RLS) is checking the best practice
alter table public.bikes enable row level security;

-- Create policy to allow public read access
-- This allows anyone (even without logging in) to fetch the bikes
create policy "Allow public read access"
  on public.bikes
  for select
  to anon
  using (true);

-- Optional: Policy for service role to insert/update (backend only)
-- Implicitly allowed for service_role, but good to know.

-- =============================================
-- Create the products table (Other Products page)
-- Matches the existing Supabase 'products' table structure
-- =============================================
create table public.products (
  id bigint primary key,
  "Product" text not null,
  "Type" text not null,        -- Category: Clothes, Tires, etc.
  "Price" text,
  "Size" text,
  "Description" text,
  "Image URL" text,
  "Color" text,
  "Specs" text[]              -- Array of spec strings, same format as bikes
);

-- Enable Row Level Security (RLS)
alter table public.products enable row level security;

-- Create policy to allow public read access
create policy "Allow public read access"
  on public.products
  for select
  to anon
  using (true);

