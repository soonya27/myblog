import React from 'react';

type Props = {
    text: string;
}
export default function CategoryButton({ text }: Props) {
    return (
        <span className='text-xs rounded-3xl py-[0.2rem] px-[.7rem] leading-1 bg-[#fcd1d1] text-[#db5f5f] font-semibold'>
            {text}
        </span>
    );
}

