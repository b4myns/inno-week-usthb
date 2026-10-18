import { NextRequest, NextResponse } from "next/server";
import { validateRegisterInput } from "@/lib/validations/registerSchema";
import {
  saveCandidateRegistration,
  getRegistrationStats,
} from "@/lib/services/registrationService";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Extract client IP for tracking and audit
    const forwardedFor = req.headers.get("x-forwarded-for");
    const ipAddress = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    // 1. Strict Server-Side Validation & Sanitization
    const validation = validateRegisterInput(body);

    if (!validation.valid || !validation.sanitizedData) {
      return NextResponse.json(
        {
          success: false,
          message: "Certaines informations saisies sont incorrectes.",
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    // 2. Save Registration & Dispatch to Google Sheets
    const record = await saveCandidateRegistration(validation.sanitizedData, ipAddress);

    return NextResponse.json(
      {
        success: true,
        message: "Candidature enregistrée avec succès !",
        candidateId: record.id,
        candidate: {
          id: record.id,
          nom: record.nom,
          prenom: record.prenom,
          email: record.email,
          phone: record.phone,
          isUsthbStudent: record.isUsthbStudent,
          matricule: record.matricule,
          nin: record.nin,
          formations: record.formations,
          createdAt: record.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur serveur lors de l'enregistrement de la candidature :", error);
    return NextResponse.json(
      {
        success: false,
        message: "Une erreur interne est survenue. Veuillez réessayer dans quelques instants.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const stats = await getRegistrationStats();
    return NextResponse.json({
      success: true,
      stats,
    });
  } catch (error) {
    console.error("Erreur stats inscriptions:", error);
    return NextResponse.json(
      { success: false, message: "Impossible de récupérer les statistiques." },
      { status: 500 }
    );
  }
}
