import fs from "fs/promises";
import path from "path";
import { RegisterInput, CandidateRecord } from "@/lib/validations/registerSchema";

const DATA_DIR = path.join(process.cwd(), "data");
const REGISTRATIONS_FILE = path.join(DATA_DIR, "registrations.json");

// Generate unique candidate reference code (e.g. INNO-2026-7A39)
function generateCandidateId(): string {
  const chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ"; // exclude easily confused chars (0, 1, I, O)
  let code = "";
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `INNO-2026-${code}`;
}

// Ensure data directory and file exist
async function ensureStorageFile(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(REGISTRATIONS_FILE);
    } catch {
      await fs.writeFile(REGISTRATIONS_FILE, JSON.stringify([], null, 2), "utf-8");
    }
  } catch (error) {
    console.error("Failed to ensure storage file:", error);
  }
}

// Read all existing registrations
export async function getAllRegistrations(): Promise<CandidateRecord[]> {
  try {
    await ensureStorageFile();
    const content = await fs.readFile(REGISTRATIONS_FILE, "utf-8");
    const parsed = JSON.parse(content);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Error reading registrations:", error);
    return [];
  }
}

// Forward candidate record to Google Sheets webhook for organizers review
async function forwardToGoogleSheets(record: CandidateRecord): Promise<void> {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (!webhookUrl) {
    console.log("ℹ️ [GOOGLE_SHEETS] GOOGLE_SHEET_WEBHOOK_URL non configuré. Enregistrement local uniquement.");
    return;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const payload = {
      id: record.id,
      date: new Date(record.createdAt).toLocaleString("fr-FR", { timeZone: "Africa/Algiers" }),
      nom: record.nom,
      prenom: record.prenom,
      email: record.email,
      telephone: record.phone,
      statut_academique: record.isUsthbStudent ? "Étudiant USTHB" : "Participant Externe",
      matricule_ou_nin: record.isUsthbStudent ? record.matricule : record.nin,
      nombre_ateliers: record.formations.length,
      ateliers_choisis: record.formations.join(" | "),
      motivation: record.motivation,
      source: record.source,
      statut_examen: "EN ATTENTE D'EXAMEN",
      decision_organisateur: "EN ATTENTE",
      email_envoye: "NON",
      ip: record.ipAddress || "N/A",
    };

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`⚠️ Google Sheets webhook a répondu avec le statut : ${response.status}`);
    } else {
      console.log(`✅ [GOOGLE_SHEETS] Candidature ${record.id} transmise avec succès au Google Sheet.`);
    }
  } catch (error) {
    console.error("❌ Erreur lors de l'envoi vers Google Sheets :", error);
  }
}

// Save a new candidate registration
export async function saveCandidateRegistration(
  input: RegisterInput,
  ipAddress?: string
): Promise<CandidateRecord> {
  await ensureStorageFile();

  const registrations = await getAllRegistrations();

  // Generate unique candidate ID not already present
  let candidateId = generateCandidateId();
  while (registrations.some((r) => r.id === candidateId)) {
    candidateId = generateCandidateId();
  }

  const newRecord: CandidateRecord = {
    ...input,
    id: candidateId,
    createdAt: new Date().toISOString(),
    status: "CONFIRMED",
    ipAddress: ipAddress || "unknown",
  };

  registrations.push(newRecord);

  // Write updated list atomically
  await fs.writeFile(REGISTRATIONS_FILE, JSON.stringify(registrations, null, 2), "utf-8");

  // Forward to external Google Sheet if configured
  await forwardToGoogleSheets(newRecord).catch((err) =>
    console.error("Async Google Sheets hook error:", err)
  );

  return newRecord;
}

// Get statistics for the dashboard or live count
export async function getRegistrationStats() {
  const all = await getAllRegistrations();
  const usthbCount = all.filter((r) => r.isUsthbStudent).length;
  const externalCount = all.length - usthbCount;

  return {
    total: all.length,
    usthbCount,
    externalCount,
  };
}
