"use client";

import { useState, useEffect } from "react";
import { GetHomeInfoResult } from "@/types/home/getHomeInfoTypes";
import { getHomeInfo } from "@/api/home/getHomeInfo";

export default function HomeInfo() {
  const [homeInfo, setHomeInfo] = useState<GetHomeInfoResult | null>(null);

  useEffect(() => {
    const fetchHomeInfo = async () => {
      try {
        const response = await getHomeInfo();
        if (response.isSuccess && response.result) {
          setHomeInfo(response.result);
        }
      } catch (error) {
        console.error("홈 정보 조회 중 오류 발생:", error);
      }
    };

    fetchHomeInfo();
  }, []);

  const formatNumber = (num: number) => {
    return num.toLocaleString("ko-KR");
  };

  if (!homeInfo) {
    return (
      <div className="w-full grid grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-white/50 rounded-2xl p-4 animate-pulse h-[88px]"
          />
        ))}
      </div>
    );
  }

  const { leftMoney, inProgressCount, todayTotalSpend } = homeInfo;

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
        <span className="text-gray-500 text-sm mb-2">진행중 퀘스트</span>
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
