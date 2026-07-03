import React from 'react';
import PostsGrid from './PostsGrid';
import { getFeaturedPosts } from '@/service/posts';
import PostsLoadError from './ui/PostsLoadError';

export default async function FeaturedPosts() {
    try {
        const posts = await getFeaturedPosts();
        return (
            <PostsGrid posts={posts} />
        );
    } catch (error) {
        console.error('FeaturedPosts 불러오기 실패:', error);
        return <PostsLoadError />;
    }
}

