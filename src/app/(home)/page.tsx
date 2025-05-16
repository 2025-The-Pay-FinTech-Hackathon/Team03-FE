"use client";

import Image from "next/image";
import MenuList from "./_components/MenuList";
import HomeInfo from "./_components/HomeInfo";
import AIComment from "./_components/AIComment";

export default function HomePage() {
  return (
    <div className="w-full h-full flex flex-col relative">
      {/* 배경 이미지 */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/background/background.png"
          alt="배경"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* 컨텐츠 */}
      <div className="relative w-full h-full flex flex-col">
        {/* 상단 컨텐츠 */}
        <div className="p-4 overflow-y-auto">
          <div className="flex flex-col gap-4">
            <MenuList />
            <HomeInfo />
          </div>
        </div>
      </div>
      {/* 하단 고정 AI 코멘트 */}
      <div className="flex-1 w-full">
        <AIComment />
      </div>
    </div>
  );
}
