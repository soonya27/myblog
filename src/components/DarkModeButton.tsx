'use client'
import { useDarkmodeContext } from '@/context/DarkModeContext';
import React from 'react';
import DarkIcon from './ui/icons/DarkIcon';
import LightIcon from './ui/icons/LightIcon';

export default function DarkModeButton() {
    const { darkMode, toggleDarkMode } = useDarkmodeContext();

    return (
        <div onClick={toggleDarkMode}
            className={`fixed bottom-[3%] right-[5%] w-10 h-10 p-2 border rounded-full z-[1001] cursor-pointer transition-all dark:border-slate-700 shadow-lg
       ${darkMode ? 'bg-black' : 'bg-white'}`}>
            <p>
                {
                    darkMode ? <DarkIcon /> : <LightIcon />
                }
            </p>
        </div>
    );
}

