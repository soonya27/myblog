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
            <div className='relative rounded-2xl overflow-hidden border hover:shadow-xl transition-transform hover:-translate-y-1 duration-200'>
                <span className='absolute left-3 top-3 text-xs rounded-3xl py-[0.2rem] px-[.7rem] leading-1 bg-[#fcd1d1] text-[#db5f5f] font-semibold'>
                    {category}
                </span>
                <Image src={`/images/posts/${path}.png`} alt={title}
                    width={300} height={200}
                    className='w-full h-52 md:h-40 object-cover' />
                <div className='p-4 h-28'>
                    <div className='flex flex-col'>
                        <h3 className='text-lg font-bold w-full break-all line-clamp-2 leading-none mb-2'>{title}</h3>
                        <p className='w-full line-clamp-2 leading-none text-sm'>{description}</p>
                        <time className='absolute bottom-3 left-1/2 -translate-x-1/2 self-center text-xs text-gray-500'>{date.toString()}</time>
                    </div>
                </div>
            </div>
        </Link>
    );
}

