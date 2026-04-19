import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
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
      className={`${sourceSans.variable} font-sans h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f3f3f3] text-[#1c1b1b] selection:bg-[#1c1b1b] selection:text-[#f3f3f3]">
        {children}
        <ChatPanel />
      </body>
    </html>
  );
}
