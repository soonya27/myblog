import React from 'react';

export default function PostsLoadError({ message = '게시글을 불러올 수 없습니다.' }: { message?: string }) {
    return (
        <div className='flex flex-col items-center justify-center w-full py-16 text-center'>
            <p className='text-lg font-semibold text-gray-500 dark:text-gray-300'>⚠️ {message}</p>
            <p className='mt-2 text-sm text-gray-400 dark:text-gray-500'>잠시 후 다시 시도해 주세요.</p>
        </div>
    );
}
