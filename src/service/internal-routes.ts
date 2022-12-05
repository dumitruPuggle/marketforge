export const routes = {
  root: "/",
  SignIn: "/auth/separate-dflow/sign-in",
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
  RedirectPathAfterAuth: "/account/setup",
  SetupAccount: "/account/setup",
  SetupAccountSteps: {
    root: "/",
  },
};
