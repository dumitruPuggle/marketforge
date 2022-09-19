import { TextField } from "@mui/material";
import { Formik, useFormik } from "formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import NativeButton from "../../../../components/Buttons/NativeButton";
import ErrorBubble from "../../../../components/ErrorBubble/ErrorBubble";
import Indicator from "../../../../components/Indicator/Indicator";
import LoadingForeground from "../../../../components/LoadingForeground/LoadingForeground";
import { defaults } from "../../../../defaults";
import { SessionTwo } from "../../../../service/Auth/Creator/SessionTwo.Service";
import Error from "../../../../service/Auth/Creator/ErrorHandler";
import { routes } from "../../../../service/internal-routes";
import { lang } from "../../../../translation/utils";
import { totalSteps, verificationStep } from "../SignUp";

type VerificationState = {
  phoneNumber: string;
};
interface VerificationInterface {
  state: [
    VerificationState,
    React.Dispatch<React.SetStateAction<VerificationState>>
  ];
  submitToken: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

const Verification = ({
  state,
  submitToken,
  setToken,
}: VerificationInterface) => {
  const { t } = useTranslation();
  const history = useHistory();

  const [verification, setVerification] = state;

  const errorsInitialState = {
    phoneNumber: "",
    "*": "",
  };

  const [errors, setErrors] = useState(errorsInitialState);
  const ErrorHandler = new Error(errors, setErrors, errorsInitialState);

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const formik = useFormik({
    initialValues: {
      phoneNumber: verification.phoneNumber,
    },
    validationSchema: Yup.object({
      phoneNumber: Yup.string()
        .matches(phoneRegExp, t("invalidPhoneNumber"))
        .max(13, t("invalidPhoneNumber"))
        .required(t("required")),
    }),
    onSubmit: async function (values) {
      if (!submitToken) return;
      setVerification({ ...verification, phoneNumber: values.phoneNumber });
      try {
        const { token } = await new SessionTwo().submit(
          {
            phoneNumber: `+373${values.phoneNumber}`,
            lang: (localStorage.getItem("i18nextLng") || defaults.lang) as lang,
          },
          {
            _temptoken: submitToken,
          }
        );
        setToken(token);
        history.push(`${routes.SignUp}/${routes.SignUpSteps.confirmation}`);
        if (ErrorHandler.hasErrors()) {
          ErrorHandler.resetAllErrors();
        }
      } catch (e: any) {
        if (e.message === "Network Error") {
          ErrorHandler.setFieldError("*", t("networkError"));
        } else {
          ErrorHandler.setFieldError("phoneNumber", e.response.data.message);
        }
      }
    },
  });
  const error =
    (formik.errors.phoneNumber && formik.touched.phoneNumber) ||
    errors.phoneNumber?.length > 0

  //Remove error message when user starts typing again.
  // eslint-disable-next-line
  useEffect(
    () => ErrorHandler.setFieldError("phoneNumber", ""),
    [formik.values.phoneNumber]
  );
  return (
    <form className="form-global" onSubmit={formik.handleSubmit}>
      {ErrorHandler.hasErrors() && (
        <ErrorBubble errorList={ErrorHandler.listErrors()} />
      )}
      {
        formik.isSubmitting &&
        <LoadingForeground />
      }
      <h4 className="mb-4 form-title">{t("verification")}</h4>
      <Indicator
        className="mb-4"
        value={verificationStep}
        counts={totalSteps}
      />
      <TextField
        helperText={formik.errors.phoneNumber}
        id="demo-helper-text-misaligned"
        label={`${t("phoneNumber")} (+373)`}
        name="phoneNumber"
        className="mb-3"
        placeholder="0 (000)-000-00"
        type="phone"
        error={error}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.phoneNumber}
      />
      <NativeButton className="mt-3" type="submit" title={t("next")} />
      <hr />
      <small className="w-100 form-disclaimer">
        {t("disclaimerVerification")}
      </small>
    </form>
  );
};

export default Verification;
