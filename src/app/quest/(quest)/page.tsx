"use client";

import { GetQuestListResult } from "@/types/quests/getQuestListTypes";
import QuestCard from "./_components/QuestCard";
import { useAuthStore } from "@/store/useAuthStore";
import TextButton from "@/components/Button/TextButton";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { useEffect, useState } from "react";
import { getQuestList } from "@/api/quests/getQuestList";

export default function QuestPage() {
  const { role } = useAuthStore();
  const router = useRouter();
  const [quests, setQuests] = useState<GetQuestListResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuests = async () => {
      try {
        const response = await getQuestList();
        if (response.isSuccess && response.result) {
          setQuests(response.result);
        }
      } catch (error) {
        console.error("퀘스트 목록을 불러오는데 실패했습니다:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuests();
  }, []);

  const ongoingQuests = quests.filter(
    (quest) => quest.status === "CHALLENGING"
  );
  const completedQuests = quests.filter(
    (quest) => quest.status === "SUCCESS" || quest.status === "END"
  );

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p>로딩중...</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col p-6 justify-between h-full">
      <div className="flex flex-col gap-8">
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">진행중인 퀘스트</h2>
          <div className="grid grid-cols-2 gap-3">
            {ongoingQuests.length > 0 ? (
              ongoingQuests.map((quest) => (
                <QuestCard key={quest.questId} quest={quest} />
              ))
            ) : (
              <div className="col-span-2 text-center text-gray-500 py-8">
                진행중인 퀘스트가 없습니다
              </div>
            )}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">종료된 퀘스트</h2>
          <div className="grid grid-cols-2 gap-3">
            {completedQuests.length > 0 ? (
              completedQuests.map((quest) => (
                <QuestCard key={quest.questId} quest={quest} />
              ))
            ) : (
              <div className="col-span-2 text-center text-gray-500 py-8">
                종료된 퀘스트가 없습니다
              </div>
            )}
          </div>
        </section>
      </div>
      {role === "PARENT" && (
        <TextButton
          onClick={() => {
            router.push(ROUTES.createQuest);
          }}
        >
          우리 아이에게 퀘스트 보내기
        </TextButton>
      )}
    </div>
  );
}
