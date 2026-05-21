'use client';

import { deleteCategoryAction } from '../actions';

type Props = {
    id: string;
    name: string;
    postCount: number;
};

export default function DeleteCategoryButton({ id, name, postCount }: Props) {
    if (postCount > 0) {
        return (
            <button
                type='button'
                disabled
                title={`이 카테고리를 사용하는 글 ${postCount}개`}
                className='px-2 py-1 border rounded text-xs text-slate-400 cursor-not-allowed dark:border-slate-700'
            >
                삭제 불가
            </button>
        );
    }

    return (
        <form
            action={deleteCategoryAction}
            onSubmit={(e) => {
                if (!confirm(`카테고리 "${name}" 을(를) 삭제하시겠습니까?`)) {
                    e.preventDefault();
                }
            }}
        >
            <input type='hidden' name='id' value={id} />
            <button
                type='submit'
                className='px-2 py-1 border rounded text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-950 dark:border-slate-700'
            >
                삭제
            </button>
        </form>
    );
}
