import { Post } from '@/service/posts';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import NextJsIcon from './ui/stackIcons/NextJsIcon';
import ReactIcon from './ui/stackIcons/ReactIcon';
import SanityIcon from './ui/stackIcons/SanityIcon';

type Props = {
    post: Post
}

const iconList = [
    { text: 'NextJs', icon: <NextJsIcon /> },
    { text: 'React', icon: <ReactIcon /> },
    { text: 'Sanity', icon: <SanityIcon /> },
]

// export default function PostCard({ post }: { post: Post }) {
export default function PostCard({
    post: { title, date, category, path, description, stacks }
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
                <div className='p-4 h-[9rem]'>
                    <div className='flex flex-col'>
                        <h3 className='text-lg font-bold w-full break-all truncate leading-none mb-2'>{title}</h3>
                        <p className='w-full line-clamp-2 leading-none text-sm'>{description}</p>
                    </div>
                    <time className='absolute bottom-2 left-1/2 -translate-x-1/2 self-center text-xs text-gray-500'>{date.toString()}</time>
                    <ul className='absolute bottom-9 right-3 flex gap-1 justify-end pt-4'>
                        {
                            stacks.map(stack => (
                                <li className='w-8 h-8'>
                                    {iconList.find(item => item.text === stack)?.icon}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </Link>
    );
}

