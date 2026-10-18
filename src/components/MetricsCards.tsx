"use client";

import { useEffect, useState, useCallback, useRef } from "react";

export default function MetricsCards() {
  const [countStudents, setCountStudents] = useState(0);
  const [countEvents, setCountEvents] = useState(0);
  const [typedUsthb, setTypedUsthb] = useState("");
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const hasTriggeredRef = useRef(false);

  const startAnimation = useCallback(() => {
    // Prevent overlapping runs
    setIsAnimating(true);
    setCountStudents(0);
    setCountEvents(0);
    setTypedUsthb("");
    setIsTypingDone(false);

    // 1. Counting Animation (0 -> 200 & 0 -> 15) using requestAnimationFrame
    const startTime = performance.now();
    const duration = 1200; // 1.2s

    const animateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Cubic ease-out
      const ease = 1 - Math.pow(1 - progress, 3);

      setCountStudents(Math.floor(ease * 200));
      setCountEvents(Math.floor(ease * 15));

      if (progress < 1) {
        window.requestAnimationFrame(animateCount);
      } else {
        setCountStudents(200);
        setCountEvents(15);
      }
    };
    window.requestAnimationFrame(animateCount);

    // 2. Typing Animation for "USTHB"
    const targetWord = "USTHB";
    let index = 0;
    const typingTimer = setTimeout(() => {
      const typeInterval = setInterval(() => {
        index++;
        setTypedUsthb(targetWord.slice(0, index));
        if (index >= targetWord.length) {
          clearInterval(typeInterval);
          setIsTypingDone(true);
          setIsAnimating(false);
        }
      }, 140);
    }, 150);

    return () => clearTimeout(typingTimer);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Check if element is currently visible in viewport
    const checkIfInView = () => {
      if (hasTriggeredRef.current) return;
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight - 30 && rect.bottom > 30;
      if (inView) {
        hasTriggeredRef.current = true;
        startAnimation();
        // Remove scroll listener once triggered
        window.removeEventListener("scroll", checkIfInView);
      }
    };

    // 1. Immediate check (in case user reloaded directly on section 02)
    checkIfInView();

    // 2. IntersectionObserver (modern standard)
    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasTriggeredRef.current) {
              hasTriggeredRef.current = true;
              startAnimation();
              if (observer) observer.disconnect();
              window.removeEventListener("scroll", checkIfInView);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px 50px 0px" }
      );
      observer.observe(el);
    }

    // 3. Native scroll listener fallback for mobile WebKit quirks
    window.addEventListener("scroll", checkIfInView, { passive: true });

    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener("scroll", checkIfInView);
    };
  }, [startAnimation]);

  return (
    <div
      ref={containerRef}
      onClick={() => {
        hasTriggeredRef.current = true;
        startAnimation();
      }}
      className="space-y-3 pt-2 select-none cursor-pointer group"
      title="Touchez pour rejouer l'animation"
    >
      <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
        {/* Card 1: +200 ÉTUDIANTS FORMÉS */}
        <div className="bg-[#FFFFFF] border-[1.5px] border-[#32303F] p-3 sm:p-4 rounded-xl text-center shadow-swiss-sm transition-all duration-300 group-hover:-translate-y-0.5 active:scale-95">
          <div className="text-2xl sm:text-3xl font-black text-[#F15A23] font-heading tabular-nums leading-none mb-1">
            +{countStudents}
          </div>
          <div className="text-[10px] sm:text-xs font-heading uppercase text-[#606060] font-bold leading-tight">
            Étudiants Formés
          </div>
        </div>

        {/* Card 2: +15 ÉVÉNEMENTS & HACKS */}
        <div className="bg-[#FFFFFF] border-[1.5px] border-[#32303F] p-3 sm:p-4 rounded-xl text-center shadow-swiss-sm transition-all duration-300 group-hover:-translate-y-0.5 active:scale-95">
          <div className="text-2xl sm:text-3xl font-black text-[#32303F] font-heading tabular-nums leading-none mb-1">
            +{countEvents}
          </div>
          <div className="text-[10px] sm:text-xs font-heading uppercase text-[#606060] font-bold leading-tight">
            Événements &amp; Hacks
          </div>
        </div>

        {/* Card 3: USTHB with Typewriter typing animation */}
        <div className="bg-[#FFFFFF] border-[1.5px] border-[#32303F] p-3 sm:p-4 rounded-xl text-center shadow-swiss-sm transition-all duration-300 group-hover:-translate-y-0.5 active:scale-95">
          <div className="text-xl sm:text-2xl font-black text-[#10459A] font-heading min-h-[1.75rem] sm:min-h-[2rem] flex items-center justify-center leading-none mb-1">
            <span>{typedUsthb}</span>
            <span
              className={`w-1 sm:w-1.5 h-4 sm:h-5 bg-[#10459A] ml-0.5 transition-opacity duration-150 ${
                !isTypingDone ? "animate-pulse opacity-100" : "opacity-0"
              }`}
            />
          </div>
          <div className="text-[10px] sm:text-xs font-heading uppercase text-[#606060] font-bold leading-tight">
            Campus Bab Ezzouar
          </div>
        </div>
      </div>

      {/* Replay indicator pill */}
      <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono font-medium text-[#606060]/80 transition-opacity">
        <span className={`inline-block transition-transform duration-500 ${isAnimating ? "rotate-180" : ""}`}>
          ↻
        </span>
        <span className="hidden sm:inline">Cliquez sur les compteurs pour rejouer</span>
        <span className="inline sm:hidden">Touchez les cartes pour rejouer</span>
      </div>
    </div>
  );
}
