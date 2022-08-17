import i18n from "../../../i18next";
import { api } from "../../api";

interface signUpProps {
  email: string;
  firstName: string;
  lastName: string;
}

interface signUpPropsSession2 {
  phoneNumber: string;
  lang: any;
}

interface requireTokenProps {
  _temptoken: string;
}

interface signUpPropsSession3 {
  code: string;
}

interface signUpPropsSession4 {
  password: string;
}

const useLang = () => {
  const lang = i18n.language
  return lang || "en"
};

export const signUpSession1 = (body: signUpProps) =>
  api
    .post("signup/1", body)
    .then(({ data }) => data);

export const signUpSession2 = (
  body: signUpPropsSession2,
  { _temptoken }: requireTokenProps
) =>
  api
    .post("signup/2", body, { headers: { _temptoken, lang: useLang() } })
    .then(({ data }) => data);

export const signUpSession3 = (
  body: signUpPropsSession3,
  { _temptoken }: requireTokenProps
) =>
  api
    .post("signup/3", body, { headers: { _temptoken, ...useLang } })
    .then(({ data }) => data);

export const signUpSession4 = (
  body: signUpPropsSession4,
  { _temptoken }: requireTokenProps
) =>
  api
    .post("signup/4", body, { headers: { _temptoken, ...useLang } })
    .then(({ data }) => data);
