"use client";

import { useState } from "react";
import { FigmaFolderStarIcon } from "@/components/FigmaIcons";

export default function FolderIntroModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUnpacking, setIsUnpacking] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasDismissed, setHasDismissed] = useState(false);

  const handleOpenFolder = () => {
    if (isUnpacking) return;
    setIsUnpacking(true);

    // Fast simulated retro unzipping progress
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 15;
      if (currentProgress >= 100) {
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setIsOpen(true);
          setTimeout(() => setHasDismissed(true), 600);
        }, 300);
      } else {
        setProgress(currentProgress);
      }
    }, 50);
  };

  if (hasDismissed) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#FDF8F5]/90 backdrop-blur-md transition-all duration-700 ${
        isOpen ? "opacity-0 pointer-events-none scale-105" : "opacity-100 scale-100"
      }`}
    >
      {/* Background ambient glow */}
      <div className="absolute w-[450px] h-[450px] rounded-full bg-[#FFE25F]/35 blur-3xl -z-10 pointer-events-none"></div>

      {/* Retro Archive Window */}
      <div className="max-w-md w-full bg-white border-2 border-[#1C1B1A] rounded-2xl shadow-[0_20px_50px_rgba(28,27,26,0.18)] overflow-hidden">
        {/* Top Window Bar */}
        <div className="bg-[#A83200] text-white px-4 py-2 font-mono text-xs font-bold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>📁</span>
            <span>UNPACK_ARCHIVE.EXE</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px]">
            <span className="opacity-70">[ _ ]</span>
            <span className="opacity-70">[ 口 ]</span>
            <button
              onClick={() => {
                setIsOpen(true);
                setTimeout(() => setHasDismissed(true), 400);
              }}
              className="hover:text-yellow-300 font-bold"
            >
              [ X ]
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-8 text-center space-y-6">
          {/* Clickable Animated Folder */}
          <button
            type="button"
            onClick={handleOpenFolder}
            className="group relative mx-auto block p-5 rounded-3xl bg-[#FDF8F5] border-2 border-dashed border-[#D5CCC7] hover:border-[#A83200] transition transform hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
          >
            <div className="relative">
              <FigmaFolderStarIcon className="w-20 h-20 mx-auto transition transform group-hover:-translate-y-1" />
              <span className="absolute -top-1 -right-1 bg-[#FFE25F] text-[#756300] font-mono text-[9px] font-black px-2 py-0.5 rounded-full border border-[#D4B929] shadow-xs">
                .ZIP
              </span>
            </div>
            <p className="mt-3 font-mono font-bold text-xs text-[#1C1B1A]">
              InnoWeek_2025.zip
            </p>
            <p className="text-[10px] text-[#A83200] font-semibold">
              Project Initiative • USTHB
            </p>
          </button>

          {/* Description */}
          <div className="space-y-1.5">
            <h3 className="font-heading font-black text-xl text-[#1C1B1A]">
              Bienvenue à l&apos;INNO-WEEK
            </h3>
            <p className="text-xs text-[#5A4139] font-body max-w-xs mx-auto">
              Cliquez sur le dossier pour décompresser le programme et entrer dans la plateforme.
            </p>
          </div>

          {/* Unpack Button & Progress */}
          {isUnpacking ? (
            <div className="space-y-2 pt-1 font-mono">
              <div className="flex justify-between text-[11px] text-[#5A4139] font-bold">
                <span>Extraction des ateliers...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-[#ECE7E4] rounded-full h-2.5 overflow-hidden border border-[#D5CCC7]">
                <div
                  className="bg-[#A83200] h-full transition-all duration-150 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <button
              onClick={handleOpenFolder}
              className="w-full py-3.5 px-6 rounded-full bg-[#A83200] hover:bg-[#8C2900] text-white font-bold text-xs sm:text-sm font-mono tracking-wider transition transform hover:-translate-y-0.5 active:scale-95 shadow-md flex items-center justify-center gap-2"
            >
              <span>📂 DÉCOMPRESSER L&apos;ARCHIVE</span>
              <span>→</span>
            </button>
          )}

          {/* Skip link */}
          <div className="pt-1">
            <button
              onClick={() => {
                setIsOpen(true);
                setTimeout(() => setHasDismissed(true), 400);
              }}
              className="text-[11px] font-mono text-[#78716C] hover:text-[#A83200] hover:underline"
            >
              Passer l&apos;intro directement →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
