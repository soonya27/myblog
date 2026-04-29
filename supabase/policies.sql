-- ============================================================
-- 공개 읽기 정책 (Phase 1)
-- - anon 키가 categories 전체와 is_public=true 인 posts 만 SELECT 가능
-- - 어드민 INSERT/UPDATE/DELETE 정책은 Phase 7 에서 추가
--
-- Run in Supabase Studio > SQL Editor
-- ============================================================

-- categories: 누구나 읽기 허용
drop policy if exists "categories public read" on categories;
create policy "categories public read"
  on categories for select
  using (true);

-- posts: 공개 글만 읽기 허용
drop policy if exists "posts public read" on posts;
create policy "posts public read"
  on posts for select
  using (is_public = true);
