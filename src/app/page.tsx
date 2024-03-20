import CarouselPosts from '@/components/CarouselPosts';
import FeaturedPosts from '@/components/FeaturedPosts';
import Profile from '@/components/Profile';

export default function HomePage() {
  return (
    <>
      <Profile />
      <h2 className='font-bold py-4'>Featured Posts</h2>
      <FeaturedPosts />
      <h2 className='font-bold py-4'>non Featured Posts</h2>
      <CarouselPosts />
    </>
  );
}
