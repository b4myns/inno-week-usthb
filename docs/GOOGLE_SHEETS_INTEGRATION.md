# 📊 Guide d'Intégration Google Sheets & Gestion des Réponses par E-mail
## Inno-Week 2026 • Project Initiative Club (USTHB)

Ce guide permet de connecter automatiquement les inscriptions de la plateforme à votre Google Sheet, de permettre aux organisateurs d'examiner chaque profil, et d'envoyer la réponse officielle par e-mail en 1 clic.

---

### Étape 1 : Créer le Tableau Google Sheets

1. Rendez-vous sur [Google Sheets (sheets.new)](https://sheets.new) et nommez votre fichier :  
   `INNO-WEEK 2026 — Candidatures & Sélection (PIC USTHB)`
2. Sur la **Ligne 1**, préparez les en-têtes de colonnes suivants :
   * **A1** : `ID Candidat`
   * **B1** : `Date & Heure`
   * **C1** : `Nom`
   * **D1** : `Prénom`
   * **E1** : `Email`
   * **F1** : `Téléphone`
   * **G1** : `Statut Académique`
   * **H1** : `Matricule ou NIN`
   * **I1** : `Nombre Ateliers`
   * **J1** : `Ateliers Choisis`
   * **K1** : `Motivation / Projet`
   * **L1** : `Source`
   * **M1** : `Statut Examen` *(Par défaut : "EN ATTENTE D'EXAMEN")*
   * **N1** : `Décision Organisateur` *(ACCEPTÉ / REFUSÉ / LISTE D'ATTENTE)*
   * **O1** : `Email Réponse Envoyé` *(NON / OUI)*

---

### Étape 2 : Coller le Script Apps Script (Réception + Envoi d'Emails)

1. Dans votre Google Sheet, cliquez sur le menu : **Extensions ➔ Apps Script**.
2. Remplacez tout le contenu par le script complet ci-dessous :

```javascript
/**
 * 1. RÉCEPTION DES CANDIDATURES DEPUIS LA PLATEFORME WEB
 */
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.id || "",
      data.date || "",
      data.nom || "",
      data.prenom || "",
      data.email || "",
      data.telephone || "",
      data.statut_academique || "",
      data.matricule_ou_nin || "",
      data.nombre_ateliers || "",
      data.ateliers_choisis || "",
      data.motivation || "",
      data.source || "",
      data.statut_examen || "EN ATTENTE D'EXAMEN",
      data.decision_organisateur || "EN ATTENTE",
      data.email_envoye || "NON"
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ result: "success", id: data.id })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ result: "error", error: err.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * 2. CRÉATION D'UN MENU SPÉCIAL DANS GOOGLE SHEETS POUR LES ORGANISATEURS
 */
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu("★ Inno-Week PIC")
    .addItem("✉️ Envoyer les e-mails aux candidats ACCEPTÉS", "envoyerEmailsAcceptes")
    .addToUi();
}

/**
 * 3. ENVOI AUTOMATIQUE DES RÉPONSES PAR E-MAIL DEPUIS GOOGLE SHEETS
 */
function envoyerEmailsAcceptes() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var rows = sheet.getDataRange().getValues();
  var count = 0;

  for (var i = 1; i < rows.length; i++) {
    var row = rows[i];
    var id = row[0];
    var nom = row[2];
    var prenom = row[3];
    var email = row[4];
    var decision = String(row[13]).toUpperCase().trim();
    var emailEnvoye = String(row[14]).toUpperCase().trim();

    // Envoi uniquement aux candidats acceptés qui n'ont pas encore reçu l'e-mail
    if (decision === "ACCEPTÉ" && emailEnvoye !== "OUI") {
      var sujet = "🎉 Félicitations ! Votre candidature à l'Inno-Week 2026 est retenue — PIC USTHB";
      var corpsMessage = 
        "Bonjour " + prenom + " " + nom + ",\n\n" +
        "Nous avons le plaisir de vous annoncer que votre candidature pour participer au bootcamp INNO-WEEK 2026 a été retenue par le comité d'organisation du Project Initiative Club (PIC) !\n\n" +
        "• Référence candidat : " + id + "\n" +
        "• Lieu : Grand Auditorium Houari Boumediene, USTHB (Bab Ezzouar)\n" +
        "• Dates : Lundi au Vendredi (16 au 20 Février 2026)\n\n" +
        "Veuillez vous présenter le premier jour à 09h00 muni de votre carte d'étudiant ou pièce d'identité.\n\n" +
        "À très bientôt pour transformer votre idée en startup !\n\n" +
        "— L'équipe d'organisation du Project Initiative Club (USTHB)\n" +
        "Site officiel : https://inno-week-usthb.vercel.app";

      MailApp.sendEmail(email, sujet, corpsMessage);
      
      // Marquer comme envoyé dans le Google Sheet
      sheet.getRange(i + 1, 15).setValue("OUI (" + new Date().toLocaleDateString("fr-FR") + ")");
      count++;
    }
  }

  SpreadsheetApp.getUi().alert("Succès : " + count + " e-mail(s) de convocation envoyé(s) !");
}
```

---

### Étape 3 : Déployer en Application Web

1. Dans Apps Script, cliquez en haut à droite sur **Déployer ➔ Nouveau déploiement**.
2. Type : **Application Web**.
   * **Exécuter en tant que** : `Moi`
   * **Qui a accès** : **`Tout le monde (Anyone)`** *(indispensable pour recevoir les candidatures)*
3. Cliquez sur **Déployer**, validez les autorisations et copiez l'**URL de l'application Web** (`https://script.google.com/macros/s/.../exec`).

---

### Étape 4 : Activer le lien dans le projet

Créez ou modifiez le fichier `.env.local` à la racine de votre projet :

```env
GOOGLE_SHEET_WEBHOOK_URL="https://script.google.com/macros/s/VOTRE_ID_ICI/exec"
```

Pour la production sur Vercel, ajoutez cette même variable dans **Project Settings → Environment Variables**, avec une portée **Production**, puis redéployez le projet. Cette URL est requise en production : les candidatures y sont enregistrées directement, car le système de fichiers d'une fonction Vercel ne permet pas de conserver des fichiers JSON entre les exécutions. En développement local, le webhook reste facultatif et les inscriptions sont conservées dans `data/registrations.json`.

Le script Apps Script doit être déployé en tant qu'application Web accessible à **Tout le monde** et renvoyer `{ "result": "success" }` après l'ajout de la ligne. Si l'URL manque ou si le webhook refuse une inscription, le site renvoie une erreur au lieu d'afficher une confirmation sans enregistrer la candidature.

Dès qu'un participant soumet son formulaire sur mobile ou PC :
1. Les vérifications de sécurité et de validité sont appliquées par le backend.
2. La ligne apparaît instantanément dans votre Google Sheet avec l'état `EN ATTENTE D'EXAMEN`.
3. Les organisateurs lisent les motivations, passent la colonne `Décision Organisateur` à `ACCEPTÉ`, et cliquent sur le menu pour envoyer les convocations par e-mail sans aucun copier-coller !
