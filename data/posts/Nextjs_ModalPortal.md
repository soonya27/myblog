
# Modal Portal 예시  

### 📁src > components > ui > ModalPortal.tsx   (해당 portal dom에 노드 생성)
```tsx
    import React, { useEffect } from 'react';
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

```


### 📁src > app > layout.tsx   (Context 감싸주는 곳, div id portal dom 추가)
```tsx
    export default function RootLayout({
            children,
        }: Readonly<{
            children: React.ReactNode;
        }>) {
        return (
            <html lang="en" className={openSans.className}>
            <body className='w-full bg-neutral-50'>
                <div id="portal" />
            </body>
            </html>
        );
    }
```



### 📁src > components > PostModal.tsx   (ui modal custom component)
```tsx
    import React from 'react';
    import CloseIcon from './ui/icons/CloseIcon';

    type Props = {
        children: React.ReactNode;
        onClose: () => void;
    }
    export default function PostModal({ onClose, children }: Props) {
        return (
            <section onClick={(e) => {
                //section(bg 영역 클릭시)
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}
                className='fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-60 z-[10000]'
            >
                {/* container */}
                <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 md:h-3/5 max-w-7xl mx-auto bg-white z-[10001]'>
                    <button onClick={onClose}
                        className='absolute -top-9 right-0 text-white'
                    ><CloseIcon /></button>
                    {children}
                </div>
            </section>
        );
    }

```


### 📁src > 컴포넌트.tsx   (사용하는 곳)
```tsx

export default function 컴포넌트() {
    const [openModal, setOpenModal] = useState(false);

    const onClose = () => {
        setOpenModal(false);
    }

    return (
        {
            openModal && (
                <ModalPortal>
                    <PostModal onClose={onClose} >
                        {/* modal 내용 */}
                    </PostModal>
                </ModalPortal>
            )
        }
    )
}

```






