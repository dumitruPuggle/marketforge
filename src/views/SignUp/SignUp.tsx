import { useEffect, useState } from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
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
import DialogTokenExpired from "../../components/DialogTokenExpired/DialogTokenExpired";
import { routes } from "../../service/internal-routes";
import TokenExpiration from "../../service/Auth/SignUp/TokenExpiration";
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
import { useAtom } from "jotai";

function SignUp() {
  const [totalSteps, setIndicatorTotalSteps] = useAtom(indicatorTotalSteps);
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
  
  console.log(codeValidationToken)
  // Password Creation
  const password = useState({
    password: "",
  });
  
  // Media queries for responsiveness.
  // const Desktop = ({ children }: any) => {
  //   const isDesktop = useMediaQuery({ minWidth: 992 });
  //   return isDesktop ? children : null;
  // };

  const isEmpty = (objectLink: object) => {
    return !Object.values(objectLink).some((x: any) => x !== null && x !== "");
  };

  /* 
  Truth statements, used to manage the routes
  Example: If PersonalInfo is completed -> Verification Route will be available.
  */
  const isPersonalInfoCompleted = !isEmpty(personalInfo[0]);
  const isVerficationCompleted = emailVerification[0].email.length > 0 || verification[0].phoneNumber.length > 0
  const [codeValidationSubmitted, setCodeValidationSubmitted] = useState(false);
  const isPasswordCompleted = !isEmpty(password[0]);

  // Is Session Expired? In case it is, it will push to /
  const [sessionExpiredDialogShown, setSessionExpiredDialogShown] =
    useState<boolean>(false);

  const resetAllTokens = () => {
    setPersonalInfoToken("");
    setVerificationToken("");
    setCodeValidationToken("");
    setEmailVerificationToken("");
  };

  // Mechansim that computes if the SignUp session has been expired.
  const deps = [
    personalInfoToken,
    verificationToken,
    codeValidationToken,
    window.location.href,
    personalInfo,
    verification,
    codeValidation,
    emailVerificationToken,
  ];
  useEffect(() => {
    const currentPath = () => {
      // const pathSplitNumber = routes.SignUpSteps.pathLevelSplit;
      // const pathLevel = window.location.pathname.split("/")[pathSplitNumber];
      // const pathIndex = parseInt(pathLevel) - 2;
      // if (pathIndex >= 0) {
      //   return pathIndex;
      // }
      // return 0;
      // var lastNumber = url.substr(url.lastIndexOf('/') + 1);
      return 5;
    };
    const tokens = [
      personalInfoToken,
      verificationToken,
      codeValidationToken,
      emailVerificationToken,
    ];
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

  /*
   When the session expired, a Dialog will be displayed, this function will reset all user tokens
   in order to restart SignUp process.
   */
  const handleDialogRetry = () => {
    resetAllTokens();
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
  const rawUserSearchParam = queryString.parse(document.location.search)?.u_type?.toString();
  const sanitizeUserTypeFromParam = (u_type: string | undefined) => {
    if (!u_type){
      return defUserType;
    }
    if (userTypes.includes(u_type)){
      return u_type;
    }
    return defUserType;
  }

  // Implement changes on the sessions based on each individual user-type
  const [userType, setUserType] = useState(sanitizeUserTypeFromParam(rawUserSearchParam));
  useEffect(() => {
    setIndicatorTotalSteps(userTypesIndicators[userTypes.indexOf(userType)])
  }, [userType])
  
  const isMobile = useMediaQuery({ query: '(max-width: 500px)' })
  return (
    <div className="row sign-up-row">
      <Back />
      {/* <Desktop>
        <div
          style={{ borderRight: "0.5px solid #4242" }}
          className="col pt-5 sign-up-left"
        >
          <LanguagePopUp />
        </div>
      </Desktop> */}
      <LanguagePopUp style={{
        right: 0,
        bottom: 10,
        left: 0,
        ...(isMobile && {
          top: 45,
          paddingLeft: 15,
          bottom: undefined,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start'
        })
      }}/>
      <div className="col">
        <div className="form-center mt-5 fade-in-image">
          <DialogTokenExpired
            state={sessionExpiredDialogShown}
            setState={setSessionExpiredDialogShown}
            onRetry={handleDialogRetry}
          />
          <img draggable={false} alt="" src={AppIcon} style={{width: 100 }} />
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
              />
            </Route>
            {isPersonalInfoCompleted && (
              <Route exact path={`${path}/${routes.SignUpSteps.verification}`}>
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
              <Route exact path={`${path}/${routes.SignUpSteps.confirmation}`}>
                <CodeValidation
                  state={codeValidation}
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
                />
              </Route>
            )}
            {!isPasswordCompleted && (
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
