'use client';

import { createClient } from '@/lib/supabase/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';

const OAUTH_ERROR_MESSAGES: Record<string, string> = {
    unauthorized: '허용되지 않은 계정입니다.',
    oauth: 'OAuth 로그인에 실패했습니다. 다시 시도해 주세요.',
    missing_code: '로그인 응답이 올바르지 않습니다.',
};

export default function AdminLoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const supabase = createClient();
    const oauthError = searchParams.get('error');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(
        oauthError ? OAUTH_ERROR_MESSAGES[oauthError] ?? null : null
    );
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
            return;
        }

        router.push('/admin');
        router.refresh();
    }

    async function handleGoogleLogin() {
        setError(null);
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
        if (error) setError(error.message);
    }

    return (
        <section className='flex justify-center items-center min-h-[60vh] px-4'>
            <div className='w-full max-w-sm flex flex-col gap-4 p-6 border rounded-lg shadow-sm bg-white dark:bg-slate-800 dark:border-slate-700'>
                <h1 className='text-xl font-bold text-center'>Admin Login</h1>

                <button
                    type='button'
                    onClick={handleGoogleLogin}
                    className='flex items-center justify-center gap-2 py-2 border rounded hover:bg-slate-50 dark:hover:bg-slate-700 dark:border-slate-600'
                >
                    <FcGoogle className='text-xl' />
                    <span>Google로 로그인</span>
                </button>

                <div className='flex items-center gap-2 text-xs text-slate-400'>
                    <hr className='flex-1 border-slate-200 dark:border-slate-700' />
                    <span>또는</span>
                    <hr className='flex-1 border-slate-200 dark:border-slate-700' />
                </div>

                <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                    <input
                        type='email'
                        placeholder='이메일'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete='email'
                        className='px-3 py-2 border rounded dark:bg-slate-900 dark:border-slate-600'
                    />
                    <input
                        type='password'
                        placeholder='비밀번호'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete='current-password'
                        className='px-3 py-2 border rounded dark:bg-slate-900 dark:border-slate-600'
                    />
                    <button
                        type='submit'
                        disabled={loading}
                        className='py-2 rounded bg-slate-900 text-white disabled:opacity-50 dark:bg-slate-200 dark:text-slate-900'
                    >
                        {loading ? '로그인 중...' : '로그인'}
                    </button>
                </form>

                {error && (
                    <p className='text-sm text-red-500 text-center' role='alert'>
                        {error}
                    </p>
                )}
            </div>
        </section>
    );
}
