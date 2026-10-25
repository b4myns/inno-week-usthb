import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "INNO-WEEK 2026 • USTHB | Project Initiative",
  description: "Série de formations pratiques et entrepreneuriat à l'USTHB organisée par Project Initiative.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="min-h-screen bg-[#FEF9F6] text-[#32303F] font-body antialiased selection:bg-[#FCDF5D] selection:text-[#32303F]">
        {children}
      </body>
    </html>
  );
}
