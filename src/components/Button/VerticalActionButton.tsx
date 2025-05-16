import React from "react";

interface VerticalActionButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

const VerticalActionButton: React.FC<VerticalActionButtonProps> = ({
  children,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-fit
        p-2
        flex
        flex-col
        items-center
        justify-center
        rounded-full
        font-semibold
        text-base
        transition-all
        duration-200
        ${
          !disabled &&
          `
          hover:scale-102
          hover:bg-[#333333]/10
          active:scale-98
          cursor-pointer
        `
        }
        disabled:cursor-not-allowed
        disabled:transform-none
        disabled:shadow-none
      `}
    >
      {children}
    </button>
  );
};

export default VerticalActionButton;
