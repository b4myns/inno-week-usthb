# 📊 Guide d'Intégration Google Sheets — Inno-Week USTHB 2026

Ce guide permet de connecter automatiquement le formulaire d'inscription Inno-Week à votre tableau Google Sheets partagé pour l'équipe organisatrice du **Project Initiative Club (PIC)**.

---

### Étape 1 : Créer le Tableau Google Sheets

1. Rendez-vous sur [Google Sheets](https://sheets.new) et créez une nouvelle feuille de calcul intitulée :  
   `INNO-WEEK 2026 — Inscriptions Candidats (PIC USTHB)`
2. Sur la **Ligne 1**, nommez les colonnes exactement comme suit :
   * **A1** : `ID Candidat`
   * **B1** : `Date & Heure (Alger)`
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
   * **M1** : `Adresse IP`

---

### Étape 2 : Coller le Script Webhook (Apps Script)

1. Dans votre tableau Google Sheets, cliquez dans la barre de menu sur :  
   **Extensions ➔ Apps Script**.
2. Supprimez tout le code existant et collez le script ci-dessous :

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    // Ajouter la ligne du candidat
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
      data.ip || ""
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
```

---

### Étape 3 : Déployer le Script en Web App

1. En haut à droite d'Apps Script, cliquez sur le bouton bleu **Déployer ➔ Nouveau déploiement**.
2. Cliquez sur l'engrenage ⚙️ à gauche et sélectionnez **Application Web**.
3. Configurez les options :
   * **Description** : `Inno-Week Registration Webhook`
   * **Exécuter en tant que** : `Moi (votre adresse email)`
   * **Qui a accès** : **`Tout le monde (Anyone)`** *(obligatoire pour recevoir les requêtes sans authentification Google)*
4. Cliquez sur **Déployer** et autorisez les autorisations d'accès.
5. Copiez l'**URL de l'application Web** générée (qui ressemble à :  
   `https://script.google.com/macros/s/AKfycb.../exec`).

---

### Étape 4 : Activer le Webhook dans le projet Inno-Week

Ouvrez (ou créez) votre fichier `.env.local` à la racine du projet `inno-week-usthb` et collez l'URL :

```env
GOOGLE_SHEET_WEBHOOK_URL="https://script.google.com/macros/s/VOTRE_ID_ICI/exec"
```

Dès qu'un étudiant s'inscrit sur le site, sa ligne apparaîtra **instantanément** dans votre Google Sheets avec son identifiant unique `#INNO-2026-XXXX` !
