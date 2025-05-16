import TextButton from "@/components/Button/TextButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ConfirmModal from "@/components/Modal/ConfirmModal";
import AlertModal from "@/components/Modal/AlertModal";
import { endQuest } from "@/api/quests/endQuest";
import { completeQuest } from "@/api/quests/completeQuest";

interface QuestActionsProps {
  isParent: boolean;
  questId: string;
}

export default function QuestActions({ isParent, questId }: QuestActionsProps) {
  const router = useRouter();
  const [isEndModalOpen, setIsEndModalOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [resultMessage, setResultMessage] = useState("");

  const handleEnd = async () => {
    try {
      const response = await endQuest(questId);
      if (response.isSuccess) {
        setResultMessage("퀘스트가 종료되었습니다.");
        setIsResultModalOpen(true);
      } else {
        setResultMessage(response.message || "퀘스트 종료에 실패했습니다.");
        setIsResultModalOpen(true);
      }
    } catch {
      setResultMessage("퀘스트 종료 중 오류가 발생했습니다.");
      setIsResultModalOpen(true);
    }
  };

  const handleComplete = async () => {
    try {
      const response = await completeQuest(questId);
      if (response.isSuccess) {
        setResultMessage("퀘스트가 성공적으로 완료되었습니다.");
        setIsResultModalOpen(true);
      } else {
        setResultMessage(response.message || "퀘스트 완료에 실패했습니다.");
        setIsResultModalOpen(true);
      }
    } catch {
      setResultMessage("퀘스트 완료 중 오류가 발생했습니다.");
      setIsResultModalOpen(true);
    }
  };

  if (!isParent) return null;

  return (
    <>
      <div className="flex gap-2">
        <TextButton onClick={() => setIsEndModalOpen(true)} variant="secondary">
          종료하기
        </TextButton>
        <TextButton onClick={() => setIsCompleteModalOpen(true)}>
          성공
        </TextButton>
      </div>

      {/* 종료 확인 모달 */}
      <ConfirmModal
        isOpen={isEndModalOpen}
        onClose={() => setIsEndModalOpen(false)}
        onConfirm={handleEnd}
        confirmText="종료"
        cancelText="취소"
      >
        <p className="text-center text-gray-700">
          정말로 이 퀘스트를 종료하시겠습니까?
        </p>
      </ConfirmModal>

      {/* 완료 확인 모달 */}
      <ConfirmModal
        isOpen={isCompleteModalOpen}
        onClose={() => setIsCompleteModalOpen(false)}
        onConfirm={handleComplete}
        confirmText="완료"
        cancelText="취소"
      >
        <p className="text-center text-gray-700">
          이 퀘스트를 성공으로 완료하시겠습니까?
        </p>
      </ConfirmModal>

      {/* 결과 모달 */}
      <AlertModal
        isOpen={isResultModalOpen}
        onClose={() => {
          setIsResultModalOpen(false);
          if (
            resultMessage === "퀘스트가 종료되었습니다." ||
            resultMessage === "퀘스트가 성공적으로 완료되었습니다."
          ) {
            router.back();
          }
        }}
        onConfirm={() => {
          setIsResultModalOpen(false);
          if (
            resultMessage === "퀘스트가 종료되었습니다." ||
            resultMessage === "퀘스트가 성공적으로 완료되었습니다."
          ) {
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
