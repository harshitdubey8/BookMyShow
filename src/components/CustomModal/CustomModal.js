import React, { useEffect } from "react";
import "./CustomModal.css";

const CustomModal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal-content">
          <span className="close-btn" onClick={onClose}>
            X
          </span>
          {children}
        </div>
      </div>
    )
  );
};

export default CustomModal;
