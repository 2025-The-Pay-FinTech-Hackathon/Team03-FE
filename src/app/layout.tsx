import type { Metadata } from "next";
import "./globals.css";
import DynamicHeader from "@/components/Header/DynamicHeader";

export const metadata: Metadata = {
  title: "Team03",
  description: "더 Pay언한 해커톤",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased min-h-screen bg-white">
        <div className="mx-auto max-w-[600px] min-h-screen bg-[#FFFEFA] shadow-lg">
          <DynamicHeader />
          {children}
        </div>
      </body>
    </html>
  );
}
