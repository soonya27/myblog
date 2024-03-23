'use client';
import React, { ChangeEvent, FormEvent, useState } from 'react';

type Form = {
    from: string;
    subject: string;
    message: string;
}
const inputStyle = `bg-[#f5f4fa] p-3 outline-none`

export default function ContactForm() {
    const [formData, setFormData] = useState<Form>({
        from: '',
        subject: '',
        message: ''
    });
    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }))
    }
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData)
    }
    return (
        <form onSubmit={onSubmit} className='w-full flex flex-col gap-2'>
            <label htmlFor="from">Your Email</label>
            <input type="email" name="from" id="from" required autoFocus value={formData.from} onChange={onChange}
                className={inputStyle} />
            <label htmlFor="subject">Subject</label>
            <input type="text" name="subject" id="subject" required value={formData.subject} onChange={onChange}
                className={inputStyle} />
            <label htmlFor="message">Message</label>
            <textarea rows={10} name="message" id="message" required value={formData.message} onChange={onChange}
                className={inputStyle} />
            <button className='w-full bg-[#a3c7e1] h-9'>submit</button>
        </form>
    );
}

