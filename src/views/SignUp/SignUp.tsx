import Back from "../../components/Back/Back";
import "./SignUp.css";
import { createContext, useState } from "react";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import { signUpSession1, signUpSession2 } from "../../service/service";
import { warnBeforeClose } from "../../service/warnBeforeClose";
import { useMediaQuery } from "react-responsive";
import SignUpTempTokenSession from "../../service/SignUpTempTokenSession";
import PersonInfo from "./PersonInformation";
import Verification from "./Verification";
import { t } from "i18next";

export const SignUpContext = createContext({});
export const totalSteps = 3;

function SignUp() {
  let { path } = useRouteMatch();

  const history = useHistory();

  /* 
  Since this data does not have any interaction with other components, 
  it's not necessary to wrap it inside a state management tool like redux.
  */
  const [state, setState] = useState({
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
    },
    verification: {
      phoneNumber: "",
    },
  });
  const errorHandler: any = useState({
    personalInfo: {
      error: "",
    },
    verification: {
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
  }
  const hasErrors = (key: string) => errors[key].error !== "";

  //Methods used to handle submit.
  const onPersonalInfoSubmitted = async (values: any) => {
    setState({ ...state, personalInfo: values });
    try {
      const { token } = await signUpSession1(values);
      new SignUpTempTokenSession(token).signUpSession1();
      history.push(`${path}/1`);
      if (hasErrors('personalInfo')) {
        setError('personalInfo', '');
      }
    } catch (e: any) {
      if (e.message === "Network Error") {
        setError("personalInfo", t('networkError'));
      } else if (e.response?.status === 403 && e.response.data?.field === "email") {
        setError("personalInfo", t('invalidEmail'));
      } else {
        setError("personalInfo", t('unknownError'));
      }
    }
  };

  const onVerificationSubmitted = async (values: any) => {
    setState({ ...state, verification: values });
    try {
      await signUpSession2({
        phoneNumber: `+373${values.phoneNumber}`,
        lang: localStorage.getItem("i18nextLng"),
      });
    } catch (e: any) {
      if (e.message === "Network Error") {
        setError("verification", t('networkError'));
      } else if (e.response?.status === 403 && e.response.data?.field === "phoneNumber") {
        setError("verification", t('invalidPhoneNumber'));
      }
    }
  };

  //Warn user before closing the window, if he is not done with the sign up process.
  const isEmpty = !Object.values(state.personalInfo).some(
    (x: any) => x !== null && x !== ""
  );
  warnBeforeClose(!isEmpty);

  //Media queries for responsiveness.
  const Desktop = ({ children }: any) => {
    const isDesktop = useMediaQuery({ minWidth: 992 });
    return isDesktop ? children : null;
  };

  const personalInfoError = errors?.personalInfo?.error;
  const verificationError = errors?.verification?.error;
  return (
    <SignUpContext.Provider value={{state, errors, hasErrors, setState, setError}}>
      <div className="row sign-up-row">
        <Back />
        <Desktop>
          <div className="col pt-5 sign-up-left"></div>
        </Desktop>
        <div className="col">
          <div className="form-center mt-5">
            <Switch>
              <Route exact path={`${path}`}>
                {personalInfoError.length > 0 && (
                  <p className="error-message">{personalInfoError}</p>
                )}
                <PersonInfo
                  defValues={state.personalInfo}
                  onSubmit={onPersonalInfoSubmitted}
                />
              </Route>
              {!isEmpty && (
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
