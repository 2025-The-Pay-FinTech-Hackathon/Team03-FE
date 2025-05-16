import AlertModal from "@/components/Modal/AlertModal";

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
    <AlertModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      confirmText="확인"
    >
      <p className="text-center text-gray-700">{message}</p>
    </AlertModal>
  );
}
