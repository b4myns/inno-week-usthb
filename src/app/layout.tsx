import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "INNO-WEEK 2026 • USTHB | Project Initiative Club",
  description: "Bootcamp d'innovation technologique et entrepreneuriat à l'USTHB organisé par le Project Initiative Club.",
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
