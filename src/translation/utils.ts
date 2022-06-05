import i18n from "../i18next";

export const useLang = () => {
  const lang = i18n.language;
  return lang || "en";
};

export interface requireToken {
  _temptoken: string;
}

export type lang = "en" | "ro" | "ru";