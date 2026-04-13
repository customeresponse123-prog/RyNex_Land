-- Run this in Supabase → SQL Editor (once), then add your site URL under
-- Project Settings → API if you need CORS (GitHub Pages origin may be required).

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  form_type text not null,
  name text,
  email text,
  county text,
  state text,
  notes text,
  parcel_number text,
  acres text,
  asking_price text,
  phone text
);

alter table public.leads enable row level security;

-- Allow anonymous inserts from the website (anon key). No public SELECT.
drop policy if exists "anon insert leads" on public.leads;
create policy "anon insert leads"
  on public.leads
  for insert
  to anon
  with check (true);
