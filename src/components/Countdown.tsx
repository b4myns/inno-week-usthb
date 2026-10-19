"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { RollingNumber } from "@/components/RollingClockDigit";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown({ targetDate }: { targetDate?: string }) {
  const [target] = useState<Date>(() => {
    if (targetDate) return new Date(targetDate);
    const date = new Date();
    date.setDate(date.getDate() + 5);
    date.setHours(14, 38, 30, 0);
    return date;
  });

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 5,
    hours: 14,
    minutes: 38,
    seconds: 30,
  });

  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = target.getTime() - new Date().getTime();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [target]);

  return (
    <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-xl mx-auto w-full">
      {/* 01: Days (Yellow #FFE25F) */}
      <div className="bg-[#FFE25F] border-2 border-[#1C1B1A] rounded-2xl p-3 sm:p-5 text-center shadow-xs card-hover flex flex-col items-center justify-center">
        <RollingNumber value={isMounted ? timeLeft.days : 5} textColor="text-[#1C1B1A]" />
        <div className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#756300] mt-1.5">
          JOURS
        </div>
      </div>

      {/* 02: Hours (White with Orange #A83200 accent) */}
      <div className="bg-white border-2 border-[#1C1B1A] rounded-2xl p-3 sm:p-5 text-center shadow-xs card-hover flex flex-col items-center justify-center">
        <RollingNumber value={isMounted ? timeLeft.hours : 14} textColor="text-[#A83200]" />
        <div className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#5A4139] mt-1.5">
          HEURES
        </div>
      </div>

      {/* 03: Minutes (White) */}
      <div className="bg-white border-2 border-[#1C1B1A] rounded-2xl p-3 sm:p-5 text-center shadow-xs card-hover flex flex-col items-center justify-center">
        <RollingNumber value={isMounted ? timeLeft.minutes : 38} textColor="text-[#1C1B1A]" />
        <div className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#5A4139] mt-1.5">
          MINUTES
        </div>
      </div>

      {/* 04: Seconds (Yellow #FFE25F) with rolling animation every second */}
      <div className="bg-[#FFE25F] border-2 border-[#1C1B1A] rounded-2xl p-3 sm:p-5 text-center shadow-xs card-hover flex flex-col items-center justify-center">
        <RollingNumber value={isMounted ? timeLeft.seconds : 30} textColor="text-[#1C1B1A]" />
        <div className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#756300] mt-1.5">
          SECONDES
        </div>
      </div>
    </div>
  );
}
