import { getAllPosts, getNonFeaturedPosts } from '@/service/posts';
import React from 'react';
import PostCard from './PostCard';
import MultiCarousel from './MultiCarousel';

export default async function CarouselPosts() {
    const posts = await getNonFeaturedPosts();
    // const posts = await getAllPosts();
    return (
        <MultiCarousel>
            {
                posts.map((post, idx) => (
                    <PostCard key={post.path} post={post} priority={idx < 4} />
                ))
            }
        </MultiCarousel>
    );
}

