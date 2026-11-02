"use client";

import React from "react";
import Image from "next/image";
import { OSWindowCard } from "@/components/ClubVisuals";
import { ExternalLink, Sparkles } from "lucide-react";

export default function SponsorSection() {
  return (
    <section id="sponsor" className="max-w-[1200px] mx-auto px-6 py-20">
      {/* Section Sub-heading / Eyebrow */}
      <div className="mb-8">
        <div className="inline-block px-3 py-1 rounded-full bg-[#FFFFFF] border-[1.5px] border-[#32303F] text-[11px] font-heading uppercase tracking-wider text-[#F15A23] font-bold mb-3 shadow-swiss-sm">
          PARTENARIAT &amp; ENGAGEMENT • ÉDITION 2026
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-[#32303F] tracking-tight font-heading">
          NOTRE SPONSOR OFFICIEL
        </h2>
      </div>

      {/* Main OS Window Card */}
      <OSWindowCard title="03 // SPONSOR OFFICIEL — RENOH DZ">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-2 sm:p-4">
          
          {/* Left Column: Premium Logo Showcase Box */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full bg-[#FEF9F6] border-[1.5px] border-[#32303F] rounded-[18px] p-8 sm:p-10 flex flex-col items-center justify-center text-center shadow-swiss-sm relative overflow-hidden group">
              {/* Corner Badge */}
              <div className="absolute top-3 right-3 bg-[#FCDF5D] border border-[#32303F] text-[10px] font-heading font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                ★ SPONSOR OFFICIEL
              </div>

              {/* Architectural Accent Grids */}
              <div className="absolute inset-0 bg-dot-grid opacity-10 pointer-events-none"></div>

              {/* Logo Presentation with Zoom hover */}
              <div className="relative w-full max-w-[280px] h-32 sm:h-36 flex items-center justify-center my-4 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/renoh-dz-logo-tight.png"
                  alt="Renoh DZ — Sponsor Officiel Inno-Week 2026"
                  width={400}
                  height={120}
                  className="max-h-full w-auto object-contain"
                  priority
                />
              </div>

              {/* Sponsor Website Direct Link Button */}
              <a
                href="https://renohdz.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 bg-white hover:bg-[#F2F2F2] text-[#32303F] text-xs font-heading font-bold px-5 py-2.5 rounded-full border-[1.5px] border-[#32303F] shadow-swiss-sm transition-all transform hover:-translate-y-0.5 active:scale-95"
              >
                <span>Visiter renohdz.com</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#F15A23]" />
              </a>
            </div>
          </div>

          {/* Right Column: Editorial & Value Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-wider text-[#F15A23] mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Mécénat &amp; Accompagnement de l&apos;Excellence</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#32303F] tracking-tight font-heading leading-tight">
                RENOH DZ S&apos;ENGAGE AUX CÔTÉS DES INNOVATEURS DE L&apos;USTHB
              </h3>
            </div>

            <p className="text-sm sm:text-base text-[#606060] leading-relaxed font-body">
              Nous sommes particulièrement fiers d&apos;annoncer <strong className="text-[#32303F] font-bold">Renoh DZ</strong> comme <span className="text-[#F15A23] font-bold">Sponsor Officiel</span> de l&apos;Inno-Week 2026. Par leur engagement financier direct et déterminant, ils rendent possible cette immersion entrepreneuriale de haut niveau pour les étudiants de l&apos;USTHB.
            </p>

            {/* Bottom Signature / CTA Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="https://renohdz.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#32303F] hover:bg-[#F15A23] text-white font-heading font-bold text-xs sm:text-sm px-6 py-3 rounded-full border-[1.5px] border-[#32303F] shadow-swiss-sm transition-all transform hover:-translate-y-0.5"
              >
                <span>Découvrir Renoh DZ</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <span className="text-xs text-[#606060] font-heading font-medium">
                Partenaire officiel de l&apos;édition 2026
              </span>
            </div>
          </div>

        </div>
      </OSWindowCard>
    </section>
  );
}
