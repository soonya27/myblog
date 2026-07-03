import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Supabase 무료 티어는 7일 비활동 시 프로젝트가 자동 일시 중지된다.
// Vercel Cron(매일)이 이 엔드포인트를 호출해 keep_alive_log 에 write 1회 +
// 최근 기록 read 로 활성 상태 유지.
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

    // keep_alive_log 에 빈 row 1개 insert (write 활동으로 일시 중지 방지)
    const { error: insertError } = await supabase
        .from('keep_alive_log')
        .insert({});
    if (insertError) {
        return NextResponse.json(
            { ok: false, error: insertError.message },
            { status: 500 }
        );
    }

    // 최근 10개 ping 기록 read
    const { data, error } = await supabase
        .from('keep_alive_log')
        .select('pinged_at')
        .order('pinged_at', { ascending: false })
        .limit(10);
    if (error) {
        return NextResponse.json(
            { ok: false, error: error.message },
            { status: 500 }
        );
    }

    return NextResponse.json({
        ok: true,
        at: new Date().toISOString(),
        recent: data,
    });
}
