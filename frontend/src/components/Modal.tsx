import React, { ReactNode, useEffect } from "react";
import { ModalProps } from "../types";

const Modal: React.FC<ModalProps> = ({
  closeButton,
  isOpen,
  onClose,
  children,
  width,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999]">
      <div
        className={`bg-darkPurple p-5 rounded-lg shadow-lg relative ${width}`}
      >
        {!closeButton && (
          <button
            className="absolute top-2 right-2 p-2 rounded-full"
            onClick={onClose}
          >
            ✕
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
