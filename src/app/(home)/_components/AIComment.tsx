"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { getAIComment } from "@/api/home/getAIComment";

export default function AIComment() {
  const [isVisible, setIsVisible] = useState(false);
  const [comment, setComment] = useState<string | null>(null);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const response = await getAIComment();
        if (response.isSuccess && response.result) {
          setComment(response.result);
          // 코멘트를 가져온 후 애니메이션 시작
          setTimeout(() => {
            setIsVisible(true);
          }, 100);
        }
      } catch (error) {
        console.error("AI 코멘트 조회 중 오류 발생:", error);
      }
    };

    fetchComment();
  }, []);

  if (!comment) return null;

  return (
    <div className="flex flex-col items-center justify-end relative py-4 px-12 overflow-y-auto">
      {/* AI 코멘트 말풍선 */}
      <div
        className={`
          bg-white/70 rounded-2xl p-4 mb-4 relative w-fit mx-auto
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
              {comment}
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
