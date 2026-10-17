"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    q: "L'inscription à l'Inno-Week est-elle gratuite ?",
    a: "Oui, la participation à l'ensemble des 5 ateliers de l'Inno-Week est 100% gratuite pour tous les étudiants sélectionnés par le Project Initiative Club.",
  },
  {
    q: "Dois-je obligatoirement être étudiant à l'USTHB pour participer ?",
    a: "L'événement est prioritairement ouvert aux étudiants de l'USTHB (avec leur matricule), mais nous accueillons également les étudiants externes et porteurs de projet motivés (avec leur Numéro d'Identité Nationale).",
  },
  {
    q: "Dois-je avoir une idée de projet ou une équipe avant de m'inscrire ?",
    a: "Pas du tout ! L'atelier 01 est conçu spécifiquement pour vous aider à trouver et structurer une idée à partir de zéro, et des sessions de networking vous permettront de constituer votre équipe sur place.",
  },
  {
    q: "Que gagne-t-on à la fin de l'Inno-Week ?",
    a: "En plus des compétences pratiques délivrées par des mentors chevronnés, les meilleures équipes pitcheront devant un jury d'incubateurs lors du Demo Day et recevront un accompagnement personnalisé pour l'obtention du Label Startup.",
  },
];

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {FAQS.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="rounded-2xl border-[1.5px] border-[#32303F] bg-white shadow-swiss-sm overflow-hidden transition-shadow hover:shadow-swiss"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 select-none cursor-pointer"
            >
              <span className="font-heading font-bold text-sm sm:text-base text-[#32303F]">
                {faq.q}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.2 }}
                className="w-8 h-8 rounded-full bg-[#F15A23] text-white flex items-center justify-center font-bold text-lg shrink-0 border border-[#32303F]"
              >
                +
              </motion.span>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-[#606060] font-body leading-relaxed border-t border-[#32303F]/10 pt-4">
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
