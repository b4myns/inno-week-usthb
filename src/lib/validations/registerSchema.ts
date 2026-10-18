export interface RegisterInput {
  nom: string;
  prenom: string;
  phone: string;
  email: string;
  isUsthbStudent: boolean;
  matricule?: string;
  nin?: string;
  formations: string[];
  motivation: string;
  source: string;
}

export interface CandidateRecord extends RegisterInput {
  id: string;
  createdAt: string;
  status: "CONFIRMED";
  ipAddress?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
  sanitizedData?: RegisterInput;
}

// Basic HTML sanitization to prevent XSS
function sanitizeText(str: string): string {
  if (!str) return "";
  return str
    .replace(/[<>]/g, "") // remove angle brackets
    .trim();
}

// Format and normalize Algerian phone numbers
export function normalizeAlgerianPhone(phone: string): { valid: boolean; formatted: string } {
  // Strip spaces, dashes, dots, parentheses
  let cleaned = phone.replace(/[\s.\-()]/g, "");

  // Convert international prefixes: +213 or 00213 to leading 0
  if (cleaned.startsWith("+213")) {
    cleaned = "0" + cleaned.slice(4);
  } else if (cleaned.startsWith("00213")) {
    cleaned = "0" + cleaned.slice(5);
  } else if (cleaned.startsWith("213") && cleaned.length === 12) {
    cleaned = "0" + cleaned.slice(3);
  }

  // Algerian mobile numbers: 10 digits starting with 05, 06, or 07
  const algerianMobileRegex = /^0[567][0-9]{8}$/;

  if (!algerianMobileRegex.test(cleaned)) {
    return { valid: false, formatted: phone };
  }

  // Format into standard readable Swiss style: 0555 12 34 56
  const formatted = `${cleaned.slice(0, 4)} ${cleaned.slice(4, 6)} ${cleaned.slice(6, 8)} ${cleaned.slice(8, 10)}`;
  return { valid: true, formatted };
}

export function validateRegisterInput(data: unknown): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data || typeof data !== "object") {
    return { valid: false, errors: { form: "Données de formulaire invalides." } };
  }

  const raw = data as Record<string, unknown>;

  // 1. Nom
  const nom = sanitizeText(String(raw.nom || ""));
  if (!nom) {
    errors.nom = "Le nom de famille est obligatoire.";
  } else if (nom.length < 2 || nom.length > 60) {
    errors.nom = "Le nom doit comporter entre 2 et 60 caractères.";
  }

  // 2. Prénom
  const prenom = sanitizeText(String(raw.prenom || ""));
  if (!prenom) {
    errors.prenom = "Le prénom est obligatoire.";
  } else if (prenom.length < 2 || prenom.length > 60) {
    errors.prenom = "Le prénom doit comporter entre 2 et 60 caractères.";
  }

  // 3. Téléphone
  const rawPhone = String(raw.phone || "");
  const phoneValidation = normalizeAlgerianPhone(rawPhone);
  if (!rawPhone.trim()) {
    errors.phone = "Le numéro de téléphone est obligatoire.";
  } else if (!phoneValidation.valid) {
    errors.phone = "Numéro de mobile algérien invalide (ex: 0555 12 34 56 ou 06/07).";
  }

  // 4. Email
  const email = sanitizeText(String(raw.email || "")).toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!email) {
    errors.email = "L'adresse e-mail est obligatoire.";
  } else if (!emailRegex.test(email)) {
    errors.email = "Format d'adresse e-mail invalide (ex: etudiant@usthb.dz).";
  }

  // 5. Statut académique USTHB vs Externe
  const isUsthbStudent = Boolean(raw.isUsthbStudent);
  const matricule = sanitizeText(String(raw.matricule || ""));
  const nin = sanitizeText(String(raw.nin || ""));

  if (isUsthbStudent) {
    if (!matricule) {
      errors.matricule = "Le matricule étudiant USTHB est obligatoire.";
    } else if (matricule.length < 4 || matricule.length > 25) {
      errors.matricule = "Le matricule USTHB est invalide (entre 4 et 25 caractères).";
    }
  } else {
    if (!nin) {
      errors.nin = "Le Numéro d'Identité Nationale (NIN) est obligatoire pour les externes.";
    } else if (nin.length < 6 || nin.length > 30) {
      errors.nin = "Le numéro NIN ou passeport doit comporter au moins 6 caractères.";
    }
  }

  // 6. Formations / Ateliers
  const formationsRaw = Array.isArray(raw.formations) ? raw.formations : [];
  const formations = formationsRaw.map((f) => sanitizeText(String(f))).filter(Boolean);
  if (formations.length === 0) {
    errors.formations = "Veuillez cocher au moins un atelier d'Inno-Week.";
  } else if (formations.length > 5) {
    errors.formations = "Vous ne pouvez pas sélectionner plus de 5 ateliers.";
  }

  // 7. Motivation
  const motivation = sanitizeText(String(raw.motivation || ""));
  if (!motivation) {
    errors.motivation = "Veuillez partager quelques mots sur votre motivation ou votre projet.";
  } else if (motivation.length < 15) {
    errors.motivation = "Merci de développer votre motivation (minimum 15 caractères).";
  } else if (motivation.length > 1200) {
    errors.motivation = "Votre texte de motivation dépasse la limite de 1200 caractères.";
  }

  // 8. Source
  const source = sanitizeText(String(raw.source || "Autre"));

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: {},
    sanitizedData: {
      nom,
      prenom,
      phone: phoneValidation.formatted,
      email,
      isUsthbStudent,
      matricule: isUsthbStudent ? matricule : undefined,
      nin: !isUsthbStudent ? nin : undefined,
      formations,
      motivation,
      source,
    },
  };
}
