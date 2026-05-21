import Link from 'next/link';
import { getAllPostsForAdmin } from '@/service/admin-posts';
import DeleteButton from './DeleteButton';

export const dynamic = 'force-dynamic';

export default async function AdminHomePage() {
    const posts = await getAllPostsForAdmin();

    return (
        <section>
            <div className='flex items-center justify-between mb-4'>
                <h1 className='text-2xl font-bold'>글 목록 ({posts.length})</h1>
                <Link
                    href='/admin/posts/new'
                    className='px-3 py-1.5 rounded bg-slate-900 text-white text-sm dark:bg-slate-200 dark:text-slate-900'
                >
                    + 새 글
                </Link>
            </div>

            {posts.length === 0 ? (
                <p className='text-center text-slate-500 py-12'>
                    글이 없습니다. 새 글을 작성해 주세요.
                </p>
            ) : (
                <div className='overflow-x-auto'>
                    <table className='w-full text-sm'>
                        <thead className='text-left border-b dark:border-slate-700'>
                            <tr>
                                <th className='py-2 pr-3'>제목</th>
                                <th className='py-2 px-3 whitespace-nowrap'>카테고리</th>
                                <th className='py-2 px-3 whitespace-nowrap'>공개</th>
                                <th className='py-2 px-3 whitespace-nowrap'>작성일</th>
                                <th className='py-2 pl-3 text-right whitespace-nowrap'>
                                    작업
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post) => (
                                <tr
                                    key={post.slug}
                                    className='border-b dark:border-slate-700'
                                >
                                    <td className='py-2 pr-3'>
                                        {post.featured && (
                                            <span className='inline-block mr-1.5 px-1.5 py-0.5 text-[10px] rounded bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-200'>
                                                FEATURED
                                            </span>
                                        )}
                                        {post.title}
                                    </td>
                                    <td className='py-2 px-3 whitespace-nowrap text-slate-500'>
                                        {post.category}
                                    </td>
                                    <td className='py-2 px-3 whitespace-nowrap'>
                                        {post.is_public ? (
                                            <span className='text-green-600'>공개</span>
                                        ) : (
                                            <span className='text-amber-600'>비공개</span>
                                        )}
                                    </td>
                                    <td className='py-2 px-3 whitespace-nowrap text-slate-500'>
                                        {post.published_at}
                                    </td>
                                    <td className='py-2 pl-3'>
                                        <div className='flex gap-2 justify-end'>
                                            <Link
                                                href={`/admin/posts/${post.slug}/edit`}
                                                className='px-2 py-1 border rounded text-xs hover:bg-slate-100 dark:hover:bg-slate-800 dark:border-slate-700'
                                            >
                                                수정
                                            </Link>
                                            <DeleteButton
                                                slug={post.slug}
                                                title={post.title}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
}
