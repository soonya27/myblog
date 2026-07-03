-- ============================================================
-- keep_alive_log
-- Supabase 무료 티어 7일 비활동 시 자동 일시 중지 방지용.
-- /api/keep-alive 가 Vercel Cron(매일)에 의해 호출되어 이 테이블에
-- 빈 row 1개를 insert(write) 하고 최근 기록을 read 한다.
--
-- Run in Supabase Studio > SQL Editor (한 번만 실행)
-- ============================================================

create table if not exists keep_alive_log (
  id         uuid primary key default gen_random_uuid(),
  pinged_at  timestamptz not null default now()
);

alter table keep_alive_log enable row level security;

-- anon 키로 insert/select 허용 (민감 데이터 없음)
drop policy if exists "keep_alive_log public insert" on keep_alive_log;
create policy "keep_alive_log public insert"
  on keep_alive_log for insert
  with check (true);

drop policy if exists "keep_alive_log public read" on keep_alive_log;
create policy "keep_alive_log public read"
  on keep_alive_log for select
  using (true);
