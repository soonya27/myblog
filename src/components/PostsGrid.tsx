import { Post } from '@/service/posts';
import React from 'react';
import PostCard from './PostCard';

type Props = { posts: Post[] }
// export default function PostsGrid({ posts }: { posts: Post[] }) {
export default function PostsGrid({ posts }: { posts: Post[] }) {
    return (
        <ul className='grid grid-cols-1 flex-auto gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {posts.map((post, idx) => (
                <li key={post.path} className='w-full'>
                    <PostCard post={post} priority={idx < 4} />
                </li>
            ))}
        </ul>
    );
}

