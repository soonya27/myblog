import { createAdminClient } from '@/lib/supabase/admin';

export type AdminCategoryListItem = {
    id: string;
    name: string;
    slug: string;
    sort_order: number;
    post_count: number;
};

export async function getAllCategoriesWithCount(): Promise<
    AdminCategoryListItem[]
> {
    const supabase = createAdminClient();

    const { data: cats, error } = await supabase
        .from('categories')
        .select('id, name, slug, sort_order')
        .order('sort_order', { ascending: true });

    if (error) throw error;

    // 카테고리별 글 수 계산. N 작아서 순차 카운트로 충분.
    return Promise.all(
        (cats ?? []).map(async (c) => {
            const { count } = await supabase
                .from('posts')
                .select('id', { count: 'exact', head: true })
                .eq('category_id', c.id);
            return { ...c, post_count: count ?? 0 };
        })
    );
}

export async function createCategory(
    name: string,
    slug: string
): Promise<void> {
    const supabase = createAdminClient();

    const { data: max } = await supabase
        .from('categories')
        .select('sort_order')
        .order('sort_order', { ascending: false })
        .limit(1)
        .maybeSingle();

    const sort_order = (max?.sort_order ?? 0) + 1;

    const { error } = await supabase
        .from('categories')
        .insert({ name, slug, sort_order });

    if (error) {
        if (error.code === '23505') {
            throw new Error(`이미 사용 중인 이름 또는 slug: ${name} / ${slug}`);
        }
        throw error;
    }
}

export async function deleteCategoryById(id: string): Promise<void> {
    const supabase = createAdminClient();
    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (error) {
        if (error.code === '23503') {
            throw new Error('이 카테고리를 사용하는 글이 있어 삭제할 수 없습니다.');
        }
        throw error;
    }
}
