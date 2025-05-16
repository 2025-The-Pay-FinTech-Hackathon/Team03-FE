"use client";

import { GetQuestDetailResult } from "@/types/quests/getQuestDetail";
import { useAuthStore } from "@/store/useAuthStore";
import QuestHeader from "./_components/QuestHeader";
import QuestInfo from "./_components/QuestInfo";
import QuestActions from "./_components/QuestActions";
import { useEffect, useState } from "react";
import { getQuestDetail } from "@/api/quests/getQuestDetail";
import { useParams } from "next/navigation";

export default function QuestDetailPage() {
  const { questId } = useParams();
  const { role } = useAuthStore();
  const isParent = role === "PARENT";
  const [quest, setQuest] = useState<GetQuestDetailResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuestDetail = async () => {
      try {
        const response = await getQuestDetail(questId as string);
        if (response.isSuccess && response.result) {
          setQuest(response.result);
        }
      } catch (error) {
        console.error("퀘스트 상세 정보를 불러오는데 실패했습니다:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (questId) {
      fetchQuestDetail();
    }
  }, [questId]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p>로딩중...</p>
      </div>
    );
  }

  if (!quest) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p>퀘스트를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <QuestHeader isParent={isParent} questId={quest.questId} />

      <div className="p-6 flex flex-col justify-between h-full">
        <QuestInfo quest={quest} />
        <QuestActions isParent={isParent} questId={quest.questId} />
      </div>
    </div>
  );
}
