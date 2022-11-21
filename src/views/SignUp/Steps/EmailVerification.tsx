import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import NativeButton from "../../../components/Buttons/NativeButton";
import Indicator from "../../../components/Indicator/Indicator";
import LoadingForeground from "../../../components/LoadingForeground/LoadingForeground";
import { useHistory } from "react-router-dom";
import { routes } from "../../../service/internal-routes";
import { defaults } from "../../../defaults";
import { indicatorTotalSteps, verificationStep } from "../../../constant/SignUp.Constant";
import { SessionTwoEmail } from "../../../service/Auth/SignUp/SessionTwo.Email.Service";
import Error from "../../../service/Auth/SignUp/ErrorHandler";
import { lang } from "../../../translation/utils";
import i18next from "i18next";
import { useAtom } from "jotai";
import { emailVerificationSubmitted } from "../../../constant/SignUp.Constant";

type VerificationState = {
  email: string;
};

interface VerificationInterface {
  state: [
    VerificationState,
    React.Dispatch<React.SetStateAction<VerificationState>>
  ];
  submitToken: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  defaultEmail: string;
}

function EmailVerification({
  state,
  submitToken,
  setToken,
  defaultEmail
}: VerificationInterface) {
  const [totalSteps,] = useAtom(indicatorTotalSteps);
  const [formSubmitted, setSubmitted] = useAtom(emailVerificationSubmitted)
	const history = useHistory();
  const { t } = useTranslation();
	const [verification, setVerification] = state;

	const errorsInitialState = {
    email: "",
    "*": "",
  };

	const [errors, setErrors] = useState(errorsInitialState);
	const ErrorHandler = new Error(errors, setErrors, errorsInitialState);

  const formik = useFormik({
    initialValues: {
      email: defaultEmail
    },
    onSubmit: async (values) => {
      if (!submitToken) return;
      setVerification({ ...verification, email: values.email });
      try {
        const { token } = await new SessionTwoEmail().submit(
          {
            provider: "email_provider",
            email: values.email,
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
          ErrorHandler.setFieldError("email", e.response.data.message);
        }
      }
		},
  });
  useEffect(() => {
    // Automatically submit form, if not submitted
    if (!formSubmitted){
      formik.handleSubmit()
      setSubmitted(true)
    }
  }, [])
  useEffect(() => {
    document.title = `${t('verification')} - Fluency`
  }, [i18next.language])
  return (
    <form className="form-global" onSubmit={formik.handleSubmit}>
      {formik.isSubmitting && <LoadingForeground />}
      <h4 className="mb-4 form-title">{t("verification")}</h4>
      <Indicator
        className="mb-4"
        value={verificationStep}
        counts={totalSteps}
      />
			<div style={{ position: "relative" }}>
        <TextField
          disabled={true}
          // helperText={formik.errors.email}
          id="demo-helper-text-misaligned"
          label={t("email")}
          name="email"
          type="email"
          className="w-100 mt-2 mb-2"
          // error={emailError}
          // onChange={formik.handleChange}
          // onBlur={formik.handleBlur}
          defaultValue={formik.values.email}
        />
      </div>
      <NativeButton className="mt-3" type="submit" title={t("next")} />
      {/* <hr />
      <small className="w-100 form-disclaimer">
        {t("disclaimerVerification")}
      </small> */}
    </form>
  );
}

export default EmailVerification;
