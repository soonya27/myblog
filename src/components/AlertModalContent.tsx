import React from 'react';
import { AlertModalData } from './ContactForm';

export default function AlertModalContent(
    { modalData: { title, icon, detail, state } }: { modalData: AlertModalData }
) {
    return (
        <div className={`${state === 'success' ? 'bg-success' : 'bg-fail'} pt-16`}>
            <div className='relative bg-white p-5 pt-10 '>
                <p className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center p-1 bg-white w-20 h-20 rounded-full'>
                    <span className={`block w-full h-full border-2 rounded-full ${state === 'success' ? 'border-success text-success' : 'border-fail text-fail'} p-3 `}>
                        {icon}
                    </span>
                </p>
                <h2 className='font-semibold text-center my-3'>{title}</h2>
                <div className='text-center text-sm leading-tight'>{detail}</div>
            </div>
        </div>
    );
}

