import { TextField } from "@mui/material";
import { useFormik } from "formik";
import i18next from "i18next";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import NativeButton from "../../../components/Buttons/NativeButton";
import Indicator from "../../../components/Indicator/Indicator";
import Error from "../../../service/Auth/SignUp/ErrorHandler";
import { routes } from "../../../service/internal-routes";
import ErrorBubble from "../../../components/ErrorBubble/ErrorBubble";
import LoadingForeground from "../../../components/LoadingForeground/LoadingForeground";
import { SessionOne } from "../../../service/Auth/SignUp/SessionOne.Service";
import { isImageShown, verifyExistingAccountAtom } from "../SignUp";
import {
  personalInfoStep,
  indicatorTotalSteps,
} from "../../../constant/SignUp.Constant";
import { useAtom } from "jotai";
import { emailVerificationSubmitted } from "../../../constant/SignUp.Constant";
import GoogleSignInButton from "../../../components/GoogleSignInButton/GoogleSignInButton";

type PersonalInfoState = {
  firstName: string;
  lastName: string;
  email: string;
};

interface PersonInfoInterface {
  state: [PersonalInfoState, Function];
  setToken: Function;
  onGoogleProviderClick: (submit: Function) => void;
}

function PersonInfo({
  state,
  setToken,
  onGoogleProviderClick,
}: PersonInfoInterface) {
  const [verifyExistingAccount, setVerifyExistingAccount] = useAtom(
    verifyExistingAccountAtom
  );
  const [totalSteps] = useAtom(indicatorTotalSteps);
  const { t } = useTranslation();
  const history = useHistory();

  const [personalInfo, setPersonalInfo] = state;

  const errorsInitialState = {
    firstName: "",
    lastName: "",
    email: "",
    "*": "",
  };
  const [errors, setErrors] = useState(errorsInitialState);
  const ErrorHandler = new Error(errors, setErrors, errorsInitialState);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: personalInfo.firstName,
      lastName: personalInfo.lastName,
      email: personalInfo.email,
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required(t("required")),
      lastName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required(t("required")),
      email: Yup.string().email(t("invalidAddress")).required(t("required")),
    }),
    onSubmit: async function (values: PersonalInfoState): Promise<void> {
      setPersonalInfo(values);
      try {
        const { token } = await new SessionOne().submit({
          verifyExistingAccount,
          lang: i18next.language,
          ...values,
        });
        setToken(token);
        history.push(`${routes.SignUp}/${routes.SignUpSteps.verification}`);
        if (ErrorHandler.hasErrors()) {
          ErrorHandler.resetAllErrors();
        }
      } catch (e: any) {
        setVerifyExistingAccount(false);
        const message = e?.response?.data?.message;
        if (e.message === "Network Error") {
          ErrorHandler.setFieldError("*", t("networkError"));
        } else if (message.includes("204")) {
          ErrorHandler.setFieldError(
            "email",
            t("thisAccountHasBeenAlreadyCreated")
          );
        } else {
          ErrorHandler.setFieldError("*", message);
        }
      }
    },
  });

  const firstNameError =
    formik.errors.firstName && formik.touched.firstName ? true : false;
  const lastNameError =
    formik.errors.lastName && formik.touched.lastName ? true : false;
  const emailError =
    (formik.errors.email && formik.touched.email) || errors.email.length > 0;

  // Remove error message when user starts typing again.
  useEffect(
    () => ErrorHandler.setFieldError("email", ""),
    [formik.values.email]
  );

  //Reset the token to avoid going through errors
  useEffect(() => setToken(""), []);
  useEffect(() => {
    document.title = `${t("signup")} - Fluency`;
  }, [i18next.language]);

  // Reset email state
  const [, setLogoShown] = useAtom(isImageShown);
  const [, setEmailVerificationSubmitted] = useAtom(emailVerificationSubmitted);
  useEffect(() => {
    setEmailVerificationSubmitted(false);
    setLogoShown(true);
  }, []);
  return (
    <form className="form-global" onSubmit={formik.handleSubmit}>
      {ErrorHandler.hasErrors() && (
        <ErrorBubble errorList={ErrorHandler.listErrors()} />
      )}
      {formik.isSubmitting && <LoadingForeground />}
      <h4 className="form-title">{t("signup-welcome")}</h4>
      {/* <UserTypeInput
        hidden
        className="mb-4"
        userType={userType}
        list={userTypes}
        onSelect={handleUserTypeSelect}
      /> */}
      <Indicator
        className="mb-4 mt-4"
        value={personalInfoStep}
        counts={totalSteps}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TextField
          helperText={formik.errors.firstName}
          id="demo-helper-text-misaligned"
          label={t("firstName")}
          name="firstName"
          className="mb-3"
          type="name"
          style={{ width: "48.5%" }}
          error={firstNameError}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.firstName}
        />
        <TextField
          helperText={formik.errors.lastName}
          id="demo-helper-text-misaligned"
          label={t("lastName")}
          name="lastName"
          className="mb-3"
          type="name"
          style={{ width: "48.5%" }}
          error={lastNameError}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.lastName}
        />
      </div>
      <TextField
        helperText={formik.errors.email}
        id="demo-helper-text-misaligned"
        label={t("email")}
        name="email"
        type="email"
        className="mb-3"
        error={emailError}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
      />
      <NativeButton className="mt-3" type="submit" title={t("next")} />
      <hr />
      <GoogleSignInButton
        type="sign-up"
        onClick={() => onGoogleProviderClick(formik.handleSubmit)}
      />
    </form>
  );
}

export default PersonInfo;
