import { createAdminClient } from './admin';

const BUCKET = 'post-images';

function safeFileName(slug: string, originalName: string): string {
    const dotIdx = originalName.lastIndexOf('.');
    const ext = (dotIdx >= 0 ? originalName.slice(dotIdx + 1) : 'png')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '');
    const safeSlug = slug.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    return `${Date.now()}-${safeSlug}.${ext || 'png'}`;
}

// 어드민 라우트(서버)에서만 호출. service_role 사용.
export async function uploadPostImage(
    slug: string,
    file: File
): Promise<string> {
    const supabase = createAdminClient();
    const path = safeFileName(slug, file.name);

    const { error } = await supabase.storage
        .from(BUCKET)
        .upload(path, file, {
            contentType: file.type || 'image/png',
            upsert: false,
        });

    if (error) throw error;

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
    return data.publicUrl;
}
