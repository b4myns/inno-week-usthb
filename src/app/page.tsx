"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  DualBrandLogos,
  OSWindowCard,
  VectorSelectionBox,
  DashedHeroBox,
  RocketGraphic,
  GlowingLampGraphic,
  FolderBadge,
  DirectionalArrow,
} from "@/components/ClubVisuals";
import CountdownClock from "@/components/CountdownClock";
import { FAQAccordion } from "@/components/FAQAccordion";
import MetricsCards from "@/components/MetricsCards";
import ClubIntroAnimation from "@/components/ClubIntroAnimation";
import { MapPin, Calendar, Clock, ArrowUpRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FEF9F6] text-[#32303F] relative overflow-hidden font-body selection:bg-[#FCDF5D] selection:text-[#32303F]">
      {/* Smooth Page Loading Intro Animation */}
      <ClubIntroAnimation />

      {/* 24px Architectural Dot Grid Overlay */}
      <div className="absolute inset-0 bg-dot-grid opacity-[0.12] pointer-events-none -z-10"></div>

      {/* Ambient Corner Radial Glows */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] rounded-full bg-[#FCDF5D]/18 blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-32 left-0 w-[500px] h-[500px] rounded-full bg-[#F15A23]/12 blur-3xl pointer-events-none -z-10"></div>

      {/* ====================================================================
          1. STICKY FLOATING PILL NAVBAR
          ==================================================================== */}
      <header className="sticky top-4 z-40 w-full max-w-[1200px] mx-auto px-6">
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
      </header>

      {/* ====================================================================
          2. HERO SECTION & CREATIVE LIVE COUNTDOWN CLOCK
          ==================================================================== */}
      <section id="inno-week" className="max-w-[1200px] mx-auto px-6 pt-12 pb-20 relative">
        {/* Centerpiece: Dashed Hero Box with Title & Flanking Badges */}
        <div className="relative max-w-3xl mx-auto my-6">
          {/* Floating Shape Left: FolderBadge */}
          <div className="hidden lg:block absolute -left-28 top-8 z-20">
            <FolderBadge
              title="Édition 2026"
              subtitle="5 Jours • 100% Gratuit"
              tag="USTHB"
              rotate={-3}
            />
          </div>

          {/* Floating Shape Right: FolderBadge */}
          <div className="hidden lg:block absolute -right-28 bottom-6 z-20">
            <FolderBadge
              title="Parcours"
              subtitle="De l'idée au pitch"
              tag="DEMO DAY"
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
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
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

        {/* Live Countdown Clock */}
        <CountdownClock />
      </section>

      {/* ====================================================================
          3. SECTION 01: UNIFIED "QUI SOMMES-NOUS ?" SINGLE BLOCK
          ==================================================================== */}
      <section id="qui-sommes-nous" className="max-w-[1200px] mx-auto px-6 py-20">
        <OSWindowCard title="01 // QUI SOMMES-NOUS — PROJECT INITIATIVE CLUB">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left 6 Columns: Club Story & Stats */}
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-3xl sm:text-4xl font-black text-[#32303F] tracking-tight font-heading leading-tight">
                QUI SOMMES-NOUS ?<br />
                <span className="text-[#F15A23]">// PROJECT INITIATIVE CLUB</span>
              </h2>

              <p className="text-sm sm:text-base text-[#606060] leading-relaxed font-body">
                Le <strong className="text-[#F15A23] font-bold">Project Initiative Club (PIC)</strong> est le premier club entrepreneurial et scientifique
                de l&apos;Université des Sciences et de la Technologie Houari Boumediene (USTHB). Notre mission : initier les jeunes étudiants algériens au monde des affaires,
                de l&apos;entrepreneuriat et des initiatives concrètes.
              </p>

              <p className="text-sm sm:text-base text-[#606060] leading-relaxed font-body">
                À travers des hackathons emblématiques, des formations de pointe en technologie et gestion de projet comme l&apos;Inno-Week, ainsi que notre grand salon Career Summit, nous connectons les futurs talents au monde professionnel.
              </p>

              {/* Animated Counting & Typing Stat Boxes (+200, +15, USTHB) */}
              <MetricsCards />
            </div>

            {/* Right 6 Columns: Large Community Photo Block Framed in VectorSelectionBox */}
            <div className="lg:col-span-6">
              <div className="relative p-2">
                {/* Floating Orange Folder Badge Top Right */}
                <div className="absolute -top-6 -right-2 z-30 hidden sm:block">
                  <FolderBadge
                    title="Communauté PIC"
                    subtitle="Auditorium USTHB"
                    tag="Membres"
                    rotate={2}
                  />
                </div>

                <VectorSelectionBox className="rounded-2xl overflow-hidden bg-[#32303F] shadow-swiss">
                  <div className="relative aspect-4/3 flex flex-col justify-end p-6 text-white group overflow-hidden">
                    {/* Real PIC Community Photo */}
                    <Image
                      src="/community-pic.png"
                      alt="Communauté Project Initiative Club USTHB"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 500px"
                    />

                    {/* Background Visual Vignette Overlay for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#32303F]/90 via-[#32303F]/30 to-transparent z-10"></div>

                    {/* Photo Content */}
                    <div className="relative z-20 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-heading font-bold text-[#FCDF5D]">
                        <span className="w-2 h-2 rounded-full bg-[#FCDF5D] animate-pulse"></span>
                        CAREER SUMMIT // AUDITORIUM HOUARI BOUMEDIENE
                      </div>
                      <p className="text-xs text-white/90 font-body">
                        Rencontre annuelle des étudiants innovateurs, fondateurs de startups et alumni de l&apos;USTHB.
                      </p>
                    </div>
                  </div>
                </VectorSelectionBox>

                {/* Overlapping Pill Bar with 4 VI Keywords */}
                <div className="relative -mt-4 z-20 flex justify-center">
                  <div className="inline-flex items-center gap-2 bg-[#FFFFFF] border-[1.5px] border-[#32303F] rounded-full p-1.5 shadow-swiss select-none">
                    <span className="bg-[#FCDF5D] text-[#32303F] text-xs font-heading font-bold px-3 py-1 rounded-full border border-[#32303F]">
                      LEARN
                    </span>
                    <span className="bg-[#F2F2F2] text-[#32303F] text-xs font-heading font-bold px-3 py-1 rounded-full border border-[#32303F]">
                      CONNECT
                    </span>
                    <span className="bg-[#F15A23] text-white text-xs font-heading font-bold px-3 py-1 rounded-full border border-[#32303F]">
                      CREATE
                    </span>
                    <span className="bg-[#10459A] text-white text-xs font-heading font-bold px-3 py-1 rounded-full border border-[#32303F]">
                      GROW
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </OSWindowCard>
      </section>


      {/* ====================================================================
          4. SECTION 02: THE 5 WORKSHOPS BENTO GRID
          ==================================================================== */}
      <section id="ateliers" className="max-w-[1200px] mx-auto px-6 py-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-[#FFFFFF] border-[1.5px] border-[#32303F] text-[11px] font-heading uppercase tracking-wider text-[#F15A23] font-bold mb-3 shadow-swiss-sm">
              PARCOURS PÉDAGOGIQUE
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#32303F] tracking-tight font-heading">
              LES 5 ATELIERS FONDAMENTAUX
            </h2>
            <p className="text-xs sm:text-sm text-[#606060] mt-2 max-w-xl font-medium">
              De l&apos;esquisse sur tableau blanc jusqu&apos;au pitch devant des investisseurs, une progression méthodique sur cinq demi-journées pratiques.
            </p>
          </div>
          <div className="bg-[#FFFFFF] border-[1.5px] border-[#32303F] px-4 py-2 rounded-full text-xs font-heading font-bold text-[#32303F] shadow-swiss-sm shrink-0">
            Accès : <span className="text-[#F15A23]">Sur inscription préalable</span>
          </div>
        </div>

        {/* 3 + 2 Bento Grid */}
        <div className="space-y-6">
          {/* Row 1: 3 Workshops Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Workshop 01 */}
            <OSWindowCard title="ATELIER 01">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-heading font-bold">
                  <span className="bg-[#FCDF5D] px-2.5 py-0.5 rounded-full border border-[#32303F]">
                    JOUR 01 • LUNDI
                  </span>
                  <span className="flex items-center gap-1 text-[#606060]">
                    <Clock className="w-3.5 h-3.5 text-[#F15A23]" /> 09:30 - 13:00
                  </span>
                </div>
                <h3 className="font-heading font-bold text-lg text-[#32303F] leading-snug">
                  01. De l&apos;idée au modèle économique
                </h3>
                <p className="text-xs text-[#606060] leading-relaxed line-clamp-2">
                  Cadrer son intuition technique, identifier une douleur client vérifiable et formuler une proposition de valeur monétisable.
                </p>
                <div className="flex items-center gap-1.5 text-xs text-[#606060] font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#F15A23]" /> Salle Conférence I, USTHB
                </div>
                {/* Trainer Card */}
                <div className="bg-[#F2F2F2] rounded-xl p-3 flex items-center gap-3 border border-[#32303F]/20">
                  <VectorSelectionBox className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-[#FFFFFF] flex items-center justify-center font-heading font-black text-xs text-[#F15A23]">
                    KB
                  </VectorSelectionBox>
                  <div className="truncate">
                    <p className="font-heading font-bold text-xs text-[#32303F] truncate">Dr. K. Benali</p>
                    <p className="text-[10px] text-[#606060] truncate">Expert Business Models &amp; Enseignant</p>
                  </div>
                </div>
              </div>
            </OSWindowCard>

            {/* Workshop 02 */}
            <OSWindowCard title="ATELIER 02">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-heading font-bold">
                  <span className="bg-[#FCDF5D] px-2.5 py-0.5 rounded-full border border-[#32303F]">
                    JOUR 02 • MARDI
                  </span>
                  <span className="flex items-center gap-1 text-[#606060]">
                    <Clock className="w-3.5 h-3.5 text-[#F15A23]" /> 09:30 - 13:00
                  </span>
                </div>
                <h3 className="font-heading font-bold text-lg text-[#32303F] leading-snug">
                  02. Du lancement à la validation
                </h3>
                <p className="text-xs text-[#606060] leading-relaxed line-clamp-2">
                  Construire un prototype fonctionnel sans coder pendant six mois. Réaliser des interviews clients et tester la pré-commande.
                </p>
                <div className="flex items-center gap-1.5 text-xs text-[#606060] font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#F15A23]" /> Open Espace Découverte, USTHB
                </div>
                {/* Trainer Card */}
                <div className="bg-[#F2F2F2] rounded-xl p-3 flex items-center gap-3 border border-[#32303F]/20">
                  <VectorSelectionBox className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-[#FFFFFF] flex items-center justify-center font-heading font-black text-xs text-[#F15A23]">
                    OM
                  </VectorSelectionBox>
                  <div className="truncate">
                    <p className="font-heading font-bold text-xs text-[#32303F] truncate">O. Mansouri</p>
                    <p className="text-[10px] text-[#606060] truncate">Product Lead &amp; Co-fondateur SaaS</p>
                  </div>
                </div>
              </div>
            </OSWindowCard>

            {/* Workshop 03 */}
            <OSWindowCard title="ATELIER 03">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-heading font-bold">
                  <span className="bg-[#FCDF5D] px-2.5 py-0.5 rounded-full border border-[#32303F]">
                    JOUR 03 • MERCREDI
                  </span>
                  <span className="flex items-center gap-1 text-[#606060]">
                    <Clock className="w-3.5 h-3.5 text-[#F15A23]" /> 09:30 - 13:00
                  </span>
                </div>
                <h3 className="font-heading font-bold text-lg text-[#32303F] leading-snug">
                  03. De la rentabilité au financement
                </h3>
                <p className="text-xs text-[#606060] leading-relaxed line-clamp-2">
                  Calculer son coût d&apos;acquisition (CAC), ses marges brutes, et bâtir une structure financière tenable avant la levée de fonds.
                </p>
                <div className="flex items-center gap-1.5 text-xs text-[#606060] font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#F15A23]" /> Salle Conférence I, USTHB
                </div>
                {/* Trainer Card */}
                <div className="bg-[#F2F2F2] rounded-xl p-3 flex items-center gap-3 border border-[#32303F]/20">
                  <VectorSelectionBox className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-[#FFFFFF] flex items-center justify-center font-heading font-black text-xs text-[#F15A23]">
                    SZ
                  </VectorSelectionBox>
                  <div className="truncate">
                    <p className="font-heading font-bold text-xs text-[#32303F] truncate">S. Zerrouki</p>
                    <p className="text-[10px] text-[#606060] truncate">VC &amp; Angel Investor Maghreb</p>
                  </div>
                </div>
              </div>
            </OSWindowCard>
          </div>

          {/* Row 2: 2 Workshops Bento (4 cols + 8 cols) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Workshop 04 (4 cols) */}
            <div className="md:col-span-5">
              <OSWindowCard title="ATELIER 04">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-heading font-bold">
                    <span className="bg-[#FCDF5D] px-2.5 py-0.5 rounded-full border border-[#32303F]">
                      JOUR 04 • JEUDI
                    </span>
                    <span className="flex items-center gap-1 text-[#606060]">
                      <Clock className="w-3.5 h-3.5 text-[#F15A23]" /> 09:30 - 13:00
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-[#32303F] leading-snug">
                    04. Des ressources financières à la sécurisation du projet
                  </h3>
                  <p className="text-xs text-[#606060] leading-relaxed">
                    Obtention du Label Startup en Algérie, protection des brevets avec l&apos;INAPI et accès aux financements publics ASF.
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-[#606060] font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#F15A23]" /> Espace Startup Hub, USTHB
                  </div>
                  <div className="bg-[#F2F2F2] rounded-xl p-3 flex items-center gap-3 border border-[#32303F]/20">
                    <VectorSelectionBox className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-[#FFFFFF] flex items-center justify-center font-heading font-black text-xs text-[#F15A23]">
                      MH
                    </VectorSelectionBox>
                    <div className="truncate">
                      <p className="font-heading font-bold text-xs text-[#32303F] truncate">M. Haddad</p>
                      <p className="text-[10px] text-[#606060] truncate">Consultant Juridique &amp; Brevets INAPI</p>
                    </div>
                  </div>
                </div>
              </OSWindowCard>
            </div>

            {/* Workshop 05 — GRAND FINALE (8 cols) */}
            <div className="md:col-span-7">
              <OSWindowCard
                title="ATELIER 05 — CLÔTURE & PITCH"
                headerAction={
                  <span className="bg-[#FCDF5D] text-[#32303F] text-[10px] font-heading font-black px-2.5 py-0.5 rounded-full border border-[#32303F]">
                    DEMO DAY LIVE
                  </span>
                }
              >
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                  <div className="sm:col-span-7 space-y-4">
                    <div className="flex items-center gap-2 text-xs font-heading font-bold">
                      <span className="bg-[#F15A23] text-white px-2.5 py-0.5 rounded-full border border-[#32303F]">
                        JOUR 05 • VENDREDI
                      </span>
                      <span className="text-[#606060]">14:00 - 18:30</span>
                    </div>
                    <h3 className="font-heading font-black text-xl text-[#32303F] leading-tight">
                      05. Du pitch à la croissance
                    </h3>
                    <p className="text-xs text-[#606060] leading-relaxed">
                      La conclusion électrique d&apos;Inno-Week : entraînement intensif au format Pitch 3 minutes (méthode Y-Combinator) suivi d&apos;un Demo Day en direct sur scène devant un jury mixte d&apos;accélérateurs et business angels.
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-[#606060] font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#F15A23]" /> Grand Auditorium Houari Boumediene, USTHB
                    </div>
                  </div>

                  <div className="sm:col-span-5 bg-[#F2F2F2] rounded-2xl p-5 border border-[#32303F]/20 text-center space-y-3">
                    <VectorSelectionBox className="w-14 h-14 mx-auto rounded-xl overflow-hidden bg-white flex items-center justify-center font-heading font-black text-sm text-[#F15A23]">
                      LA
                    </VectorSelectionBox>
                    <div>
                      <p className="font-heading font-bold text-xs text-[#32303F]">L. Ait-Amir</p>
                      <p className="text-[10px] text-[#606060]">Pitch Coach &amp; Investisseur</p>
                    </div>
                    <Link
                      href="/register"
                      className="inline-block w-full py-2.5 bg-[#F15A23] hover:bg-[#D84A16] text-white font-heading font-bold text-xs rounded-full border-[1.5px] border-[#32303F] shadow-swiss-sm transition active:scale-95"
                    >
                      Réserver ma place →
                    </Link>
                  </div>
                </div>
              </OSWindowCard>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          5. SECTION 03: INTERACTIVE FAQ ACCORDION
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

        {/* Bottom Line */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-[#606060] font-heading font-bold gap-2 select-none">
          <div>© 2026 Project Initiative Club • USTHB</div>
          <div>Inspiration • Innovation • Impact</div>
        </div>
      </footer>
    </div>
  );
}
