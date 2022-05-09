import { TextField } from "@mui/material";
import { useFormik } from "formik";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import NativeButton from "../../../../components/Buttons/NativeButton";
import Indicator from "../../../../components/Indicator/Indicator";
import { signUpSession1 } from "../../../../service/Auth/Creator/endpoints";
import SignUpTempTokenSession from "../../../../service/Auth/Creator/SignUpTempTokenSession";
import { routes } from "../../../../service/internal-routes";
import PersonalInformationHandler from "../../../../store/PersonalInformationHandler";
import { personalInfoStep, totalSteps } from "../SignUp";

const PersonInfo = observer(() => {
  const state = PersonalInformationHandler;
  const { t } = useTranslation();
  const history = useHistory();

  const defValues = state.fields;

  const formik = useFormik({
    initialValues: {
      firstName: defValues.firstName,
      lastName: defValues.lastName,
      email: defValues.email,
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
    onSubmit: async function (values) {
      try {
        const { token } = await signUpSession1(values);
        new SignUpTempTokenSession(token).setToken();
        history.push(`${routes.SignUp}/1`);
        if (state.hasErrors()) {
          state.resetAllErrors();
        }
      } catch (e: any) {
        const userExists = e?.response?.data?.message === "User already exists";
        if (e.message === "Network Error") {
          state.setError("*", t("networkError"));
        } else if (userExists && e.response.status === 403) {
          state.setError("email", t("emailAlreadyExists"));
        } else if (
          e.response?.status === 403 &&
          e.response.data?.field === "email" &&
          !userExists
        ) {
          state.setError("email", t("invalidEmail"));
        } else {
          state.setError("*", t("unknownError"));
        }
      }
    },
  });

  const firstNameError =
    formik.errors.firstName && formik.touched.firstName ? true : false;
  const lastNameError =
    formik.errors.lastName && formik.touched.lastName ? true : false;
  const emailError =
    (formik.errors.email && formik.touched.email) ||
    state.errors.email === t("invalidEmail") ||
    state.errors.email === t("emailAlreadyExists")
      ? true
      : false;

  //Remove error message when user starts typing again.
  useEffect(() => state.setError("email", ""), [formik.values.email]);
  return (
    <form className="form-global" onSubmit={formik.handleSubmit}>
      {state.hasErrors() &&
        state.listErrors().map((error: string, index: number) => {
          return <p key={index} className="error-message mb-2">{error}</p>;
        })}
      <h4 className="mb-4 form-title">{t("signup")}</h4>
      <Indicator
        className="mb-4"
        value={personalInfoStep}
        counts={totalSteps}
      />
      <TextField
        helperText={formik.errors.firstName}
        id="demo-helper-text-misaligned"
        label={t("firstName")}
        name="firstName"
        className="mb-3"
        type="name"
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
        error={lastNameError}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.lastName}
      />
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
      <small className="w-100 form-disclaimer">
        {t("disclaimerPersonalInfo")}
      </small>
    </form>
  );
});

export default PersonInfo;
