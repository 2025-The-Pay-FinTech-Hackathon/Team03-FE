"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import VerticalActionButton from "../Button/VerticalActionButton";

interface ClosableModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const ClosableModal: React.FC<ClosableModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  const [mounted, setMounted] = useState(false);

  // 클라이언트 사이드에서만 마운트
  useEffect(() => {
    setMounted(true);

    // 모달이 열리면 스크롤 방지
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    // 컴포넌트 언마운트 시 스크롤 복원
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [isOpen, onClose]);

  // 모달 외부 클릭 시 닫기
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // 아직 마운트되지 않았거나 모달이 닫혀있으면 렌더링하지 않음
  if (!mounted || !isOpen) return null;

  // Portal을 사용하여 body에 직접 렌더링
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 bg-opacity-75 backdrop-blur-sm transition-all duration-300"
      onClick={handleBackdropClick}
    >
      <div
        className="relative w-full max-w-sm bg-white rounded-xl shadow-xl transition-all duration-300 transform scale-100"
        style={{ maxHeight: "90vh", overflow: "auto" }}
      >
        <div className="flex flex-col gap-3 justify-between items-center p-6">
          <div className="w-full flex justify-end">
            <div>
              <VerticalActionButton onClick={onClose} aria-label="닫기">
                <X className="w-6 h-6" />
              </VerticalActionButton>
            </div>
          </div>

          <div className="w-full">{children}</div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ClosableModal;
