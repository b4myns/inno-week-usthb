"use client";

import { useEffect, useState } from "react";

const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

function SingleDigitRoller({ digit }: { digit: string }) {
  const num = parseInt(digit, 10);
  const targetIndex = isNaN(num) ? 0 : num;

  return (
    <span className="relative inline-block h-9 sm:h-12 w-[0.7ch] sm:w-[0.75ch] overflow-hidden leading-none select-none">
      <span
        className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          transform: `translateY(-${targetIndex * 10}%)`,
        }}
      >
        {DIGITS.map((d) => (
          <span
            key={d}
            className="h-9 sm:h-12 flex items-center justify-center leading-none tabular-nums"
          >
            {d}
          </span>
        ))}
      </span>
    </span>
  );
}


export function RollingNumber({
  value,
  textColor = "text-[#1C1B1A]",
}: {
  value: string | number;
  textColor?: string;
}) {
  const strValue = String(value).padStart(2, "0");
  const digits = strValue.split("");

  return (
    <div className={`inline-flex items-center justify-center font-heading font-black text-3xl sm:text-5xl ${textColor} tracking-tight`}>
      {digits.map((digit, index) => (
        <SingleDigitRoller key={index} digit={digit} />
      ))}
    </div>
  );
}
