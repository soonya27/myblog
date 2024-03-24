import { Post } from '@/service/posts';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';


type Props = {
    post: Post;
    type: 'prev' | 'next';
    isOne: boolean;
}

const ICON_CLASS = 'absolute text-[9vw] sm:text-[4vw] lg:text-6xl p-2 transition-all text-yellow-300 basis-[12%] group-hover:scale-125';
export default function NavigatorPostButton({ post: { path, title, description }, type, isOne }: Props) {
    console.log(isOne)
    return (
        <Link href={`/posts/detail/${path}`} className='group relative w-full bg-black max-h-44 text-' >
            <Image src={`/images/posts/${path}.png`}
                className='w-full h-full opacity-40 '
                alt={title}
                width={150}
                height={100} />
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-around items-center text-white px-[2vw]'>
                {type == 'prev' && <FaArrowLeft className={`${ICON_CLASS} left-2`} />}
                <div className={`w-full text-center ${type == 'prev' ? 'pl-[18%]' : 'pr-[18%]'}
                ${isOne && (type == 'next' ? 'absolute left-1/2 pr-[0] -translate-x-1/2' : 'absolute left-1/2 pl-[0] -translate-x-1/2'
                    )}`}>
                    <h3 className='text-[3.5vw] md:text-3xl font-bold break-all leading-none mb-2'>{title}</h3>
                    <p className='font-semibold text-[2.5vw] md:text-sm text-gray-100/70 leading-tight'>{description}</p>
                </div>
                {type == 'next' && <FaArrowRight className={`${ICON_CLASS} right-2`} />}
            </div>
        </Link>
    );
}

