'use client';

import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AdminLoginPage() {
    const router = useRouter();
    const supabase = createClient();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
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

    return (
        <section className='flex justify-center items-center min-h-[60vh] px-4'>
            <form
                onSubmit={handleSubmit}
                className='w-full max-w-sm flex flex-col gap-4 p-6 border rounded-lg shadow-sm bg-white dark:bg-slate-800 dark:border-slate-700'
            >
                <h1 className='text-xl font-bold text-center'>Admin Login</h1>
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
                {error && (
                    <p className='text-sm text-red-500' role='alert'>
                        {error}
                    </p>
                )}
                <button
                    type='submit'
                    disabled={loading}
                    className='py-2 rounded bg-slate-900 text-white disabled:opacity-50 dark:bg-slate-200 dark:text-slate-900'
                >
                    {loading ? '로그인 중...' : '로그인'}
                </button>
            </form>
        </section>
    );
}
