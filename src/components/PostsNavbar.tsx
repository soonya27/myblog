import React from 'react';
import CategoryButton from './CategoryButton';
import { Category } from '@/model/category';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


type Props = {
    categories: Category[];
    selected: string;
}
export default function PostsNavbar({ categories, selected }: Props) {
    const router = useRouter();
    return (
        <div className='pl-3'>
            <h3 className='py-2 pb-1 text-center font-bold'>Category</h3>
            <ul className='flex gap-2 gap-y-1 justify-center flex-wrap sm:flex-nowrap sm:gap-3 text-center mb-4'>
                {categories.map((list, idx) => (
                    <li key={idx}
                        className={`${selected === list && "font-bold"} cursor-pointer`}
                    >
                        <Link href={`/posts/${list}`}><CategoryButton text={list} isOn={selected === list} /></Link></li>
                ))}
            </ul>
        </div>
    );
}

