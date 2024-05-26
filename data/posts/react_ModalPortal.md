
# Modal Portal 예시  (공통 모달(Alert Modal) -> context)

## 📁src > components > ui > ModalPortal.jsx   (해당 portal dom에 노드 생성)
```jsx
  import ReactDom from 'react-dom';

  export default function ModalPortal({ children }) {
      //브라우저 환경일떄만 작동하도록  -> 서버에서는 렌더 XX CSR에서만 렌더하도록
      if (typeof window === 'undefined') {
          return null;
      }

      const node = document.getElementById('portal');
      return ReactDom.createPortal(children, node);
  }
```


## 📁src > ModalContext.jsx   (ModalPortal을 감싸는 Context 정의)

```jsx
  import { createContext, useContext, useState } from 'react';
  import AlertModal from '../components/ui/AlertModal/AlertModal';
  import ModalPortal from '../components/ui/icons/ModalPortal';

  const ModalContext = createContext();

  export function ModalContextProvider({ children }) {
      const [isModalOpen, setIsModalOpen] = useState(false);
      const modalClose = () => setIsModalOpen(false);
      const modalOpen = () => setIsModalOpen(true);
      const [modalObj, setModalObj] = useState({});


      return <ModalContext.Provider value={{ isModalOpen, modalClose, modalOpen, setModalObj }}>
          {children}
          {
              isModalOpen && (
                  <ModalPortal>
                      <AlertModal onClose={modalClose} modalObj={modalObj} closeCallback={modalObj.btnCallback}>
                          <h5>{modalObj.title || ''}</h5>
                          <p>{modalObj.text || ''}</p>
                      </AlertModal>
                  </ModalPortal>
              )
          }
      </ModalContext.Provider>
  }

  export function useModalContext() {
      return useContext(ModalContext);
  }
```


## 📁src > App.js   (Context 감싸주는 곳, div id portal dom 추가)
```js
  function App() {
    return (
      <ModalContextProvider>
        <Header />
        <Outlet />
        <Footer />
        <div id="portal" />
      </ModalContextProvider>
    );
  }
```



## 📁src > components > ui > AlertModal.jsx   (ui modal custom component)
```jsx
  import React from 'react';
  import styles from './AlertModal.module.css';
  import Button from '../Button/Button';


  export default function AlertModal({ onClose, children, closeCallback }) {
      return (
          <section onClick={async (e) => {
              //section(bg 영역 클릭시)
              if (e.target === e.currentTarget) {
                  closeCallback ? await closeCallback().then(onClose)
                      : onClose();
              }
          }}
              className={styles.container}
          >
              {/* container */}
              <div className={styles.container_inner}>
                  {children}
                  <Button onClick={async () => {
                      closeCallback ? await closeCallback().then(onClose)
                          : onClose();
                  }}>
                      확인
                  </Button>
              </div>
          </section>
      );
  }

```


## 📁src > 컴포넌트.jsx   (사용하는 곳)
```jsx

export default function 컴포넌트() {
  const { modalOpen, setModalObj } = useModalContext();

  return (
        <Button onClick={() => {
            modalOpen();
            setModalObj({
                title: '장바구니가 비어 있습니다.',
                text: '제품 추가후 주문을 다시 해주세요.'
            });
            return;
        }}>
            주문하기
        </Button>
  )
}
```






