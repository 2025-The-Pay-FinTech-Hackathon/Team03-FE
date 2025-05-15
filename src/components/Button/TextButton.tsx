"use client";

import React from "react";

interface TextButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  width?: "full" | "fit";
  variant?: "default" | "primary" | "secondary";
}

const TextButton: React.FC<TextButtonProps> = ({
  children,
  onClick,
  disabled = false,
  width = "full",
  variant = "default",
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return {
          bg: "bg-[#3B1D1D]",
          text: "text-[#FFFEFA]",
          hover: "hover:bg-[#3B1D1D]/90",
          active: "active:bg-[#3B1D1D]/80",
        };
      case "secondary":
        return {
          bg: "bg-[#FAF6F6]",
          text: "text-[#3B1D1D]",
          border: "border border-[#3B1D1D]",
          hover: "hover:bg-[#FAF6F6]/90",
          active: "active:bg-[#FAF6F6]/80",
        };
      default:
        return {
          bg: "bg-[#FFEB3B]",
          hover: "hover:bg-[#FFEB3B]/90",
          active: "active:bg-[#FFEB3B]/80",
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${width === "full" ? "w-full" : "w-fit"}
        py-4
        px-8
        rounded-lg
        ${styles.bg}
        ${styles.text || ""}
        ${styles.border || ""}
        font-semibold
        text-base
        transition-all
        duration-200
        ${
          !disabled &&
          `
          ${styles.hover}
          hover:scale-102
          hover:shadow-md
          ${styles.active}
          active:scale-98
          active:shadow-sm
          cursor-pointer
        `
        }
        disabled:bg-gray-200
        disabled:cursor-not-allowed
        disabled:transform-none
        disabled:shadow-none
      `}
    >
      {children}
    </button>
  );
};

export default TextButton;
