-- ============================================================
-- VIZA AUTOMOTORES - ESQUEMA INICIAL V2.1
-- Ejecutar UNA SOLA VEZ en el proyecto nuevo de Supabase.
-- No ejecutar el schema.sql inicial. Este archivo lo reemplaza.
--
-- Incluye:
-- - Tablas de agencia, vehículos, fotografías, consultas,
--   tasaciones, fotos privadas de tasaciones y perfiles admin.
-- - RLS y permisos explícitos para la Data API.
-- - Revocación explícita de permisos heredados antes de conceder los mínimos.
-- - Sin DROP de tablas, políticas ni triggers.
-- - Las relaciones de fotos no borran metadatos automáticamente; el código
--   deberá borrar primero archivos y registros de imagen de forma explícita.
-- - Buckets de Storage y políticas de escritura para admins.
--
-- IMPORTANTE:
-- - Las fotos públicas de vehículos se sirven desde un bucket
--   público; solamente los admins pueden subir/modificar/borrar.
-- - Las fotos de tasaciones van a un bucket privado.
-- - La carga pública de fotos de tasaciones se hará más adelante
--   desde un endpoint de servidor protegido, no desde el navegador.
-- - Después de crear el primer usuario en Auth, hay que registrarlo
--   manualmente en public.admin_profiles (instrucciones al final).
-- ============================================================

begin;

-- 1. Extensión para UUIDs
create extension if not exists pgcrypto;

-- 2. Esquema privado para funciones auxiliares no expuestas por la API
create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to authenticated, service_role;

-- 3. Perfil de administradores.
-- El usuario se crea primero en Supabase Authentication.
create table if not exists public.admin_profiles (
  user_id uuid primary key references auth.users(id),
  display_name text,
  role text not null default 'admin' check (role in ('admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Función de autorización: comprueba el usuario autenticado contra
-- la lista de administradores. No permite que el propio cliente
-- se asigne el rol de administrador.
create function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.admin_profiles as ap
    where ap.user_id = (select auth.uid())
      and ap.role = 'admin'
  );
$$;

revoke all on function private.is_admin() from public, anon;
grant execute on function private.is_admin() to authenticated, service_role;

-- Función común para actualizar updated_at automáticamente.
create function private.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := pg_catalog.now();
  return new;
end;
$$;

revoke all on function private.set_updated_at() from public, anon;
grant execute on function private.set_updated_at() to authenticated, service_role;

-- 4. Configuración de la agencia (una sola fila por instalación)
create table if not exists public.agency_settings (
  id smallint primary key default 1 check (id = 1),
  agency_name text not null default 'Viza Automotores',
  slogan text,
  logo_path text,
  hero_image_path text,
  primary_color text not null default '#D62D3C'
    check (primary_color ~ '^#[0-9A-Fa-f]{6}$'),
  secondary_color text not null default '#202126'
    check (secondary_color ~ '^#[0-9A-Fa-f]{6}$'),
  theme text not null default 'light' check (theme in ('light', 'dark')),
  whatsapp text,
  phone text,
  address text,
  city text,
  province text,
  opening_hours jsonb not null default '{}'::jsonb,
  services jsonb not null default '[]'::jsonb,
  social_links jsonb not null default '{}'::jsonb,
  google_maps_url text,
  google_reviews_url text,
  commercial_message text not null default
    'FINANCIAMOS HASTA EL 60% DEL VALOR DEL VEHICULO SOLO CON DNI, CUOTAS FIJAS Y EN PESOS.' || E'\n' ||
    'RECIBIMOS TU USADO' || E'\n' ||
    'VIZA AUTOMOTORES, CRUZ ALTA, CORDOBA',
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into public.agency_settings (id, agency_name)
values (1, 'Viza Automotores')
on conflict (id) do nothing;

-- 5. Vehículos
create table if not exists public.vehicles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  brand text not null,
  model text not null,
  version text,
  year integer not null check (year between 1900 and 2100),
  kilometers integer check (kilometers is null or kilometers >= 0),
  price numeric(14,2) check (price is null or price >= 0),
  currency text check (currency is null or currency in ('ARS', 'USD')),
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
  status text not null default 'Borrador'
    check (status in ('Disponible', 'Reservado', 'Vendido', 'Borrador')),
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists vehicles_public_status_idx
  on public.vehicles (status, created_at desc);
create index if not exists vehicles_brand_idx
  on public.vehicles (brand);
create index if not exists vehicles_category_idx
  on public.vehicles (category);
create index if not exists vehicles_condition_idx
  on public.vehicles (condition);
create index if not exists vehicles_featured_idx
  on public.vehicles (featured)
  where featured = true;

-- 6. Fotografías públicas de vehículos.
-- No hay límite fijo de cantidad de fotos por vehículo.
create table if not exists public.vehicle_images (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid not null references public.vehicles(id),
  storage_path text not null unique,
  alt_text text,
  sort_order integer not null default 0 check (sort_order >= 0),
  is_cover boolean not null default false,
  mime_type text check (mime_type is null or mime_type in ('image/jpeg', 'image/png', 'image/webp')),
  file_size bigint check (file_size is null or file_size > 0),
  created_at timestamptz not null default now()
);

create index if not exists vehicle_images_vehicle_order_idx
  on public.vehicle_images (vehicle_id, sort_order);

create unique index if not exists vehicle_images_one_cover_per_vehicle_idx
  on public.vehicle_images (vehicle_id)
  where is_cover = true;

-- 7. Consultas de potenciales compradores
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  subject text,
  message text not null,
  vehicle_id uuid references public.vehicles(id) on delete set null,
  status text not null default 'Nueva'
    check (status in ('Nueva', 'En revisión', 'Contactado', 'Finalizada')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists inquiries_status_created_idx
  on public.inquiries (status, created_at desc);

-- 8. Solicitudes de tasación. Las fotos se guardan aparte en un
-- bucket privado y sus rutas se registran en appraisal_images.
create table if not exists public.appraisals (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  category text not null check (category in ('Auto', 'Camioneta', 'Moto', 'Utilitario')),
  brand text not null,
  model text not null,
  year integer not null check (year between 1900 and 2100),
  kilometers integer check (kilometers is null or kilometers >= 0),
  condition text check (condition is null or condition in ('Nuevo', 'Usado')),
  expected_price numeric(14,2) check (expected_price is null or expected_price >= 0),
  expected_currency text check (expected_currency is null or expected_currency in ('ARS', 'USD')),
  message text not null default '',
  status text not null default 'Nueva'
    check (status in ('Nueva', 'En revisión', 'Contactado', 'Finalizada')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists appraisals_status_created_idx
  on public.appraisals (status, created_at desc);

-- 9. Fotografías privadas de vehículos ofrecidos para tasación.
create table if not exists public.appraisal_images (
  id uuid primary key default gen_random_uuid(),
  appraisal_id uuid not null references public.appraisals(id),
  storage_path text not null unique,
  sort_order integer not null default 0 check (sort_order >= 0),
  mime_type text check (mime_type is null or mime_type in ('image/jpeg', 'image/png', 'image/webp')),
  file_size bigint check (file_size is null or file_size > 0),
  created_at timestamptz not null default now()
);

create index if not exists appraisal_images_appraisal_order_idx
  on public.appraisal_images (appraisal_id, sort_order);

-- 10. Activar RLS en todas las tablas de la aplicación
alter table public.admin_profiles enable row level security;
alter table public.agency_settings enable row level security;
alter table public.vehicles enable row level security;
alter table public.vehicle_images enable row level security;
alter table public.inquiries enable row level security;
alter table public.appraisals enable row level security;
alter table public.appraisal_images enable row level security;

-- 11. Permisos explícitos para la Data API.
-- Revocamos primero cualquier permiso heredado y luego concedemos
-- exclusivamente las operaciones necesarias para cada rol.
revoke all on table
  public.admin_profiles,
  public.agency_settings,
  public.vehicles,
  public.vehicle_images,
  public.inquiries,
  public.appraisals,
  public.appraisal_images
from public, anon, authenticated;

grant usage on schema public to anon, authenticated;

grant select on public.agency_settings to anon, authenticated;
grant update on public.agency_settings to authenticated;

grant select on public.vehicles to anon, authenticated;
grant insert, update, delete on public.vehicles to authenticated;

grant select on public.vehicle_images to anon, authenticated;
grant insert, update, delete on public.vehicle_images to authenticated;

grant insert (name, phone, email, subject, message, vehicle_id)
  on public.inquiries to anon, authenticated;
grant select, update, delete on public.inquiries to authenticated;

grant insert (name, phone, email, category, brand, model, year, kilometers,
              condition, expected_price, expected_currency, message)
  on public.appraisals to anon, authenticated;
grant select, update, delete on public.appraisals to authenticated;

grant select, insert, update, delete on public.appraisal_images to authenticated;

grant select on public.admin_profiles to authenticated;

-- El service_role se reserva para operaciones de servidor confiables.
grant all privileges on public.admin_profiles to service_role;
grant all privileges on public.agency_settings to service_role;
grant all privileges on public.vehicles to service_role;
grant all privileges on public.vehicle_images to service_role;
grant all privileges on public.inquiries to service_role;
grant all privileges on public.appraisals to service_role;
grant all privileges on public.appraisal_images to service_role;

-- 12. Políticas RLS: funciones administrativas
create policy "Admins can read their own profile"
  on public.admin_profiles for select to authenticated
  using (user_id = (select auth.uid()));

-- Configuración pública: lectura pública; edición solo por admins.
create policy "Public can read agency settings"
  on public.agency_settings for select to anon, authenticated
  using (true);

create policy "Admins can update agency settings"
  on public.agency_settings for update to authenticated
  using ((select private.is_admin()))
  with check ((select private.is_admin()));

-- Vehículos: visitantes ven publicaciones que no sean borradores.
create policy "Public can read published vehicles"
  on public.vehicles for select to anon, authenticated
  using (status <> 'Borrador');

create policy "Admins can manage vehicles"
  on public.vehicles for all to authenticated
  using ((select private.is_admin()))
  with check ((select private.is_admin()));

-- Fotografías: visibles cuando el vehículo está publicado; CRUD admin.
create policy "Public can read images of published vehicles"
  on public.vehicle_images for select to anon, authenticated
  using (
    exists (
      select 1
      from public.vehicles as v
      where v.id = vehicle_images.vehicle_id
        and v.status <> 'Borrador'
    )
  );

create policy "Admins can manage vehicle image records"
  on public.vehicle_images for all to authenticated
  using ((select private.is_admin()))
  with check ((select private.is_admin()));

-- Consultas: el público puede enviar, pero no leer ni modificar consultas.
create policy "Public can submit inquiries"
  on public.inquiries for insert to anon, authenticated
  with check (
    char_length(trim(name)) between 2 and 100
    and char_length(trim(phone)) between 6 and 40
    and char_length(trim(message)) between 3 and 5000
    and (email is null or char_length(email) <= 254)
    and (subject is null or char_length(subject) <= 160)
    and status = 'Nueva'
  );

create policy "Admins can manage inquiries"
  on public.inquiries for all to authenticated
  using ((select private.is_admin()))
  with check ((select private.is_admin()));

-- Tasaciones: el público puede enviar la solicitud, pero no leerla.
create policy "Public can submit appraisals"
  on public.appraisals for insert to anon, authenticated
  with check (
    char_length(trim(name)) between 2 and 100
    and char_length(trim(phone)) between 6 and 40
    and char_length(trim(brand)) between 1 and 80
    and char_length(trim(model)) between 1 and 120
    and (email is null or char_length(email) <= 254)
    and (message is null or char_length(message) <= 5000)
    and status = 'Nueva'
  );

create policy "Admins can manage appraisals"
  on public.appraisals for all to authenticated
  using ((select private.is_admin()))
  with check ((select private.is_admin()));

-- Fotografías de tasaciones: solo administradores pueden acceder.
-- La carga pública se hará a través de una ruta de servidor validada.
create policy "Admins can manage appraisal image records"
  on public.appraisal_images for all to authenticated
  using ((select private.is_admin()))
  with check ((select private.is_admin()));

-- 13. Triggers para updated_at
create trigger set_updated_at before update on public.admin_profiles
  for each row execute function private.set_updated_at();

create trigger set_updated_at before update on public.agency_settings
  for each row execute function private.set_updated_at();

create trigger set_updated_at before update on public.vehicles
  for each row execute function private.set_updated_at();

create trigger set_updated_at before update on public.inquiries
  for each row execute function private.set_updated_at();

create trigger set_updated_at before update on public.appraisals
  for each row execute function private.set_updated_at();

-- 14. Buckets de Supabase Storage
-- vehicle-images es público para mostrar fotos en el catálogo.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'vehicle-images',
  'vehicle-images',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do nothing;

-- appraisal-images es privado porque contiene fotos enviadas por particulares.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'appraisal-images',
  'appraisal-images',
  false,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do nothing;

-- 15. Políticas de Storage: fotos de vehículos.
-- El acceso de lectura mediante la URL pública del bucket no requiere
-- una política SELECT para anon. Estas políticas permiten que admins
-- gestionen/listen los objetos desde el panel.
create policy "Admins can read vehicle storage objects"
  on storage.objects for select to authenticated
  using (bucket_id = 'vehicle-images' and (select private.is_admin()));

create policy "Admins can upload vehicle storage objects"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'vehicle-images' and (select private.is_admin()));

create policy "Admins can update vehicle storage objects"
  on storage.objects for update to authenticated
  using (bucket_id = 'vehicle-images' and (select private.is_admin()))
  with check (bucket_id = 'vehicle-images' and (select private.is_admin()));

create policy "Admins can delete vehicle storage objects"
  on storage.objects for delete to authenticated
  using (bucket_id = 'vehicle-images' and (select private.is_admin()));

-- 16. Políticas de Storage: fotos privadas de tasaciones.
-- Solo admins acceden desde el panel. El endpoint del servidor podrá
-- usar la secret key exclusivamente del lado servidor cuando se cree.
create policy "Admins can read appraisal storage objects"
  on storage.objects for select to authenticated
  using (bucket_id = 'appraisal-images' and (select private.is_admin()));

create policy "Admins can upload appraisal storage objects"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'appraisal-images' and (select private.is_admin()));

create policy "Admins can update appraisal storage objects"
  on storage.objects for update to authenticated
  using (bucket_id = 'appraisal-images' and (select private.is_admin()))
  with check (bucket_id = 'appraisal-images' and (select private.is_admin()));

create policy "Admins can delete appraisal storage objects"
  on storage.objects for delete to authenticated
  using (bucket_id = 'appraisal-images' and (select private.is_admin()));

commit;

-- ============================================================
-- ALTA DEL PRIMER ADMINISTRADOR (hacer DESPUÉS de ejecutar el SQL)
--
-- 1. Crear el usuario desde Supabase Dashboard > Authentication > Users.
-- 2. Copiar el UUID del usuario creado.
-- 3. Reemplazar UUID_DEL_USUARIO y ejecutar:
--
-- insert into public.admin_profiles (user_id, display_name, role)
-- values ('UUID_DEL_USUARIO', 'Administrador Viza', 'admin')
-- on conflict (user_id) do update
-- set display_name = excluded.display_name,
--     role = excluded.role;
--
-- No habilitar el registro público de administradores.
-- ============================================================

-- Nota: este SQL no elimina tablas ni filas existentes. Revoca permisos
-- heredados, crea políticas y triggers y configura dos buckets. Los buckets
-- que ya existan no se modifican por ON CONFLICT DO NOTHING.
