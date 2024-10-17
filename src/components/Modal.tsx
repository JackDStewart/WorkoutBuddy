import React, { ReactNode } from 'react';
import {ModalProps} from '../types'

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-darkPurple p-5 rounded-lg shadow-lg relative w-[400px]">
        <button 
          className="absolute top-2 right-2 p-2 rounded-full"
          onClick={onClose}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
