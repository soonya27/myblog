'use client';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import { FaStar } from "react-icons/fa";


const menuList = [
    { href: '/about', text: 'about' },
    { href: '/posts', text: 'posts' },
    { href: '/contact', text: 'contact' },
]


export default function Header() {
    const pathname = usePathname();
    return (
        <header className=' py-3 px-5 bg-main-blue dark:bg-black'>
            <div className='flex justify-between items-center max-w-screen-2xl mx-auto'>
                <h1 className='font-bold'>
                    <Link href="/">
                        {/* <Image src={logoImg} alt="logo" width={100} height={34} /> */}
                        <h1 className={`text-2xl font-extrabold tracking-tighter flex justify-center items-center ${pathname === '/' ? 'text-main-darkblue dark:text-white' : 'text-white dark:text-slate-400'}`}>P<FaStar className={`text-sm ml-[0.2rem] ${pathname === '/' ? 'text-main-pink' : 'text-white'}`} /></h1>
                    </Link>
                </h1>
                <nav>
                    <ul className={`flex gap-4 [&>*]:text-white [&>*]:font-bold hover:[&>*]:text-black`}>
                        {
                            menuList.map(li => (
                                <li key={li.text} className='relative' ><Link className={`${pathname.includes(li.href) && 'text-black after:content-[""] after:w-[0.35rem] after:h-[0.35rem] after:bg-main-pink after:block after:rounded-full after:absolute after:top-0 after:-right-1'} text-xl dark:hover:text-slate-300 ${pathname.includes(li.href) ? 'dark:text-slate-200' : 'dark:text-slate-400'}`} href={li.href}>{li.text}</Link></li>
                            ))
                        }
                    </ul>
                </nav>
            </div>
        </header>
    );
}

