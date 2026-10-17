"use client";

import { useEffect, useState } from "react";
import { FigmaFolderStarIcon } from "@/components/FigmaIcons";

export default function ClubIntroAnimation() {
  const [phase, setPhase] = useState<"opening" | "bursting" | "fading" | "done">("opening");

  const dismiss = () => setPhase("done");

  useEffect(() => {
    // 1. Folder opens (after 250ms)
    const t1 = setTimeout(() => {
      setPhase("bursting");
    }, 250);

    // 2. Bursting elements fly out (after 700ms)
    const t2 = setTimeout(() => {
      setPhase("fading");
    }, 700);

    // 3. Smooth unmount (after 1100ms)
    const t3 = setTimeout(() => {
      setPhase("done");
    }, 1150);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      onClick={dismiss}
      onTouchStart={dismiss}
      style={{
        animation: "introOverlayFade 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#FEF9F6] pointer-events-auto select-none cursor-pointer"
    >
      {/* Background ambient radial glow */}
      <div className="absolute w-[450px] h-[450px] rounded-full bg-[#FFE25F]/30 blur-3xl animate-pulse pointer-events-none"></div>


      {/* Center animation container */}
      <div className="relative flex flex-col items-center justify-center text-center">
        {/* Bursting Elements flying out of the folder representing Club VI */}
        <div className="relative flex items-center justify-center">
          {/* Central Folder Icon */}
          <div
            className={`transition-all duration-500 transform ${
              phase === "bursting" || phase === "fading" ? "scale-110 -rotate-3" : "scale-100"
            }`}
          >
            <FigmaFolderStarIcon className="w-24 h-24 sm:w-28 sm:h-28" />
          </div>

          {/* 1. Rocket (Startup Launch) flying top-right */}
          <div
            className={`absolute text-3xl sm:text-4xl transition-all duration-700 ease-out transform ${
              phase === "bursting" || phase === "fading"
                ? "translate-x-20 -translate-y-20 opacity-100 scale-110 rotate-12"
                : "translate-x-0 translate-y-0 opacity-0 scale-50"
            }`}
          >
            🚀
          </div>

          {/* 2. Lamp / Lightbulb (Innovation & Ideation) flying top-left */}
          <div
            className={`absolute text-3xl sm:text-4xl transition-all duration-700 ease-out transform ${
              phase === "bursting" || phase === "fading"
                ? "-translate-x-20 -translate-y-20 opacity-100 scale-110 -rotate-12"
                : "translate-x-0 translate-y-0 opacity-0 scale-50"
            }`}
          >
            💡
          </div>

          {/* 3. Initiative Arrow (Direction & Impact) flying bottom-right */}
          <div
            className={`absolute transition-all duration-700 ease-out transform ${
              phase === "bursting" || phase === "fading"
                ? "translate-x-24 translate-y-12 opacity-100 scale-100"
                : "translate-x-0 translate-y-0 opacity-0 scale-50"
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-[#A83200] text-white flex items-center justify-center font-black text-xl shadow-md rotate-[-45deg]">
              ➔
            </div>
          </div>

          {/* 4. Tech Spark / Lightning flying bottom-left */}
          <div
            className={`absolute text-3xl sm:text-4xl transition-all duration-700 ease-out transform ${
              phase === "bursting" || phase === "fading"
                ? "-translate-x-24 translate-y-12 opacity-100 scale-110 rotate-[-15deg]"
                : "translate-x-0 translate-y-0 opacity-0 scale-50"
            }`}
          >
            ⚡
          </div>
        </div>

        {/* Brand Label */}
        <div
          className={`mt-6 font-mono text-xs sm:text-sm transition-all duration-300 ${
            phase === "bursting" || phase === "fading" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          <span className="font-extrabold text-[#1C1B1A]">PROJECT INITIATIVE CLUB</span>
          <span className="text-[#A83200] font-bold"> // INNO-WEEK</span>
        </div>
      </div>
    </div>
  );
}
