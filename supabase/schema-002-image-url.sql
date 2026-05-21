-- ============================================================
-- posts.image_url 컬럼 추가 + 기존 글 백필
-- Run in Supabase Studio > SQL Editor (한 번만)
-- ============================================================

alter table posts
    add column if not exists image_url text;

-- 기존 12건은 /public/images/posts/{slug}.png 파일이 모두 있음 → 백필
update posts
set image_url = '/images/posts/' || slug || '.png'
where image_url is null;
