import { useEffect, useState } from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import {
  fetchAndActivate,
  getRemoteConfig,
  getValue,
} from "firebase/remote-config";
import Back from "../../components/Back/Back";
import "./SignUp.css";
import PersonInfo from "./Steps/PersonInformation";
import PhoneVerification from "./Steps/Verification";
import EmailVerification from "./Steps/EmailVerification";
import CodeValidation from "./Steps/CodeValidation";
import { routes } from "../../service/internal-routes";
import PasswordService from "./Steps/CreatePassword";
import Success from "./Steps/Success";
import LanguagePopUp from "../../components/LanguagePopUp/LanguagePopUp";
import {
  passwordServiceStep,
  indicatorTotalSteps,
  defUserType,
  userTypes,
  userTypesIndicators,
} from "../../constant/SignUp.Constant";
import AppIcon from "../../assets/app-icon.png";
import queryString from "query-string";
import { atom, useAtom } from "jotai";
import OptionalQuiz from "./Steps/OptionalQuiz";
import { getAuth, GoogleAuthProvider, OAuthProvider, signInWithPopup } from "firebase/auth";
import i18next from "i18next";

export const verifyExistingAccountAtom = atom(false);

function SignUp() {
  const [totalSteps, setIndicatorTotalSteps] = useAtom(indicatorTotalSteps);
  const [, setVerifyExistingAccount] = useAtom(
    verifyExistingAccountAtom
  );

  let { path } = useRouteMatch();

  // General information
  const [personalInfoToken, setPersonalInfoToken] = useState("");
  const personalInfo = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  // Verification
  const [emailVerificationToken, setEmailVerificationToken] = useState("");
  const emailVerification = useState({
    email: "",
  });

  const [verificationToken, setVerificationToken] = useState("");
  const verification = useState({
    phoneNumber: "",
  });

  // Validation
  const [codeValidationToken, setCodeValidationToken] = useState("");
  const codeValidation = useState({
    code: [null, null, null, null, null, null],
  });

  // Password Creation
  const [passwordToken, setPasswordToken] = useState("");
  const password = useState({
    password: "",
  });

  // (Conditional) Quiz Component
  const [quizToken, setQuizToken] = useState("");
  const quiz = useState({
    companyName: "",
    numberOfEmployees: 0,
  });

  const isEmpty = (objectLink: object) => {
    return !Object.values(objectLink).some((x: any) => x !== null && x !== "");
  };

  /* 
  Truth statements, used to manage the routes
  Example: If PersonalInfo is completed -> Verification Route will be available.
  */
  const isPersonalInfoCompleted = !isEmpty(personalInfo[0]);
  const isVerficationCompleted =
    emailVerification[0].email.length > 0 ||
    verification[0].phoneNumber.length > 0;
  const [codeValidationSubmitted, setCodeValidationSubmitted] = useState(false);
  const isPasswordCompleted = !isEmpty(password[0]);

  const resetAllTokens = () => {
    setPersonalInfoToken("");
    setVerificationToken("");
    setCodeValidationToken("");
    setEmailVerificationToken("");
  };

  /*
  Remote config used to determine which provider will be used (either email or phone)
  */
  const remoteConfig = getRemoteConfig();
  const [authProvider, setAuthProvider] = useState(
    getValue(remoteConfig, "auth_provider").asString()
  );

  // Get remote value for once per render.
  useEffect(() => {
    fetchAndActivate(remoteConfig).then(() => {
      setAuthProvider(getValue(remoteConfig, "auth_provider").asString());
    });
  }, []);

  // Process User type
  const rawUserSearchParam = queryString
    .parse(document.location.search)
    ?.u_type?.toString();
  const sanitizeUserTypeFromParam = (u_type: string | undefined) => {
    if (!u_type) {
      return defUserType;
    }
    if (userTypes.includes(u_type)) {
      return u_type;
    }
    return defUserType;
  };

  // Implement changes on the sessions based on each individual user-type
  const [userType, setUserType] = useState(
    sanitizeUserTypeFromParam(rawUserSearchParam)
  );
  useEffect(() => {
    setIndicatorTotalSteps(userTypesIndicators[userTypes.indexOf(userType)]);
  }, [userType]);

  return (
    <div className="row sign-up-row">
      <Back
        right={
          <>
            <LanguagePopUp
              style={{ position: "static", inset: "none", padding: 3 }}
            />
          </>
        }
      />
      <div className="col">
        <div className="form-center mt-5">
          <img
            draggable={false}
            alt=""
            src={AppIcon}
            style={{ width: 100, height: 100 }}
          />
          <div className="fade-in-image">
            <Switch>
              <Route exact path={`${path}`}>
                <Redirect to={`${path}/${routes.SignUpSteps.root}`} />
              </Route>
              <Route
                exact
                path={`${path}/${routes.SignUpSteps.personalInformation}`}
              >
                <PersonInfo
                  userType={userType}
                  changeUserType={setUserType}
                  state={personalInfo}
                  setToken={setPersonalInfoToken}
                  onGoogleProviderClick={(submit) => {
                    const auth = getAuth();
                    auth.languageCode = i18next.language;

                    const provider = new GoogleAuthProvider();
                    signInWithPopup(auth, provider)
                      .then((result) => {
                        setVerifyExistingAccount(true);
                        const user = result.user;
                        const firstNameSplit = user.displayName?.split(" ")[0];
                        const lastNameSplit = user.displayName?.split(" ")[1];

                        personalInfo[1]((prev) => ({
                          email: user.email ? user.email : prev.email,
                          firstName: firstNameSplit
                            ? firstNameSplit
                            : prev.firstName,
                          lastName: lastNameSplit
                            ? lastNameSplit
                            : prev.lastName,
                        }));
                        submit();
                      })
                      .catch((error) => {
                        // Handle Errors here.
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        // The email of the user's account used.
                        const email = error.customData.email;
                        // The AuthCredential type that was used.
                        const credential =
                          GoogleAuthProvider.credentialFromError(error);
                        // ...
                      });
                  }}
                  onAppleProviderClick={() => {
                    const auth = getAuth();
                    auth.languageCode = i18next.language;

                    const provider = new OAuthProvider('apple.com');

                    signInWithPopup(auth, provider)
                      .then((result) => {
                        setVerifyExistingAccount(true);
                        const user = result.user;
                        const firstNameSplit = user.displayName?.split(" ")[0];
                        const lastNameSplit = user.displayName?.split(" ")[1];

                        personalInfo[1]((prev) => ({
                          email: user.email ? user.email : prev.email,
                          firstName: firstNameSplit
                            ? firstNameSplit
                            : prev.firstName,
                          lastName: lastNameSplit
                            ? lastNameSplit
                            : prev.lastName,
                        }));
                        // submit();
                      })
                      .catch((error) => {
                        // // Handle Errors here.
                        // const errorCode = error.code;
                        // const errorMessage = error.message;
                        // // The email of the user's account used.
                        // const email = error.customData.email;
                        // // The AuthCredential type that was used.
                        // const credential =
                        //   GoogleAuthProvider.credentialFromError(error);
                        // // ...
                      });
                  }}
                />
              </Route>
              {isPersonalInfoCompleted && (
                <Route
                  exact
                  path={`${path}/${routes.SignUpSteps.verification}`}
                >
                  {authProvider === "phone" ? (
                    <PhoneVerification
                      state={verification}
                      submitToken={personalInfoToken}
                      setToken={setVerificationToken}
                    />
                  ) : (
                    authProvider === "email" && (
                      <EmailVerification
                        state={emailVerification}
                        defaultEmail={personalInfo[0].email}
                        submitToken={personalInfoToken}
                        setToken={setEmailVerificationToken}
                      />
                    )
                  )}
                </Route>
              )}
              {isVerficationCompleted && !codeValidationSubmitted && (
                <Route
                  exact
                  path={`${path}/${routes.SignUpSteps.confirmation}`}
                >
                  <CodeValidation
                    state={codeValidation}
                    onDialogRetryClick={() => resetAllTokens()}
                    submitToken={
                      authProvider === "phone"
                        ? verificationToken
                        : emailVerificationToken
                    }
                    setToken={setCodeValidationToken}
                    onApproved={() => setCodeValidationSubmitted(true)}
                  />
                </Route>
              )}
              {codeValidationSubmitted && (
                <Route
                  exact
                  path={`${path}/${routes.SignUpSteps.passwordService}`}
                >
                  <PasswordService
                    state={password}
                    submitToken={codeValidationToken}
                    indicator={{
                      counts: totalSteps,
                      value: passwordServiceStep,
                    }}
                    otherState={{
                      email: personalInfo[0].email,
                    }}
                  />
                </Route>
              )}
              {isPasswordCompleted && (
                <Route
                  exact
                  path={`${path}/${routes.SignUpSteps.optionalQuiz}`}
                >
                  <OptionalQuiz state={quiz} setToken={setQuizToken} />
                </Route>
              )}
              {isPasswordCompleted && (
                <Route exact path={`${path}/${routes.SignUpSteps.finish}`}>
                  <Success />
                </Route>
              )}
              <Route exact path={`*`}>
                <Redirect to={`${path}`} />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
