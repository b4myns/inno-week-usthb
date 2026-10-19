"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { RollingNumber } from "@/components/RollingClockDigit";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownClock({
  targetDate = "2026-11-20T09:00:00",
}: {
  targetDate?: string;
}) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 5,
    hours: 14,
    minutes: 38,
    seconds: 30,
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const target = new Date(targetDate).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const pad = (n: number) => String(n).padStart(2, "0");

  const cards = [
    { label: "JOURS", value: pad(timeLeft.days), bg: "bg-[#FCDF5D]", text: "text-[#32303F]" },
    { label: "HEURES", value: pad(timeLeft.hours), bg: "bg-[#FFFFFF]", text: "text-[#F15A23]" },
    { label: "MINUTES", value: pad(timeLeft.minutes), bg: "bg-[#FFFFFF]", text: "text-[#32303F]" },
    { label: "SECONDES", value: pad(timeLeft.seconds), bg: "bg-[#FCDF5D]", text: "text-[#32303F]" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-3xl mx-auto space-y-6"
    >
      {/* 4 Tactile Rounded Cards with Glowing Separators */}
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        {cards.map((card, i) => (
          <div key={card.label} className="contents">
            {/* Card Container */}
            <div
              className={`flex-1 relative ${card.bg} rounded-2xl border-[1.5px] border-[#32303F] shadow-[4px_4px_0px_#32303F] p-4 sm:p-6 text-center overflow-hidden transition-transform hover:-translate-y-1`}
            >
              {/* Top Corner Decorative Vector Dot */}
              <span className="absolute top-2.5 left-2.5 w-1.5 h-1.5 rounded-full bg-[#32303F]/40"></span>
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-[#32303F]/40"></span>

              {/* Number with Rolling Digits Animation */}
              <div className="h-12 sm:h-16 flex items-center justify-center overflow-hidden">
                <RollingNumber value={card.value} textColor={card.text} />
              </div>

              {/* Bottom Label inside the Card */}
              <div className="font-heading font-bold text-[10px] sm:text-xs tracking-wider uppercase text-[#32303F] mt-2 select-none border-t border-[#32303F]/15 pt-2">
                {card.label}
              </div>
            </div>


            {/* Glowing Lightbulb Separator between Cards (except last) */}
            {i < cards.length - 1 && (
              <div className="flex flex-col items-center justify-center gap-1 shrink-0 px-0.5 sm:px-1">
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                  className="w-2.5 h-2.5 rounded-full bg-[#F15A23] border border-[#32303F]"
                />
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="w-2.5 h-2.5 rounded-full bg-[#FCDF5D] border border-[#32303F]"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Launch Track: Trajectoire de Décollage */}
      <div className="bg-white border-[1.5px] border-[#32303F] rounded-2xl p-4 shadow-swiss-sm">
        <div className="flex items-center justify-between text-xs font-heading font-bold text-[#32303F] mb-2 px-1">
          <span className="flex items-center gap-1.5 text-[#F15A23]">
            <span>🚀</span> Trajectoire de Décollage Inno-Week
          </span>
          <span className="bg-[#FCDF5D] px-2.5 py-0.5 rounded-full border border-[#32303F] text-[10px] tracking-wider uppercase">
            Décollage Imminent !
          </span>
        </div>

        {/* Dotted Track with Moving Animated Rocket */}
        <div className="relative w-full h-8 flex items-center">
          {/* Horizontal Track line */}
          <div className="w-full h-0 border-b-2 border-dashed border-[#32303F]/35"></div>

          {/* Animated Rocket Traveling along the track */}
          <motion.div
            animate={{ x: ["5%", "88%", "5%"] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 bg-[#32303F] text-white p-1 rounded-full border border-[#32303F] shadow-xs cursor-pointer"
          >
            <span className="inline-block transform -rotate-45 text-sm">🚀</span>
          </motion.div>

          {/* Goal Lightbulb Beacon at Right */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-7 h-7 rounded-full bg-[#FCDF5D] border border-[#32303F] shadow-xs">
            <span className="text-xs">💡</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

