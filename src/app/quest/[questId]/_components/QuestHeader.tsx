import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteQuest } from "@/api/quests/deleteQuest";
import ConfirmModal from "@/components/Modal/ConfirmModal";
import AlertModal from "@/components/Modal/AlertModal";

interface QuestHeaderProps {
  isParent: boolean;
  questId: string;
}

export default function QuestHeader({ isParent, questId }: QuestHeaderProps) {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [resultMessage, setResultMessage] = useState("");

  const handleDelete = async () => {
    try {
      const response = await deleteQuest(questId);
      if (response.isSuccess) {
        setResultMessage("퀘스트가 삭제되었습니다.");
        setIsResultModalOpen(true);
      } else {
        setResultMessage(response.message || "퀘스트 삭제에 실패했습니다.");
        setIsResultModalOpen(true);
      }
    } catch {
      setResultMessage("퀘스트 삭제 중 오류가 발생했습니다.");
      setIsResultModalOpen(true);
    }
  };

  return (
    <>
      <div className="flex items-center justify-end p-4">
        {isParent && (
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="flex flex-row items-center gap-2 p-2 border border-gray-500 text-gray-500 hover:text-red-500 hover:border-red-500 hover:bg-red-50 rounded-full transition-all duration-200 cursor-pointer hover:scale-102 active:scale-98"
            aria-label="퀘스트 삭제"
          >
            <Trash2 size={20} /> <span>퀘스트 삭제하기</span>
          </button>
        )}
      </div>

      {/* 모달 */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        confirmText="삭제"
        cancelText="취소"
      >
        <p className="text-center text-gray-700">
          정말로 이 퀘스트를 삭제하시겠습니까?
        </p>
      </ConfirmModal>

      <AlertModal
        isOpen={isResultModalOpen}
        onClose={() => {
          setIsResultModalOpen(false);
          if (resultMessage === "퀘스트가 삭제되었습니다.") {
            router.back();
          }
        }}
        onConfirm={() => {
          setIsResultModalOpen(false);
          if (resultMessage === "퀘스트가 삭제되었습니다.") {
            router.back();
          }
        }}
        confirmText="확인"
      >
        <p className="text-center text-gray-700">{resultMessage}</p>
      </AlertModal>
    </>
  );
}
