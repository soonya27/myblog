import { getAllCategories } from '@/service/categories';
import PostForm from '../PostForm';
import { createPostAction } from '../../actions';

export const dynamic = 'force-dynamic';

export default async function NewPostPage() {
    const categories = await getAllCategories();

    return (
        <section>
            <h1 className='text-2xl font-bold mb-6'>새 글 작성</h1>
            <PostForm
                categories={categories}
                action={createPostAction}
                submitLabel='작성'
            />
        </section>
    );
}
