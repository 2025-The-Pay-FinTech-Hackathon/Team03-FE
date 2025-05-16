"use client";

import Image from "next/image";
import VerticalActionButton from "@/components/Button/VerticalActionButton";

export default function MenuList() {
  return (
    <div className="flex justify-between items-center gap-4 bg-white rounded-2xl px-8 py-4">
      <VerticalActionButton onClick={() => console.log("소비 제한 클릭")}>
        <Image
          src="/icons/menu/limit.png"
          alt="소비 제한"
          width={40}
          height={40}
        />
        <span className="text-sm">소비 제한</span>
      </VerticalActionButton>

      <VerticalActionButton onClick={() => console.log("퀘스트 클릭")}>
        <Image
          src="/icons/menu/quest.png"
          alt="퀘스트"
          width={40}
          height={40}
        />
        <span className="text-sm">퀘스트</span>
      </VerticalActionButton>

      <VerticalActionButton onClick={() => console.log("AI 소비 리포트 클릭")}>
        <Image
          src="/icons/menu/aiReport.png"
          alt="AI 분석 소비 리포트"
          width={40}
          height={40}
        />
        <span className="text-sm">AI 소비 분석</span>
      </VerticalActionButton>

      <VerticalActionButton onClick={() => console.log("설정 클릭")}>
        <Image
          src="/icons/menu/setting.png"
          alt="설정"
          width={40}
          height={40}
        />
        <span className="text-sm">설정</span>
      </VerticalActionButton>
    </div>
  );
}
