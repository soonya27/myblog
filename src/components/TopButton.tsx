'use client';

import React, { useEffect, useState } from 'react';
import ArrowTopIcon from './ui/icons/ArrowTopIcon';

export default function TopButton() {
    const [showButton, setShowButton] = useState(false);
    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    useEffect(() => {
        const showButtonClick = () => {
            if (window.scrollY > 50) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        }
        window.addEventListener("scroll", showButtonClick);
        return () => {
            window.removeEventListener("scroll", showButtonClick);
        }
    }, []);

    return (
        <div onClick={handleClick}
            className={`fixed bottom-[3%] right-[5%] w-10 h-10 p-2 border rounded-full bg-white z-[1000] cursor-pointer transition-all
        ${showButton ? 'opacity-1' : 'opacity-0'}`}>
            <p>
                <ArrowTopIcon />
            </p>
        </div>
    );
}

