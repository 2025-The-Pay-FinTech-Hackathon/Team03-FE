import TextButton from "@/components/Button/TextButton";
import { useLimitForm } from "@/hooks/useLimitForm";
import { useModal } from "@/hooks/useModal";
import { CategorySection } from "./CategorySection";
import { AmountSection } from "./AmountSection";
import { TimeSection } from "./TimeSection";
import ConfirmModal from "@/components/Modal/ConfirmModal";
import AlertModal from "@/components/Modal/AlertModal";

export default function LimitForm() {
  const {
    formData,
    isReadOnly,
    isLoading,
    error,
    toggleCategory,
    updateFormData,
    handleEdit,
    handleCancel,
    handleSave,
  } = useLimitForm();

  const saveModal = useModal();
  const cancelModal = useModal();
  const resultModal = useModal();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">로딩중...</div>
    );
  }

  const handleSaveClick = () => {
    saveModal.openModal("변경사항을 저장하시겠습니까?");
  };

  const handleSaveConfirm = async () => {
    const success = await handleSave();
    saveModal.closeModal();
    resultModal.openModal(
      success ? "저장되었습니다." : error || "저장에 실패했습니다."
    );
  };

  const handleCancelClick = () => {
    cancelModal.openModal("저장하지 않고 나가시겠습니까?");
  };

  const handleCancelConfirm = () => {
    handleCancel();
    cancelModal.closeModal();
  };

  return (
    <>
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-8">
          <CategorySection
            selectedCategories={formData.category}
            isReadOnly={isReadOnly}
            onToggle={toggleCategory}
          />
          <AmountSection
            amountLimit={formData.amountLimit}
            dailyLimit={formData.dailyLimit}
            isReadOnly={isReadOnly}
            onUpdate={updateFormData}
          />
          <TimeSection
            startTime={formData.startTime}
            endTime={formData.endTime}
            isReadOnly={isReadOnly}
            onUpdate={updateFormData}
          />
        </div>

        {!isReadOnly ? (
          <div className="mt-4 flex gap-4">
            <TextButton onClick={handleCancelClick} variant="secondary">
              취소
            </TextButton>
            <TextButton onClick={handleSaveClick}>저장</TextButton>
          </div>
        ) : (
          <TextButton onClick={handleEdit}>수정</TextButton>
        )}
      </div>

      <ConfirmModal
        isOpen={saveModal.isOpen}
        onClose={saveModal.closeModal}
        onConfirm={handleSaveConfirm}
        confirmText="확인"
        cancelText="취소"
      >
        <p className="text-center text-gray-700">{saveModal.message}</p>
      </ConfirmModal>

      <ConfirmModal
        isOpen={cancelModal.isOpen}
        onClose={cancelModal.closeModal}
        onConfirm={handleCancelConfirm}
        confirmText="확인"
        cancelText="취소"
      >
        <p className="text-center text-gray-700">{cancelModal.message}</p>
      </ConfirmModal>

      <AlertModal
        isOpen={resultModal.isOpen}
        onClose={resultModal.closeModal}
        onConfirm={resultModal.closeModal}
        confirmText="확인"
      >
        <p className="text-center text-gray-700">{resultModal.message}</p>
      </AlertModal>
    </>
  );
}
