import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_Thai } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { LanguageProvider } from "@/lib/i18n";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-noto-sans-thai",
  subsets: ["thai"],
});

export const metadata: Metadata = {
  title: "CuAtClub x CU First Date 2026 | ทุกชมรมในที่เดียว",
  description:
    "รวมทุกชมรมและบูธในงาน First Date 2026 พร้อมแผนที่ Interactive ที่ช่วยให้คุณค้นหา สำรวจ และเดินทางภายในงานได้ง่ายกว่าที่เคย",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${notoSansThai.variable} h-full antialiased`}
    >
      <body className="flex flex-col items-center min-h-full">
        <LanguageProvider>
          <ScrollToTop />
          <div className="w-full max-w-[768px] flex flex-col items-center">
            <Header />
            {children}
            <Navbar />
          </div>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
