-- ESQUEMA INICIAL PROPUESTO PARA LA SIGUIENTE ETAPA.
-- No ejecutar todavía en producción sin revisar políticas, roles y requisitos finales.

create extension if not exists pgcrypto;

create table if not exists public.agency_settings (
  id uuid primary key default gen_random_uuid(),
  agency_name text not null default 'Viza Automotores',
  logo_path text,
  primary_color text not null default '#d62d3c',
  secondary_color text not null default '#202126',
  theme text not null default 'light' check (theme in ('light', 'dark')),
  whatsapp text,
  phone text,
  address text,
  city text,
  province text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.vehicles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  brand text not null,
  model text not null,
  version text,
  year integer not null,
  kilometers integer,
  price numeric,
  price_label text not null default 'Consultar',
  category text not null check (category in ('Auto', 'Camioneta', 'Moto', 'Utilitario')),
  condition text not null check (condition in ('Nuevo', 'Usado')),
  body_style text,
  engine text,
  power text,
  transmission text,
  fuel text,
  traction text,
  color text,
  description text,
  highlights text[] not null default '{}',
  status text not null default 'Disponible' check (status in ('Disponible', 'Reservado', 'Vendido', 'Borrador')),
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.vehicle_images (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid not null references public.vehicles(id) on delete cascade,
  storage_path text not null,
  alt_text text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  subject text,
  message text not null,
  vehicle_id uuid references public.vehicles(id) on delete set null,
  status text not null default 'Nueva' check (status in ('Nueva', 'En revisión', 'Contactado', 'Finalizada')),
  created_at timestamptz not null default now()
);

create table if not exists public.appraisals (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  category text not null,
  brand text not null,
  model text not null,
  year integer not null,
  kilometers integer,
  condition text,
  expected_price text,
  message text not null,
  status text not null default 'Nueva' check (status in ('Nueva', 'En revisión', 'Contactado', 'Finalizada')),
  created_at timestamptz not null default now()
);

-- Próximo paso de seguridad: definir roles admin, activar RLS y políticas explícitas.
-- No dejar tablas administrativas expuestas con políticas permisivas.
