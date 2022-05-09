import Back from "../../../components/Back/Back";
import "./SignUp.css";
import { createContext, useContext, useEffect, useState } from "react";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import { warnBeforeClose } from "../../../service/miscellaneous/warnBeforeClose";
import { useMediaQuery } from "react-responsive";
import PersonInfo from "./Steps/PersonInformation";
import Verification from "./Steps/Verification";
import CodeValidation from "../../../components/CodeValidation";
import PasswordService from "./Steps/CreatePassword";
import { Classes, Dialog } from "@blueprintjs/core";
import { useTranslation } from "react-i18next";
import {
  signUpSession1,
  signUpSession2,
  signUpSession3,
} from "../../../service/Auth/Creator/endpoints";
import SignUpTempTokenSession from "../../../service/Auth/Creator/SignUpTempTokenSession";
import PersonalInformationHandler from "../../../store/PersonalInformationHandler";

export const SignUpContext = createContext({});
export const totalSteps = 4;
export const personalInfoStep = 0;
export const verificationStep = 1;
export const codeValidationStep = 2;
export const passwordServiceStep = 3;

function SignUp() {
  let { path } = useRouteMatch();
  const tempToken = localStorage.getItem("_temptoken") || "";

  const { t } = useTranslation();
  const history = useHistory();

  const [state, setState] = useState({
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
    },
    verification: {
      phoneNumber: "",
    },
    codeValidation: {
      code: [null, null, null, null, null, null],
    },
    passwordService: {
      password: "",
    },
  });
  
  const errorHandler: any = useState({
    personalInfo: {
      error: "",
    },
    verification: {
      error: "",
    },
    codeValidation: {
      error: "",
    },
    passwordService: {
      error: "",
    },
  });

  const errors = errorHandler[0];
  const setError = (key: string, value: string) => {
    errorHandler[1]({
      ...errors,
      [key]: {
        error: value,
      },
    });
  };
  const hasErrors = (key: string) => errors[key].error !== "";

  const onVerificationSubmitted = async (values: any) => {
    setState({ ...state, verification: values });
    try {
      const { token } = await signUpSession2(
        {
          phoneNumber: `+373${values.phoneNumber}`,
          lang: localStorage.getItem("i18nextLng"),
        },
        { _temptoken: tempToken }
      );
      new SignUpTempTokenSession(token).setToken();
      history.push(`${path}/2`);
      if (hasErrors("verification")) {
        setError("verification", "");
      }
    } catch (e: any) {
      if (e.message === "Network Error") {
        setError("verification", t("networkError"));
      } else if (
        e.response?.status === 403 &&
        e.response.data?.field === "phoneNumber"
      ) {
        setError("verification", t("invalidPhoneNumber"));
      }
    }
  };

  const onCodeValidationSubmitted = async (values: any) => {
    try {
      await signUpSession3(
        {
          code: values.code.join(""),
        },
        { _temptoken: tempToken }
      );
      history.push(`${path}/password-service`);
    } catch (e: any) {
      alert("error");
    }
  };
  const handlePasswordServiceSubmit = async (values: any) => {
    const history = useHistory();
    let { path } = useRouteMatch();

    history.push(`${path}/finish-sign-up`);
  };

  //Warn user before closing the window, if he is not done with the sign up process.
  const isPersonalInfoEmpty = false
  
  warnBeforeClose(!isPersonalInfoEmpty);

  const isVerficationEmpty = !Object.values(state.verification).some(
    (x: any) => x !== null && x !== ""
  );

  const isCodeVerificationEmpty = state.codeValidation.code.every(
    (item: any) => item !== null
  );

  useEffect(() => {
    if (isCodeVerificationEmpty) {
      window.onpopstate = (event) => {
        console.log(
          "location: " +
            document.location +
            ", state: " +
            JSON.stringify(event.state)
        );
        window.history.pushState(null, document.title, window.location.href);
      };
    }
  }, [isCodeVerificationEmpty]);

  //Media queries for responsiveness.
  const Desktop = ({ children }: any) => {
    const isDesktop = useMediaQuery({ minWidth: 992 });
    return isDesktop ? children : null;
  };


  const verificationError = errors?.verification?.error;
  const codeValidationError = errors?.codeValidation?.error;
  return (
    <SignUpContext.Provider
      value={{ state, errors, hasErrors, setState, setError, tempToken }}
    >
      <div className="row sign-up-row">
        <Back />
        <Desktop>
          <div className="col pt-5 sign-up-left"></div>
        </Desktop>
        <div className="col">
          <div className="form-center mt-5">
            <Switch>
              <Route exact path={`${path}`}>
                <PersonInfo />
              </Route>
              {!isPersonalInfoEmpty && (
                <Route exact path={`${path}/1`}>
                  {verificationError.length > 0 && (
                    <p className="error-message">{verificationError}</p>
                  )}
                  <Verification
                    defValues={state.verification}
                    onSubmit={onVerificationSubmitted}
                  />
                </Route>
              )}
              {!isVerficationEmpty && (
                <Route exact path={`${path}/2`}>
                  {codeValidationError.length > 0 && (
                    <p className="error-message">{verificationError}</p>
                  )}
                  <CodeValidation
                    defValues={state.codeValidation}
                    onSubmit={onCodeValidationSubmitted}
                  />
                </Route>
              )}
              {!isCodeVerificationEmpty && (
                <Route exact path={`${path}/password-service`}>
                  <PasswordService
                    indicator={{
                      counts: totalSteps,
                      value: passwordServiceStep,
                    }}
                    onSubmit={handlePasswordServiceSubmit}
                  />
                  <Dialog title="Your password" icon="info-sign" isOpen={true}>
                    <div className={Classes.DIALOG_BODY}>
                      <p>
                        Your password is <b>2240204052_</b>
                      </p>
                    </div>
                  </Dialog>
                </Route>
              )}
              {!isCodeVerificationEmpty && (
                <Route exact path={`${path}/finish-sign-up`}>
                  Success
                </Route>
              )}
              <Route exact path={`*`}>
                <Redirect to={`${path}`} />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </SignUpContext.Provider>
  );
}

export default SignUp;
