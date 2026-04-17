import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NEXARA Motors — Beyond the Drive",
  description:
    "Discover NEXARA's lineup of intelligent, sustainable vehicles. From city hatchbacks to flagship sedans — explore models, compare specs, and book a test drive with our AI-powered assistant.",
  keywords: [
    "NEXARA Motors",
    "cars",
    "electric vehicles",
    "SUV",
    "sedan",
    "test drive",
    "AI assistant",
  ],
  openGraph: {
    title: "NEXARA Motors — Beyond the Drive",
    description:
      "Intelligent, sustainable vehicles for the global market. Explore the full NEXARA lineup.",
    type: "website",
  },
};

import ChatPanel from "@/components/ui/ChatPanel";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <ChatPanel />
      </body>
    </html>
  );
}
