import { atom } from "jotai";

export const indicatorTotalSteps = atom(4);
export const personalInfoStep = 0;
export const verificationStep = 1;
export const codeValidationStep = 2;
export const passwordServiceStep = 3;
export const tempToken = localStorage.getItem("_temptoken") || "";
export const userTypes = [
  "for-marketers",
  "for-entrepreneurs",
  "for-agencies",
  "for-influencers",
];
export const defUserType = userTypes[3];
export const emailVerificationSubmitted = atom(false);
export const userTypesIndicators = [5, 5, 5, 4];
