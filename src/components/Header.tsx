'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import logoImg from '../../public/images/logo.png';
import { usePathname } from 'next/navigation';

const menuList = [
    { href: '/about', text: 'about' },
    { href: '/posts', text: 'posts' },
    { href: '/contact', text: 'contact' },
]


export default function Header() {
    const pathname = usePathname();
    return (
        <header className=' py-3 px-5 bg-[#a3c7e1]'>
            <div className='flex justify-between items-center max-w-screen-2xl mx-auto'>
                <h1 className='font-bold'>
                    <Link href="/">
                        <Image src={logoImg} alt="logo" width={100} />
                    </Link>
                </h1>
                <nav>
                    <ul className={`flex gap-4 [&>*]:text-white [&>*]:font-bold hover:[&>*]:text-black`}>
                        {
                            menuList.map(li => (
                                <li key={li.text} ><Link className={`${pathname === li.href && 'text-black'}`} href={li.href}>{li.text}</Link></li>
                            ))
                        }
                    </ul>
                </nav>
            </div>
        </header>
    );
}

