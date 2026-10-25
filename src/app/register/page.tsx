"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  DualBrandLogos,
  OSWindowCard,
  RocketGraphic,
  GlowingLampGraphic,
  DirectionalArrow,
} from "@/components/ClubVisuals";
import { CheckCircle2, ArrowLeft, Sparkles, Building, UserCheck, Mail } from "lucide-react";

interface FormData {
  nom: string;
  prenom: string;
  phone: string;
  email: string;
  isUsthbStudent: boolean;
  matricule: string;
  nin: string;
  formations: string[];
  motivation: string;
  source: string;
  rgpdConsent: boolean;
}

const ALL_FORMATIONS = [
  {
    id: "01",
    day: "Jour 01 • Dimanche",
    title: "01. De l'idée au modèle économique / Comprendre le marché",
    desc: "Savoir exactement à qui on vend, ce que fait la concurrence, et comment le projet va concrètement gagner de l'argent (Analyse de marché & BMC).",
  },
  {
    id: "02",
    day: "Jour 02 • Lundi",
    title: "02. Du lancement à la validation / Lancement & Test du projet",
    desc: "Créer rapidement une première version simple du produit (MVP), la faire tester par de vrais utilisateurs et ajuster le tir sans gaspiller d'argent.",
  },
  {
    id: "03",
    day: "Jour 03 • Mardi",
    title: "03. De la rentabilité au financement / Budget & Aides financières",
    desc: "Calculer les dépenses et recettes pour savoir à partir de quand le projet devient rentable, et trouver des aides publiques pour se lancer.",
  },
  {
    id: "04",
    day: "Jour 04 • Mercredi",
    title: "04. Des ressources financières à la sécurisation / Investisseurs & Protection légale",
    desc: "Trouver des investisseurs plus importants et protéger juridiquement ses idées, sa marque et l'entente entre associés.",
  },
  {
    id: "05",
    day: "Jour 05 • Jeudi",
    title: "05. Du pitch à la croissance / Réussir son Pitch",
    desc: "Convaincre des jurys ou investisseurs en quelques minutes avec une présentation percutante, storytelling financier et négociations de pitch.",
  },
];

const SOURCES = [
  "Instagram",
  "LinkedIn",
  "Facebook",
  "TikTok",
  "Ami / Bouche-à-oreille",
  "Affichage Campus USTHB",
  "Autre",
];

export default function RegisterPage() {
  const [formData, setFormData] = useState<FormData>({
    nom: "",
    prenom: "",
    phone: "",
    email: "",
    isUsthbStudent: true,
    matricule: "",
    nin: "",
    formations: ALL_FORMATIONS.map((f) => f.title), // Select all by default
    motivation: "",
    source: "Instagram",
    rgpdConsent: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [candidateId, setCandidateId] = useState<string>("INNO-2026");
  const [serverError, setServerError] = useState<string>("");

  const toggleFormation = (title: string) => {
    setFormData((prev) => {
      const exists = prev.formations.includes(title);
      if (exists) {
        return { ...prev, formations: prev.formations.filter((f) => f !== title) };
      } else {
        return { ...prev, formations: [...prev.formations, title] };
      }
    });
  };

  const toggleSelectAll = () => {
    if (formData.formations.length === ALL_FORMATIONS.length) {
      setFormData((prev) => ({ ...prev, formations: [] }));
    } else {
      setFormData((prev) => ({
        ...prev,
        formations: ALL_FORMATIONS.map((f) => f.title),
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nom.trim()) newErrors.nom = "Le nom de famille est obligatoire.";
    if (!formData.prenom.trim()) newErrors.prenom = "Le prénom est obligatoire.";

    const cleanPhone = formData.phone.replace(/[\s.-]/g, "");
    if (!cleanPhone) {
      newErrors.phone = "Le numéro de téléphone est obligatoire.";
    } else if (!/^(0)(5|6|7)[0-9]{8}$/.test(cleanPhone) && cleanPhone.length < 9) {
      newErrors.phone = "Numéro de téléphone algérien invalide (ex: 0555 12 34 56).";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "L'adresse e-mail est obligatoire.";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Format d'adresse e-mail invalide.";
    }

    if (formData.isUsthbStudent && !formData.matricule.trim()) {
      newErrors.matricule = "Le matricule étudiant USTHB est obligatoire.";
    }

    if (!formData.isUsthbStudent && !formData.nin.trim()) {
      newErrors.nin = "Le Numéro d'Identité Nationale (NIN) est obligatoire pour les participants externes.";
    }

    if (formData.formations.length === 0) {
      newErrors.formations = "Veuillez cocher au moins un atelier d'Inno-Week.";
    }

    if (!formData.motivation.trim()) {
      newErrors.motivation = "Veuillez partager quelques mots sur votre motivation ou votre projet.";
    } else if (formData.motivation.trim().length < 15) {
      newErrors.motivation = "Merci de développer un peu plus votre motivation (minimum 15 caractères).";
    }

    if (!formData.rgpdConsent) {
      newErrors.rgpdConsent = "Le consentement à la collecte et au traitement des données (Loi n° 18-07) est obligatoire.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Real backend submission to /api/register
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");

    if (!validateForm()) {
      window.scrollTo({ top: 180, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setCandidateId(data.candidateId);
        setIsSubmitting(false);
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setIsSubmitting(false);
        if (data.errors) {
          setErrors(data.errors);
        }
        setServerError(
          data.message || "Une erreur est survenue lors de l'enregistrement de votre candidature."
        );
        window.scrollTo({ top: 220, behavior: "smooth" });
      }
    } catch (err) {
      console.error("Erreur soumission formulaire:", err);
      setIsSubmitting(false);
      setServerError(
        "Impossible de communiquer avec le serveur. Vérifiez votre connexion internet."
      );
      window.scrollTo({ top: 220, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#FEF9F6] text-[#32303F] py-8 px-4 sm:px-6 relative overflow-x-clip font-body selection:bg-[#FCDF5D] selection:text-[#32303F]">
      {/* 24px Architectural Dot Grid Overlay */}
      <div className="absolute inset-0 bg-dot-grid opacity-[0.12] pointer-events-none -z-10"></div>

      {/* Ambient Corner Radial Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#FCDF5D]/18 blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-48 left-0 w-[450px] h-[450px] rounded-full bg-[#F15A23]/12 blur-3xl pointer-events-none -z-10"></div>

      {/* Top Floating Pill Header */}
      <header className="max-w-[1200px] mx-auto mb-8">
        <div className="bg-white/95 backdrop-blur-md border-[1.5px] border-[#32303F] rounded-full px-5 py-3 flex items-center justify-between shadow-swiss">
          {/* Dual Brand Logos with official images */}
          <DualBrandLogos size="md" />

          {/* Back to Home Button */}
          <Link
            href="/"
            className="group inline-flex items-center gap-2 bg-[#F2F2F2] hover:bg-[#FFFFFF] text-[#32303F] font-heading font-bold text-xs sm:text-sm px-4 py-2 rounded-full border-[1.5px] border-[#32303F] shadow-swiss-sm transition-transform active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Retour à l&apos;accueil</span>
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-3xl mx-auto relative pt-2 pb-16">
        {/* Floating Decorative Graphics on Sides */}
        <div className="hidden lg:block absolute -left-20 top-28 z-10 pointer-events-none">
          <RocketGraphic className="w-16 h-16" />
        </div>
        <div className="hidden lg:block absolute -right-16 top-48 z-10 pointer-events-none">
          <GlowingLampGraphic className="w-14 h-14" />
        </div>

        {/* Dynamic State: Success View vs Form View */}
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <OSWindowCard
              title="DOSSIER TRANSMIS // EN COURS D'EXAMEN"
              headerAction={
                <span className="bg-[#FCDF5D] text-[#32303F] text-[10px] font-heading font-black px-2.5 py-0.5 rounded-full border border-[#32303F]">
                  STATUT : EN ATTENTE D&apos;EXAMEN
                </span>
              }
            >
              <div className="text-center py-6 px-2 sm:px-6 space-y-6">
                {/* Mail Box Graphic */}
                <div className="w-20 h-20 mx-auto rounded-full bg-[#FCDF5D] border-[1.5px] border-[#32303F] flex items-center justify-center shadow-swiss">
                  <span className="text-4xl">📬</span>
                </div>

                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F2F2F2] border border-[#32303F] text-xs font-mono font-bold text-[#F15A23]">
                    <Sparkles className="w-3.5 h-3.5" />
                    INNO-WEEK 2026 • USTHB
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-black font-heading text-[#32303F] tracking-tight">
                    Candidature Transmise !
                  </h1>
                  <p className="text-sm text-[#606060] max-w-lg mx-auto leading-relaxed font-medium">
                    Merci <strong className="text-[#F15A23] font-bold">{formData.prenom} {formData.nom}</strong> !
                    Votre dossier pour le bootcamp Inno-Week a bien été enregistré et transmis au comité de sélection de{" "}
                    <strong>Project Initiative</strong>.
                  </p>
                </div>

                {/* Organizer Review & Email Response Notice Box */}
                <div className="bg-white border-[1.5px] border-[#32303F] rounded-2xl p-5 text-left space-y-3 shadow-swiss-sm">
                  <div className="flex items-center gap-2 text-xs font-heading font-black text-[#F15A23] uppercase">
                    <Mail className="w-4 h-4 text-[#F15A23]" />
                    <span>Processus de sélection &amp; Réponse par e-mail</span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#32303F] leading-relaxed font-medium">
                    L&apos;équipe organisatrice du club PI va examiner votre profil et vos motivations.
                    La décision officielle ainsi que votre convocation pour les ateliers à l&apos;USTHB vous seront envoyées directement par <strong>e-mail</strong> à :
                  </p>

                  <div className="inline-flex items-center gap-2 bg-[#FEF9F6] border border-[#32303F] rounded-xl px-3.5 py-2 text-xs font-mono font-bold text-[#10459A]">
                    <Mail className="w-3.5 h-3.5 text-[#F15A23]" />
                    <span>{formData.email}</span>
                  </div>

                  <div className="flex items-start gap-2 bg-[#F2F2F2] rounded-xl p-3 border border-[#32303F]/15 text-xs text-[#606060]">
                    <span className="text-base shrink-0">💡</span>
                    <p className="leading-relaxed">
                      <strong>Note aux candidats :</strong> Aucun badge ni QR code n&apos;est requis. Conservez votre référence <strong>#{candidateId}</strong> pour toute correspondance. Surveillez vos e-mails (y compris vos courriers indésirables / spams).
                    </p>
                  </div>
                </div>

                {/* Candidate Summary Box */}
                <div className="bg-[#FEF9F6] border-[1.5px] border-[#32303F] rounded-2xl p-5 text-left space-y-3 shadow-swiss-sm">
                  <div className="flex items-center justify-between border-b border-[#32303F]/15 pb-2 text-xs font-heading font-bold text-[#32303F]">
                    <span>RÉCAPITULATIF DU CANDIDAT</span>
                    <span className="text-[#F15A23] font-mono font-black text-sm tracking-wide">#{candidateId}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-[#606060] block font-mono text-[10px]">CANDIDAT</span>
                      <strong className="text-[#32303F] font-bold text-sm">
                        {formData.prenom} {formData.nom}
                      </strong>
                    </div>

                    <div>
                      <span className="text-[#606060] block font-mono text-[10px]">CONTACT</span>
                      <strong className="text-[#32303F] font-medium">{formData.email}</strong>
                      <div className="text-[#606060] font-mono text-[11px]">{formData.phone}</div>
                    </div>

                    <div>
                      <span className="text-[#606060] block font-mono text-[10px]">STATUT ACADÉMIQUE</span>
                      <div className="inline-flex items-center gap-1 font-bold text-[#32303F] mt-0.5">
                        {formData.isUsthbStudent ? (
                          <>
                            <Building className="w-3.5 h-3.5 text-[#10459A]" />
                            <span>Étudiant USTHB ({formData.matricule})</span>
                          </>
                        ) : (
                          <>
                            <UserCheck className="w-3.5 h-3.5 text-[#F15A23]" />
                            <span>Externe (NIN : {formData.nin})</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div>
                      <span className="text-[#606060] block font-mono text-[10px]">ATELIERS SÉLECTIONNÉS</span>
                      <strong className="text-[#F15A23] font-bold">
                        {formData.formations.length} / 5 Ateliers réservés
                      </strong>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#32303F]/10">
                    <span className="text-[#606060] block font-mono text-[10px] mb-1">
                      LISTE DES FORMATIONS :
                    </span>
                    <ul className="space-y-1">
                      {formData.formations.map((f, i) => (
                        <li key={i} className="text-xs text-[#32303F] flex items-center gap-1.5 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#F15A23]"></span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <Link
                    href="/"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#F15A23] hover:bg-[#D84A16] text-white font-heading font-bold text-sm px-8 py-3.5 rounded-full border-[1.5px] border-[#32303F] shadow-swiss transition transform hover:-translate-y-0.5 active:scale-95"
                  >
                    <span>Retour à l&apos;accueil</span>
                    <DirectionalArrow className="w-4 h-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        nom: "",
                        prenom: "",
                        phone: "",
                        email: "",
                        isUsthbStudent: true,
                        matricule: "",
                        nin: "",
                        formations: ALL_FORMATIONS.map((f) => f.title),
                        motivation: "",
                        source: "Instagram",
                        rgpdConsent: false,
                      });
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-[#F2F2F2] text-[#32303F] font-heading font-bold text-sm px-6 py-3.5 rounded-full border-[1.5px] border-[#32303F] shadow-swiss-sm transition"
                  >
                    <span>Nouvelle inscription</span>
                  </button>
                </div>
              </div>
            </OSWindowCard>
          </motion.div>
        ) : (
          /* Main Registration OS Window Card */
          <OSWindowCard
            title="FORMULAIRE D'INSCRIPTION — INNO-WEEK 2026"
            headerAction={
              <span className="hidden sm:inline-block bg-[#FCDF5D] text-[#32303F] text-[10px] font-heading font-bold px-2 py-0.5 rounded-full border border-[#32303F]">
                100% GRATUIT • USTHB
              </span>
            }
          >
            {/* Introductory Header Inside Window */}
            <div className="space-y-2 mb-8 pb-6 border-b border-[#32303F]/15">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2F2F2] border border-[#32303F] text-xs font-mono font-bold text-[#F15A23]">
                <span className="w-2 h-2 rounded-full bg-[#F15A23] animate-pulse"></span>
                PROJECT INITIATIVE • USTHB
              </div>
              <h1 className="text-2xl sm:text-3xl font-black font-heading text-[#32303F] tracking-tight">
                Rejoignez le Bootcamp Inno-Week
              </h1>
              <p className="text-xs sm:text-sm text-[#606060] leading-relaxed font-medium">
                Veuillez compléter les informations ci-dessous. Le nombre de places est limité pour garantir la qualité des ateliers interactifs.
              </p>
            </div>

            {/* Server Error Alert Banner */}
            {serverError && (
              <div className="p-4 bg-red-50 border-[1.5px] border-red-500 rounded-xl text-xs text-red-700 font-bold mb-6 flex items-start gap-2.5 shadow-swiss-sm">
                <span className="text-base shrink-0">⚠️</span>
                <div>
                  <p className="font-heading font-black">{serverError}</p>
                  <p className="text-[11px] font-normal mt-0.5 opacity-90">
                    Veuillez vérifier les champs indiqués en rouge ci-dessous.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Nom & Prénom */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 01. NOM */}
                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#32303F] mb-1.5">
                    01. Nom de famille <span className="text-[#F15A23]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Benali"
                    value={formData.nom}
                    onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                    className={`w-full bg-[#FFFFFF] border-[1.5px] ${
                      errors.nom ? "border-red-500" : "border-[#32303F]"
                    } focus:border-[#F15A23] focus:ring-2 focus:ring-[#F15A23]/20 rounded-xl px-4 py-3 text-sm text-[#32303F] outline-hidden shadow-swiss-sm transition placeholder:text-[#606060]/50`}
                  />
                  {errors.nom && (
                    <p className="text-xs text-red-600 mt-1 font-semibold">{errors.nom}</p>
                  )}
                </div>

                {/* 02. PRÉNOM */}
                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#32303F] mb-1.5">
                    02. Prénom <span className="text-[#F15A23]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Amine"
                    value={formData.prenom}
                    onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                    className={`w-full bg-[#FFFFFF] border-[1.5px] ${
                      errors.prenom ? "border-red-500" : "border-[#32303F]"
                    } focus:border-[#F15A23] focus:ring-2 focus:ring-[#F15A23]/20 rounded-xl px-4 py-3 text-sm text-[#32303F] outline-hidden shadow-swiss-sm transition placeholder:text-[#606060]/50`}
                  />
                  {errors.prenom && (
                    <p className="text-xs text-red-600 mt-1 font-semibold">{errors.prenom}</p>
                  )}
                </div>
              </div>

              {/* Row 2: Numéro de téléphone & E-mail */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 03. NUMÉRO DE TÉLÉPHONE */}
                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#32303F] mb-1.5">
                    03. Numéro de téléphone <span className="text-[#F15A23]">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="Ex: 0550 12 34 56"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full bg-[#FFFFFF] border-[1.5px] ${
                      errors.phone ? "border-red-500" : "border-[#32303F]"
                    } focus:border-[#F15A23] focus:ring-2 focus:ring-[#F15A23]/20 rounded-xl px-4 py-3 text-sm text-[#32303F] outline-hidden shadow-swiss-sm transition placeholder:text-[#606060]/50`}
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-600 mt-1 font-semibold">{errors.phone}</p>
                  )}
                </div>

                {/* 04. E-MAIL */}
                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#32303F] mb-1.5">
                    04. Adresse e-mail <span className="text-[#F15A23]">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Ex: amine.benali@usthb.dz"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full bg-[#FFFFFF] border-[1.5px] ${
                      errors.email ? "border-red-500" : "border-[#32303F]"
                    } focus:border-[#F15A23] focus:ring-2 focus:ring-[#F15A23]/20 rounded-xl px-4 py-3 text-sm text-[#32303F] outline-hidden shadow-swiss-sm transition placeholder:text-[#606060]/50`}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-600 mt-1 font-semibold">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* 05. ÉTUDIANT USTHB ? (CONDITIONAL SEGMENTED CONTROL) */}
              <div className="bg-[#FFFFFF] border-[1.5px] border-[#32303F] rounded-2xl p-5 shadow-swiss-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="block text-xs font-heading font-bold uppercase tracking-wider text-[#32303F]">
                      05. Êtes-vous étudiant à l&apos;USTHB ? <span className="text-[#F15A23]">*</span>
                    </span>
                    <span className="text-[11px] text-[#606060] font-medium">
                      Sélectionnez votre profil académique
                    </span>
                  </div>

                  {/* Swiss Segmented Toggle */}
                  <div className="inline-flex bg-[#F2F2F2] p-1 rounded-full border-[1.5px] border-[#32303F] self-start sm:self-auto">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, isUsthbStudent: true })}
                      className={`px-4 py-1.5 text-xs font-heading font-bold rounded-full transition-all ${
                        formData.isUsthbStudent
                          ? "bg-[#F15A23] text-white shadow-xs"
                          : "text-[#32303F] hover:text-[#F15A23]"
                      }`}
                    >
                      Oui, étudiant USTHB
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, isUsthbStudent: false, matricule: "" })
                      }
                      className={`px-4 py-1.5 text-xs font-heading font-bold rounded-full transition-all ${
                        !formData.isUsthbStudent
                          ? "bg-[#10459A] text-white shadow-xs"
                          : "text-[#32303F] hover:text-[#10459A]"
                      }`}
                    >
                      Non, externe
                    </button>
                  </div>
                </div>

                {/* Animated Conditional Sub-Fields */}
                <AnimatePresence mode="wait">
                  {formData.isUsthbStudent ? (
                    <motion.div
                      key="usthb-matricule"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="pt-2 border-t border-[#32303F]/15"
                    >
                      <label className="block text-xs font-heading font-bold uppercase text-[#32303F] mb-1">
                        Matricule Étudiant USTHB <span className="text-[#F15A23]">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: 202131045892 (12 chiffres sur votre carte)"
                        value={formData.matricule}
                        onChange={(e) =>
                          setFormData({ ...formData, matricule: e.target.value })
                        }
                        className={`w-full bg-[#FEF9F6] border-[1.5px] ${
                          errors.matricule ? "border-red-500" : "border-[#32303F]"
                        } focus:border-[#F15A23] focus:bg-white rounded-xl px-4 py-2.5 text-sm text-[#32303F] outline-hidden transition placeholder:text-[#606060]/50`}
                      />
                      <p className="text-[11px] text-[#606060] mt-1">
                        ℹ️ Votre numéro de matricule figure sur votre certificat de scolarité ou carte d&apos;étudiant USTHB.
                      </p>
                      {errors.matricule && (
                        <p className="text-xs text-red-600 mt-1 font-semibold">{errors.matricule}</p>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="nin-field"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="pt-2 border-t border-[#32303F]/15"
                    >
                      <label className="block text-xs font-heading font-bold uppercase text-[#32303F] mb-1">
                        Numéro d&apos;Identité Nationale (NIN) <span className="text-[#F15A23]">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: 109876543210123456 (18 chiffres carte biométrique)"
                        value={formData.nin}
                        onChange={(e) => setFormData({ ...formData, nin: e.target.value })}
                        className={`w-full bg-[#FEF9F6] border-[1.5px] ${
                          errors.nin ? "border-red-500" : "border-[#32303F]"
                        } focus:border-[#10459A] focus:bg-white rounded-xl px-4 py-2.5 text-sm text-[#32303F] outline-hidden transition placeholder:text-[#606060]/50`}
                      />
                      <p className="text-[11px] text-[#606060] mt-1">
                        ℹ️ Requis pour l&apos;émission du badge de sécurité visiteur à l&apos;entrée principale de l&apos;USTHB.
                      </p>
                      {errors.nin && (
                        <p className="text-xs text-red-600 mt-1 font-semibold">{errors.nin}</p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 06. QUELLE FORMATION T'INTÉRESSE ? (CHECKLIST WITH WORKSHOPS) */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <label className="text-xs font-heading font-bold uppercase tracking-wider text-[#32303F]">
                      06. Quelle(s) formation(s) t&apos;intéresse(nt) ?{" "}
                      <span className="text-[#F15A23]">*</span>
                    </label>
                    <span className="block text-[11px] text-[#606060]">
                      Choisis un ou plusieurs ateliers selon tes disponibilités
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={toggleSelectAll}
                    className="self-start sm:self-auto bg-[#FCDF5D] hover:bg-[#ebd04a] text-[#32303F] text-xs font-heading font-bold px-3 py-1.5 rounded-full border-[1.5px] border-[#32303F] shadow-swiss-sm transition active:scale-95"
                  >
                    {formData.formations.length === ALL_FORMATIONS.length
                      ? "✓ Tout désélectionner"
                      : "★ Tout sélectionner (Parcours complet)"}
                  </button>
                </div>

                {/* 5 Workshop Checkable Cards */}
                <div className="space-y-2.5 pt-1">
                  {ALL_FORMATIONS.map((f) => {
                    const isChecked = formData.formations.includes(f.title);
                    return (
                      <div
                        key={f.id}
                        onClick={() => toggleFormation(f.title)}
                        className={`cursor-pointer rounded-2xl border-[1.5px] p-3.5 sm:p-4 transition-all flex items-start gap-3 select-none ${
                          isChecked
                            ? "bg-[#FFFFFF] border-[#F15A23] shadow-swiss-sm"
                            : "bg-[#FFFFFF]/60 border-[#32303F]/30 hover:border-[#32303F]"
                        }`}
                      >
                        {/* Custom Animated Checkbox */}
                        <div
                          className={`w-5 h-5 rounded-md border-[1.5px] mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                            isChecked
                              ? "bg-[#F15A23] border-[#32303F] text-white"
                              : "bg-white border-[#32303F]"
                          }`}
                        >
                          {isChecked && <span className="text-xs font-bold">✓</span>}
                        </div>

                        {/* Workshop Text Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="bg-[#FCDF5D] text-[#32303F] text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border border-[#32303F]">
                              {f.day}
                            </span>
                          </div>
                          <h4 className="font-heading font-bold text-xs sm:text-sm text-[#32303F] leading-snug">
                            {f.title}
                          </h4>
                          <p className="text-[11px] text-[#606060] leading-tight mt-0.5">
                            {f.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {errors.formations && (
                  <p className="text-xs text-red-600 font-semibold">{errors.formations}</p>
                )}
              </div>

              {/* 07. POURQUOI VEUX-TU ASSISTER ? */}
              <div>
                <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#32303F] mb-1.5">
                  07. Pourquoi veux-tu assister à cette série de formations ?{" "}
                  <span className="text-[#F15A23]">*</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="Décrivez brièvement votre projet, votre domaine d'études, ou ce que vous espérez tirer de ces 5 journées d'immersion..."
                  value={formData.motivation}
                  onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                  className={`w-full bg-[#FFFFFF] border-[1.5px] ${
                    errors.motivation ? "border-red-500" : "border-[#32303F]"
                  } focus:border-[#F15A23] focus:ring-2 focus:ring-[#F15A23]/20 rounded-2xl p-4 text-sm text-[#32303F] outline-hidden shadow-swiss-sm transition placeholder:text-[#606060]/50`}
                ></textarea>
                {errors.motivation && (
                  <p className="text-xs text-red-600 mt-1 font-semibold">{errors.motivation}</p>
                )}
              </div>

              {/* 08. COMMENT AS-TU ENTENDU PARLER D'INNOWEEK ? */}
              <div>
                <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#32303F] mb-2">
                  08. Comment as-tu entendu parler d&apos;Inno-Week ?
                </label>
                <div className="flex flex-wrap gap-2">
                  {SOURCES.map((source) => {
                    const isSelected = formData.source === source;
                    return (
                      <button
                        key={source}
                        type="button"
                        onClick={() => setFormData({ ...formData, source })}
                        className={`text-xs font-heading font-bold px-4 py-2 rounded-full border-[1.5px] border-[#32303F] transition active:scale-95 ${
                          isSelected
                            ? "bg-[#F15A23] text-white shadow-swiss-sm"
                            : "bg-white text-[#32303F] hover:bg-[#F2F2F2]"
                        }`}
                      >
                        {source}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Clause RGPD / Protection des Données (Loi 18-07) */}
              <div
                className={`p-4 sm:p-5 rounded-2xl border-[1.5px] transition-all ${
                  errors.rgpdConsent
                    ? "bg-red-50/80 border-red-500 shadow-swiss-sm"
                    : "bg-[#FEF9F6] border-[#32303F] shadow-swiss-sm"
                }`}
              >
                <label
                  htmlFor="rgpd-consent-checkbox"
                  className="flex items-start gap-3 cursor-pointer select-none"
                >
                  <input
                    id="rgpd-consent-checkbox"
                    type="checkbox"
                    checked={formData.rgpdConsent}
                    onChange={(e) =>
                      setFormData({ ...formData, rgpdConsent: e.target.checked })
                    }
                    className="mt-0.5 w-4 h-4 rounded-md accent-[#F15A23] border-[#32303F] cursor-pointer shrink-0"
                  />
                  <span className="text-xs sm:text-sm text-[#32303F] leading-relaxed font-medium">
                    J’accepte que mes données personnelles soient collectées et traitées conformément à la loi n° 18-07 modifiée et complétée, pour les finalités liées à mon inscription.{" "}
                    <span className="text-[#F15A23] font-bold">*</span>
                  </span>
                </label>
                {errors.rgpdConsent && (
                  <p className="text-xs text-red-600 mt-2 font-semibold pl-7">
                    {errors.rgpdConsent}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full bg-[#F15A23] hover:bg-[#D84A16] text-white font-heading font-black text-sm sm:text-base border-[1.5px] border-[#32303F] shadow-swiss hover:shadow-swiss-lg transition transform hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Enregistrement de votre candidature...</span>
                    </>
                  ) : (
                    <>
                      <span>Envoyer ma candidature 🚀</span>
                      <DirectionalArrow className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Footnote Assurance */}
              <div className="flex items-center justify-center gap-2 pt-2 text-xs text-[#606060] font-medium text-center">
                <CheckCircle2 className="w-4 h-4 text-[#F15A23] shrink-0" />
                <span>
                  Bootcamp 100% gratuit organisé par Project Initiative à l&apos;USTHB.
                </span>
              </div>
            </form>
          </OSWindowCard>
        )}
      </div>
    </div>
  );
}
