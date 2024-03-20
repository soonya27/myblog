import MarkdownViewer from '@/components/MarkdownViewer';
import { getPostDetail } from '@/service/posts';
import Image from 'next/image';
import React from 'react';

type Props = {
    params: {
        id: string;
    }
}
export default async function PostDetailpPage({ params: { id } }: Props) {
    const { title, content, date, path, description } = await getPostDetail(id);
    return (
        <article>
            <Image src={`/images/posts/${id}.png`} width={760} height={420} alt={title} />
            <h1>{title}</h1>
            PostDetailpPage :   {id}
            <MarkdownViewer content={content} />
        </article>
    );
}

