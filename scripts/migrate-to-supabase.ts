/**
 * data/posts.json + data/posts/*.md  →  Supabase posts 테이블 이관
 *
 * 실행: npx tsx scripts/migrate-to-supabase.ts
 *   - 멱등하게 동작 (slug 기준 upsert)
 *   - 카테고리는 schema.sql에서 이미 시드된 것을 사용. 없으면 추가 insert.
 */
import { config as loadEnv } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { readFile } from 'fs/promises';
import path from 'path';

// Next.js 관례에 맞춰 .env.local 우선 로드
loadEnv({ path: '.env.local' });

type SourcePost = {
    title: string;
    description: string;
    date: string;
    category: string;
    path: string;
    featured: boolean;
    stacks: string[];
};

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
    console.error('환경변수 누락: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
});

const slugify = (name: string) => name.toLowerCase().replace(/\s+/g, '-');

async function main() {
    const root = process.cwd();
    const postsJsonPath = path.join(root, 'data', 'posts.json');
    const sources: SourcePost[] = JSON.parse(await readFile(postsJsonPath, 'utf-8'));

    // 1) 카테고리 ensure
    const uniqueCats = Array.from(new Set(sources.map((p) => p.category)));
    const { data: existingCats, error: catReadErr } = await supabase
        .from('categories')
        .select('id, name');
    if (catReadErr) throw catReadErr;

    const existingNames = new Set((existingCats ?? []).map((c) => c.name));
    const toInsert = uniqueCats
        .filter((name) => !existingNames.has(name))
        .map((name, idx) => ({
            name,
            slug: slugify(name),
            sort_order: 100 + idx,
        }));

    if (toInsert.length > 0) {
        const { error } = await supabase.from('categories').insert(toInsert);
        if (error) throw error;
        console.log(`+ categories inserted: ${toInsert.map((c) => c.name).join(', ')}`);
    }

    const { data: cats, error: catErr } = await supabase
        .from('categories')
        .select('id, name');
    if (catErr) throw catErr;
    const catMap = new Map((cats ?? []).map((c) => [c.name, c.id]));

    // 2) 본문 읽고 posts upsert
    const rows = await Promise.all(
        sources.map(async (p) => {
            const mdPath = path.join(root, 'data', 'posts', `${p.path}.md`);
            const content = await readFile(mdPath, 'utf-8');
            const category_id = catMap.get(p.category);
            if (!category_id) {
                throw new Error(`카테고리 매칭 실패: ${p.category}`);
            }
            return {
                slug: p.path,
                title: p.title,
                description: p.description,
                content,
                category_id,
                stacks: p.stacks,
                featured: p.featured,
                is_public: true,
                published_at: p.date,
            };
        })
    );

    const { error: upsertErr, count } = await supabase
        .from('posts')
        .upsert(rows, { onConflict: 'slug', count: 'exact' });
    if (upsertErr) throw upsertErr;

    console.log(`+ posts upserted: ${rows.length}건 (count=${count})`);
    console.log('완료.');
}

main().catch((err) => {
    console.error('마이그레이션 실패:', err);
    process.exit(1);
});
