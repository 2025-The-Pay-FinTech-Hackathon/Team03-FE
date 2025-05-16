"use client";

import React from "react";

interface TextButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  width?: "full" | "fit";
  variant?: "primary" | "secondary";
}

const TextButton: React.FC<TextButtonProps> = ({
  children,
  onClick,
  disabled = false,
  width = "full",
  variant = "primary",
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "secondary":
        return {
          border: "border border-[#333333]/20",
          hover: "hover:bg-[#DEE1E4]/20",
          active: "active:bg-[#DEE1E4]/50",
        };
      default:
        return {
          bg: "bg-[#FFEB00]",
          hover: "hover:bg-[#FFEB00]/90",
          active: "active:bg-[#FFEB00]/80",
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
        rounded-xl
        ${styles.bg}
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
        disabled:bg-[#DEE1E4]
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
