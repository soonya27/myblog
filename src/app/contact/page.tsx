import ContactForm from '@/components/ContactForm';
import React from 'react';
import { AiFillGithub } from 'react-icons/ai';

export default function ContactPage() {
    return (
        <section className='bg-[url("../../public/images/sub_bg.jpg")] bg-cover bg-center min-h-[calc(100vh-60px)] '>
            <div className='w-full min-h-[calc(100vh-60px)] flex flex-col items-center pt-28 bg-gray-700/60'>
                <div className='relative bg-white rounded-lg w-4/5 max-w-lg p-7 py-6 shadow-lg'>
                    <h2 className='text-4xl font-extrabold text-center text-[#284e74]'>Contact Me</h2>
                    <div className='text-center mt-3'>
                        <p className='leading-none text-gray-800'><span className='text-sm text-[#284e74] mr-2'>email</span>psykor48@gmail.com</p>
                        <p className='leading-none text-gray-800'><span className='text-sm text-[#284e74] mr-2'>call</span>010.2770.4952</p>
                    </div>
                    <ContactForm />
                    <a target="_blank" href="https://github.com/soonya27" className='absolute bottom-5 right-0 translate-x-full w-12 h-14 bg-[#a3c7e1] flex justify-center items-center rounded-r-sm rounded-br-2xl shadow-lg'>
                        <AiFillGithub className='text-2xl text-white hover:text-[#284e74]' />
                    </a>
                </div>
            </div>
        </section>

    );
}

