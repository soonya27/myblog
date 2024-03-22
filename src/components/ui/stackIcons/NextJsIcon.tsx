import React from 'react';
import nextImg from '../../../../public/DevelopeSkillIcon/NextJS-Dark.svg';
import Image from 'next/image';

export default function NextJsIcon() {
    return (
        <Image src={nextImg} alt="nextJs" width={60} height={60} className='w-full ' />
    );
}

