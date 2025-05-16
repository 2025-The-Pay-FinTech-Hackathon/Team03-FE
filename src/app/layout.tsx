"use client";

import "./globals.css";
import DynamicHeader from "@/components/Header/DynamicHeader";
import { initializeAuth } from "@/utils/auth";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getHeaderConfig } from "@/constants/headers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const headerConfig = getHeaderConfig(pathname);
  const hasHeader = headerConfig.type !== "none";

  useEffect(() => {
    initializeAuth();
  }, []);

  return (
    <html lang="ko">
      <head>
        <title>Team03</title>
      </head>
      <body className="antialiased min-h-screen bg-white overflow-hidden">
        <div className="mx-auto max-w-[600px] min-h-screen bg-[#f7f8f8] shadow-lg color-[#1E1E1E] h-full relative">
          {hasHeader && (
            <div className="sticky top-0 left-0 right-0 z-10 bg-[#f7f8f8]">
              <DynamicHeader />
            </div>
          )}
          <div
            className={`${
              hasHeader ? "h-[calc(100vh-3.5rem)]" : "h-screen"
            } overflow-auto`}
          >
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
