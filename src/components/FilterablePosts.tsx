"use client"
import { Post } from '@/service/posts';
import React, { useState } from 'react';
import PostsGrid from './PostsGrid';
import PostsNavbar from './PostsNavbar';

type Props = {
    posts: Post[];
    categories: string[]
}

const ALL_POSTS = 'All Posts';
export default function FilterablePosts({ posts, categories }: Props) {
    const [selected, setSelected] = useState(ALL_POSTS);
    const filteredPosts = selected === ALL_POSTS
        ? posts
        : posts.filter(post => post.category === selected);

    return (
        <div className='flex justify-between w-full'>
            <PostsGrid posts={filteredPosts} />
            {/* Categories */}
            <PostsNavbar categories={[ALL_POSTS, ...categories]} onClick={setSelected} selected={selected} />
        </div>
    );
}

