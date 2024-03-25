'use client';
import { EmailData } from '@/service/email';
import { sendContactEmail } from '@/service/contact';
import React, { ChangeEvent, FormEvent, useState } from 'react';

const DEFAULT_DATA = {
    from: '',
    subject: '',
    message: '',
}
const inputStyle = `bg-[#f5f4fa] p-3 outline-none`

export default function ContactForm() {
    const [formData, setFormData] = useState<EmailData>(DEFAULT_DATA);
    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }))
    }
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        sendContactEmail(formData)
            .then((data) => {
                //메일 성공
                console.log(data)
                setFormData(DEFAULT_DATA);
            }).catch((e) => {
                //에러
                console.log(e)
            }).finally(() => {
                setTimeout(() => {
                    //베너나 팝업 삭제
                }, 3000)
            })
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
            <button className='w-full bg-main-blue h-9'>submit</button>
        </form>
    );
}

