"use client";

import React from "react";

interface InputProps {
  type: "text" | "datetime-local" | "textarea";
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  type,
  value,
  onChange,
  placeholder = "",
  disabled = false,
}) => {
  const baseStyle = `
    w-full
    p-4
    rounded-xl
    border
    border-[#333333]
    bg-[#f7f8f8]
    text-base
    font-normal
    transition-all
    duration-100
    focus:outline-none
    focus:border-2
    disabled:opacity-50
    disabled:cursor-not-allowed
  `;

  return type === "textarea" ? (
    <textarea
      className={baseStyle}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      rows={4}
    />
  ) : (
    <input
      type={type}
      className={baseStyle}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
};

export default Input;
