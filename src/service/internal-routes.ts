export const routes = {
  root: "/",
  SignUp: "/create/verify-account/sign-up",
  SignUpSteps: {
    root: "general-user-information",
    personalInformation: "general-user-information",
    verification: "provider-verification",
    confirmation: "code-verification",
    passwordService: "password-service",
    optionalQuiz: "optional-quiz",
    finish: "finish",
    pathLevelSplit: 4,
  },
  SetupAccount: "/creator/account/setup",
  SetupAccountSteps: {
    root: "/",
  },
};
