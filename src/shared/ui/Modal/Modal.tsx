import { FC, PropsWithChildren, useEffect } from "react";
import ReactModal, { Props } from "react-modal";
import { AiOutlineClose } from "react-icons/ai";

interface ModalProps extends Props {
  isHideCloseIcon?: boolean;
}

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    zIndex: 10,
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    margin: "0 auto",
  },
};

const Modal: FC<PropsWithChildren<ModalProps>> = ({
  isOpen,
  onRequestClose,
  children,
  preventScroll = true,
  closeTimeoutMS = 300,
  ariaHideApp = false,
  shouldCloseOnOverlayClick = false,
  isHideCloseIcon = false,
  ...rest
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "initial";
    };
  }, []);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      preventScroll={preventScroll}
      closeTimeoutMS={closeTimeoutMS}
      ariaHideApp={ariaHideApp}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      style={customStyles}
      {...rest}
    >
      <div className="">
        {!isHideCloseIcon && (
          <AiOutlineClose
            size={20}
            onClick={onRequestClose}
            className="absolute right-4 top-4 z-50 cursor-pointer"
          />
        )}
        {children}
      </div>
    </ReactModal>
  );
};

export { Modal };
