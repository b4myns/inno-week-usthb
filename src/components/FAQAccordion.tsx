"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    q: "Où se déroule l'événement ?",
    a: "Tous les ateliers et sessions de l'Inno-Week se déroulent dans le Bloc des Master USTHB (Bab Ezzouar, Alger).",
  },
  {
    q: "L'inscription à l'Inno-Week est-elle gratuite ?",
    a: "Oui, la participation à l'ensemble des 5 ateliers de l'Inno-Week est 100% gratuite pour tous les étudiants sélectionnés par Project Initiative.",
  },
  {
    q: "Dois-je obligatoirement être étudiant à l'USTHB ?",
    a: "L'événement est prioritairement ouvert aux étudiants de l'USTHB, mais on accueille également les étudiants externes et porteurs de projet motivés.",
  },
  {
    q: "Dois-je avoir une idée de projet ou une équipe avant de m'inscrire ?",
    a: "Non, l’inscription est ouverte à tous ! InnoWeek est une série de formations conçue pour vous accompagner, quel que soit votre niveau de départ.",
  },
  {
    q: "Que gagne-t-on à la fin de l'Inno-Week ?",
    a: "En participant à InnoWeek, vous repartez avec une attestation de participation, des connaissances concrètes et directement applicables dans le monde professionnel, une vision claire sur le marché et le développement de vos projets futurs, ainsi que des échanges précieux avec des formateurs, et d'autres participants passionnés.",
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
