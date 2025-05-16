"use client";

import React from "react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import VerticalActionButton from "../Button/VerticalActionButton";

interface BackWithTitleHeaderProps {
  title: string;
  onBackClick?: () => void;
}

const BackWithTitleHeader: React.FC<BackWithTitleHeaderProps> = ({
  title,
  onBackClick,
}) => {
  const router = useRouter();

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      router.back();
    }
  };

  return (
    <div className="relative flex items-center justify-center h-14 px-4 border-b border-[#333333]/20">
      <div className="absolute left-2">
        <VerticalActionButton onClick={handleBackClick}>
          <ChevronLeft className="w-6 h-6 " />
        </VerticalActionButton>
      </div>

      <h1 className="text-lg font-semibold ">{title}</h1>
    </div>
  );
};

export default BackWithTitleHeader;
