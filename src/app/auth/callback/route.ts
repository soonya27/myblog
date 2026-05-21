import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');
    const next = searchParams.get('next') ?? '/admin';

    if (!code) {
        return NextResponse.redirect(`${origin}/admin/login?error=missing_code`);
    }

    const supabase = createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error || !data.user) {
        return NextResponse.redirect(`${origin}/admin/login?error=oauth`);
    }

    // 화이트리스트 검사 — ADMIN_EMAIL 이외 계정은 즉시 signOut
    const adminEmail = process.env.ADMIN_EMAIL;
    if (!adminEmail || data.user.email !== adminEmail) {
        await supabase.auth.signOut();
        return NextResponse.redirect(`${origin}/admin/login?error=unauthorized`);
    }

    return NextResponse.redirect(`${origin}${next}`);
}
