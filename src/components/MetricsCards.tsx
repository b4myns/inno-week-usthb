"use client";

import { useEffect, useState, useRef } from "react";

export default function MetricsCards() {
  const [countStudents, setCountStudents] = useState(0);
  const [countEvents, setCountEvents] = useState(0);
  const [typedUsthb, setTypedUsthb] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Trigger when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 1. Counting animation for +500 and +15
  useEffect(() => {
    if (!isVisible) return;

    // Count to 200
    const duration = 1500;
    const intervalTime = 25;
    const steps = duration / intervalTime;
    const stepStudents = 200 / steps;
    const stepEvents = 15 / steps;

    let currentS = 0;
    let currentE = 0;

    const timer = setInterval(() => {
      currentS += stepStudents;
      currentE += stepEvents;

      if (currentS >= 200) {
        setCountStudents(200);
        setCountEvents(15);
        clearInterval(timer);
      } else {
        setCountStudents(Math.floor(currentS));
        setCountEvents(Math.floor(currentE));
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isVisible]);

  // 2. Typing animation for "USTHB"
  useEffect(() => {
    if (!isVisible) return;

    const text = "USTHB";
    let index = 0;

    const typingTimer = setInterval(() => {
      index++;
      setTypedUsthb(text.slice(0, index));
      if (index >= text.length) {
        clearInterval(typingTimer);
      }
    }, 180);

    return () => clearInterval(typingTimer);
  }, [isVisible]);

  return (
    <div ref={containerRef} className="space-y-3 pt-2">
      <div className="grid grid-cols-3 gap-3">
        {/* Card 1: +200 ÉTUDIANTS FORMÉS */}
        <div className="bg-[#FFFFFF] border-[1.5px] border-[#32303F] p-3.5 sm:p-4 rounded-xl text-center shadow-swiss-sm transition-transform hover:-translate-y-1">
          <div className="text-2xl sm:text-3xl font-black text-[#F15A23] font-heading tabular-nums">
            +{countStudents}
          </div>
          <div className="text-[10px] sm:text-xs font-heading uppercase text-[#606060] mt-1 font-bold">
            Étudiants Formés
          </div>
        </div>

        {/* Card 2: +15 ÉVÉNEMENTS & HACKS */}
        <div className="bg-[#FFFFFF] border-[1.5px] border-[#32303F] p-3.5 sm:p-4 rounded-xl text-center shadow-swiss-sm transition-transform hover:-translate-y-1">
          <div className="text-2xl sm:text-3xl font-black text-[#32303F] font-heading tabular-nums">
            +{countEvents}
          </div>
          <div className="text-[10px] sm:text-xs font-heading uppercase text-[#606060] mt-1 font-bold">
            Événements &amp; Hacks
          </div>
        </div>

        {/* Card 3: USTHB with Typewriter typing animation */}
        <div className="bg-[#FFFFFF] border-[1.5px] border-[#32303F] p-3.5 sm:p-4 rounded-xl text-center shadow-swiss-sm transition-transform hover:-translate-y-1">
          <div className="text-xl sm:text-2xl font-black text-[#10459A] font-heading min-h-[2rem] flex items-center justify-center">
            <span>{typedUsthb || (isVisible ? "" : "USTHB")}</span>
            {typedUsthb.length < 5 && isVisible && (
              <span className="w-1.5 h-5 bg-[#10459A] ml-1 animate-pulse"></span>
            )}
          </div>
          <div className="text-[10px] sm:text-xs font-heading uppercase text-[#606060] mt-1 font-bold">
            Bab Ezzouar, Alger
          </div>
        </div>
      </div>

      {/* Retro initiative tag link */}
      <div className="flex items-center gap-2 text-xs font-heading font-bold text-[#F15A23] pt-1">
        <span>➔</span>
        <span className="tracking-wide uppercase">ESPACE COLLABORATIF ÉTUDIANT // PIC USTHB</span>
      </div>
    </div>
  );
}

