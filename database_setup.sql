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
