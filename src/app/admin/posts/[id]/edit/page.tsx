import { getAdminPostBySlug } from '@/service/admin-posts';
import { getAllCategories } from '@/service/categories';
import { notFound } from 'next/navigation';
import PostForm from '../../PostForm';
import { updatePostAction } from '../../../actions';

export const dynamic = 'force-dynamic';

type Props = { params: { id: string } };

export default async function EditPostPage({ params }: Props) {
    const [post, categories] = await Promise.all([
        getAdminPostBySlug(params.id),
        getAllCategories(),
    ]);

    if (!post) notFound();

    const action = updatePostAction.bind(null, params.id);

    return (
        <section>
            <h1 className='text-2xl font-bold mb-6'>글 수정</h1>
            <PostForm
                categories={categories}
                action={action}
                defaults={post}
                submitLabel='수정 저장'
            />
        </section>
    );
}
