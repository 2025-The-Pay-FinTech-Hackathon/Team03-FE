import type { Metadata } from "next";
import "./globals.css";

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
          {children}
        </div>
      </body>
    </html>
  );
}
