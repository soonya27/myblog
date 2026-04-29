import { Post, PostData, PostRow } from '@/model/post';
import { createClient } from '@/lib/supabase/server';

const POST_SELECT = `
    slug, title, description, featured, stacks, published_at,
    categories(name)
` as const;

function rowToPost(row: PostRow): Post {
    return {
        title: row.title,
        description: row.description,
        date: new Date(row.published_at),
        category: row.categories?.name ?? '',
        path: row.slug,
        featured: row.featured,
        stacks: row.stacks,
    };
}

export async function getAllPosts(): Promise<Post[]> {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('posts')
        .select(POST_SELECT)
        .eq('is_public', true)
        .order('published_at', { ascending: false });

    if (error) throw error;
    return (data ?? []).map((row) => rowToPost(row as unknown as PostRow));
}

export async function getFeaturedPosts(): Promise<Post[]> {
    return getAllPosts().then((posts) => posts.filter((post) => post.featured));
}

export async function getNonFeaturedPosts(): Promise<Post[]> {
    return getAllPosts().then((posts) => posts.filter((post) => !post.featured));
}

export async function getFilteredPosts(filter?: string | null): Promise<Post[]> {
    return getAllPosts().then((posts) =>
        filter ? posts.filter((post) => post.category === filter) : posts
    );
}

export async function getPostDetail(id: string): Promise<PostData> {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('posts')
        .select(`${POST_SELECT}, content`)
        .eq('slug', id)
        .eq('is_public', true)
        .maybeSingle();

    if (error) throw error;
    if (!data) throw new Error(`${id}에 해당하는 게시글 없음`);

    const post = rowToPost(data as unknown as PostRow);
    const content = (data as unknown as { content: string }).content;

    // prev/next: 전체 정렬된 목록 기준으로 인접 글 찾기
    const all = await getAllPosts();
    const index = all.findIndex((p) => p.path === post.path);
    const next = index > 0 ? all[index - 1] : null;
    const prev = index >= 0 && index < all.length - 1 ? all[index + 1] : null;

    return { ...post, content, next, prev };
}
