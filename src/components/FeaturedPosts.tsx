import React from 'react';
import PostsGrid from './PostsGrid';
import { getFeaturedPosts } from '@/service/posts';

export default async function FeaturedPosts() {
    const posts = await getFeaturedPosts();
    return (
        <PostsGrid posts={posts} />
    );
}

