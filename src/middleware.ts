import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({ request });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value)
                    );
                    response = NextResponse.next({ request });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    // 세션 갱신 + 사용자 조회
    const {
        data: { user },
    } = await supabase.auth.getUser();

    const path = request.nextUrl.pathname;
    const isLogin = path === '/admin/login';
    const isAdmin = path.startsWith('/admin');
    const adminEmail = process.env.ADMIN_EMAIL;
    const isAuthorized = !!user && !!adminEmail && user.email === adminEmail;

    // 인증되었지만 ADMIN_EMAIL 이 아닌 경우 → signOut 후 차단
    if (user && !isAuthorized) {
        await supabase.auth.signOut();
        const url = request.nextUrl.clone();
        url.pathname = '/admin/login';
        url.searchParams.set('error', 'unauthorized');
        return NextResponse.redirect(url);
    }

    if (isAdmin && !isLogin && !isAuthorized) {
        const url = request.nextUrl.clone();
        url.pathname = '/admin/login';
        return NextResponse.redirect(url);
    }

    if (isLogin && isAuthorized) {
        const url = request.nextUrl.clone();
        url.pathname = '/admin';
        return NextResponse.redirect(url);
    }

    return response;
}

export const config = {
    matcher: ['/admin/:path*'],
};
