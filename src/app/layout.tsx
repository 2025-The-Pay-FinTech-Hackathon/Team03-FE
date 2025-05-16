"use client";

import "./globals.css";
import DynamicHeader from "@/components/Header/DynamicHeader";
import { initializeAuth } from "@/utils/auth";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getHeaderConfig } from "@/constants/headers";
import { QuestNotification } from "@/components/Notification/QuestNotification";
import { BlockedTransactionNotification } from "@/components/Notification/BlockedTransactionNotification";
import { AskApprovalNotification } from "@/components/Notification/AskApprovalNotification";
import { AskResultNotification } from "@/components/Notification/AskResultNotification";

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

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("accessToken") || ""
      : "";

  return (
    <html lang="ko">
      <head>
        <link rel="manifest" href="./manifest.webmanifest" />
        <title>용돈의 숲</title>
        <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-title" content="ClassLog" />
        <link
          rel="apple-touch-icon"
          href="/favicon/apple-icon.png"
          sizes="180x180"
        />
        <link
          rel="icon"
          type="image/png"
          href="/favicon/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
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
        <QuestNotification token={token} />
        <BlockedTransactionNotification token={token} />
        <AskApprovalNotification token={token} />
        <AskResultNotification token={token} />
      </body>
    </html>
  );
}
