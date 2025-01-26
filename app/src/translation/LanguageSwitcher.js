// src/components/LanguageSwitcher.js
import { useTranslation } from "react-i18next";

const LanguageSwitcher = (lng) => {
  const { i18n } = useTranslation();

  i18n.changeLanguage(lng);
};
export default LanguageSwitcher;
