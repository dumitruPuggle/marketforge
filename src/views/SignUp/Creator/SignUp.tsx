import Back from "../../../components/Back/Back";
import "./SignUp.css";
import { createContext, useCallback, useEffect, useState } from "react";
import { Redirect, Route, Switch, useLocation, useRouteMatch } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import PersonInfo from "./Steps/PersonInformation";
import Verification from "./Steps/Verification";
import CodeValidation from "./Steps/CodeValidation";
import DialogTokenExpired from "../../../components/DialogTokenExpired/DialogTokenExpired";
import { routes } from "../../../service/internal-routes";
import TokenExpiration from "../../../service/Auth/Creator/TokenExpiration";
import PasswordService from "./Steps/CreatePassword";
import Success from "./Steps/Success";
import LanguagePopUp from "../../../components/LanguagePopUp/LanguagePopUp";

export const SignUpContext = createContext({});
export const totalSteps = 4;
export const personalInfoStep = 0;
export const verificationStep = 1;
export const codeValidationStep = 2;
export const passwordServiceStep = 3;
export const tempToken = localStorage.getItem("_temptoken") || "";

function SignUp() {
  let { path } = useRouteMatch();

  const [personalInfoToken, setPersonalInfoToken] = useState<string>("");
  const personalInfo = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [verificationToken, setVerificationToken] = useState<string>("");
  const verification = useState({
    phoneNumber: "",
  });

  const [codeValidationToken, setCodeValidationToken] = useState<string>("");
  const codeValidation = useState({
    code: [null, null, null, null, null, null],
  });  

  const password = useState({
    password: "",
  });

  // const handlePasswordServiceSubmit = async (values: any) => {
  //   const history = useHistory();
  //   let { path } = useRouteMatch();

  //   history.push(`${path}/finish-sign-up`);
  // };
  //Media queries for responsiveness.
  const Desktop = ({ children }: any) => {
    const isDesktop = useMediaQuery({ minWidth: 992 });
    return isDesktop ? children : null;
  };

  //Warn user before closing the window, if he is not done with the sign up process.
  const isEmpty = (objectLink: object) => {
    return !Object.values(objectLink).some((x: any) => x !== null && x !== "");
  };

  const isPersonalInfoEmpty = isEmpty(personalInfo[0]);
  const isVerficationEmpty = isEmpty(verification[0]);
  const [codeValidationSubmitted, setCodeValidationSubmitted] = useState(false)
  const isPasswordEmpty = isEmpty(password[0]);

  const [sessionExpiredDialogShown, setSessionExpiredDialogShown] =
    useState<boolean>(false);

  // const getState = (entireState: [any, Function]) => {
  //   return entireState[0];
  // };

  const resetAllTokens = () => {
    setPersonalInfoToken("");
    setVerificationToken("");
    setCodeValidationToken("");
  };

  //Used to display to the user that the session has expired.
  const deps = [
    personalInfoToken,
    verificationToken,
    codeValidationToken,
    window.location.href,
    personalInfo,
    verification,
    codeValidation,
  ];
  useEffect(() => {
    const currentPath = () => {
      const pathSplitNumber = routes.SignUpSteps.pathLevelSplit;
      const pathLevel = window.location.pathname.split("/")[pathSplitNumber];
      const pathIndex = parseInt(pathLevel) - 2;
      if (pathIndex >= 0) {
        return pathIndex;
      }
      return 0;
    };
    const tokens = [personalInfoToken, verificationToken, codeValidationToken];
    const currentToken = tokens[currentPath()];

    if (currentToken && !sessionExpiredDialogShown) {
      const tokenExpirationHandler = new TokenExpiration(currentToken);
      const expirationDate = tokenExpirationHandler.getExpirationDate();
      if (expirationDate !== null)
        if (Date.now() > expirationDate) {
          setSessionExpiredDialogShown(true);
        }
    }
  }, deps);

  const handleDialogRetry = () => {
    resetAllTokens();
  }; 
  return (
    <div className="row sign-up-row">
      <Back />
      <Desktop>
        <div className="col pt-5 sign-up-left">
          <LanguagePopUp />
        </div>
      </Desktop>
      <div className="col">
        <div className="form-center mt-5">
          <DialogTokenExpired
            state={sessionExpiredDialogShown}
            setState={setSessionExpiredDialogShown}
            onRetry={handleDialogRetry}
          />
          <Switch>
            <Route exact path={`${path}`}>
              <Redirect to={`${path}/${routes.SignUpSteps.root}`} />
            </Route>
            <Route
              exact
              path={`${path}/${routes.SignUpSteps.personalInformation}`}
            >
              <PersonInfo
                state={personalInfo}
                setToken={setPersonalInfoToken}
              />
            </Route>
            {!isPersonalInfoEmpty && (
              <Route exact path={`${path}/${routes.SignUpSteps.verification}`}>
                <Verification
                  state={verification}
                  submitToken={personalInfoToken}
                  setToken={setVerificationToken}
                />
              </Route>
            )}
            {(!isVerficationEmpty && !codeValidationSubmitted) && (
              <Route exact path={`${path}/${routes.SignUpSteps.confirmation}`}>
                <CodeValidation
                  state={codeValidation}
                  submitToken={verificationToken}
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
                />
              </Route>
            )}
            {!isPasswordEmpty && (
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
  );
}

export default SignUp;
