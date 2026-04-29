import { Category } from './category';

// 공개 사이트가 사용하는 Post 모양 (기존 호환).
// service/posts.ts 가 이 형태로 반환한다.
export type Post = {
    title: string;
    description: string;
    date: Date;
    category: Category;
    path: string;       // DB의 slug
    featured: boolean;
    stacks: string[];
};

export type PostData = Post & {
    content: string;
    next: Post | null;
    prev: Post | null;
};

// DB row (categories 테이블 join 포함 옵션)
export type PostRow = {
    id: string;
    slug: string;
    title: string;
    description: string;
    content: string;
    category_id: string;
    stacks: string[];
    featured: boolean;
    is_public: boolean;
    published_at: string;
    created_at: string;
    updated_at: string;
    categories?: { name: string } | null;
};
