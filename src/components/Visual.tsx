'use client';

import React, { useState } from 'react';
import visualImg from '../../public/images/visual_img.png';
import balloonImg from '../../public/images/balloon.png';
import Image from 'next/image';
import Link from 'next/link';


type Position = {
    x: number;
    y: number;
}
export default function Visual() {
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
    return (
        <div
            className="relative bg-[url('../../public/images/visual_bg.jpg')] md:h-[63vh] lg:h-[95vh] bg-cover bg-center overflow-hidden pointer-events-none"
            onPointerMove={(e) => setPosition({ x: e.clientX, y: e.clientY })}
        >
            <Link href="/about" className='peer h-full flex justify-center items-center my-5 transition-transform hover:scale-105 cursor-pointer pointer-events-none sm:pointer-events-auto'>
                <Image src={visualImg} alt="visual image" width={1380} height={900} className='w-2/3 max-w-[900px]' priority />
            </Link>
            <div className={`w-28 h-10 fixed left-0 top-0 invisible peer-hover:visible z-10`}
                style={{ transform: `translate(calc(-50% + ${position.x}px), calc(80% + ${position.y}px))` }}>
                <div className='relative pointer-events-none'>
                    <Image src={balloonImg} alt="ballon" />
                    <p className='absolute top-[68%] -translate-y-1/2 w-28 text-center font-bold text-[#27537b]'>About Me</p>
                </div>
            </div>
            <div className='[&>*]:pointer-events-none'>
                <span className={`${animatedSpanStyle} left-[30%] animate-[bubble_8s_linear_infinite_2.6s] bg-white`}></span>
                <span className={`${animatedSpanStyle} left-[14%] animate-[bubble_10s_linear_infinite_3.9s] bg-main-pink`}></span>
                <span className={`${animatedSpanStyle} left-[90%] animate-[bubble_10s_linear_infinite_1.5s] bg-main-pink`}></span>
                <span className={`${animatedSpanStyle} left-[70%] animate-[bubble_6s_linear_infinite_1.s] bg-main-pink`}></span>
                <span className={`${animatedSpanStyle} left-[20%] animate-[bubble_8s_linear_infinite_0.5s] bg-main-pink`}></span>
                <span className={`${animatedSpanStyle} left-[80%] animate-[bubble_10s_linear_infinite_1.8s] bg-white`}></span>
                <span className={`${animatedSpanStyle} left-[1%] animate-[bubble_10s_linear_infinite_5.2s] bg-white`}></span>
                <span className={`${animatedSpanStyle} left-[50%] animate-[bubble_10s_linear_infinite_3.1s] bg-white`}></span>
                <span className={`${animatedSpanStyle} left-[65%] animate-[bubble_10s_linear_infinite_4.5s] bg-main-pink`}></span>
                <span className={`${animatedSpanStyle} left-[76%] animate-[bubble_8s_linear_infinite_2.6s] bg-white`}></span>
                <span className={`${animatedSpanStyle} left-[88%] animate-[bubble_10s_linear_infinite_3.9s] bg-main-pink`}></span>
                <span className={`${animatedSpanStyle} left-[35%] animate-[bubble_10s_linear_infinite_1.5s] bg-bg-white`}></span>
                <span className={`${animatedSpanStyle} left-[5%] animate-[bubble_6s_linear_infinite_1.s] bg-main-pink`}></span>
                <span className={`${animatedSpanStyle} left-[10%] animate-[bubble_8s_linear_infinite_0.5s] bg-main-pink`}></span>
            </div>
        </div>
    );
}

const animatedSpanStyle = `absolute z-10 w-[5vw] h-[5vw] max-w-[50px] max-h-[50px] rounded-full`

