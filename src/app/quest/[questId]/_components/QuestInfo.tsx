import Image from "next/image";
import { GetQuestListResult } from "@/types/quests/getQuestListTypes";
import { QUEST_CATEGORIES } from "@/constants/questCategory";

interface QuestInfoProps {
  quest: GetQuestListResult;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear().toString().slice(2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}.${month}.${day}`;
};

const getCategoryInfo = (categoryKey: string) => {
  return QUEST_CATEGORIES.find((cat) => cat.key === categoryKey);
};

export default function QuestInfo({ quest }: QuestInfoProps) {
  const category = getCategoryInfo(quest.category);

  return (
    <div className="flex flex-col gap-10">
      {/* 카테고리 및 제목 */}
      <div className="flex flex-col items-center text-center gap-4">
        <div className="relative w-32 h-32 border-2 border-gray-200 rounded-full bg-white">
          <Image
            src={category?.image || ""}
            alt={category?.name || ""}
            fill
            className="object-contain p-4"
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-500 bg-gray-200 px-3 py-1 rounded-full">
            {category?.name}
          </span>
          <h2 className="text-2xl font-bold">{quest.title}</h2>
          <div className="flex items-center gap-1">
            <Image src="/icons/coin.png" alt="coin" width={16} height={16} />
            <span className="text-blue-500 font-bold">
              + {quest.reward.toLocaleString()}원
            </span>
          </div>
        </div>
      </div>

      {/* 상태 */}
      <div className="flex flex-col gap-4 bg-white p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-normal">상태 :</span>
            {quest.status === "CHALLENGING" && (
              <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
                진행중
              </span>
            )}
            {quest.status === "SUCCESS" && (
              <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
                성공
              </span>
            )}
            {quest.status === "END" && (
              <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                종료
              </span>
            )}
          </div>
        </div>

        {/* 내용 */}
        <div className="flex gap-2">
          <span className="font-normal">내용 :</span>
          <p className="text-gray-600">{quest.body}</p>
        </div>

        {/* 기간 */}
        <div className="flex gap-2">
          <span className="font-normal">기간 :</span>
          <p className="text-gray-600">
            {formatDate(quest.createdAt)} ~ {formatDate(quest.deadline)}
          </p>
        </div>
      </div>
    </div>
  );
}
