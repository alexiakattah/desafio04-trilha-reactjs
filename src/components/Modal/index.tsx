import { useEffect, useRef, useState } from 'react';
import ReactModal from 'react-modal';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  children: React.ReactNode;
}

export function Modal({ children, isOpen, setIsOpen }: ModalProps) {
  const [modalStatus, setModalStatus] = useState(isOpen);

  //detecta mudança do estado anterior com o atual e atualiza o estado
  //funciona como o componentDidUpdate()
  const prevIsOpenRef = useRef<boolean>();
  useEffect(() => {
    prevIsOpenRef.current = isOpen;
  });

  const isOpenPreviousValue = prevIsOpenRef.current ?? isOpen;

  useEffect(() => {
    if (isOpenPreviousValue !== isOpen) {
      console.log('é diferente', isOpen);
      setModalStatus(isOpen);
    }
  }, [isOpen, isOpenPreviousValue]);
  //fim da detecção

  return (
    <ReactModal
      shouldCloseOnOverlayClick={!false}
      onRequestClose={setIsOpen}
      isOpen={modalStatus}
      ariaHideApp={false}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          background: '#F0F0F5',
          color: '#000000',
          borderRadius: '8px',
          width: '736px',
          border: 'none',
        },
        overlay: {
          backgroundColor: '#121214e6',
        },
      }}
    >
      {children}
    </ReactModal>
  );
}
