"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

export default function MetricsCards() {
  const [countStudents, setCountStudents] = useState(0);
  const [countEvents, setCountEvents] = useState(0);
  const [typedUsthb, setTypedUsthb] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Robust mobile & desktop in-view detection
  const inView = useInView(containerRef, {
    once: true,
    amount: 0.05,
  });

  // Trigger on in-view OR fallback after 1.5s
  useEffect(() => {
    if (inView && !hasStarted) {
      setHasStarted(true);
    }
  }, [inView, hasStarted]);

  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      setHasStarted(true);
    }, 2000);
    return () => clearTimeout(fallbackTimer);
  }, []);

  // 1. Hardware-accelerated smooth counter (0 -> 200, 0 -> 15) using requestAnimationFrame
  useEffect(() => {
    if (!hasStarted) return;

    let startTimestamp: number | null = null;
    const duration = 1600; // 1.6s

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      // Smooth ease-out cubic
      const ease = 1 - Math.pow(1 - progress, 3);

      setCountStudents(Math.floor(ease * 200));
      setCountEvents(Math.floor(ease * 15));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCountStudents(200);
        setCountEvents(15);
      }
    };

    const animId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animId);
  }, [hasStarted]);

  // 2. Typewriter animation for "USTHB"
  useEffect(() => {
    if (!hasStarted) return;

    const targetWord = "USTHB";
    let index = 0;

    // Small initial delay so numbers start first
    const delayTimer = setTimeout(() => {
      const typeInterval = setInterval(() => {
        index++;
        setTypedUsthb(targetWord.slice(0, index));
        if (index >= targetWord.length) {
          clearInterval(typeInterval);
        }
      }, 180);

      return () => clearInterval(typeInterval);
    }, 250);

    return () => clearTimeout(delayTimer);
  }, [hasStarted]);

  return (
    <div ref={containerRef} className="space-y-3 pt-2">
      <div className="grid grid-cols-3 gap-3">
        {/* Card 1: +200 ÉTUDIANTS FORMÉS */}
        <div className="bg-[#FFFFFF] border-[1.5px] border-[#32303F] p-3 sm:p-4 rounded-xl text-center shadow-swiss-sm transition-transform hover:-translate-y-1">
          <div className="text-xl sm:text-3xl font-black text-[#F15A23] font-heading tabular-nums leading-none mb-1">
            +{countStudents}
          </div>
          <div className="text-[10px] sm:text-xs font-heading uppercase text-[#606060] font-bold leading-tight">
            Étudiants Formés
          </div>
        </div>

        {/* Card 2: +15 ÉVÉNEMENTS & HACKS */}
        <div className="bg-[#FFFFFF] border-[1.5px] border-[#32303F] p-3 sm:p-4 rounded-xl text-center shadow-swiss-sm transition-transform hover:-translate-y-1">
          <div className="text-xl sm:text-3xl font-black text-[#32303F] font-heading tabular-nums leading-none mb-1">
            +{countEvents}
          </div>
          <div className="text-[10px] sm:text-xs font-heading uppercase text-[#606060] font-bold leading-tight">
            Événements &amp; Hacks
          </div>
        </div>

        {/* Card 3: USTHB with Typewriter typing animation */}
        <div className="bg-[#FFFFFF] border-[1.5px] border-[#32303F] p-3 sm:p-4 rounded-xl text-center shadow-swiss-sm transition-transform hover:-translate-y-1">
          <div className="text-lg sm:text-2xl font-black text-[#10459A] font-heading min-h-[1.75rem] sm:min-h-[2rem] flex items-center justify-center leading-none mb-1">
            <span>{typedUsthb}</span>
            <span
              className={`w-1 sm:w-1.5 h-4 sm:h-5 bg-[#10459A] ml-0.5 ${
                typedUsthb.length < 5 ? "animate-pulse" : "opacity-0"
              }`}
            ></span>
          </div>
          <div className="text-[10px] sm:text-xs font-heading uppercase text-[#606060] font-bold leading-tight">
            Bab Ezzouar
          </div>
        </div>
      </div>

      {/* Retro initiative tag link */}
      <div className="flex items-center gap-2 text-xs font-heading font-bold text-[#F15A23] pt-1">
        <span>➔</span>
        <span className="tracking-wide uppercase text-[11px] sm:text-xs">
          ESPACE COLLABORATIF ÉTUDIANT // PIC USTHB
        </span>
      </div>
    </div>
  );
}
