import FilterablePosts from '@/components/FilterablePosts';
import { getFilteredPosts } from '@/service/posts';
import React from 'react';

export default async function PostsPage() {
    const posts = await getFilteredPosts();
    const categories = [...new Set(posts.map(post => post.category))];

    return (
        <div className='max-w-screen-2xl mx-auto p-4'>
            <FilterablePosts posts={posts} categories={categories} />
        </div>
    );
}

