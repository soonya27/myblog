import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { logoutAction } from './actions';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <div className='max-w-screen-xl mx-auto w-full px-4 py-6'>
            {user && (
                <nav className='flex items-center justify-between border-b pb-3 mb-6 dark:border-slate-700'>
                    <div className='flex gap-4 text-sm'>
                        <Link href='/admin' className='font-semibold'>
                            글 목록
                        </Link>
                        <Link href='/admin/posts/new'>새 글</Link>
                        <Link href='/admin/categories'>카테고리</Link>
                    </div>
                    <div className='flex items-center gap-3 text-sm'>
                        <span className='text-slate-500'>{user.email}</span>
                        <form action={logoutAction}>
                            <button
                                type='submit'
                                className='px-3 py-1 border rounded hover:bg-slate-100 dark:hover:bg-slate-800 dark:border-slate-700'
                            >
                                로그아웃
                            </button>
                        </form>
                    </div>
                </nav>
            )}
            {children}
        </div>
    );
}
