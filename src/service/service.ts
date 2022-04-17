import {api} from './api';

interface signUpProps {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
}

export const signUpSession1 = (headers: signUpProps) =>
  api.post('signup/1', headers).then(({ data }) => data);

export const signUpSession2 = (headers: signUpProps) =>
  api.post('signup/2', headers).then(({ data }) => data);