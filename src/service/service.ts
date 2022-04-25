import {api} from './api';

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

interface signUpPropsSession3 {
  token: string;
  code: string;
}

export const signUpSession1 = (headers: signUpProps) =>
  api.post('signup/1', headers).then(({ data }) => data);

export const signUpSession2 = (headers: signUpPropsSession2) =>
  api.post('signup/2', headers).then(({ data }) => data);

export const signUpSession3 = (headers: signUpPropsSession3) =>
  api.post('signup/3', headers).then(({ data }) => data);