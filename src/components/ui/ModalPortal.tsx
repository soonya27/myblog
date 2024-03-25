import React from 'react';
import ReactDom from 'react-dom';

type Props = {
    children: React.ReactNode;
}

export default function ModalPortal({ children }: Props) {
    //브라우저 환경일떄만 작동하도록  -> 서버에서는 렌더 XX CSR에서만 렌더하도록
    if (typeof window === 'undefined') {
        return null;
    }

    const node = document.getElementById('portal') as Element;
    return ReactDom.createPortal(children, node);
}

