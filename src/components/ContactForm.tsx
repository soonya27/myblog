'use client';
import { EmailData } from '@/service/email';
import { sendContactEmail } from '@/service/contact';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import ModalPortal from './ui/ModalPortal';
import AlertModal from './ui/AlertModal';
import SendMailIcon from './ui/icons/SendMailIcon';
import AlertModalContent from './AlertModalContent';
import FailIcon from './ui/icons/FailIcon';
import GridSpinner from './ui/GridSpinner';

const DEFAULT_DATA = {
    from: '',
    subject: '',
    message: '',
}
export type AlertModalData = {
    title: string;
    icon: JSX.Element;
    detail: JSX.Element;
    state: 'success' | 'fail';
}
const inputStyle = `bg-[#f5f4fa] p-3 outline-none text-main-darkblue`;

export default function ContactForm() {
    const [formData, setFormData] = useState<EmailData>(DEFAULT_DATA);
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalData, setModalData] = useState<AlertModalData>({
        title: '', icon: <div></div>, detail: <div></div>, state: 'success'
    });


    // const handleClick = () => setOpenModal(true);
    const onClose = () => {
        setOpenModal(false);
    }
    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        sendContactEmail(formData)
            .then((data) => {
                //메일 성공
                setFormData(DEFAULT_DATA);
                setOpenModal(true);
                setLoading(false);
                setModalData({
                    title: '이메일을 보냈습니다.',
                    icon: <SendMailIcon />,
                    detail: <div>
                        <p>빠른 시일 내에 답변드리겠습니다.<br />감사합니다.</p>
                    </div>,
                    state: 'success'
                })
            }).catch((e) => {
                //에러
                setModalData({
                    title: '이메일 전송에 실패했습니다.',
                    icon: <FailIcon />,
                    detail: <div>
                        <p>다시 시도해 주세요.</p>
                    </div>,
                    state: 'fail'
                });
            }).finally(() => {
                setTimeout(() => {
                    setOpenModal(false);
                }, 3500)
            })
    }
    return (
        <div>
            <form onSubmit={onSubmit} className='w-full flex flex-col gap-1 pt-2'>
                <label htmlFor="from">Your Email</label>
                <input type="email" name="from" id="from" required autoFocus value={formData.from} onChange={onChange}
                    className={inputStyle} />
                <label htmlFor="subject">Subject</label>
                <input type="text" name="subject" id="subject" required value={formData.subject} onChange={onChange}
                    className={inputStyle} />
                <label htmlFor="message">Message</label>
                <textarea rows={10} name="message" id="message" required value={formData.message} onChange={onChange}
                    className={`${inputStyle} resize-none`} />
                <button className='w-full mt-3 bg-main-blue h-9 text-white text-bold hover:bg-main-darkblue transition-all'>submit</button>
            </form>
            {openModal && (
                true && (
                    <ModalPortal>
                        <AlertModal onClose={onClose} >
                            <AlertModalContent modalData={modalData} />
                        </AlertModal>
                    </ModalPortal>
                )
            )}
            {
                loading && (
                    <div className='w-full h-screen fixed left-0 top-0 bg-gray-900/70 flex justify-center items-center z-50'>
                        <GridSpinner />
                    </div>
                )
            }
        </div>
    );
}

