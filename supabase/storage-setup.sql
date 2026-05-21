-- ============================================================
-- post-images 버킷 생성 + 공개 읽기 정책
--
-- 어드민 업로드는 service_role 키로 처리하므로 INSERT/UPDATE/DELETE
-- 정책은 추가하지 않는다. (RLS 우회)
--
-- Run in Supabase Studio > SQL Editor
-- ============================================================

-- 1. 버킷 생성 (공개)
insert into storage.buckets (id, name, public)
values ('post-images', 'post-images', true)
on conflict (id) do nothing;

-- 2. 공개 읽기 — anon/authenticated 모두 객체 조회 허용
drop policy if exists "post-images public read" on storage.objects;
create policy "post-images public read"
  on storage.objects for select
  using (bucket_id = 'post-images');
