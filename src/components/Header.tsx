import { headers } from 'next/headers';
import Link from 'next/link';
import React from 'react';

export default function Header() {
    return (
        <header className='flex justify-between items-center py-3 px-2'>
            <h1 className='font-bold'>
                <Link href="/">{"Pyeon's Blog"}</Link>
            </h1>
            <nav>
                <ul className='flex gap-4'>
                    <li><Link href="/about">about</Link></li>
                    <li><Link href="/posts">posts</Link></li>
                    <li><Link href="/contact">contact</Link></li>
                </ul>
            </nav>
        </header>
    );
}

