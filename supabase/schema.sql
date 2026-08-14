-- Rode isso no Supabase: seu projeto > SQL Editor > New query > cole tudo > Run

create table if not exists games (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  store text not null default 'Instant Gaming'
    check (store in ('Instant Gaming', 'Steam', 'Epic Games', 'GOG', 'Hardware')),
  cover_url text,
  affiliate_url text not null,
  original_price numeric(10,2),
  current_price numeric(10,2),
  lowest_ever boolean not null default false,
  sold_out boolean not null default false,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Index pra ordenar por mais recentes rapidamente
create index if not exists games_created_at_idx on games (created_at desc);
create index if not exists games_store_idx on games (store);

-- Habilita Row Level Security (obrigatório no Supabase)
alter table games enable row level security;

-- Permite que QUALQUER pessoa (site público) LEIA os jogos ativos
create policy "Jogos ativos são públicos"
  on games for select
  using (active = true);

-- IMPORTANTE: não crie policy de insert/update/delete pública.
-- Você vai gerenciar os jogos logado no painel do Supabase (Table Editor),
-- que usa sua permissão de dono do projeto e ignora RLS.
