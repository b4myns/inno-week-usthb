"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
/* ====================================================================
   1. DUAL BRAND LOGOS
   Left: Official Project Initiative Club logo (orange bulb + royal blue rocket)
   Right: Official INNOWEEK logo (orange bold text + radiant lightbulb)
   ==================================================================== */
export function DualBrandLogos({
  className = "",
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const picHeight = size === "lg" ? "h-11 sm:h-12" : size === "sm" ? "h-7" : "h-9";
  const innoHeight = size === "lg" ? "h-10 sm:h-11" : size === "sm" ? "h-6 sm:h-7" : "h-8";

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* PI Club Logo */}
      <Link href="/" className="flex items-center group">
        <div className={`relative ${picHeight} w-auto flex items-center justify-center transition-transform group-hover:scale-105`}>
          <Image
            src="/logo-pic-tight.png"
            alt="Project Initiative"
            width={160}
            height={60}
            className={`${picHeight} w-auto object-contain`}
            priority
          />
        </div>
      </Link>

      {/* Vertical Swiss Divider */}
      <span className="h-6 w-[1.5px] bg-[#32303F]/25 mx-1 hidden sm:block"></span>

      {/* Inno-Week Event Logo */}
      <Link href="/" className="hidden sm:flex items-center gap-2 group">
        <div className={`relative ${innoHeight} w-auto flex items-center justify-center transition-transform group-hover:scale-105`}>
          <Image
            src="/logo-innoweek-tight.png"
            alt="INNOWEEK USTHB"
            width={140}
            height={50}
            className={`${innoHeight} w-auto object-contain`}
            priority
          />
        </div>
        <span className="bg-[#FCDF5D] text-[#32303F] text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full border border-[#32303F] shadow-xs">
          2026
        </span>
      </Link>
    </div>
  );
}


/* ====================================================================
   2. OS WINDOW CARD
   Rounded 20px, 1.5px solid #32303F border, shadow-[4px_4px_0px_#32303F]
   Orange #F15A23 top bar (h-10 px-4) with geometric [_] [□] [X]
   Micro-interaction: hover lift expanding to shadow-[6px_6px_0px_#32303F]
   ==================================================================== */
export function OSWindowCard({
  title,
  children,
  className = "",
  headerAction,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
  headerAction?: React.ReactNode;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`rounded-[20px] bg-[#FFFFFF] border-[1.5px] border-[#32303F] shadow-[4px_4px_0px_#32303F] hover:shadow-[6px_6px_0px_#32303F] overflow-hidden transition-shadow ${className}`}
    >
      {/* Top Bar in Brand Orange #F15A23 */}
      <div className="h-10 px-4 bg-[#F15A23] border-b-[1.5px] border-[#32303F] flex items-center justify-between select-none">
        <div className="flex items-center gap-2 truncate">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FCDF5D] border border-[#32303F]"></span>
          <span className="font-heading font-bold text-xs sm:text-sm text-white tracking-wide uppercase truncate">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {headerAction}
          <div className="flex items-center gap-1.5 text-white/90 font-mono text-[11px] font-bold">
            <span className="hover:text-[#FCDF5D] cursor-pointer">[_]</span>
            <span className="hover:text-[#FCDF5D] cursor-pointer">[□]</span>
            <span className="hover:text-[#FCDF5D] cursor-pointer">[✕]</span>
          </div>
        </div>
      </div>

      {/* Window Body */}
      <div className="p-6 sm:p-8">{children}</div>
    </motion.div>
  );
}

/* ====================================================================
   3. VECTOR SELECTION BOX
   2px solid #F15A23 frame with 8 #FCDF5D circular handle dots
   ==================================================================== */
export function VectorSelectionBox({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative border-2 border-[#F15A23] ${className}`}>
      {/* 8 Yellow Circular Handle Dots: corners + midpoints */}
      <span className="absolute -top-1.5 -left-1.5 w-3 h-3 rounded-full bg-[#FCDF5D] border border-[#32303F]"></span>
      <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#FCDF5D] border border-[#32303F]"></span>
      <span className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full bg-[#FCDF5D] border border-[#32303F]"></span>
      <span className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-3 rounded-full bg-[#FCDF5D] border border-[#32303F]"></span>
      <span className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 rounded-full bg-[#FCDF5D] border border-[#32303F]"></span>
      <span className="absolute -bottom-1.5 -left-1.5 w-3 h-3 rounded-full bg-[#FCDF5D] border border-[#32303F]"></span>
      <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#FCDF5D] border border-[#32303F]"></span>
      <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 rounded-full bg-[#FCDF5D] border border-[#32303F]"></span>

      {children}
    </div>
  );
}

/* ====================================================================
   4. DASHED HERO BOX
   2px dashed #32303F selection frame with 4 solid square corner nodes
   ==================================================================== */
export function DashedHeroBox({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative border-2 border-dashed border-[#32303F] bg-[#FFFFFF]/70 backdrop-blur-xs rounded-2xl p-6 sm:p-10 ${className}`}>
      {/* 4 Square Corner Nodes */}
      <span className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-[#32303F]"></span>
      <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-[#32303F]"></span>
      <span className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-[#32303F]"></span>
      <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-[#32303F]"></span>

      {children}
    </div>
  );
}

/* ====================================================================
   5. ANIMATED DECORATIVE CLUB SHAPES (Rocket, Glowing Lamp, Folder, Arrow)
   ==================================================================== */

// A. Rocket Graphic with floating loop & dotted path
export function RocketGraphic({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      className={`relative inline-block ${className}`}
    >
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-sm">
        {/* Dotted Trajectory Trail */}
        <path
          d="M12 52C22 48 30 38 34 26"
          stroke="#F15A23"
          strokeWidth="2"
          strokeDasharray="3 3"
        />
        {/* Rocket Body */}
        <path
          d="M48 16C40 18 32 26 28 36L38 46C48 42 56 34 58 26L48 16Z"
          fill="#FFFFFF"
          stroke="#32303F"
          strokeWidth="2.5"
        />
        {/* Rocket Nose Tip in Royal Blue */}
        <path
          d="M58 26C58 20 54 16 48 16C50 22 54 26 58 26Z"
          fill="#10459A"
          stroke="#32303F"
          strokeWidth="2"
        />
        {/* Porthole Window */}
        <circle cx="42" cy="28" r="4" fill="#FCDF5D" stroke="#32303F" strokeWidth="2" />
        {/* Wings in Brand Orange */}
        <path d="M28 36L20 38L26 44L28 36Z" fill="#F15A23" stroke="#32303F" strokeWidth="2" />
        <path d="M38 46L40 54L46 48L38 46Z" fill="#F15A23" stroke="#32303F" strokeWidth="2" />
        {/* Thrust Flame */}
        <path d="M28 46L22 52L26 44L28 46Z" fill="#FCDF5D" />
      </svg>
    </motion.div>
  );
}

// B. Glowing Lamp / Lightbulb Graphic with pulsing rays
export function GlowingLampGraphic({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <div className={`relative inline-block ${className}`}>
      {/* Pulsing light rays */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 -m-2 rounded-full bg-[#FCDF5D]/30 blur-xs -z-10"
      />
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        {/* Light Rays */}
        <line x1="24" y1="4" x2="24" y2="8" stroke="#F15A23" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="10" y1="10" x2="13" y2="13" stroke="#F15A23" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="38" y1="10" x2="35" y2="13" stroke="#F15A23" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="4" y1="24" x2="8" y2="24" stroke="#F15A23" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="44" y1="24" x2="40" y2="24" stroke="#F15A23" strokeWidth="2.5" strokeLinecap="round" />
        {/* Bulb Body */}
        <path
          d="M24 10C16.8 10 12 15.5 12 22C12 26.5 15 30 17 33H31C33 30 36 26.5 36 22C36 15.5 31.2 10 24 10Z"
          fill="#FCDF5D"
          stroke="#32303F"
          strokeWidth="2.5"
        />
        {/* Filament */}
        <path d="M20 22C20 18 28 18 28 22" stroke="#F15A23" strokeWidth="2" strokeLinecap="round" />
        {/* Screw Base */}
        <rect x="18" y="34" width="12" height="3" rx="1.5" fill="#FFFFFF" stroke="#32303F" strokeWidth="2" />
        <rect x="19" y="38" width="10" height="3" rx="1.5" fill="#FFFFFF" stroke="#32303F" strokeWidth="2" />
        <path d="M21 42H27L25 44H23L21 42Z" fill="#32303F" />
      </svg>
    </div>
  );
}

// C. Folder Badge with Retro Cursor Pointer Click & Opening Interaction
export function FolderBadge({
  title,
  subtitle,
  tag,
  rotate = 0,
}: {
  title: string;
  subtitle: string;
  tag?: string;
  rotate?: number;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setIsOpen(true)}
      onHoverEnd={() => setIsOpen(false)}
      onClick={() => setIsOpen((prev) => !prev)}
      whileHover={{ scale: 1.05, rotate: 0 }}
      whileTap={{ scale: 0.96 }}
      animate={{ rotate }}
      transition={{ duration: 0.2 }}
      className="relative bg-white border-[1.5px] border-[#32303F] rounded-2xl p-3 shadow-swiss flex items-center gap-3 select-none cursor-pointer group"
    >
      {/* Orange Folder Icon with animated document peek */}
      <div className="relative w-10 h-10 rounded-xl bg-[#F15A23]/10 border border-[#F15A23]/30 flex items-center justify-center shrink-0">
        {/* Document sliding up when folder is opened */}
        <motion.div
          animate={isOpen ? { y: -8, opacity: 1, scale: 1.05 } : { y: 0, opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 350, damping: 20 }}
          className="absolute -top-1 w-5 h-4 bg-white border border-[#32303F] rounded-[3px] shadow-2xs z-10 flex flex-col justify-center items-center pointer-events-none"
        >
          <div className="w-3 h-0.5 bg-[#F15A23] rounded-full mb-0.5"></div>
          <div className="w-2 h-0.5 bg-[#FCDF5D] rounded-full"></div>
        </motion.div>

        {/* Folder Base */}
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 z-20">
          <path
            d="M3 6C3 4.895 3.895 4 5 4H10L12 6H19C20.105 6 21 6.895 21 8V18C21 19.105 20.105 20 19 20H5C3.895 20 3 19.105 3 18V6Z"
            fill="#F15A23"
          />
          <path d="M12 11L14.5 13.5L18 9" stroke="#FCDF5D" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      <div className="text-left font-body">
        <p className="font-heading font-bold text-xs text-[#32303F] leading-tight">{title}</p>
        <p className="text-[10px] text-[#606060] font-medium leading-tight mt-0.5">{subtitle}</p>
        {tag && (
          <span className="inline-block mt-1 bg-[#FCDF5D] text-[#32303F] text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border border-[#32303F]">
            {tag}
          </span>
        )}
      </div>

      {/* Retro Clicking Cursor Pointer */}
      <motion.div
        animate={{ x: [0, -3, 0], y: [0, -3, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-2 -right-2 w-5 h-5 pointer-events-none"
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full drop-shadow-sm">
          <path
            d="M5 3L19 12L12 14L8 21L5 3Z"
            fill="#32303F"
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}

// D. Directional Vector Arrow
export function DirectionalArrow({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M5 12H19M19 12L13 6M19 12L13 18"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
