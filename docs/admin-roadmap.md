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

- [x] `src/middleware.ts`에 `/admin/**` 보호 로직 추가
- [x] `/admin/login` 페이지 + 로그인 폼
- [x] 로그아웃 액션 (`src/app/admin/actions.ts`)
- [x] 어드민 레이아웃 (`src/app/admin/layout.tsx`)
- [x] 미로그인 상태로 `/admin` 접근 시 `/admin/login`으로 리다이렉트 검증 (curl 307)
- [ ] **사용자 직접: 브라우저로 로그인 → `/admin` 진입 → 로그아웃 동작 확인**

---

## Phase 3 — 어드민 글 목록 & 삭제

- [ ] `/admin` (글 목록 테이블: 제목·카테고리·공개여부·작성일·수정/삭제)
- [ ] `DELETE /api/admin/posts/[id]` 라우트
- [ ] 삭제 확인 모달
- [ ] 검증: 삭제 → 목록·공개 페이지에서 사라짐

---

## Phase 4 — 글 작성 (에디터 + 미리보기)

- [ ] `/admin/posts/new` 폼
  - 제목·설명·카테고리(select)·스택(multi)·featured·**공개/비공개**·본문
- [ ] 마크다운 에디터 + 좌우 미리보기 (`@uiw/react-md-editor`)
- [ ] `POST /api/admin/posts` 라우트
- [ ] slug 자동 생성 + 중복 검사
- [ ] 검증: 작성 → 목록 노출 → 상세 페이지 정상 렌더

---

## Phase 5 — 글 수정

- [ ] `/admin/posts/[id]/edit` 폼 (기존 데이터 프리필)
- [ ] `PUT /api/admin/posts/[id]` 라우트
- [ ] 검증: 수정 → 즉시 반영

---

## Phase 6 — 카테고리 관리

- [ ] `/admin/categories` 페이지 (목록·추가·삭제·순서)
- [ ] `POST/DELETE /api/admin/categories` 라우트
- [ ] 사용 중인 카테고리 삭제 차단
- [ ] `PostsNavbar` 등 카테고리 하드코딩 제거 → 동적 로드
- [ ] 검증: 새 카테고리 → select와 메뉴에 노출

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
| 2026-04-29 | Phase 2 | middleware 보호, /admin/login 폼, 로그아웃 액션, 어드민 레이아웃 완성. 비인증 307 리다이렉트 검증. 브라우저 로그인 동작은 사용자 확인 대기 |
