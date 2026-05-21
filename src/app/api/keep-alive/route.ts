import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Supabase 무료 티어는 7일 비활동 시 프로젝트가 자동 일시 중지된다.
// Vercel Cron(매 3일)이 이 엔드포인트를 호출해 가벼운 read 1회로 활성 상태 유지.
export async function GET(request: Request) {
    // Vercel Cron 보안: CRON_SECRET 이 설정돼 있으면 인증 헤더 검사
    const cronSecret = process.env.CRON_SECRET;
    if (cronSecret) {
        const auth = request.headers.get('authorization');
        if (auth !== `Bearer ${cronSecret}`) {
            return NextResponse.json(
                { ok: false, error: 'unauthorized' },
                { status: 401 }
            );
        }
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !anonKey) {
        return NextResponse.json(
            { ok: false, error: 'supabase env not configured' },
            { status: 500 }
        );
    }

    const supabase = createClient(url, anonKey);

    // RLS 공개 읽기 정책이 걸려있는 categories 테이블에 가벼운 read
    const { error } = await supabase.from('categories').select('id').limit(1);

    if (error) {
        return NextResponse.json(
            { ok: false, error: error.message },
            { status: 500 }
        );
    }

    return NextResponse.json({ ok: true, at: new Date().toISOString() });
}
