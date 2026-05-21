'use server';

import { createClient } from '@/lib/supabase/server';
import { slugify } from '@/lib/slugify';
import { uploadPostImage } from '@/lib/supabase/storage';
import {
    AdminPostFull,
    createPost,
    deletePostBySlug,
    updatePostBySlug,
} from '@/service/admin-posts';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function logoutAction() {
    const supabase = createClient();
    await supabase.auth.signOut();
    redirect('/admin/login');
}

export async function deletePostAction(formData: FormData) {
    const slug = formData.get('slug');
    if (typeof slug !== 'string' || !slug) return;

    await deletePostBySlug(slug);
    revalidatePostPaths(slug);
}

async function parsePostFormData(formData: FormData): Promise<AdminPostFull> {
    const title = String(formData.get('title') ?? '').trim();
    const description = String(formData.get('description') ?? '').trim();
    const content = String(formData.get('content') ?? '');
    const slugInput = String(formData.get('slug') ?? '').trim();
    const category_id = String(formData.get('category_id') ?? '');
    const stacks = String(formData.get('stacks') ?? '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
    const featured = formData.get('featured') === 'on';
    const is_public = formData.get('is_public') === 'on';
    const published_at =
        String(formData.get('published_at') ?? '') ||
        new Date().toISOString().slice(0, 10);

    if (!title || !description || !content || !category_id) {
        throw new Error('필수 입력 누락 (제목, 설명, 본문, 카테고리)');
    }

    const slug = slugInput || slugify(title);

    // image: 새 파일 업로드 우선 → 없으면 existing_image_url 유지 → remove_image 체크 시 null
    const removeImage = formData.get('remove_image') === 'on';
    const existingImageUrl = String(formData.get('existing_image_url') ?? '');
    const file = formData.get('image');

    let image_url: string | null = removeImage ? null : existingImageUrl || null;

    if (file instanceof File && file.size > 0) {
        image_url = await uploadPostImage(slug, file);
    }

    return {
        slug,
        title,
        description,
        content,
        category_id,
        stacks,
        featured,
        is_public,
        image_url,
        published_at,
    };
}

function revalidatePostPaths(...slugs: string[]) {
    revalidatePath('/admin');
    revalidatePath('/posts');
    revalidatePath('/');
    for (const slug of slugs) {
        if (slug) revalidatePath(`/posts/detail/${slug}`);
    }
}

export async function createPostAction(formData: FormData) {
    const input = await parsePostFormData(formData);
    await createPost(input);
    revalidatePostPaths(input.slug);
    redirect('/admin');
}

export async function updatePostAction(
    originalSlug: string,
    formData: FormData
) {
    const input = await parsePostFormData(formData);
    await updatePostBySlug(originalSlug, input);
    revalidatePostPaths(originalSlug, input.slug);
    redirect('/admin');
}
