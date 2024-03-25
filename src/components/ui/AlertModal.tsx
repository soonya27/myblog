import React from 'react';
import CloseIcon from './icons/CloseIcon';


type Props = {
    children: React.ReactNode;
    onClose?: () => void;
    isClose?: boolean;
}
export default function AlertModal({ onClose, children, isClose = false }: Props) {
    return (
        <section onClick={(e) => {
            //section(bg 영역 클릭시)
            if (e.target === e.currentTarget) {
                onClose && onClose();
            }
        }}
            className='fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-60 z-[10000]'
        >
            {/* PostModal container */}
            <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 sm:w-1/2 max-w-[400px] mx-auto bg-white z-[10001] rounded-lg overflow-hidden'>
                {isClose && (
                    <button onClick={onClose}
                        className='absolute -top-9 right-0 text-white'
                    ><CloseIcon /></button>
                )}
                {children}
            </div>
        </section>
    );
}

