import { getAllCategoriesWithCount } from '@/service/admin-categories';
import { createCategoryAction } from '../actions';
import DeleteCategoryButton from './DeleteCategoryButton';

export const dynamic = 'force-dynamic';

export default async function CategoriesPage() {
    const categories = await getAllCategoriesWithCount();

    return (
        <section>
            <h1 className='text-2xl font-bold mb-6'>
                카테고리 관리 ({categories.length})
            </h1>

            <form
                action={createCategoryAction}
                className='flex flex-col sm:flex-row gap-2 mb-8 max-w-2xl'
            >
                <input
                    type='text'
                    name='name'
                    placeholder='새 카테고리 이름 (예: TypeScript)'
                    required
                    className='flex-1 px-3 py-2 border rounded dark:bg-slate-900 dark:border-slate-600'
                />
                <input
                    type='text'
                    name='slug'
                    placeholder='slug (선택, 비우면 자동)'
                    className='w-full sm:w-44 px-3 py-2 border rounded font-mono text-sm dark:bg-slate-900 dark:border-slate-600'
                />
                <button
                    type='submit'
                    className='px-4 py-2 rounded bg-slate-900 text-white dark:bg-slate-200 dark:text-slate-900'
                >
                    추가
                </button>
            </form>

            <div className='overflow-x-auto'>
                <table className='w-full text-sm'>
                    <thead className='text-left border-b dark:border-slate-700'>
                        <tr>
                            <th className='py-2 pr-3'>이름</th>
                            <th className='py-2 px-3'>Slug</th>
                            <th className='py-2 px-3 text-center whitespace-nowrap'>
                                글 수
                            </th>
                            <th className='py-2 px-3 text-center whitespace-nowrap'>
                                순서
                            </th>
                            <th className='py-2 pl-3 text-right whitespace-nowrap'>
                                작업
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((c) => (
                            <tr
                                key={c.id}
                                className='border-b dark:border-slate-700'
                            >
                                <td className='py-2 pr-3 font-medium'>{c.name}</td>
                                <td className='py-2 px-3 font-mono text-xs text-slate-500'>
                                    {c.slug}
                                </td>
                                <td className='py-2 px-3 text-center'>
                                    {c.post_count}
                                </td>
                                <td className='py-2 px-3 text-center text-slate-500'>
                                    {c.sort_order}
                                </td>
                                <td className='py-2 pl-3 text-right'>
                                    <DeleteCategoryButton
                                        id={c.id}
                                        name={c.name}
                                        postCount={c.post_count}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <p className='text-xs text-slate-400 mt-4'>
                * 글이 1개 이상 사용 중인 카테고리는 삭제할 수 없습니다. 글의
                카테고리를 다른 곳으로 옮기거나 글을 먼저 삭제하세요.
            </p>
        </section>
    );
}
