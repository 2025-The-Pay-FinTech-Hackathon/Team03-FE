"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface DropdownProps {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = "선택하세요",
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          w-full
          p-4
          rounded-xl
          ${isOpen ? "border-2" : "border"}
          border-[#333333]
          bg-[#FFFFFF]
          text-base
          font-normal
          transition-all
          duration-100
          text-left
          focus:outline-none
          disabled:opacity-50
          disabled:cursor-not-allowed
          flex
          justify-between
          items-center
        `}
      >
        <span className={!selectedOption ? "text-gray-500" : ""}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`
          absolute
          z-10
          w-full
          mt-1
          bg-white
          border
          border-[#1E1E1E]
          rounded-xl
          shadow-lg
          overflow-hidden
          transition-all
          duration-200
          origin-top
          ${
            isOpen
              ? "opacity-100 scale-y-100 max-h-60"
              : "opacity-0 scale-y-0 max-h-0"
          }
        `}
      >
        {options.map((opt) => (
          <div
            key={opt.value}
            onClick={() => handleSelect(opt.value)}
            className={`
              p-4
              hover:bg-[#f7f8f8]
              cursor-pointer
              ${opt.value === value ? "bg-white font-medium" : ""}
            `}
          >
            {opt.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
