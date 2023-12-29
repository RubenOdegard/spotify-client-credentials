// Modal.tsx
import React, { ReactNode, useEffect } from "react";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  useEffect(() => {
    // Add event listener to close modal on outside click
    const handleClickOutside = (event: MouseEvent) => {
      const modal = document.getElementById("modal");
      if (modal && !modal.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      id="modal"
      className="fixed top-0 left-0 w-full h-full bg-emerald-950 backdrop-blur-sm bg-opacity-75 flex justify-center items-center z-50"
    >
      <div className="bg-emerald-700 p-4 rounded-lg shadow-md">
        {children}
        <button
          className="mt-4 p-2 bg-blue-500 text-white rounded-md"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
