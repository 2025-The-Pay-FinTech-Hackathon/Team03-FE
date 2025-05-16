"use client";

import { GetQuestListResult } from "@/types/quests/getQuestListTypes";
import QuestCard from "./_components/QuestCard";

const DEMO_QUESTS: GetQuestListResult[] = [
  {
    questId: "1",
    category: "HOUSEWORK",
    title: "방 청소하기",
    body: "방 구석구석 깨끗이 청소하고 정리정돈하기",
    reward: 5000,
    createdAt: "2024-03-20T09:00:00Z",
    deadline: "2024-03-21T18:00:00Z",
    status: "CHALLENGING",
  },
  {
    questId: "2",
    category: "HOUSEWORK",
    title: "설거지하기",
    body: "설거지를 깨끗이 하고 그릇 정리하기",
    reward: 5000,
    createdAt: "2024-03-20T09:00:00Z",
    deadline: "2024-03-21T18:00:00Z",
    status: "CHALLENGING",
  },
  {
    questId: "3",
    category: "STUDY",
    title: "수학 문제 50개 풀기",
    body: "수학 교과서 3단원 연습문제 완료하기",
    reward: 10000,
    createdAt: "2024-03-19T10:00:00Z",
    deadline: "2024-03-22T18:00:00Z",
    status: "CHALLENGING",
  },
  {
    questId: "4",
    category: "STUDY",
    title: "영어 단어 외우기",
    body: "영어 단어 50개 외우기",
    reward: 8000,
    createdAt: "2024-03-19T10:00:00Z",
    deadline: "2024-03-22T18:00:00Z",
    status: "CHALLENGING",
  },
  {
    questId: "5",
    category: "ERRAND",
    title: "장보기",
    body: "마트에서 장보기 (우유, 계란, 과일)",
    reward: 3000,
    createdAt: "2024-03-18T14:00:00Z",
    deadline: "2024-03-18T18:00:00Z",
    status: "SUCCESS",
  },
  {
    questId: "6",
    category: "SELFCARE",
    title: "아침 운동하기",
    body: "공원 3바퀴 달리기",
    reward: 5000,
    createdAt: "2024-03-17T06:00:00Z",
    deadline: "2024-03-17T09:00:00Z",
    status: "END",
  },
];

export default function QuestPage() {
  const ongoingQuests = DEMO_QUESTS.filter(
    (quest) => quest.status === "CHALLENGING"
  );
  const completedQuests = DEMO_QUESTS.filter(
    (quest) => quest.status === "SUCCESS" || quest.status === "END"
  );

  return (
    <div className="w-full flex flex-col p-6 gap-8">
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">진행중인 퀘스트</h2>
        <div className="grid grid-cols-2 gap-3">
          {ongoingQuests.map((quest) => (
            <QuestCard key={quest.questId} quest={quest} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">종료된 퀘스트</h2>
        <div className="grid grid-cols-2 gap-3">
          {completedQuests.map((quest) => (
            <QuestCard key={quest.questId} quest={quest} />
          ))}
        </div>
      </section>
    </div>
  );
}
