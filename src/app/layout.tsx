import type { Metadata } from "next";
import { Space_Grotesk, Manrope } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

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
    <html
      lang="fr"
      className={`${spaceGrotesk.variable} ${manrope.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#FEF9F6] text-[#32303F] font-body antialiased selection:bg-[#FCDF5D] selection:text-[#32303F]">
        {children}
      </body>
    </html>
  );
}
