import { Post } from '@/service/posts';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
    post: Post
}

// export default function PostCard({ post }: { post: Post }) {
export default function PostCard({
    post: { title, date, category, path, description }
}: Props) {
    return (
        <Link href={`/posts/${path}`}>
            <div className='rounded-md overflow-hidden shadow-lg'>
                <Image src={`/images/posts/${path}.png`} alt={title}
                    width={300} height={200}
                    className='w-full' />
                <div className='flex flex-col items-center p-4'>
                    <time className='self-end'>{date.toString()}</time>
                    <h3 className='text-lg font-bold'>{title}</h3>
                    <p className='w-full text-center truncate'>{description}</p>
                    <span className='text-sm rounded-lg bg-green-100 mt-2 px-2'>{category}</span>
                </div>
            </div>
        </Link>
    );
}

