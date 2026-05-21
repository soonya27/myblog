import FilterablePosts from '@/components/FilterablePosts';
import { Category } from '@/model/category';
import { getAllCategories } from '@/service/categories';
import { getFilteredPosts } from '@/service/posts';
import React from 'react';

export default async function PostList({ category }: { category?: Category | '' }) {
    const [posts, categories] = await Promise.all([
        getFilteredPosts(),
        getAllCategories(),
    ]);
    const categoryNames = categories.map((c) => c.name);

    return (
        <div className='max-w-screen-2xl mx-auto p-4'>
            <FilterablePosts posts={posts} categories={categoryNames} category={category} />
        </div>
    );
}
