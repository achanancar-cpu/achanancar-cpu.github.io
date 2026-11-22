/* =====================================================================
 * ACHANAN CAR — CONFIGURATION (le seul fichier à modifier)
 * ===================================================================== */
var CONFIG = {
  // ① Adresse de l'application Web Google Apps Script (voir GUIDE, étape 3).
  //    Elle se termine par /exec. Tant qu'elle est vide, le site utilise la liste
  //    de voitures de assets/js/cars.js et envoie les demandes par WhatsApp.
  apiUrl: "https://script.google.com/macros/s/AKfycbzAYJYGuENwBCbZGnm8CiLbAyaB7kjEpYtkkvIBuyeMNruX1cQ0XTcZJNSzft547my0/exec",

  whatsapp: "212674040500",        // numéro WhatsApp international, sans + ni espaces
  phone: "+212674040500",
  email: "",                        // email affiché sur le site (facultatif)

  // Facultatif : clé Web3Forms, utilisée seulement si apiUrl est vide.
  web3formsKey: "",

  social: {                         // liens de vos pages ; "" = icône masquée
    facebook: "https://www.facebook.com/achanancarrental",
    instagram: "https://www.instagram.com/achanancar/",
    tiktok: ""
  }
};
