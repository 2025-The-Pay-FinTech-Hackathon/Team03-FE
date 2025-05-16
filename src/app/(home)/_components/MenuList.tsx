"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import VerticalActionButton from "@/components/Button/VerticalActionButton";
import { ROUTES } from "@/constants/routes";

export default function MenuList() {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center gap-4 bg-white rounded-2xl px-8 py-4">
      <VerticalActionButton onClick={() => router.push(ROUTES.limit)}>
        <Image
          src="/icons/menu/limit.png"
          alt="소비 제한"
          width={40}
          height={40}
        />
        <span className="text-sm">소비 제한</span>
      </VerticalActionButton>

      <VerticalActionButton onClick={() => router.push(ROUTES.quest)}>
        <Image
          src="/icons/menu/quest.png"
          alt="퀘스트"
          width={40}
          height={40}
        />
        <span className="text-sm">퀘스트</span>
      </VerticalActionButton>

      <VerticalActionButton onClick={() => router.push(ROUTES.aiReport)}>
        <Image
          src="/icons/menu/aiReport.png"
          alt="AI 분석 소비 리포트"
          width={40}
          height={40}
        />
        <span className="text-sm">AI 소비 분석</span>
      </VerticalActionButton>

      <VerticalActionButton onClick={() => router.push(ROUTES.setting)}>
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
