"use client";

import { InputHTMLAttributes } from "react";

export default function Input({
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-primary disabled:bg-gray-100 ${className}`}
      {...props}
    />
  );
}
