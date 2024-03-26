import ContactForm from '@/components/ContactForm';
import React from 'react';
import { AiFillGithub } from 'react-icons/ai';

export default function ContactPage() {
    return (
        <section className='bg-[url("../../public/images/sub_bg.jpg")] bg-cover bg-center min-h-[calc(100vh-60px)] '>
            <div className='w-full min-h-[calc(100vh-60px)] flex flex-col items-center py-28 bg-gray-700/60'>
                <div className='relative bg-white rounded-lg w-11/12 max-w-lg p-7 py-6 shadow-lg'>
                    <h2 className='text-4xl font-extrabold text-center text-main-darkblue'>Contact Me</h2>
                    <div className='text-center mt-3 break-words'>
                        <p className='leading-none text-gray-800'><span className='text-sm text-main-darkblue mr-2'>email</span>psykor48@gmail.com</p>
                        <p className='leading-none text-gray-800'><span className='text-sm text-main-darkblue mr-2'>call</span>010.2770.4952</p>
                    </div>
                    <ContactForm />
                    <a target="_blank" href="https://github.com/soonya27" className='absolute sm:bottom-5 sm:top-auto sm:left-auto sm:right-0 sm:translate-x-full bottom-auto top-0 left-2 translate-x-0 w-12 h-14 bg-main-blue flex justify-center items-center rounded-r-sm rounded-br-2xl shadow-lg'>
                        <AiFillGithub className='text-2xl text-white hover:text-main-darkblue' />
                    </a>
                </div>
            </div>
        </section>

    );
}

