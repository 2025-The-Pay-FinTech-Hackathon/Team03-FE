"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function AIComment() {
  const [isVisible, setIsVisible] = useState(false);

  // 데모 코멘트
  const aiComment =
    "오늘도 열심히 절약하고 계시네요! 🌟\n현재 진행 중인 퀘스트를 완료하면 5,000원을 더 모을 수 있어요.";

  useEffect(() => {
    // 컴포넌트 마운트 후 약간의 딜레이를 주고 애니메이션 시작
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-end relative p-4">
      {/* AI 코멘트 말풍선 */}
      <div
        className={`
          bg-white rounded-2xl p-4 mb-4 relative w-full mx-auto
          transition-all duration-700 ease-out
          ${
            isVisible
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform translate-y-4"
          }
        `}
      >
        {/* 말풍선 꼬리 */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
          <div className="w-4 h-4 bg-white rotate-45 transform origin-center"></div>
        </div>

        <div className="flex items-start gap-2">
          <div className="flex-1">
            <p className="text-gray-800 leading-relaxed whitespace-pre-line">
              {aiComment}
            </p>
          </div>
        </div>
      </div>

      {/* 토끼 캐릭터 */}
      <div
        className={`
          relative
          transition-all duration-700 delay-300 ease-out
          ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}
        `}
      >
        <Image
          src="/character/rabbit-front.png"
          alt="AI 캐릭터"
          width={200}
          height={120}
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}
