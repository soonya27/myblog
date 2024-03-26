'use client'
import { Post } from '@/service/posts';
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
    post: { title, date, category, path, description, stacks },
    priority = false
}: Props) {

    //하이드레이션 이슈
    //(Hydration failed because the initial UI does not match what was rendered on the server.)
    // const [isClient, setIsClient] = useState(false);
    // useEffect(() => {
    //     setIsClient(true)
    // }, []);

    return (
        <div className='block relative rounded-2xl overflow-hidden border hover:shadow-xl transition-transform hover:-translate-y-1 duration-200'>
            <div className='absolute left-3 top-3 z-10'>
                <Link href={`/posts/${category}`} className='inline-block h-full'>
                    <CategoryButton text={category} />
                </Link>
            </div>
            <Link href={`/posts/detail/${path}`} className=''>
                <Image src={`/images/posts/${path}.png`} alt={title}
                    width={600} height={400}
                    className='w-full h-52 md:h-40 object-cover'
                    priority={priority}
                />
                <div className='p-4 h-[9rem]'>
                    <div className='flex flex-col'>
                        <h3 className='text-lg font-bold w-full break-all truncate leading-none mb-2'>{title}</h3>
                        <p className='w-full line-clamp-2 leading-none text-sm'>{description}</p>
                    </div>
                    <time className='absolute bottom-2 left-1/2 -translate-x-1/2 self-center text-xs text-gray-500'>{date.toString()}</time>
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

