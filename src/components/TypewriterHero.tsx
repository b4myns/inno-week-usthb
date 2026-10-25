"use client";

import { useState, useEffect } from "react";

const PHRASES = [
  "USTHB • FACULTÉ D'INFORMATIQUE & RECH • ÉDITION 2026",
  "USTHB • 5 JOURS INTENSIFS • 5 ATELIERS PRATIQUES",
  "USTHB • +500 ÉTUDIANTS FORMÉS • 15 ÉDITIONS",
  "USTHB • DE L'IDÉE À L'ART DU PITCH ET DE LA NÉGOCIATION",
];

export default function TypewriterHero() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = PHRASES[phraseIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      // Typing forward
      if (displayText.length < currentPhrase.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        }, 55);
      } else {
        // Pause at end of sentence
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      // Deleting back
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length - 1));
        }, 25);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
        }, 400);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, phraseIndex]);

  return (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ECE7E4] border border-[#E0D9D5] text-[11px] font-mono tracking-widest text-[#5A4139] uppercase shadow-2xs">
      <span className="w-2 h-2 rounded-full bg-[#A83200] animate-pulse shrink-0"></span>
      <span className="min-h-[1.2rem] flex items-center">
        {displayText}
        <span className="inline-block w-1.5 h-3.5 bg-[#A83200] ml-1 animate-pulse"></span>
      </span>
    </div>
  );
}
