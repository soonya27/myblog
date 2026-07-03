import { getAllPosts, getNonFeaturedPosts } from '@/service/posts';
import React from 'react';
import PostCard from './PostCard';
import MultiCarousel from './MultiCarousel';
import PostsLoadError from './ui/PostsLoadError';

export default async function CarouselPosts() {
    try {
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
    } catch (error) {
        console.error('CarouselPosts 불러오기 실패:', error);
        return <PostsLoadError />;
    }
}

