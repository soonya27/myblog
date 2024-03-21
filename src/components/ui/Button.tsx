import React from 'react';

type Props = {
    text: string;
}

export default function Button({ text }: Props) {
    return (
        <button className='py-3 px-6 rounded-[10rem]  bg-[#ffb3b3] text-[#27537b] transition'>
            <p className='text-sm'>{text}</p>
        </button>
    );
}

