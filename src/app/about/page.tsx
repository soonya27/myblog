import Profile from '@/components/Profile';
import React from 'react';

export default function AboutPage() {
    return (
        <>
            <Profile />
            <div>
                <h2>Profile</h2>
                <strong>NAME</strong>
                <p>편소영</p>
                <strong>AGE</strong>
                <p>1995.11.02</p>
                <strong>E-MAIL</strong>
                <p>psykor48@gmail.com</p>
                <strong>github</strong>
                <p><a href="https://github.com/soonya27" target="_blank">https://github.com/soonya27</a></p>
                <strong>CONTACT</strong>
                <p>010.2770.4952</p>
            </div>
        </>
    );
}

