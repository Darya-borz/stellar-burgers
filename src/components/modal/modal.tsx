import { FC, memo, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useLocation } from 'react-router-dom';
import { TModalProps } from './type';
import { ModalUI } from '@ui';

const modalRoot = document.getElementById('modals');

export const Modal: FC<TModalProps> = memo(({ title, onClose, children }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      e.key === 'Escape' && onClose();
    };

    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const { state } = useLocation();
  return ReactDOM.createPortal(
    <ModalUI title={state?.title ? state.title : title} onClose={onClose}>
      {children}
    </ModalUI>,
    modalRoot as HTMLDivElement
  );
});
