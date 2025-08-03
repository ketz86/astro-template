import it from "./messages/it";
import en from "./messages/en";

export const languages = {
  it: "Italiano",
  en: "English"
};

export const defaultLang = "it";
export const ui = {
  en,
  it
} as const;

export const routes = {
  homepage: {
    it: "/",
    en: "/"
  },
  company: {
    it: "/azienda",
    en: "/company"
  }
};
