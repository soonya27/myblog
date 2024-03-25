import CarouselPosts from '@/components/CarouselPosts';
import FeaturedPosts from '@/components/FeaturedPosts';
import Profile from '@/components/Profile';
import Visual from '@/components/Visual';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <Visual />
      <div className='max-w-screen-2xl mx-auto px-3'>
        <h2 className='font-extrabold text-2xl py-4 pt-7'>Finned Posts</h2>
        <FeaturedPosts />
        <h2 className='font-extrabold text-2xl py-4 pt-7'>Other Posts</h2>
        <CarouselPosts />
      </div>
    </>
  );
}
