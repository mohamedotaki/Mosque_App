import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translations
import translationAR from "./ar.json"; // English
import translationEN from "./en.json"; // French (example)
import { getLang } from "../db/local_db";
const resources = {
  en: {
    translation: translationEN,
  },
  ar: {
    translation: translationAR,
  },
};
i18n.use(initReactI18next).init({
  resources,
  lng: getLang() || "en", // Set the default language
  keySeparator: false, // Allow for nested translations without using dots
  interpolation: {
    escapeValue: false,
  },
});
export default i18n;
