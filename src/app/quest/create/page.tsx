"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { QUEST_CATEGORIES } from "@/constants/questCategory";
import { createQuest } from "@/api/quests/createQuest";
import { ROUTES } from "@/constants/routes";
import QuestForm from "./_components/QuestForm";
import ResultModal from "./_components/ResultModal";

interface FormData {
  category: string;
  title: string;
  body: string;
  reward: number;
  deadline: string;
}

export default function QuestCreatePage() {
  const router = useRouter();
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [createdQuestId, setCreatedQuestId] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    category: QUEST_CATEGORIES[0].key,
    title: "",
    body: "",
    reward: 0,
    deadline: "",
  });

  const isFormValid = Boolean(
    formData.title.trim() &&
      formData.body.trim() &&
      formData.reward > 0 &&
      formData.deadline
  );

  const handleSubmit = async () => {
    try {
      const response = await createQuest({
        ...formData,
        reward: String(formData.reward),
      });

      if (response.isSuccess && response.result) {
        setResultMessage("퀘스트가 생성되었습니다.");
        setCreatedQuestId(response.result.questId);
        setIsResultModalOpen(true);
      } else {
        setResultMessage(response.message || "퀘스트 생성에 실패했습니다.");
        setIsResultModalOpen(true);
      }
    } catch {
      setResultMessage("퀘스트 생성 중 오류가 발생했습니다.");
      setIsResultModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setIsResultModalOpen(false);
    if (createdQuestId) {
      router.push(ROUTES.questDetail(createdQuestId));
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-6">
        <QuestForm
          formData={formData}
          isFormValid={isFormValid}
          onSubmit={handleSubmit}
          onChange={setFormData}
        />
      </div>

      <ResultModal
        isOpen={isResultModalOpen}
        message={resultMessage}
        onClose={handleModalClose}
        onConfirm={handleModalClose}
      />
    </div>
  );
}
