import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import profileImage from '../../public/images/profile_imge.jpg';



export default function Profile() {
    return (
        // <div className='flex items-center flex-col w-1/4 m-auto min-w-36'>
        <div className='flex justify-center w-9/12 m-auto'>

            <Image src={profileImage} alt='profile' className='rounded-full overflow-hidden border'
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

