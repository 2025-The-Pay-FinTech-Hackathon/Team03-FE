"use client";

import React from "react";

interface TitleHeaderProps {
  title: string;
}

const TitleHeader: React.FC<TitleHeaderProps> = ({ title }) => {
  return (
    <div className="relative flex items-center justify-center h-14 px-4 border-b border-[#333333]/20">
      <h1 className="text-lg font-semibold ">{title}</h1>
    </div>
  );
};

export default TitleHeader;
