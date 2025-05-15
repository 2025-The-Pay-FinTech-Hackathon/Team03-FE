"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import TextButton from "../Button/TextButton";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  children: React.ReactNode;
  title?: string;
  confirmText?: string;
}

const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  children,
  confirmText = "확인",
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 bg-opacity-75 backdrop-blur-sm transition-all duration-300"
      onClick={handleBackdropClick}
    >
      <div
        className="relative w-full max-w-sm bg-white rounded-xl shadow-xl transition-all duration-300 transform scale-100"
        style={{ maxHeight: "90vh", overflow: "auto" }}
      >
        <div className="flex flex-col justify-between items-center p-6">
          <div className="w-full py-8">{children}</div>
          <div className="w-full">
            <TextButton
              variant="primary"
              onClick={() => {
                onConfirm();
                onClose();
              }}
              width="full"
            >
              {confirmText}
            </TextButton>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AlertModal;
