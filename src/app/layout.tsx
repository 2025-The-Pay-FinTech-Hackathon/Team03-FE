"use client";

import "./globals.css";
import DynamicHeader from "@/components/Header/DynamicHeader";
import { initializeAuth } from "@/utils/auth";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    initializeAuth();
  }, []);

  return (
    <html lang="ko">
      <head>
        <title>Team03</title>
      </head>
      <body className="antialiased min-h-screen bg-white">
        <div className="mx-auto max-w-[600px] min-h-screen bg-[#f7f8f8] shadow-lg color-[#1E1E1E] h-full">
          <DynamicHeader />
          {children}
        </div>
      </body>
    </html>
  );
}
