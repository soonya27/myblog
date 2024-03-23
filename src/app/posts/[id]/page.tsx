import CategoryButton from '@/components/CategoryButton';
import MarkdownViewer from '@/components/MarkdownViewer';
import { getPostDetail } from '@/service/posts';
import Image from 'next/image';
import React from 'react';
import { AiTwotoneCalendar } from 'react-icons/ai';



type Props = {
    params: {
        id: string;
    }
}
export default async function PostDetailpPage({ params: { id } }: Props) {
    const { title, content, date, path, description, category } = await getPostDetail(id);
    return (
        <article className='overflow-hidden max-w-screen-2xl mx-auto'>
            <div className='relative max-h-[60vh] before:content-[""] before:absolute before:h-full before:w-full before:bg-gray-950/35'>
                <Image src={`/images/posts/${id}.png`} width={760} height={420} alt={title}
                    className='w-full  max-h-[60vh] object-cover' />
                <div className='absolute top-0 flex flex-col items-center justify-center w-full h-full text-white px-3'>
                    <CategoryButton text={category} />
                    <h1 className='text-[7vw] md:text-6xl font-bold mt-5 break-all leading-none'>{title}</h1>
                    <p className='text-[3.5vw] md:text-2xl mt-[1vw] md:mt-2'>{description}</p>
                    <div className='flex justify-center items-center mt-8'>
                        <AiTwotoneCalendar />
                        <p className='text-gray-100/60 ml-3 text-[3vw] md:text-lg'>{date.toString()}</p>
                    </div>
                </div>
            </div>
            <section className='flex flex-col p-4'>
                <MarkdownViewer content={content} />
            </section>
        </article>
    );
}

