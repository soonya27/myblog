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
      <div className='max-w-screen-2xl mx-auto'>
        <h2 className='font-bold py-4'>Featured Posts</h2>
        <FeaturedPosts />
        <h2 className='font-bold py-4'>non Featured Posts</h2>
        <CarouselPosts />
      </div>
    </>
  );
}
