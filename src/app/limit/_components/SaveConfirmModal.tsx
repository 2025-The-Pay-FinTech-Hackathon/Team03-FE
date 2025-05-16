import ConfirmModal from "@/components/Modal/ConfirmModal";

interface SaveConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function SaveConfirmModal({
  isOpen,
  onClose,
  onConfirm,
}: SaveConfirmModalProps) {
  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      confirmText="확인"
      cancelText="취소"
    >
      <p className="text-center text-gray-700">변경사항을 저장하시겠습니까?</p>
    </ConfirmModal>
  );
}
