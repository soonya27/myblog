"use client"
import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3
    },
    mobile: {
        breakpoint: { max: 765, min: 0 },
        items: 2
    },
    mobile2: {
        breakpoint: { max: 640, min: 0 },
        items: 1
    },
};
export default function MultiCarousel({ children }: { children: React.ReactNode }) {
    return (
        <Carousel responsive={responsive}
            infinite
            autoPlay
            itemClass='m-2'>
            {children}
        </Carousel>
    );
}

