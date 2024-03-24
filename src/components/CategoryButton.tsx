import { Category } from '@/model/category';
import React from 'react';

type Props = {
    text: Category;
    isOn?: boolean;
}

export default function CategoryButton({ text, isOn = false }: Props) {
    return (
        <span
            className={`${isOn ? 'bg-[#db5f5f] text-white border border-[#db5f5f]' : 'bg-main-pink border border-main-pink text-[#db5f5f]'} hover:bg-[#db5f5f] hover:border-[#db5f5f] hover:text-white transition-all text-xs rounded-3xl py-[0.2rem] px-[.7rem] leading-1  font-semibold`}>
            {text}
        </span >
    );
}

