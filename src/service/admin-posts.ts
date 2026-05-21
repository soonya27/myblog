import { createAdminClient } from '@/lib/supabase/admin';

type Row = {
    slug: string;
    title: string;
    is_public: boolean;
    featured: boolean;
    image_url: string | null;
    published_at: string;
    categories: { name: string } | null;
};

export type AdminPostListItem = {
    slug: string;
    title: string;
    category: string;
    is_public: boolean;
    featured: boolean;
    image_url: string | null;
    published_at: string;
};

export async function getAllPostsForAdmin(): Promise<AdminPostListItem[]> {
    const supabase = createAdminClient();
    const { data, error } = await supabase
        .from('posts')
        .select(
            'slug, title, is_public, featured, image_url, published_at, categories(name)'
        )
        .order('published_at', { ascending: false });

    if (error) throw error;

    return ((data ?? []) as unknown as Row[]).map((row) => ({
        slug: row.slug,
        title: row.title,
        category: row.categories?.name ?? '',
        is_public: row.is_public,
        featured: row.featured,
        image_url: row.image_url,
        published_at: row.published_at,
    }));
}

export async function deletePostBySlug(slug: string): Promise<void> {
    const supabase = createAdminClient();
    const { error } = await supabase.from('posts').delete().eq('slug', slug);
    if (error) throw error;
}

export type CreatePostInput = {
    slug: string;
    title: string;
    description: string;
    content: string;
    category_id: string;
    stacks: string[];
    featured: boolean;
    is_public: boolean;
    image_url: string | null;
    published_at: string; // YYYY-MM-DD
};

export async function createPost(input: CreatePostInput): Promise<void> {
    const supabase = createAdminClient();
    const { error } = await supabase.from('posts').insert(input);
    if (error) {
        if (error.code === '23505') {
            throw new Error(`이미 사용 중인 slug 입니다: ${input.slug}`);
        }
        throw error;
    }
}

export type AdminPostFull = CreatePostInput;

export async function getAdminPostBySlug(
    slug: string
): Promise<AdminPostFull | null> {
    const supabase = createAdminClient();
    const { data, error } = await supabase
        .from('posts')
        .select(
            'slug, title, description, content, category_id, stacks, featured, is_public, image_url, published_at'
        )
        .eq('slug', slug)
        .maybeSingle();

    if (error) throw error;
    return (data as AdminPostFull | null) ?? null;
}

export async function updatePostBySlug(
    originalSlug: string,
    input: AdminPostFull
): Promise<void> {
    const supabase = createAdminClient();
    const { error } = await supabase
        .from('posts')
        .update(input)
        .eq('slug', originalSlug);

    if (error) {
        if (error.code === '23505') {
            throw new Error(`이미 사용 중인 slug 입니다: ${input.slug}`);
        }
        throw error;
    }
}
