import { GetQuestListResult } from "@/types/quests/getQuestListTypes";
import { QUEST_CATEGORIES } from "@/constants/questCategory";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";

interface QuestCardProps {
  quest: GetQuestListResult;
}

const getCategoryInfo = (categoryKey: string) => {
  return QUEST_CATEGORIES.find((cat) => cat.key === categoryKey);
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear().toString().slice(2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}.${month}.${day}`;
};

export default function QuestCard({ quest }: QuestCardProps) {
  const category = getCategoryInfo(quest.category);
  const router = useRouter();

  const handleClick = () => {
    router.push(ROUTES.questDetail(quest.questId));
  };

  return (
    <>
      <div
        className="bg-white rounded-xl p-3 shadow-md hover:shadow-lg transition-shadow border border-gray-100 cursor-pointer"
        onClick={handleClick}
      >
        <div className="flex items-start gap-2">
          <div className="relative w-8 h-8 flex-shrink-0 border border-gray-200 rounded-full">
            <Image
              src={category?.image || ""}
              alt={category?.name || ""}
              fill
              className="object-contain"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-1 flex-wrap">
              <h3 className="font-semibold truncate max-w-full">
                {quest.title}
              </h3>
              {quest.status === "SUCCESS" && (
                <span className="bg-green-100 text-green-600 text-[10px] px-1.5 py-0.5 rounded-full font-medium flex-shrink-0">
                  성공
                </span>
              )}
            </div>
            <span className="text-xs text-gray-500">
              ~ {formatDate(quest.deadline)}
            </span>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Image src="/icons/coin.png" alt="coin" width={14} height={14} />
            <span className="text-sm">{quest.reward.toLocaleString()}원</span>
          </div>
        </div>
      </div>
    </>
  );
}
