import { TextField } from "@mui/material";
import { useFormik } from "formik";
import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import NativeButton from "../../../../components/Buttons/NativeButton";
import Indicator from "../../../../components/Indicator/Indicator";
import { personalInfoStep, SignUpContext, totalSteps } from "../SignUp";

const PersonInfo = ({ onSubmit, defValues }: any) => {
  const {errors, setError} : any = useContext(SignUpContext);
  const { t } = useTranslation();
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
    onSubmit: (values) => onSubmit(values)
  });

  // eslint-disable-next-line
  const firstNameError = formik.errors.firstName && formik.touched.firstName ? true : false
  // eslint-disable-next-line
  const lastNameError = formik.errors.lastName && formik.touched.lastName ? true : false
  // eslint-disable-next-line
  const emailError = formik.errors.email && formik.touched.email || errors.personalInfo.error === t('invalidEmail') ? true : false

  //Remove error message when user starts typing again.
  // eslint-disable-next-line
  useEffect(() => setError('personalInfo', ''), [formik.values.email]);
  return (
    <form className="form-global" onSubmit={formik.handleSubmit}>
      <h4 className="mb-4 form-title">{t("signup")}</h4>
      <Indicator className="mb-4" value={personalInfoStep} counts={totalSteps} />
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