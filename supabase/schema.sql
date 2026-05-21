-- ============================================================
-- myblog admin schema
-- Run this in Supabase Studio > SQL Editor (한 번만 실행)
-- ============================================================

-- 1. categories
create table if not exists categories (
  id          uuid primary key default gen_random_uuid(),
  name        text not null unique,
  slug        text not null unique,
  sort_order  int  not null default 0,
  created_at  timestamptz not null default now()
);

-- 2. posts
create table if not exists posts (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  title         text not null,
  description   text not null,
  content       text not null,
  category_id   uuid not null references categories(id) on delete restrict,
  stacks        text[] not null default '{}',
  featured      boolean not null default false,
  is_public     boolean not null default true,
  published_at  date    not null default current_date,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists posts_is_public_idx on posts(is_public);
create index if not exists posts_category_idx  on posts(category_id);
create index if not exists posts_published_idx on posts(published_at desc);

-- 3. updated_at 자동 갱신 트리거
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists posts_set_updated_at on posts;
create trigger posts_set_updated_at
  before update on posts
  for each row execute function set_updated_at();

-- 4. RLS — Phase 7에서 활성화. 지금은 비활성 상태로 둔다.
-- alter table categories enable row level security;
-- alter table posts enable row level security;
--
-- create policy "categories public read" on categories
--   for select using (true);
--
-- create policy "categories admin all" on categories
--   for all using (auth.role() = 'authenticated')
--   with check (auth.role() = 'authenticated');
--
-- create policy "posts public read" on posts
--   for select using (is_public = true);
--
-- create policy "posts admin all" on posts
--   for all using (auth.role() = 'authenticated')
--   with check (auth.role() = 'authenticated');

-- 5. 기존 카테고리 시드 (data/posts.json에서 추출한 4개)
insert into categories (name, slug, sort_order) values
  ('Project',    'project',    1),
  ('Javascript', 'javascript', 2),
  ('React',      'react',      3),
  ('NextJs',     'nextjs',     4)
on conflict (name) do nothing;
