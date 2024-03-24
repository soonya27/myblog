import FilterablePosts from '@/components/FilterablePosts';
import PostList from '@/components/PostList';
import { Category } from '@/model/category';
import { getFilteredPosts, getPostDetail } from '@/service/posts';
import React from 'react';



type Props = {
    params: {
        category: Category;
    }
}
export default async function PostsPage({ params: { category } }: Props) {

    return (
        <PostList category={category} />
    );
}

