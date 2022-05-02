import { api } from "../../api";

interface signUpProps {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
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

export const signUpSession1 = (body: signUpProps) =>
  api.post("signup/1", body).then(({ data }) => data);

export const signUpSession2 = (
  body: signUpPropsSession2,
  { _temptoken }: requireTokenProps
) =>
  api
    .post("signup/2", body, { headers: { _temptoken } })
    .then(({ data }) => data);

export const signUpSession3 = (
  body: signUpPropsSession3,
  { _temptoken }: requireTokenProps
) =>
  api
    .post("signup/3", body, { headers: { _temptoken } })
    .then(({ data }) => data);
