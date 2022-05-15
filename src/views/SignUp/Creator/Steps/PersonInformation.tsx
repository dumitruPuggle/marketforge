import { TextField } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import NativeButton from "../../../../components/Buttons/NativeButton";
import Indicator from "../../../../components/Indicator/Indicator";
import { signUpSession1 } from "../../../../service/Auth/Creator/endpoints";
import { routes } from "../../../../service/internal-routes";
import { resetTempToken, setTempToken } from "../../../../service/miscellaneous/tempTokenUtils";
import { personalInfoStep, totalSteps } from "../SignUp";

interface IPersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
}

const PersonInfo = ({ state }: any) => {
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

  type errorFieldTypes = "firstName" | "lastName" | "email" | "*";

  const setError = (field: errorFieldTypes, error: string) => {
    setErrors({ ...errors, [field]: error });
  };

  const hasErrors = (key?: errorFieldTypes) => {
    if (!key) {
      //IF theres no key, check if there are any errors
      return Object.values(errors).some((key) => key !== "");
    }
    return errors[key] !== "";
  };

  const resetAllErrors = () => {
    setErrors(errorsInitialState);
  };

  const listErrors = () => {
    return Object.values(errors).filter((key) => key !== "");
  };

  const formik = useFormik({
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
    onSubmit: async function (values: IPersonalInfo) {
      setPersonalInfo(values);
      try {
        const { token } = await signUpSession1(values);
        setTempToken(token)
        history.push(`${routes.SignUp}/${routes.SignUpSteps.verification}`);
        if (hasErrors()) {
          resetAllErrors();
        }
      } catch (e: any) {
        const userExists = e?.response?.data?.message === "User already exists";
        if (e.message === "Network Error") {
          setError("*", t("networkError"));
        } else if (userExists && e.response.status === 403) {
          setError("email", t("emailAlreadyExists"));
        } else if (
          e.response?.status === 403 &&
          e.response.data?.field === "email" &&
          !userExists
        ) {
          setError("email", t("invalidEmail"));
        } else {
          setError("*", t("unknownError"));
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
    errors.email === t("invalidEmail") ||
    errors.email === t("emailAlreadyExists")
      ? true
      : false;

  // Remove error message when user starts typing again.
  useEffect(() => setError("email", ""), [formik.values.email]);

  //Reset the temptoken to avoid going through errors
  useEffect(() => resetTempToken(), []);
  return (
    <form className="form-global" onSubmit={formik.handleSubmit}>
      {hasErrors() &&
        listErrors().map((error: string, index: number) => {
          return (
            <p key={index} className="error-message mb-2">
              {error}
            </p>
          );
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
};

export default PersonInfo;
