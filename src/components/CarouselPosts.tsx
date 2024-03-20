import { getNonFeaturedPosts } from '@/service/posts';
import React from 'react';
import PostCard from './PostCard';
import MultiCarousel from './MultiCarousel';

export default async function CarouselPosts() {
    const posts = await getNonFeaturedPosts();
    return (
        <MultiCarousel>
            {
                posts.map(post => (
                    <PostCard key={post.path} post={post} />
                ))
            }
        </MultiCarousel>
    );
}

