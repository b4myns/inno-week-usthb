"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import {
  DualBrandLogos,
  OSWindowCard,
  DashedHeroBox,
  RocketGraphic,
  GlowingLampGraphic,
  FolderBadge,
  DirectionalArrow,
} from "@/components/ClubVisuals";
import CountdownClock from "@/components/CountdownClock";
import { FAQAccordion } from "@/components/FAQAccordion";
import MetricsCards from "@/components/MetricsCards";
import ProgramTree from "@/components/ProgramTree";
import ClubIntroAnimation from "@/components/ClubIntroAnimation";
import CommunityPhotoSlider from "@/components/CommunityPhotoSlider";
import SponsorSection from "@/components/SponsorSection";
import { MapPin, Calendar, ArrowUpRight } from "lucide-react";

export default function Home() {
  const { scrollY } = useScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const diff = latest - previous;

    // Always visible near the top of the page
    if (latest <= 60) {
      setIsNavVisible(true);
      return;
    }

    // Scroll down: hide navbar
    if (diff > 5) {
      setIsNavVisible(false);
    } else if (diff < -5) {
      // Scroll up: reveal navbar
      setIsNavVisible(true);
    }
  });

  return (
    <div className="min-h-screen bg-[#FEF9F6] text-[#32303F] relative overflow-x-clip font-body selection:bg-[#FCDF5D] selection:text-[#32303F]">
      {/* Interactive 3D Folder Opening Intro Animation */}
      <ClubIntroAnimation />

      {/* 24px Architectural Dot Grid Overlay */}

      <div className="absolute inset-0 bg-dot-grid opacity-[0.12] pointer-events-none -z-10"></div>

      {/* Ambient Corner Radial Glows */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] rounded-full bg-[#FCDF5D]/18 blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-32 left-0 w-[500px] h-[500px] rounded-full bg-[#F15A23]/12 blur-3xl pointer-events-none -z-10"></div>

      {/* ====================================================================
          1. DYNAMIC AUTO-HIDE FLOATING PILL NAVBAR
          ==================================================================== */}
      <motion.header
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -100, opacity: 0 },
        }}
        animate={isNavVisible ? "visible" : "hidden"}
        transition={{ duration: 0.28, ease: "easeInOut" }}
        className="sticky top-4 z-40 w-full max-w-[1200px] mx-auto px-6"
        style={{ pointerEvents: isNavVisible ? "auto" : "none" }}
      >
        <nav className="bg-white/95 backdrop-blur-md border-[1.5px] border-[#32303F] rounded-full px-5 py-3 flex items-center justify-between shadow-swiss">
          {/* Dual Brand Logos */}
          <DualBrandLogos />

          {/* Smooth-Scroll Navigation Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            <a
              href="#inno-week"
              className="text-xs font-heading font-bold px-3 py-1.5 rounded-full text-[#32303F] hover:bg-[#F2F2F2] transition"
            >
              Inno-Week
            </a>
            <a
              href="#qui-sommes-nous"
              className="text-xs font-heading font-bold px-3 py-1.5 rounded-full text-[#32303F] hover:bg-[#F2F2F2] transition"
            >
              Qui sommes-nous
            </a>
            <a
              href="#ateliers"
              className="text-xs font-heading font-bold px-3 py-1.5 rounded-full text-[#32303F] hover:bg-[#F2F2F2] transition"
            >
              Ateliers
            </a>
            <a
              href="#sponsor"
              className="text-xs font-heading font-bold px-3 py-1.5 rounded-full text-[#32303F] hover:bg-[#F2F2F2] transition"
            >
              Sponsor
            </a>
            <a
              href="#faq"
              className="text-xs font-heading font-bold px-3 py-1.5 rounded-full text-[#32303F] hover:bg-[#F2F2F2] transition"
            >
              FAQ
            </a>
          </div>

          {/* High-Contrast Primary CTA Button */}
          <Link
            href="/register"
            className="group inline-flex items-center gap-1.5 bg-[#F15A23] hover:bg-[#D84A16] text-white font-heading font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full border-[1.5px] border-[#32303F] shadow-swiss-sm transition-transform active:scale-95"
          >
            <span>S&apos;inscrire</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </nav>
      </motion.header>

      {/* ====================================================================
          2. HERO SECTION & CREATIVE LIVE COUNTDOWN CLOCK
          ==================================================================== */}
      <section id="inno-week" className="max-w-[1200px] mx-auto px-6 pt-12 pb-20 relative">
        {/* Centerpiece: Dashed Hero Box with Title & Flanking Badges */}
        <div className="relative max-w-3xl mx-auto my-6">
          {/* Floating Shape Left: FolderBadge */}
          <div className="hidden lg:block absolute -left-28 top-8 z-20">
            <FolderBadge
              title="Lancement"
              subtitle="Dimanche 08 Novembre"
              tag="USTHB"
              rotate={-3}
            />
          </div>

          {/* Floating Shape Right: FolderBadge */}
          <div className="hidden lg:block absolute -right-28 bottom-6 z-20">
            <FolderBadge
              title="Parcours"
              subtitle="De l'idée au pitch"
              tag="FORMATION"
              rotate={2}
            />
          </div>

          {/* Decorative Rocket Graphic Floating Top Right */}
          <div className="hidden md:block absolute -top-12 -right-8 z-20">
            <RocketGraphic className="w-16 h-16" />
          </div>

          {/* Decorative Glowing Lamp Floating Top Left */}
          <div className="hidden md:block absolute -top-10 -left-6 z-20">
            <GlowingLampGraphic className="w-14 h-14" />
          </div>

          {/* Main Title Dashed Box */}
          <DashedHeroBox>
            {/* Tilted Sticker Badge Top Right */}
            <div className="absolute -top-4 right-4 sm:right-8 bg-[#FCDF5D] border-[1.5px] border-[#32303F] text-[#32303F] font-heading text-xs font-bold px-3 py-1 rounded-full shadow-swiss-sm transform rotate-[-3deg] select-none">
              ★ IS BACK • ÉDITION 2026
            </div>

            <div className="text-center py-4 sm:py-6">
              <h1 className="text-6xl sm:text-8xl font-black font-heading tracking-tight text-[#32303F] leading-none select-none">
                INNO<span className="text-[#F15A23]">-WEEK</span>
              </h1>
              <p className="font-heading font-bold text-xs sm:text-sm tracking-widest uppercase text-[#F15A23] mt-3">
                BOOTCAMP D&apos;INNOVATION &amp; ENTREPRENEURIAT
              </p>
            </div>
          </DashedHeroBox>
        </div>

        {/* Lead Descriptive Paragraph */}
        <p className="text-center text-[#606060] max-w-xl mx-auto text-sm sm:text-base leading-relaxed mt-6 mb-8 font-medium">
          L&apos;immersion entrepreneuriale étudiante à l&apos;USTHB. 5 jours intensifs, 5 ateliers fondamentaux
          pour transformer votre idée scientifique ou tech en startup rentable et labellisée.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Link
            href="/register"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#F15A23] hover:bg-[#D84A16] text-white font-heading font-bold text-sm px-8 py-4 rounded-full border-[1.5px] border-[#32303F] shadow-swiss hover:shadow-swiss-lg transition transform hover:-translate-y-0.5 active:scale-95"
          >
            <span>S&apos;inscrire maintenant</span>
            <DirectionalArrow className="w-4 h-4" />
          </Link>
          <a
            href="#ateliers"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FFFFFF] hover:bg-[#F2F2F2] text-[#32303F] font-heading font-bold text-sm px-7 py-4 rounded-full border-[1.5px] border-[#32303F] shadow-swiss-sm transition transform hover:-translate-y-0.5"
          >
            <Calendar className="w-4 h-4 text-[#F15A23]" />
            <span>Découvrir le programme</span>
          </a>
        </div>

        {/* Sponsor Officiel Trust Badge */}
        <div className="flex items-center justify-center mb-16">
          <a
            href="#sponsor"
            className="group inline-flex items-center gap-2.5 bg-white/95 hover:bg-white border-[1.5px] border-[#32303F] px-4 py-2 rounded-full shadow-swiss-sm transition-all transform hover:-translate-y-0.5"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#1DAE22] animate-pulse"></span>
            <span className="text-xs font-heading font-bold text-[#606060]">
              Sponsor Officiel :
            </span>
            <span className="text-xs font-heading font-black text-[#32303F] group-hover:text-[#F15A23] transition-colors">
              Renoh DZ
            </span>
            <span className="bg-[#FCDF5D] text-[#32303F] text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-[#32303F]">
              2026
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#32303F] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Live Countdown Clock */}
        <CountdownClock />
      </section>

      {/* ====================================================================
          3. SECTION 01: UNIFIED "QUI SOMMES-NOUS ?" SINGLE BLOCK
          ==================================================================== */}
      <section id="qui-sommes-nous" className="max-w-[1200px] mx-auto px-6 py-20">
        <OSWindowCard title="01 // QUI SOMMES-NOUS — PROJECT INITIATIVE">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left 6 Columns: Club Story & Stats */}
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-3xl sm:text-4xl font-black text-[#32303F] tracking-tight font-heading leading-tight">
                QUI SOMMES-NOUS ?<br />
                <span className="text-[#F15A23]">{"//"} PROJECT INITIATIVE</span>
              </h2>

              <p className="text-sm sm:text-base text-[#606060] leading-relaxed font-body">
                Nous sommes <strong className="text-[#F15A23] font-bold">Project Initiative</strong>, le premier club universitaire à caractère entrepreneurial en Algérie, rattaché à l’Université des Sciences et de la Technologie Houari Boumediene.
              </p>

              <p className="text-sm sm:text-base text-[#606060] leading-relaxed font-body">
                Depuis notre création, le 14 février 2014, notre objectif principal est d’accompagner les étudiants dans leur transition vers le domaine professionnel et entrepreneurial, en leur offrant les outils et compétences nécessaires pour concrétiser leurs ambitions.
              </p>

              {/* Animated Counting & Typing Stat Boxes (+200, +15, USTHB) */}
              <MetricsCards />
            </div>

            {/* Right 6 Columns: Interactive Community Photo Slider with Smooth Slide Animation */}
            <div className="lg:col-span-6">
              <CommunityPhotoSlider />
            </div>
          </div>
        </OSWindowCard>
      </section>


      {/* ====================================================================
          4. SECTION 02: THE 5 WORKSHOPS TREE ROADMAP
          ==================================================================== */}
      <section id="ateliers" className="max-w-[1200px] mx-auto px-6 py-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-[#FFFFFF] border-[1.5px] border-[#32303F] text-[11px] font-heading uppercase tracking-wider text-[#F15A23] font-bold mb-3 shadow-swiss-sm">
              PARCOURS PÉDAGOGIQUE • ÉDITION 2026
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#32303F] tracking-tight font-heading">
              L&apos;ARBRE DES 5 ATELIERS
            </h2>
            <p className="text-xs sm:text-sm text-[#606060] mt-2 max-w-xl font-medium">
              Une progression ergonomique et aérée étape par étape. Chaque atelier produit un livrable concret pour emmener votre projet de l&apos;idée jusqu&apos;à l&apos;art du pitch et de la négociation.
            </p>
          </div>
          <div className="bg-[#FFFFFF] border-[1.5px] border-[#32303F] px-4 py-2 rounded-full text-xs font-heading font-bold text-[#32303F] shadow-swiss-sm shrink-0">
            Accès : <span className="text-[#F15A23]">Gratuit sur inscription</span>
          </div>
        </div>

        {/* Eye-Comfort Tree Component */}
        <ProgramTree />
      </section>

      {/* ====================================================================
          5. SECTION 03: OFFICIAL SPONSOR RENOH DZ
          ==================================================================== */}
      <SponsorSection />

      {/* ====================================================================
          6. SECTION 04: INTERACTIVE FAQ ACCORDION
          ==================================================================== */}
      <section id="faq" className="max-w-[1200px] mx-auto px-6 py-20 border-t-[1.5px] border-[#32303F]/15">
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-block px-3 py-1 rounded-full bg-[#FFFFFF] border-[1.5px] border-[#32303F] text-[11px] font-heading uppercase tracking-wider text-[#F15A23] font-bold mb-3 shadow-swiss-sm">
            FOIRE AUX QUESTIONS
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#32303F] tracking-tight font-heading">
            TOUT CE QU&apos;IL FAUT SAVOIR
          </h2>
          <p className="text-xs sm:text-sm text-[#606060] mt-2 font-medium">
            Des réponses claires et précises aux interrogations fréquentes des étudiants de l&apos;USTHB.
          </p>
        </div>

        <FAQAccordion />
      </section>

      {/* ====================================================================
          6. CLEAN 3-COLUMN FOOTER
          ==================================================================== */}
      <footer className="max-w-[1200px] mx-auto px-6 pt-16 pb-12 border-t-[1.5px] border-[#32303F]/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-[#32303F]/15">
          {/* Column 1: Brand & Description */}
          <div className="space-y-3">
            <DualBrandLogos />
            <p className="text-xs text-[#606060] leading-relaxed">
              L&apos;accélérateur d&apos;innovation étudiante et d&apos;entrepreneuriat technologique de l&apos;Université des Sciences et de la Technologie Houari Boumediene.
            </p>
            <div className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-[#32303F] bg-white px-3 py-1 rounded-full border border-[#32303F]">
              <MapPin className="w-3.5 h-3.5 text-[#F15A23]" />
              <span>USTHB Bab Ezzouar, Alger</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3 md:pl-8">
            <h4 className="text-xs font-heading uppercase tracking-wider font-bold text-[#32303F]">
              NAVIGATION
            </h4>
            <ul className="text-xs space-y-2 text-[#606060] font-medium">
              <li>
                <a href="#inno-week" className="hover:text-[#F15A23] transition">
                  L&apos;Édition Inno-Week
                </a>
              </li>
              <li>
                <a href="#qui-sommes-nous" className="hover:text-[#F15A23] transition">
                  Qui sommes-nous
                </a>
              </li>
              <li>
                <a href="#ateliers" className="hover:text-[#F15A23] transition">
                  Programme des 5 Ateliers
                </a>
              </li>
              <li>
                <a href="#sponsor" className="hover:text-[#F15A23] transition">
                  Sponsor Officiel (Renoh DZ)
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#F15A23] transition">
                  Questions fréquentes
                </a>
              </li>
              <li>
                <Link href="/register" className="font-bold text-[#F15A23] hover:underline">
                  Formulaire d&apos;inscription →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Social Pills */}
          <div className="space-y-3">
            <h4 className="text-xs font-heading uppercase tracking-wider font-bold text-[#32303F]">
              RÉSEAUX &amp; COMMUNAUTÉ
            </h4>
            <p className="text-xs text-[#606060]">
              Suivez l&apos;actualité et les coulisses de l&apos;Inno-Week sur nos canaux officiels :
            </p>
            <div className="flex flex-wrap gap-2 text-xs font-heading font-bold">
              <span className="bg-white border border-[#32303F] px-3 py-1 rounded-full text-[#32303F] shadow-swiss-sm cursor-pointer hover:bg-[#FCDF5D] transition">
                @project.initiative.usthb
              </span>
              <span className="bg-white border border-[#32303F] px-3 py-1 rounded-full text-[#32303F] shadow-swiss-sm cursor-pointer hover:bg-[#FCDF5D] transition">
                LinkedIn
              </span>
              <span className="bg-white border border-[#32303F] px-3 py-1 rounded-full text-[#32303F] shadow-swiss-sm cursor-pointer hover:bg-[#FCDF5D] transition">
                Facebook
              </span>
              <span className="bg-white border border-[#32303F] px-3 py-1 rounded-full text-[#32303F] shadow-swiss-sm cursor-pointer hover:bg-[#FCDF5D] transition">
                TikTok
              </span>
            </div>
          </div>
        </div>

        {/* Official Sponsor Bar in Footer */}
        <div className="my-8 p-4 sm:p-5 bg-white border-[1.5px] border-[#32303F] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-swiss-sm">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left">
            <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-[#606060]">
              Sponsor Officiel de l&apos;Événement :
            </span>
            <a
              href="https://renohdz.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center hover:opacity-85 transition"
            >
              <Image
                src="/renoh-dz-logo-tight.png"
                alt="Renoh DZ"
                width={130}
                height={36}
                className="h-8 w-auto object-contain"
              />
            </a>
          </div>
          <a
            href="https://renohdz.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-heading font-bold text-[#F15A23] hover:underline inline-flex items-center gap-1"
          >
            <span>Visiter renohdz.com</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Bottom Line */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-[#606060] font-heading font-bold gap-2 select-none">
          <div>© 2026 Project Initiative • USTHB</div>
          <div>Inspiration • Innovation • Impact</div>
        </div>
      </footer>
    </div>
  );
}
