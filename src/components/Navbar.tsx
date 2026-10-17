"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full max-w-6xl mx-auto pt-4 px-4 sm:px-6">
      <nav className="bg-[#F5EFE6] border border-[#E2D7C5] rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-xs">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="bg-[#B83A0A] text-white text-xs font-black tracking-wider px-2 py-1 rounded-sm shadow-xs">
              PIC
            </span>
            <span className="font-extrabold text-sm sm:text-base tracking-tight text-[#1C1917]">
              INNO-WEEK
            </span>
          </Link>
          <span className="hidden sm:inline-block text-[11px] font-mono uppercase bg-[#ECE4D5] text-[#78716C] px-2 py-0.5 rounded-full border border-[#DED3BF]">
            CENTRE BAB EZZOUAR
          </span>
        </div>

        {/* Right: Navigation Links */}
        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/"
            className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#E5DDCF] text-[#1C1917] transition hover:bg-[#DCD2C2]"
          >
            Inno-Week
          </Link>
          <a
            href="#about"
            className="text-xs font-medium px-3 py-1.5 rounded-full text-[#57534E] hover:text-[#1C1917] hover:bg-[#ECE4D5] transition"
          >
            Qui sommes-nous
          </a>
          <a
            href="#ateliers"
            className="text-xs font-medium px-3 py-1.5 rounded-full text-[#57534E] hover:text-[#1C1917] hover:bg-[#ECE4D5] transition"
          >
            Ateliers
          </a>
        </div>
      </nav>
    </header>
  );
}
