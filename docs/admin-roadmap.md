# 어드민 시스템 도입 로드맵

로컬 파일 기반 블로그(`data/posts.json` + `data/posts/*.md`)를
**Supabase + Vercel + Supabase Auth** 기반의 웹 어드민으로 전환하는 작업 가이드.

---

## 최종 스택

| 영역 | 선택 |
|-----|------|
| 호스팅 | Vercel |
| DB | Supabase Postgres |
| Auth | Supabase Auth (단일 관리자) |
| Markdown 에디터 | `@uiw/react-md-editor` |
| Markdown 렌더 | 기존 `react-markdown` + `remark-gfm` |

### 추가될 의존성

```
@supabase/supabase-js
@supabase/ssr
@uiw/react-md-editor
```

### 환경 변수 (`.env.local`)

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

---

## 데이터 모델

### `categories`
| 컬럼 | 타입 | 비고 |
|------|------|------|
| id | uuid PK | |
| name | text unique | "React" |
| slug | text unique | "react" |
| sort_order | int | 메뉴 노출 순서 |
| created_at | timestamptz | |

### `posts`
| 컬럼 | 타입 | 비고 |
|------|------|------|
| id | uuid PK | |
| slug | text unique | URL key (기존 `path`) |
| title | text | |
| description | text | |
| content | text | 마크다운 본문 |
| category_id | uuid FK | `categories.id` |
| stacks | text[] | |
| featured | boolean | |
| is_public | boolean | **공개/비공개 토글** |
| published_at | date | 기존 `date` |
| created_at | timestamptz | |
| updated_at | timestamptz | |

---

## Phase 0 — 설계 확정

- [x] 배포 환경 확정 (Vercel 유지)
- [x] 저장소 선택 (Supabase)
- [x] 인증 방식 확정 (Supabase Auth)
- [x] 에디터 라이브러리 선정 (`@uiw/react-md-editor`)
- [x] DB 스키마 정의
- [x] 가이드 문서 작성 (이 파일)

---

## Phase 1 — Supabase 셋업 & 저장소 추상화

### 1-A. 사용자 직접 작업
- [x] Supabase 가입 및 새 프로젝트 생성
- [x] 프로젝트 키 3개를 `.env.local`에 작성
  - [x] `NEXT_PUBLIC_SUPABASE_URL`
  - [x] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [x] `SUPABASE_SERVICE_ROLE_KEY`
- [x] Supabase Studio → SQL Editor에서 `supabase/schema.sql` 실행
- [x] Supabase Studio → Authentication → Users에서 본인 계정 1개 생성

### 1-B. 코드 작업
- [x] 의존성 설치 (`@supabase/supabase-js`, `@supabase/ssr`, `@uiw/react-md-editor`, dev: `tsx`, `dotenv`)
- [x] `src/lib/supabase/server.ts`, `client.ts`, `admin.ts` 작성
- [x] `src/model/post.ts` 신설, `src/model/category.ts` 완화
- [x] `src/service/posts.ts` 내부를 Supabase 쿼리로 교체 (시그니처 유지)
- [x] 마이그레이션 스크립트 `scripts/migrate-to-supabase.ts` 작성·1회 실행 (12건)
- [x] **`supabase/policies.sql` 실행** (RLS 공개 읽기 정책)
- [x] 기존 공개 페이지(`/`, `/posts`, `/posts/detail/[id]`, `/posts/[category]`) 동작 검증

---

## Phase 2 — 인증 (Supabase Auth)

### 이메일/비번 로그인
- [x] `src/middleware.ts`에 `/admin/**` 보호 로직 추가
- [x] `/admin/login` 페이지 + 로그인 폼
- [x] 로그아웃 액션 (`src/app/admin/actions.ts`)
- [x] 어드민 레이아웃 (`src/app/admin/layout.tsx`)
- [x] 미로그인 상태로 `/admin` 접근 시 `/admin/login`으로 리다이렉트 검증 (curl 307)
- [x] 사용자: 브라우저 이메일 로그인 동작 확인

### Google OAuth (추가)
- [x] Google Cloud Console OAuth 자격증명 생성 (사용자)
- [x] Supabase Studio → Authentication → Providers → Google 활성화 (사용자)
- [x] `.env.local`에 `ADMIN_EMAIL` 추가 (사용자)
- [x] `.env.example`에 `ADMIN_EMAIL` 추가
- [x] `src/app/auth/callback/route.ts` — code↔session 교환 + ADMIN_EMAIL 화이트리스트 검사
- [x] `/admin/login` 페이지에 "Google로 로그인" 버튼 + 에러 메시지 처리
- [x] 사용자: 브라우저 Google 로그인 통과 확인
- [x] middleware에도 `ADMIN_EMAIL` 검사 추가 (이메일/비번 경로도 화이트리스트 적용)

---

## Phase 3 — 어드민 글 목록 & 삭제

- [x] `src/service/admin-posts.ts` (admin client로 비공개 포함 전체 조회)
- [x] `/admin` 글 목록 테이블 (제목·카테고리·공개여부·작성일·수정/삭제 + featured 뱃지)
- [x] `deletePostAction` 서버 액션 + `revalidatePath` 캐시 무효화
- [x] `DeleteButton` 클라이언트 컴포넌트 + 확인 다이얼로그
- [x] 사용자: `/admin`에서 12개 글 + 공개 컬럼 정상 노출 확인
- [x] FEATURED 뱃지 의미 확인 (홈 대표글 플래그, 원본 데이터에 3개)
- [ ] 삭제 동작 검증 → **Phase 4에서 새 글 작성 후 함께 검증** (기존 데이터 보존)

---

## Phase 4 — 글 작성 (에디터 + 미리보기)

- [x] `src/service/categories.ts` (getAllCategories)
- [x] `src/service/admin-posts.ts`에 `createPost` 추가 (slug 중복 시 한국어 메시지)
- [x] `src/lib/slugify.ts` 유틸
- [x] `createPostAction` 서버 액션 (FormData 파싱 + 검증 + revalidate + redirect)
- [x] `src/app/admin/posts/PostForm.tsx` 클라이언트 폼 (제목·slug·설명·카테고리·작성일·스택·공개·featured·본문)
- [x] `@uiw/react-md-editor` 동적 import + `preview='live'` 좌우 미리보기
- [x] `/admin/posts/new` 페이지
- [ ] **사용자 직접: 새 글 작성 → 목록 노출 → 상세 페이지 렌더 → 삭제까지 검증**

---

## Phase 5 — 글 수정

- [x] `getAdminPostBySlug` / `updatePostBySlug` 서비스
- [x] `updatePostAction` 서버 액션 (slug 변경 시 양쪽 경로 모두 revalidate)
- [x] `parsePostFormData` / `revalidatePostPaths` 헬퍼로 create/update/delete 액션 정리
- [x] `/admin/posts/[id]/edit` 페이지 (PostForm 재사용 + 기존 데이터 defaults)
- [ ] **사용자 직접: 수정 → 즉시 반영, 삭제, 공개 사이트 동기화 통합 검증**

---

## Phase 5+ — 대표 이미지 (Supabase Storage 업로드)

### 사용자 직접 작업 (2단계)
- [ ] Supabase Studio → SQL Editor → `supabase/schema-002-image-url.sql` 실행 (컬럼 추가 + 기존 12건 백필)
- [ ] Supabase Studio → SQL Editor → `supabase/storage-setup.sql` 실행 (post-images 버킷 + 공개 읽기 정책)
  - 또는 Studio → Storage → New bucket → name=`post-images`, public 체크 (UI로도 가능)

### 코드 작업
- [x] `posts.image_url TEXT NULL` 컬럼 + 기존 글 `/images/posts/{slug}.png` 로 백필 SQL
- [x] `post-images` 버킷 + 공개 읽기 정책 SQL
- [x] `next.config.mjs`에 `*.supabase.co/storage/v1/object/public/**` remotePatterns 추가
- [x] `model/post.ts`, `service/posts.ts`, `service/admin-posts.ts`에 `image_url` 반영
- [x] `src/lib/supabase/storage.ts` — service_role 업로드 헬퍼 (`uploadPostImage`)
- [x] `parsePostFormData` — 새 파일 업로드 / 기존 유지 / 제거 3가지 분기 처리
- [x] `PostForm` — 파일 input + 미리보기 (blob URL) + "이미지 제거" 버튼
- [x] `PostCard`, `PostContent` — `image_url` 있으면 사용, 없으면 그라디언트 placeholder
- [ ] **사용자 직접: 위 두 SQL 실행 → 새 글에 이미지 첨부 + 첨부 안 한 글 placeholder 노출 확인**

## Phase 6 — 카테고리 관리

- [x] `src/service/admin-categories.ts` (목록 + 글 수, 생성, 삭제)
- [x] `createCategoryAction` / `deleteCategoryAction` 서버 액션
- [x] `/admin/categories` 페이지 (목록·추가·삭제, 글 수·순서 표시)
- [x] `DeleteCategoryButton` — 글 수 > 0 이면 "삭제 불가" 비활성화
- [x] FK 위반(`23503`)·중복(`23505`) 시 한국어 에러 메시지
- [x] `PostList` → DB의 `getAllCategories`로 변경 (글 없는 새 카테고리도 메뉴 노출)
- [ ] **사용자 직접: `/admin/categories`에서 4개 노출 + 추가 + 새 글로 사용 + 삭제 동작 확인**

---

## Phase 7 — 공개/비공개 반영

- [ ] 공개 사이트 모든 fetch에 `is_public = true` 필터 적용
- [ ] RLS 정책 활성화 (anon은 public만 select, 인증 사용자만 모든 작업)
- [ ] (선택) 비공개 글 미리보기 토큰 링크
- [ ] 검증: 비공개 글이 비로그인 상태에서 404, 어드민에서는 정상 노출

---

## Phase 8 — 마무리

- [ ] 이미지 업로드 (Supabase Storage 또는 `public/`)
- [ ] `revalidatePath`로 정적 캐시 갱신
- [ ] slug 중복·길이 등 입력 검증
- [ ] README에 어드민 사용법 한 줄 추가

---

## 진행 로그

| 날짜 | Phase | 메모 |
|------|-------|------|
| 2026-04-29 | Phase 0 | 설계 확정, 가이드 작성 완료 |
| 2026-04-29 | Phase 1 | Supabase 셋업·마이그레이션(12건)·서비스 레이어 교체·RLS 공개 읽기 정책 적용 완료. 4개 공개 페이지 200 OK 검증 |
| 2026-04-29 | Phase 2 | middleware 보호, /admin/login 폼, 로그아웃 액션, 어드민 레이아웃 완성. 비인증 307 리다이렉트 검증. 이메일 로그인 동작 확인됨 |
| 2026-04-29 | Phase 2+ | Google OAuth 추가. /auth/callback 라우트에서 ADMIN_EMAIL 화이트리스트 검사. 로그인 페이지에 Google 버튼 + 에러 처리 |
| 2026-04-30 | Phase 3 | middleware에 ADMIN_EMAIL 검사 추가. admin-posts 서비스, /admin 글 목록 테이블, 삭제 액션 + 확인 다이얼로그 구현. 목록 노출은 사용자 확인됨, 삭제는 Phase 4에서 새 글로 검증 |
| 2026-04-30 | Phase 4 | categories 서비스, slugify 유틸, createPost + createPostAction, PostForm 클라이언트 컴포넌트, /admin/posts/new 페이지. @uiw/react-md-editor 라이브 미리보기 적용 |
| 2026-04-30 | Phase 5 | getAdminPostBySlug / updatePostBySlug, updatePostAction (slug 변경 시 양쪽 경로 revalidate), /admin/posts/[id]/edit 페이지. 액션 헬퍼로 create/update/delete 정리 |
| 2026-04-30 | Phase 5+ | image_url 컬럼 + 백필 + Storage 버킷 SQL. uploadPostImage 헬퍼, PostForm 파일 입력/미리보기, PostCard·PostContent placeholder 처리. SQL 실행은 사용자 대기 |
| 2026-04-30 | Phase 6 | admin-categories 서비스, /admin/categories 페이지(목록·추가·삭제 + 글 수/순서), DeleteCategoryButton(사용 중이면 차단), PostList의 카테고리 소스를 DB로 전환 |
