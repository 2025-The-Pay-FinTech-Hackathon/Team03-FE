"use client";

import { GetQuestListResult } from "@/types/quests/getQuestListTypes";
import { useAuthStore } from "@/store/useAuthStore";
import QuestHeader from "./_components/QuestHeader";
import QuestInfo from "./_components/QuestInfo";
import QuestActions from "./_components/QuestActions";

// 데모 데이터
const DEMO_QUEST: GetQuestListResult = {
  questId: "5",
  category: "ERRAND",
  title: "장보기",
  body: "마트에서 장보기 (우유, 계란, 과일)",
  reward: 3000,
  createdAt: "2024-03-18T14:00:00Z",
  deadline: "2024-03-18T18:00:00Z",
  status: "SUCCESS",
};

export default function QuestDetailPage() {
  const quest = DEMO_QUEST;
  const { role } = useAuthStore();
  const isParent = role === "PARENT";

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
