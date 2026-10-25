"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const PHOTOS = [
  {
    src: "/community-pic.jpg",
    alt: "Communauté Project Initiative à l'Auditorium USTHB",
  },
  {
    src: "/community-2.jpg",
    alt: "Sessions de formations et ateliers pratiques Project Initiative",
  },
  {
    src: "/community-3.jpg",
    alt: "Équipe Project Initiative devant l'Auditorium de l'USTHB",
  },
  {
    src: "/community-4.jpg",
    alt: "Project Initiative au salon entrepreneurial et forum entreprises",
  },
];

export default function CommunityPhotoSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Automatic seamless swap every 3.8 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PHOTOS.length);
    }, 3800);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div
      className="space-y-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Framed Photo Frame (Clean Swiss rounded container) */}
      <div className="relative rounded-2xl overflow-hidden border-[1.5px] border-[#32303F] shadow-swiss bg-[#1C1917] select-none">
        {/* Aspect Ratio Box matching exact 1024x631 / 16:10 */}
        <div className="relative aspect-[1024/631] w-full overflow-hidden">
          <AnimatePresence mode="sync">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 0.85, ease: "easeInOut" },
                scale: { duration: 1.1, ease: "easeOut" },
              }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={PHOTOS[currentIndex].src}
                alt={PHOTOS[currentIndex].alt}
                fill
                priority={currentIndex === 0}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 600px"
              />
            </motion.div>
          </AnimatePresence>

          {/* Minimalist discreet progress indicators at bottom */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/15">
            {PHOTOS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentIndex(i)}
                aria-label={`Afficher la photo ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === currentIndex
                    ? "w-6 bg-[#F15A23]"
                    : "w-1.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Clean Legend & 4 Pillars below the photo */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-2 text-xs font-heading font-bold text-[#606060]">
          <span className="w-2 h-2 rounded-full bg-[#F15A23] animate-pulse"></span>
          <span>COMMUNAUTÉ PI • AUDITORIUM USTHB</span>
        </div>

        {/* 4 Pillars Pill Bar cleanly positioned below */}
        <div className="inline-flex items-center gap-1.5 bg-[#FFFFFF] border-[1.5px] border-[#32303F] rounded-full px-3 py-1 shadow-swiss-sm select-none">
          <span className="bg-[#FCDF5D] text-[#32303F] text-[10px] font-heading font-black px-2.5 py-0.5 rounded-full border border-[#32303F]">
            LEARN
          </span>
          <span className="bg-[#F2F2F2] text-[#32303F] text-[10px] font-heading font-black px-2.5 py-0.5 rounded-full border border-[#32303F]">
            CONNECT
          </span>
          <span className="bg-[#F15A23] text-white text-[10px] font-heading font-black px-2.5 py-0.5 rounded-full border border-[#32303F]">
            CREATE
          </span>
          <span className="bg-[#10459A] text-white text-[10px] font-heading font-black px-2.5 py-0.5 rounded-full border border-[#32303F]">
            GROW
          </span>
        </div>
      </div>
    </div>
  );
}
