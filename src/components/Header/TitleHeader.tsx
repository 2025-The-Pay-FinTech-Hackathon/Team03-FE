"use client";

import React from "react";

interface TitleHeaderProps {
  title: string;
}

const TitleHeader: React.FC<TitleHeaderProps> = ({ title }) => {
  return (
    <div className="relative flex items-center justify-center h-14 px-4 border-b border-[#3B1D1D]/10">
      <h1 className="text-lg font-semibold text-[#3B1D1D]">{title}</h1>
    </div>
  );
};

export default TitleHeader;
