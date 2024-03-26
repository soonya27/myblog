import React from 'react';
import NextJsIcon from './ui/stackIcons/NextJsIcon';
import ReactIcon from './ui/stackIcons/ReactIcon';
import SanityIcon from './ui/stackIcons/SanityIcon';
import TypescriptIcon from './ui/stackIcons/TypescriptIcon';
import JavascriptIcon from './ui/stackIcons/JavascriptIcon';
import CssIcon from './ui/stackIcons/CssIcon';
import HtmlIcon from './ui/stackIcons/HtmlIcon';
import JqueryIcon from './ui/stackIcons/JqueryIcon';


const iconList = [
    { text: 'NextJs', icon: <NextJsIcon /> },
    { text: 'React', icon: <ReactIcon /> },
    { text: 'Sanity', icon: <SanityIcon /> },
    { text: 'Typescript', icon: <TypescriptIcon /> },
    { text: 'Javascript', icon: <JavascriptIcon /> },
    { text: 'Html', icon: <HtmlIcon /> },
    { text: 'Css', icon: <CssIcon /> },
    { text: 'Jquery', icon: <JqueryIcon /> },
];

export default function StackIconCard({ stack }: { stack: string }) {
    return (
        <li className='w-8 h-8'>
            {iconList.find(item => item.text === stack)?.icon}
        </li>
    );
}

