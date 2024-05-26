'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import profileImage from '../../public/images/profile_imge.jpg';
import profileImageReal from '../../public/images/profile_image_real.jpg';



export default function Profile() {
    const [isHovering, setIsHovered] = useState(false);
    const onMouseEnter = () => setIsHovered(true);
    const onMouseLeave = () => setIsHovered(false);
    return (
        // <div className='flex items-center flex-col w-1/4 m-auto min-w-36'>
        <div className='flex justify-center w-9/12 m-auto rounded-full overflow-hidden border'>

            <Image src={isHovering ? profileImageReal : profileImage} alt='profile' className='w-full h-full'
                width={312} height={312}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                priority />

            {/* <strong>Pyeon So Yeong</strong>
            <p className='text-gray-500 '>Front engineer</p> */}
            {/* <Link href="/contact">
                <button className='w-full h-full py-1 px-3 border rounded-lg bg-amber-400 font-bold'>Contact Me
                </button>
            </Link> */}
        </div>
    );
}

