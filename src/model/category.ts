// 공개 사이트에서 쓰는 카테고리 표시 이름 타입.
// DB의 categories.name 값을 그대로 받는다.
export type Category = string;

// DB row
export type CategoryRow = {
    id: string;
    name: string;
    slug: string;
    sort_order: number;
    created_at: string;
};
