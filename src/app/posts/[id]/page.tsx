import NavigatorPostButton from '@/components/NavigatorPostButton';
import PostContent from '@/components/PostContent';
import { getPostDetail } from '@/service/posts';
import React from 'react';



type Props = {
    params: {
        id: string;
    }
}
export default async function PostDetailpPage({ params: { id } }: Props) {
    const post = await getPostDetail(id);
    const { next, prev } = post;
    const isOne = !next || !prev;

    return (
        <article className='overflow-hidden'>
            <PostContent post={post} id={id} />
            <section className='flex max-w-screen-2xl mx-auto mt-10'>
                {prev && <NavigatorPostButton post={prev} type='prev' isOne={isOne} />}
                {next && <NavigatorPostButton post={next} type='next' isOne={isOne} />}
            </section>
        </article >
    );
}

