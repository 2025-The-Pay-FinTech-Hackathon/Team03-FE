"use client";
import Image from "next/image";
import React from "react";

const TitleHeader: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center h-14 px-4 border-b border-[#333333]/20">
      <Image src="/logo/logo.png" alt="logo" width={110} height={100} />
    </div>
  );
};

export default TitleHeader;
