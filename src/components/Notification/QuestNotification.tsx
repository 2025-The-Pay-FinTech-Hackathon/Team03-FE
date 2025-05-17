import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AlertModal from "@/components/Modal/AlertModal";
import { ROUTES } from "@/constants/routes";
import { QuestEventResponse } from "@/types/socketEvent/questEventTypes";
import { useSocketContext } from "@/contexts/SocketContext";

export const QuestNotification = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { socket } = useSocketContext();

  const [quest, setQuest] = useState<QuestEventResponse>();

  useEffect(() => {
    if (!socket) return;

    const handleQuestEvent = (quest: QuestEventResponse) => {
      console.log("📬 새로운 퀘스트 수신:", quest);
      setQuest(quest);
      setIsModalOpen(true);
    };

    // 이벤트 리스너 등록
    socket.on("quest-complete", handleQuestEvent);

    // cleanup 함수
    return () => {
      socket.off("quest-complete", handleQuestEvent);
    };
  }, [socket]);

  // 모달 상태 변경 모니터링
  useEffect(() => {}, [isModalOpen]);

  const handleConfirm = () => {
    if (quest) {
      router.push(ROUTES.questDetail(String(quest.questId)));
    }
  };

  return (
    <>
      {quest && (
        <AlertModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirm}
          confirmText="퀘스트 확인하기"
        >
          <div className="text-center">
            <h2 className="text-xl font-bold mb-6">
              새로운 퀘스트가 도착했어요!
            </h2>
            <p className="text-lg mb-2">{quest.title}</p>
            <div className="flex items-center gap-1 w-full justify-center">
              <Image src="/icons/coin.png" alt="coin" width={16} height={16} />
              <span className="text-blue-500 font-bold text-lg">
                + {quest.reward.toLocaleString()}원
              </span>
            </div>{" "}
          </div>
        </AlertModal>
      )}
    </>
  );
};
