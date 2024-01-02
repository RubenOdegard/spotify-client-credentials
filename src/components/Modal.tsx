import React, { ReactNode, useEffect } from "react";
import { Button } from "./ui/button";

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
    <div className="fixed top-0 left-0 w-full h-full bg-background/90 backdrop-blur-md bg-opacity-95 flex justify-center items-center z-50">
      <div
        className=" bg-gray-900 backdrop-blur-sm p-6 flex flex-col  max-h-[80dvh] overflow-y-scroll z-50  rounded-md shadow-md border border-emerald-950/80"
        id="modal"
      >
        {children}
        <Button
          onClick={onClose}
          size="sm"
          variant="outline"
          className="mt-4 h-[50px] p-3"
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default Modal;
