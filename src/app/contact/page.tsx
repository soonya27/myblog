import ContactForm from '@/components/ContactForm';
import React from 'react';

export default function ContactPage() {
    return (
        <section className='bg-[url("../../public/images/sub_bg.jpg")] bg-cover bg-center min-h-[calc(100vh-60px)] '>
            <div className='w-full min-h-[calc(100vh-60px)] flex flex-col items-center pt-28 bg-gray-700/60'>
                <div className='bg-white rounded-lg w-4/5 max-w-lg p-7 py-6 shadow-lg'>
                    <h2 className='text-3xl font-bold text-center'>Contact Me</h2>
                    <ContactForm />
                    {/*  */}
                </div>
            </div>
        </section>

    );
}

