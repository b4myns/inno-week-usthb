"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ClubIntroAnimation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isBurst, setIsBurst] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const dismiss = useCallback(() => {
    setIsFading(true);
    setTimeout(() => {
      setIsDismissed(true);
    }, 250);
  }, []);

  useEffect(() => {
    // Phase 1: Folder flap opens
    const tOpen = setTimeout(() => {
      setIsOpen(true);
    }, 250);

    // Phase 2: Icons & Document burst out
    const tBurst = setTimeout(() => {
      setIsBurst(true);
    }, 450);

    // Phase 3: Smooth fade-out starts
    const tFade = setTimeout(() => {
      setIsFading(true);
    }, 1750);

    // Phase 4: Complete unmount from DOM
    const tDismiss = setTimeout(() => {
      setIsDismissed(true);
    }, 2050);

    return () => {
      clearTimeout(tOpen);
      clearTimeout(tBurst);
      clearTimeout(tFade);
      clearTimeout(tDismiss);
    };
  }, []);

  if (isDismissed) return null;

  return (
    <div
      onClick={dismiss}
      onTouchStart={dismiss}
      style={{
        animation: "introOverlayFade 2.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      }}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FEF9F6] select-none cursor-pointer transition-opacity duration-300 ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
      }`}
    >
      {/* Background ambient radial glow */}
      <div className="absolute w-[360px] sm:w-[500px] h-[360px] sm:h-[500px] rounded-full bg-[#FCDF5D]/25 blur-3xl pointer-events-none"></div>

      {/* Top Bar Skip Pill */}
      <div className="absolute top-6 right-6 z-20">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            dismiss();
          }}
          className="bg-white/90 backdrop-blur-sm border-[1.5px] border-[#32303F] text-[#32303F] hover:bg-[#F2F2F2] text-xs font-mono font-bold px-3.5 py-1.5 rounded-full shadow-swiss-sm transition active:scale-95 flex items-center gap-1.5"
        >
          <span>Passer l&apos;intro</span>
          <span className="text-[#F15A23] font-black">×</span>
        </button>
      </div>

      {/* Main Animated Folder Stage */}
      <div className="relative flex flex-col items-center justify-center text-center px-4">
        {/* The 3D Folder Container */}
        <div className="relative w-44 h-32 sm:w-52 sm:h-36 perspective-[800px] mb-8">
          {/* 1. FOLDER BACK FLAP */}
          <div className="absolute inset-0 bg-[#D84A16] border-2 border-[#32303F] rounded-2xl shadow-swiss">
            {/* Top Tab on Left */}
            <div className="absolute -top-3 left-3 w-14 sm:w-16 h-3.5 bg-[#D84A16] border-t-2 border-l-2 border-r-2 border-[#32303F] rounded-t-lg flex items-center px-2">
              <span className="text-[7px] font-mono text-white/90 font-black tracking-wider">
                INNO-26
              </span>
            </div>
          </div>

          {/* 2. INTERNAL DOCUMENT (Slides Upwards when folder opens) */}
          <motion.div
            initial={{ y: 0, opacity: 0.8 }}
            animate={
              isBurst
                ? { y: -38, opacity: 1, scale: 1.04 }
                : isOpen
                ? { y: -18, opacity: 0.95 }
                : { y: 0, opacity: 0.8 }
            }
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            className="absolute inset-x-3.5 top-2 h-26 sm:h-28 bg-[#FFFFFF] border-2 border-[#32303F] rounded-xl p-3 shadow-swiss-sm z-10 flex flex-col justify-between"
          >
            {/* Document Header */}
            <div className="flex items-center justify-between border-b border-[#32303F]/20 pb-1">
              <span className="text-[9px] font-mono font-black text-[#F15A23] uppercase tracking-wide">
                Dossier // Bootcamp
              </span>
              <span className="w-2 h-2 rounded-full bg-[#FCDF5D] border border-[#32303F]"></span>
            </div>

            {/* Document Body */}
            <div className="text-left space-y-0.5">
              <div className="text-xs sm:text-sm font-black font-heading text-[#32303F] leading-tight">
                INNO-WEEK 2026
              </div>
              <div className="text-[8px] font-mono text-[#606060] font-semibold">
                ★ 5 JOURS • 5 ATELIERS
              </div>
            </div>

            {/* Progress Bars */}
            <div className="flex gap-1 pt-1">
              <div className="h-1 w-full bg-[#F15A23] rounded-full"></div>
              <div className="h-1 w-2/3 bg-[#FCDF5D] rounded-full"></div>
              <div className="h-1 w-1/3 bg-[#10459A] rounded-full"></div>
            </div>
          </motion.div>

          {/* 3. FOLDER FRONT FLAP (Swings open downwards in 3D) */}
          <motion.div
            initial={{ rotateX: 0 }}
            animate={
              isOpen
                ? { rotateX: -115, opacity: 0.9 }
                : { rotateX: 0, opacity: 1 }
            }
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{
              transformOrigin: "bottom center",
              transformStyle: "preserve-3d",
            }}
            className="absolute inset-0 bg-[#F15A23] border-2 border-[#32303F] rounded-2xl z-20 flex flex-col justify-between p-3 sm:p-3.5 shadow-swiss"
          >
            {/* Top row */}
            <div className="flex justify-between items-center text-white">
              <span className="text-[9px] font-mono font-black tracking-wider">
                PIC • USTHB
              </span>
              <span className="text-xs font-mono font-bold text-[#FCDF5D]">★</span>
            </div>

            {/* Center icon badge */}
            <div className="flex items-center justify-center">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/20 border border-white/40 flex items-center justify-center text-lg shadow-inner">
                💡
              </div>
            </div>

            {/* Bottom tag */}
            <div className="flex justify-between items-center text-[8px] font-mono text-white/90 font-bold">
              <span>BAB EZZOUAR</span>
              <span className="bg-[#32303F] text-[#FCDF5D] px-1.5 py-0.5 rounded text-[7px]">
                OFFICIEL
              </span>
            </div>
          </motion.div>

          {/* 4. BURSTING BRAND EMBLEMS (Fly out in all directions) */}
          {/* Rocket 🚀 (Top Right) */}
          <motion.div
            initial={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
            animate={
              isBurst
                ? { x: 75, y: -65, opacity: 1, scale: 1.15, rotate: 18 }
                : { x: 0, y: 0, opacity: 0, scale: 0.4 }
            }
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
            className="absolute top-2 right-2 z-30 text-2xl sm:text-3xl pointer-events-none filter drop-shadow-md"
          >
            🚀
          </motion.div>

          {/* Glowing Lamp 💡 (Top Left) */}
          <motion.div
            initial={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
            animate={
              isBurst
                ? { x: -75, y: -65, opacity: 1, scale: 1.15, rotate: -18 }
                : { x: 0, y: 0, opacity: 0, scale: 0.4 }
            }
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
            className="absolute top-2 left-2 z-30 text-2xl sm:text-3xl pointer-events-none filter drop-shadow-md"
          >
            ✨
          </motion.div>

          {/* Initiative Arrow ➔ (Bottom Right) */}
          <motion.div
            initial={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
            animate={
              isBurst
                ? { x: 80, y: 35, opacity: 1, scale: 1 }
                : { x: 0, y: 0, opacity: 0, scale: 0.4 }
            }
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
            className="absolute bottom-2 right-2 z-30 pointer-events-none"
          >
            <div className="w-8 h-8 rounded-full bg-[#10459A] text-white border border-[#32303F] flex items-center justify-center font-black text-sm shadow-swiss-sm rotate-[-40deg]">
              ➔
            </div>
          </motion.div>

          {/* Lightning Spark ⚡ (Bottom Left) */}
          <motion.div
            initial={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
            animate={
              isBurst
                ? { x: -80, y: 35, opacity: 1, scale: 1.15, rotate: -12 }
                : { x: 0, y: 0, opacity: 0, scale: 0.4 }
            }
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
            className="absolute bottom-2 left-2 z-30 text-2xl sm:text-3xl pointer-events-none filter drop-shadow-md"
          >
            ⚡
          </motion.div>
        </div>

        {/* Text Title & Club VI Identity */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="space-y-1.5"
        >
          <div className="inline-flex items-center gap-2 bg-[#FCDF5D] border-[1.5px] border-[#32303F] px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono font-black text-[#32303F] shadow-swiss-sm">
            <span className="w-2 h-2 rounded-full bg-[#F15A23] animate-pulse"></span>
            <span>PROJECT INITIATIVE CLUB • USTHB</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black font-heading tracking-tight text-[#32303F]">
            Ouverture du dossier Inno-Week
          </h2>

          <p className="text-[11px] font-mono text-[#606060]">
            Touchez l&apos;écran pour accéder directement
          </p>
        </motion.div>
      </div>
    </div>
  );
}
