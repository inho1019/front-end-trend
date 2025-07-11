import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import enCommon from "../locales/en/common.json";
import koCommon from "../locales/ko/common.json";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        common: enCommon,
      },
      ko: {
        common: koCommon,
      },
    },
    fallbackLng: "ko",
    defaultNS: "common",
    react: {
      useSuspense: false,
    },
  });

export default i18n;
