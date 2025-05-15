import React from "react";

interface TextButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  width?: "full" | "fit";
}

const TextButton: React.FC<TextButtonProps> = ({
  children,
  onClick,
  disabled = false,
  width = "full",
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${width === "full" ? "w-full" : "w-fit"}
        p-4
        rounded-lg
        bg-[#FFEB3B]
        font-semibold
        text-base
        transition-all
        duration-200
        ${
          !disabled &&
          `
          hover:bg-[#FFEB3B]/90
          hover:scale-102
          hover:shadow-md
          active:bg-[#FFEB3B]/80
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
