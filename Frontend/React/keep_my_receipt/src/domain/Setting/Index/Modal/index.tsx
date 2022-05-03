import { PropsWithChildren } from 'react';
import './index.css';
import { Dialog } from '@mui/material';

interface ModalDefaultType {
  onClickToggleModal: () => void;
}

function Modal({
  onClickToggleModal,
  children,
}: PropsWithChildren<ModalDefaultType>) {
  return (
    <></>
    // <ModalContainer>
    //   <DialogBox>{children}</DialogBox>
    //   <Backdrop
    //     onClick={(e: React.MouseEvent) => {
    //       e.preventDefault();

    //       if (onClickToggleModal) {
    //         onClickToggleModal();
    //       }
    //     }}
    //   />
    // </ModalContainer>
  );
}

export default Modal;
