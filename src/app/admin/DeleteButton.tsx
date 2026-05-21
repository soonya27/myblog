'use client';

import { deletePostAction } from './actions';

type Props = {
    slug: string;
    title: string;
};

export default function DeleteButton({ slug, title }: Props) {
    return (
        <form
            action={deletePostAction}
            onSubmit={(e) => {
                if (!confirm(`"${title}" 글을 삭제하시겠습니까?`)) {
                    e.preventDefault();
                }
            }}
        >
            <input type='hidden' name='slug' value={slug} />
            <button
                type='submit'
                className='px-2 py-1 border rounded text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-950 dark:border-slate-700'
            >
                삭제
            </button>
        </form>
    );
}
