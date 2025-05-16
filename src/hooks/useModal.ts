import { useState } from "react";

interface UseModalResult {
  isOpen: boolean;
  message: string;
  openModal: (message?: string) => void;
  closeModal: () => void;
}

export function useModal(initialMessage: string = ""): UseModalResult {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(initialMessage);

  const openModal = (newMessage?: string) => {
    if (newMessage) setMessage(newMessage);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setMessage("");
  };

  return {
    isOpen,
    message,
    openModal,
    closeModal,
  };
}
