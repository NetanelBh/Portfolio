import { createPortal } from "react-dom";
import styles from "./Modal.module.css";
import { useEffect, useRef } from "react";

const Modal = ({ children, open, onClose, className = "" }) => {
  const dialog = useRef();

  const classes = `${styles.modal} ${styles[className]}`;

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    }

    return () => {
      dialog.current.close();
    };
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className={classes} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
};

export default Modal;
