import { PostData } from '@/service/posts';
import Image from 'next/image';
import React from 'react';
import CategoryButton from './CategoryButton';
import { AiTwotoneCalendar } from 'react-icons/ai';
import MarkdownViewer from './MarkdownViewer';
import StackIconCard from './StackIconCard';

export default function PostContent({ post, id }: { post: PostData, id: string }) {
    const { title, content, date, path, description, category, stacks } = post;
    return (
        <>
            <div className='relative max-h-[60vh] before:content-[""] before:absolute before:h-full before:w-full before:bg-gray-950/60'>
                <Image src={`/images/posts/${id}.png`} width={760} height={420} alt={title}
                    className='w-full  max-h-[60vh] object-cover' />
                <div className='absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center w-full h-full max-w-screen-2xl text-white px-3'>
                    <CategoryButton text={category} />
                    <h1 className='text-[7vw] md:text-6xl font-bold mt-5 break-all leading-none'>{title}</h1>
                    <p className='text-[3.5vw] md:text-2xl mt-[1vw] md:mt-2'>{description}</p>
                    <ul className='flex gap-2 justify-center mt-7' >
                        {
                            stacks.map(stack => (
                                <StackIconCard stack={stack} key={stack} />
                            ))
                        }
                    </ul>
                    <div className='flex justify-center items-center mt-4'>
                        <AiTwotoneCalendar />
                        <p className='text-gray-100/60 ml-3 text-[2.5vw] md:text-lg'>{date.toString()}</p>
                    </div>
                </div>
            </div>
            <section className='flex flex-col p-4  max-w-screen-2xl mx-auto'>
                <MarkdownViewer content={content} />
            </section>
        </>
    );
}

