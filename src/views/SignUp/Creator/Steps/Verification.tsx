import { TextField } from "@mui/material";
import { useFormik } from "formik";
import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import NativeButton from "../../../../components/Buttons/NativeButton";
import Indicator from "../../../../components/Indicator/Indicator";
import { SignUpContext, totalSteps, verificationStep } from "../SignUp";

const Verification = ({ onSubmit, defValues }: any) => {
  const { errors, setError }: any = useContext(SignUpContext);
  const { t } = useTranslation();
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const formik = useFormik({
    initialValues: {
      phoneNumber: defValues.phoneNumber,
    },
    validationSchema: Yup.object({
      phoneNumber: Yup.string()
        .matches(phoneRegExp, t("invalidPhoneNumber"))
        .max(9, t("invalidPhoneNumber"))
        .required(t("required")),
    }),
    onSubmit: (values) => {
      onSubmit(values);
    },
  });
  const error =
    (formik.errors.phoneNumber && formik.touched.phoneNumber) ||
    errors.verification.error === t("invalidPhoneNumber")
      ? true
      : false;

  //Remove error message when user starts typing again.
  // eslint-disable-next-line
  useEffect(() => setError("verification", ""), [formik.values.phoneNumber]);
  return (
    <form className="form-global" onSubmit={formik.handleSubmit}>
      <h4 className="mb-4 form-title">{t("verification")}</h4>
      <Indicator className="mb-4" value={verificationStep} counts={totalSteps} />
      <TextField
        helperText={formik.errors.phoneNumber}
        id="demo-helper-text-misaligned"
        label={t("phoneNumber")}
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
