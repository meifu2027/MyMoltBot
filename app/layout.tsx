import type { Metadata } from "next";
import "./globals.css";
import BottomNavigation from "@/components/common/BottomNavigation";
import Player from "@/components/player/Player";

export const metadata: Metadata = {
  title: "Apple Music 风格音乐播放器",
  description: "基于 iOS 26 液态玻璃设计的 H5 音乐播放器",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
        <BottomNavigation />
        <Player />
      </body>
    </html>
  );
}
