import ConfirmModal from "@/components/Modal/ConfirmModal";

interface ResultModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ResultModal({
  isOpen,
  message,
  onClose,
  onConfirm,
}: ResultModalProps) {
  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      confirmText="확인"
      cancelText="취소"
    >
      <p className="text-center text-gray-700">{message}</p>
    </ConfirmModal>
  );
}
