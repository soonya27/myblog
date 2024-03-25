"use client"
import { Post } from '@/service/posts';
import React from 'react';
import PostsGrid from './PostsGrid';
import PostsNavbar from './PostsNavbar';
import { Category } from '@/model/category';

type Props = {
    posts: Post[];
    categories: Category[];
    category?: Category | '';
}

const ALL_POSTS = 'All Posts';
export default function FilterablePosts({ posts, categories, category = ALL_POSTS }: Props) {
    const selected = decodeURI(category);
    const filteredPosts = selected == ALL_POSTS
        ? posts
        : posts.filter(post => post.category === selected);

    return (
        <div className=''>
            <PostsNavbar categories={[ALL_POSTS, ...categories]} selected={selected} />
            <PostsGrid posts={filteredPosts} />
            {/* Categories */}
        </div>
    );
}

