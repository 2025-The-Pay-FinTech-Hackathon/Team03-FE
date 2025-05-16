import { GetHomeInfoResult } from "@/types/home/getHomeInfoTypes";

interface HomeInfoProps {
  data: GetHomeInfoResult;
}

export default function HomeInfo({ data }: HomeInfoProps) {
  const { leftMoney, inProgressCount, todayTotalSpend } = data;

  const formatNumber = (num: number) => {
    return num.toLocaleString("ko-KR");
  };

  return (
    <div className="w-full grid grid-cols-3 gap-4">
      <div className="bg-white rounded-2xl p-4 flex flex-col items-center">
        <span className="text-gray-500 text-sm mb-2">남은 용돈</span>
        <div className="flex items-end gap-1">
          <span className="text-xl font-bold">{formatNumber(leftMoney)}</span>
          <span className="text-sm text-gray-500">원</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 flex flex-col items-center">
        <span className="text-gray-500 text-sm mb-2">진행중인 퀘스트</span>
        <div className="flex items-end gap-1">
          <span className="text-xl font-bold">{inProgressCount}</span>
          <span className="text-sm text-gray-500">개</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 flex flex-col items-center">
        <span className="text-gray-500 text-sm mb-2">오늘의 소비</span>
        <div className="flex items-end gap-1">
          <span className="text-xl font-bold">
            {formatNumber(todayTotalSpend)}
          </span>
          <span className="text-sm text-gray-500">원</span>
        </div>
      </div>
    </div>
  );
}
