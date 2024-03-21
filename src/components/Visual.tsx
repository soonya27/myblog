import React from 'react';
import visulImg from '../../public/images/visual_img.png';
import Image from 'next/image';



export default function Visual() {
    return (
        <div className="relative bg-[url('../../public/images/visual_bg.jpg')] md:h-[63vh] lg:h-[95vh] bg-cover bg-center overflow-hidden">
            <div className='h-full flex justify-center items-center my-5'>
                <Image src={visulImg} alt="visual image" width={1380} height={900} className='w-2/3 max-w-[900px]' />
            </div>
            <div className=''>
                <span className={`${animatedSpanStyle} left-[30%] animate-[bubble_8s_linear_infinite_2.6s] bg-white`}></span>
                <span className={`${animatedSpanStyle} left-[14%] animate-[bubble_10s_linear_infinite_3.9s] bg-[#fcd1d1]`}></span>
                <span className={`${animatedSpanStyle} left-[90%] animate-[bubble_10s_linear_infinite_1.5s] bg-[#fcd1d1]`}></span>
                <span className={`${animatedSpanStyle} left-[70%] animate-[bubble_6s_linear_infinite_1.s] bg-[#fcd1d1]`}></span>
                <span className={`${animatedSpanStyle} left-[20%] animate-[bubble_8s_linear_infinite_0.5s] bg-[#fcd1d1]`}></span>
                <span className={`${animatedSpanStyle} left-[80%] animate-[bubble_10s_linear_infinite_1.8s] bg-white`}></span>
                <span className={`${animatedSpanStyle} left-[1%] animate-[bubble_10s_linear_infinite_5.2s] bg-white`}></span>
                <span className={`${animatedSpanStyle} left-[50%] animate-[bubble_10s_linear_infinite_3.1s] bg-white`}></span>
                <span className={`${animatedSpanStyle} left-[65%] animate-[bubble_10s_linear_infinite_4.5s] bg-[#fcd1d1]`}></span>
                <span className={`${animatedSpanStyle} left-[76%] animate-[bubble_8s_linear_infinite_2.6s] bg-white`}></span>
                <span className={`${animatedSpanStyle} left-[88%] animate-[bubble_10s_linear_infinite_3.9s] bg-[#fcd1d1]`}></span>
                <span className={`${animatedSpanStyle} left-[35%] animate-[bubble_10s_linear_infinite_1.5s] bg-bg-white`}></span>
                <span className={`${animatedSpanStyle} left-[5%] animate-[bubble_6s_linear_infinite_1.s] bg-[#fcd1d1]`}></span>
                <span className={`${animatedSpanStyle} left-[10%] animate-[bubble_8s_linear_infinite_0.5s] bg-[#fcd1d1]`}></span>
            </div>
        </div>
    );
}

const animatedSpanStyle = `absolute z-10 w-[5vw] h-[5vw] max-w-[50px] max-h-[50px] rounded-full`

