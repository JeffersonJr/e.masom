-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Table: Potencias
create table public.potencias (
    id uuid primary key default uuid_generate_v4(),
    nome text not null,
    sigla text not null,
    logo_url text,
    configuracoes_json jsonb default '{}'::jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: Lojas
create table public.lojas (
    id uuid primary key default uuid_generate_v4(),
    potencia_id uuid references public.potencias(id) on delete cascade not null,
    nome text not null,
    numero text not null,
    rito text,
    slug text unique not null,
    dominio_custom text,
    site_config_json jsonb default '{}'::jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: Perfis
-- References auth.users from Supabase Auth
create table public.perfis (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references auth.users(id) on delete cascade unique not null,
    loja_id uuid references public.lojas(id) on delete set null,
    potencia_id uuid references public.potencias(id) on delete set null,
    grau text check (grau in ('Aprendiz', 'Companheiro', 'Mestre')) default 'Aprendiz',
    grau_nr integer default 1, -- 1: Aprendiz, 2: Companheiro, 3: Mestre
    cargo text,
    status text check (status in ('Ativo', 'Quiescente', 'Irregular')) default 'Ativo',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: Documentos
create table public.documentos (
    id uuid primary key default uuid_generate_v4(),
    loja_id uuid references public.lojas(id) on delete cascade,
    potencia_id uuid references public.potencias(id) on delete cascade,
    tipo text check (tipo in ('Ata', 'Placet', 'Prancha')),
    status text check (status in ('Pendente', 'Aprovado', 'Rejeitado')) default 'Pendente',
    arquivo_url text not null,
    grau_minimo integer default 1, -- RBAC check for visibility (1, 2, 3)
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: Leads Sindicancia
create table public.leads_sindicancia (
    id uuid primary key default uuid_generate_v4(),
    loja_id uuid references public.lojas(id) on delete cascade,
    nome text not null,
    email text not null,
    telefone text,
    mensagem text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS POLICIES

-- Enable RLS on all tables
alter table public.potencias enable row level security;
alter table public.lojas enable row level security;
alter table public.perfis enable row level security;
alter table public.documentos enable row level security;
alter table public.leads_sindicancia enable row level security;

-- 1. Potencias Policies
create policy "Public read for Potencias" on public.potencias for select using (true);
create policy "Admins can update their Potencia" on public.potencias for update 
using (id in (select potencia_id from public.perfis where user_id = auth.uid() and cargo = 'Grão-Mestre'));

-- 2. Lojas Policies
create policy "Public read for Lojas" on public.lojas for select using (true);
create policy "Lodge admins can update their Lodge" on public.lojas for update
using (id in (select loja_id from public.perfis where user_id = auth.uid() and cargo in ('Venerável Mestre', 'Secretário')));

-- 3. Perfis Policies
create policy "Users can see all profiles in their Lodge" on public.perfis for select
using (
    loja_id in (select loja_id from public.perfis where user_id = auth.uid()) OR
    potencia_id in (select potencia_id from public.perfis where user_id = auth.uid())
);
create policy "Users can update their own profile" on public.perfis for update
using (user_id = auth.uid());

-- 4. Documentos Policies (Degree RBAC)
create policy "Degree-based visibility for documents" on public.documentos for select
using (
    (
        loja_id in (select loja_id from public.perfis where user_id = auth.uid()) OR
        potencia_id in (select potencia_id from public.perfis where user_id = auth.uid())
    ) AND
    grau_minimo <= (select grau_nr from public.perfis where user_id = auth.uid())
);

create policy "Admins can manage documents" on public.documentos for all
using (
    loja_id in (select loja_id from public.perfis where user_id = auth.uid() and cargo in ('Venerável Mestre', 'Secretário')) OR
    potencia_id in (select potencia_id from public.perfis where user_id = auth.uid() and cargo = 'Secretário Geral')
);

-- 5. Leads Policies
create policy "Public can submit leads" on public.leads_sindicancia for insert with check (true);
create policy "Lodge admins can view leads" on public.leads_sindicancia for select
using (loja_id in (select loja_id from public.perfis where user_id = auth.uid()));

-- AUTOMATION: Profile Trigger
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.perfis (user_id, grau, grau_nr, status)
  values (new.id, 'Aprendiz', 1, 'Ativo');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
