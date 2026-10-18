"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Clock,
  MapPin,
  Sparkles,
  ArrowRight,
  Target,
} from "lucide-react";

interface WorkshopStep {
  id: string;
  stepNumber: string;
  day: string;
  time: string;
  title: string;
  subtitle: string;
  description: string;
  deliverable: string;
  location: string;
  trainer: {
    name: string;
    role: string;
    initials: string;
  };
  tags: string[];
  icon: string;
  nodeBg: string;
}

const WORKSHOP_STEPS: WorkshopStep[] = [
  {
    id: "01",
    stepNumber: "01",
    day: "Jour 01 • Lundi",
    time: "09:30 — 13:00",
    title: "De l'idée au modèle économique",
    subtitle: "STRUCTURATION DU PROJET",
    description:
      "Cadrer son intuition technique, identifier une douleur client vérifiable et formuler une proposition de valeur monétisable grâce aux frameworks d'idéation Lean.",
    deliverable: "Lean Model Canvas complété & Persona validé",
    location: "Salle Conférence I, USTHB",
    trainer: {
      name: "Dr. K. Benali",
      role: "Expert Business Models & Enseignant USTHB",
      initials: "KB",
    },
    tags: ["Idéation", "Value Proposition", "Problem-Solution Fit"],
    icon: "💡",
    nodeBg: "bg-[#FCDF5D]",
  },
  {
    id: "02",
    stepNumber: "02",
    day: "Jour 02 • Mardi",
    time: "09:30 — 13:00",
    title: "Du lancement à la validation",
    subtitle: "PROTOTYPAGE & TRACTION RAPIDE",
    description:
      "Construire un prototype fonctionnel (MVP) sans passer 6 mois à coder. Méthodologie d'interviews clients réelles, tests de pré-commande et collecte de feedback critique.",
    deliverable: "Prototype MVP testable & Grille de feedback",
    location: "Open Espace Découverte, USTHB",
    trainer: {
      name: "O. Mansouri",
      role: "Product Lead & Co-fondateur SaaS",
      initials: "OM",
    },
    tags: ["No-Code MVP", "Customer Discovery", "Smoke Test"],
    icon: "🛠️",
    nodeBg: "bg-[#FFFFFF]",
  },
  {
    id: "03",
    stepNumber: "03",
    day: "Jour 03 • Mercredi",
    time: "09:30 — 13:00",
    title: "De la rentabilité au financement",
    subtitle: "INGÉNIERIE FINANCIÈRE STARTUP",
    description:
      "Calculer son coût d'acquisition (CAC), la valeur vie client (LTV), les marges brutes réelles et concevoir une structure financière viable avant toute recherche de fonds.",
    deliverable: "Business Plan financier prévisionnel sur 24 mois",
    location: "Salle Conférence I, USTHB",
    trainer: {
      name: "S. Zerrouki",
      role: "VC & Angel Investor Maghreb",
      initials: "SZ",
    },
    tags: ["Unit Economics", "Marges Brutes", "Cash Flow"],
    icon: "📊",
    nodeBg: "bg-[#FFFFFF]",
  },
  {
    id: "04",
    stepNumber: "04",
    day: "Jour 04 • Jeudi",
    time: "09:30 — 13:00",
    title: "Des ressources financières à la sécurisation",
    subtitle: "CADRE JURIDIQUE & LABEL STARTUP",
    description:
      "Décryptage du cadre réglementaire algérien : obtention du Label Startup / Projet Innovant, protection des brevets avec l'INAPI et accès aux financements du fond ASF.",
    deliverable: "Dossier de labellisation ministérielle prêt à soumettre",
    location: "Espace Startup Hub, USTHB",
    trainer: {
      name: "M. Haddad",
      role: "Consultant Juridique & Brevets INAPI",
      initials: "MH",
    },
    tags: ["Label Startup", "Droits INAPI", "Financement ASF"],
    icon: "🛡️",
    nodeBg: "bg-[#FFFFFF]",
  },
  {
    id: "05",
    stepNumber: "05",
    day: "Jour 05 • Vendredi",
    time: "14:00 — 18:30",
    title: "Du pitch à la croissance & Demo Day",
    subtitle: "APOTHÉOSE DEVANT LE JURY D'INVESTISSEURS",
    description:
      "Entraînement intensif au format Pitch 3 minutes (standard Y-Combinator) suivi du Demo Day en direct sur scène devant un jury mixte de business angels et d'accélérateurs.",
    deliverable: "Pitch Deck 3 min soutenu en public + Certificat Inno-Week",
    location: "Grand Auditorium Houari Boumediene, USTHB",
    trainer: {
      name: "L. Ait-Amir",
      role: "Pitch Coach & Partenaire Accélérateur",
      initials: "LA",
    },
    tags: ["Pitch Deck 3min", "Demo Day Live", "Prix & Trophée 2026"],
    icon: "🚀",
    nodeBg: "bg-[#F15A23]",
  },
];

export default function ProgramTree() {
  const [activeStep, setActiveStep] = useState<string>("01");

  return (
    <div className="relative w-full max-w-5xl mx-auto py-6 sm:py-8">
      {/* Visual Journey Helper Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-10 sm:mb-12 p-2.5 sm:p-3 bg-white/95 backdrop-blur-sm border-[1.5px] border-[#32303F] rounded-full shadow-swiss-sm text-xs select-none">
        <div className="flex items-center gap-2 px-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F15A23] animate-pulse"></span>
          <span className="font-heading font-black tracking-wider text-[#32303F] uppercase text-xs">
            Trajectoire Pédagogique
          </span>
        </div>

        {/* Quick Day Selector Pills */}
        <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-1">
          {WORKSHOP_STEPS.map((step) => {
            const isCurrent = activeStep === step.id;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setActiveStep(step.id)}
                className={`px-3 py-1 rounded-full text-xs font-heading font-bold transition-all border shrink-0 ${
                  isCurrent
                    ? "bg-[#F15A23] text-white border-[#32303F] shadow-xs scale-105"
                    : "bg-[#F2F2F2] text-[#606060] border-transparent hover:border-[#32303F]/30 hover:text-[#32303F]"
                }`}
              >
                J{step.stepNumber}
              </button>
            );
          })}
        </div>

        <div className="hidden sm:flex items-center gap-1 text-[11px] text-[#606060] font-mono px-3">
          <span>5 Jours</span>
          <span>•</span>
          <span className="text-[#F15A23] font-bold">1 Parcours Complet</span>
        </div>
      </div>

      {/* The Central Tree / Spine Road */}
      <div className="relative">
        {/* Animated Central Trunk Line */}
        <div className="absolute left-6 md:left-1/2 top-4 bottom-16 w-1 -translate-x-1/2 pointer-events-none z-10">
          {/* Base dashed stroke */}
          <div className="w-full h-full border-l-2 border-dashed border-[#32303F]/35"></div>

          {/* Living Energy Beacon traveling down the trunk */}
          <motion.div
            animate={{ top: ["2%", "94%"] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-1.5 w-4 h-16 rounded-full bg-gradient-to-b from-[#FCDF5D] via-[#F15A23] to-[#10459A] blur-[1px] shadow-[0_0_12px_#F15A23]"
          />
          <motion.div
            animate={{ top: ["2%", "94%"] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-1 w-3 h-3 rounded-full bg-[#F15A23] border border-white shadow-[0_0_10px_#F15A23]"
          />
        </div>

        {/* Tree Nodes List */}
        <div className="space-y-8 sm:space-y-16">
          {WORKSHOP_STEPS.map((step, index) => {
            const isEven = index % 2 === 0;
            const isFinale = index === WORKSHOP_STEPS.length - 1;
            const isSelected = activeStep === step.id;

            return (
              <div
                key={step.id}
                className={`relative flex flex-col md:flex-row items-start ${
                  isEven ? "md:flex-row-reverse" : ""
                } gap-4 sm:gap-6 md:gap-12 pl-14 sm:pl-16 md:pl-0`}
              >
                {/* 1. Milestone Node on the Tree Trunk */}
                <div
                  className="absolute left-6 md:left-1/2 -translate-x-1/2 top-4 z-20 flex flex-col items-center cursor-pointer"
                  onClick={() => setActiveStep(step.id)}
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0.85 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0, margin: "100px" }}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.92 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className={`relative w-12 h-12 rounded-2xl ${step.nodeBg} border-[2px] border-[#32303F] shadow-[3px_3px_0px_#32303F] flex items-center justify-center text-xl transition-all duration-300 ${
                      isSelected
                        ? "ring-4 ring-[#FCDF5D] scale-110 shadow-[0_0_18px_rgba(241,90,35,0.45)]"
                        : "hover:scale-105"
                    }`}
                  >
                    {/* Active pulse ring */}
                    {isSelected && (
                      <span className="absolute -inset-1.5 rounded-2xl border-2 border-[#F15A23] animate-ping opacity-60 pointer-events-none"></span>
                    )}

                    <span>{step.icon}</span>

                    {/* Step badge */}
                    <span
                      className={`absolute -bottom-2 -right-2 text-[9px] font-mono font-black px-1.5 py-0.2 rounded-full border border-[#32303F] ${
                        isFinale
                          ? "bg-[#FCDF5D] text-[#32303F]"
                          : isSelected
                          ? "bg-[#F15A23] text-white"
                          : "bg-white text-[#32303F]"
                      }`}
                    >
                      J{step.stepNumber}
                    </span>
                  </motion.div>
                </div>

                {/* 2. Branch Connector (Horizontal branch linking Trunk to Card) */}
                {/* Desktop Connector */}
                <div
                  className={`hidden md:block absolute top-10 transition-colors duration-300 ${
                    isEven
                      ? "right-1/2 w-12 border-t-2"
                      : "left-1/2 w-12 border-t-2"
                  } ${
                    isSelected
                      ? "border-[#F15A23] border-solid"
                      : "border-[#32303F]/40 border-dashed"
                  }`}
                ></div>

                {/* Mobile Connector */}
                <div
                  className={`block md:hidden absolute left-6 top-10 w-8 border-t-2 transition-colors duration-300 pointer-events-none ${
                    isSelected
                      ? "border-[#F15A23] border-solid"
                      : "border-[#32303F]/40 border-dashed"
                  }`}
                ></div>

                {/* 3. Eye-Comfort Card Container */}
                <div className="w-full md:w-[calc(50%-3rem)]">
                  <motion.div
                    initial={{ opacity: 0.85, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0, margin: "100px" }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    onClick={() => setActiveStep(step.id)}
                    className={`relative rounded-2xl bg-white border-[1.5px] border-[#32303F] p-5 sm:p-7 transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? "shadow-[6px_6px_0px_#32303F] -translate-y-1 ring-2 ring-[#F15A23]/40 border-[#F15A23]"
                        : "shadow-[4px_4px_0px_#32303F] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#32303F]"
                    }`}
                  >
                    {/* Top Row: Day Pill & Time Pill */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span
                        className={`text-[11px] font-heading font-black uppercase px-3 py-1 rounded-full border border-[#32303F] shadow-2xs ${
                          isFinale
                            ? "bg-[#F15A23] text-white"
                            : "bg-[#FCDF5D] text-[#32303F]"
                        }`}
                      >
                        {step.day}
                      </span>

                      <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#606060]">
                        <Clock className="w-3.5 h-3.5 text-[#F15A23]" />
                        <span>{step.time}</span>
                      </div>
                    </div>

                    {/* Subtitle & Title */}
                    <div className="mb-3">
                      <div className="text-[10px] font-mono tracking-widest text-[#F15A23] uppercase font-bold">
                        {step.subtitle}
                      </div>
                      <h3 className="text-lg sm:text-2xl font-black font-heading text-[#32303F] leading-snug mt-0.5">
                        {step.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#606060] leading-relaxed mb-4 font-medium">
                      {step.description}
                    </p>

                    {/* Concrete Deliverable Box */}
                    <div className="bg-[#FEF9F6] border border-[#32303F]/20 rounded-xl p-3 mb-4 flex items-start gap-2.5">
                      <Target className="w-4 h-4 text-[#F15A23] shrink-0 mt-0.5" />
                      <div className="text-xs">
                        <strong className="font-heading font-bold text-[#32303F] block">
                          Livrable concret :
                        </strong>
                        <span className="text-[#606060] font-medium leading-tight">
                          {step.deliverable}
                        </span>
                      </div>
                    </div>

                    {/* Tags Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {step.tags.map((t, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-[#F2F2F2] border border-[#32303F]/20 text-[#32303F]"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>

                    {/* Bottom Row: Location & Trainer Avatar */}
                    <div className="pt-4 border-t border-[#32303F]/15 flex items-center justify-between gap-2 sm:gap-3">
                      {/* Venue */}
                      <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-[#606060] font-medium truncate">
                        <MapPin className="w-3.5 h-3.5 text-[#F15A23] shrink-0" />
                        <span className="truncate">{step.location}</span>
                      </div>

                      {/* Trainer Pill */}
                      <div className="flex items-center gap-1.5 sm:gap-2 bg-[#F2F2F2] rounded-full pl-1 pr-2.5 sm:pr-3 py-1 border border-[#32303F]/20 shrink-0">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white border border-[#32303F] flex items-center justify-center font-heading font-black text-[9px] sm:text-[10px] text-[#F15A23]">
                          {step.trainer.initials}
                        </div>
                        <span className="text-[11px] sm:text-xs font-heading font-bold text-[#32303F]">
                          {step.trainer.name}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Empty mirror spacer on desktop to balance alternating layout */}
                <div className="hidden md:block md:w-[calc(50%-3rem)]"></div>
              </div>
            );
          })}
        </div>

        {/* Tree Finale Crown Node: Direct Invitation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.05 }}
          className="mt-12 sm:mt-16 text-center pl-6 md:pl-0"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-[#FFFFFF] border-[1.5px] border-[#32303F] rounded-3xl p-6 sm:p-8 shadow-swiss max-w-xl mx-auto">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#FCDF5D] border-[1.5px] border-[#32303F] flex items-center justify-center text-3xl shadow-swiss-sm shrink-0">
              🏆
            </div>
            <div className="text-left space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#F15A23]">
                <Sparkles className="w-3.5 h-3.5" />
                ACCOMPLISSEMENT COMPLET
              </div>
              <h4 className="text-base sm:text-lg font-heading font-black text-[#32303F]">
                Prêt à gravir chaque étape de l&apos;arbre ?
              </h4>
              <p className="text-xs text-[#606060] font-medium leading-relaxed">
                Les 5 ateliers sont interconnectés. Participez au parcours complet pour maximiser vos chances au Demo Day.
              </p>
            </div>
            <Link
              href="/register"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#F15A23] hover:bg-[#D84A16] text-white font-heading font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full border-[1.5px] border-[#32303F] shadow-swiss-sm transition transform hover:-translate-y-0.5 active:scale-95 shrink-0"
            >
              <span>S&apos;inscrire</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
