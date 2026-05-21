'use client'
import { Post } from '@/model/post';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import CategoryButton from './CategoryButton';
import StackIconCard from './StackIconCard';

type Props = {
    post: Post;
    priority?: boolean;
}

// export default function PostCard({ post }: { post: Post }) {
export default function PostCard({
    post: { title, date, category, path, description, stacks, image_url },
    priority = false
}: Props) {

    //하이드레이션 이슈
    //(Hydration failed because the initial UI does not match what was rendered on the server.)
    // const [isClient, setIsClient] = useState(false);
    // useEffect(() => {
    //     setIsClient(true)
    // }, []);

    return (
        <div className='block relative rounded-2xl overflow-hidden border hover:shadow-xl transition-transform hover:-translate-y-1 duration-200 dark:bg-slate-800 dark:border-slate-700'>
            <div className='absolute left-3 top-3 z-10'>
                <Link href={`/posts/${category}`} className='inline-block h-full'>
                    <CategoryButton text={category} />
                </Link>
            </div>
            <Link href={`/posts/detail/${path}`} className=''>
                {image_url ? (
                    <Image src={image_url} alt={title}
                        width={600} height={400}
                        className='w-full h-52 md:h-40 object-cover'
                        priority={priority}
                    />
                ) : (
                    <div
                        className='w-full h-52 md:h-40 bg-gradient-to-br from-purple-400 via-fuchsia-400 to-blue-500 flex items-center justify-center'
                        aria-label={title}
                    >
                        <span className='text-white text-xl font-bold opacity-80 px-4 text-center line-clamp-2'>
                            {category || title}
                        </span>
                    </div>
                )}
                <div className='p-4 h-[9rem]'>
                    <div className='flex flex-col'>
                        <h3 className='text-lg font-bold w-full break-all truncate leading-none mb-2 dark:text-white'>{title}</h3>
                        <p className='w-full line-clamp-2 leading-none text-sm dark:text-slate-400'>{description}</p>
                    </div>
                    <time className='absolute bottom-2 left-1/2 -translate-x-1/2 self-center text-xs text-gray-500'>{date.toISOString().slice(0, 10)}</time>
                    <ul className='absolute bottom-9 right-3 flex gap-1 justify-end pt-4'>
                        {
                            stacks.map(stack => (
                                <StackIconCard stack={stack} key={stack} />
                            ))
                        }
                    </ul>
                </div>
            </Link>
        </div >
    );
}

