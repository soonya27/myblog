import React from 'react';
import NextJsIcon from './ui/stackIcons/NextJsIcon';
import ReactIcon from './ui/stackIcons/ReactIcon';
import SanityIcon from './ui/stackIcons/SanityIcon';
import TypescriptIcon from './ui/stackIcons/TypescriptIcon';


const iconList = [
    { text: 'NextJs', icon: <NextJsIcon /> },
    { text: 'React', icon: <ReactIcon /> },
    { text: 'Sanity', icon: <SanityIcon /> },
    { text: 'typescript', icon: <TypescriptIcon /> },
];

export default function StackIconCard({ stack }: { stack: string }) {
    return (
        <li className='w-8 h-8' key={stack}>
            {iconList.find(item => item.text === stack)?.icon}
        </li>
    );
}

