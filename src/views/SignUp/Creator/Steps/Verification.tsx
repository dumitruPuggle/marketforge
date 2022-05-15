import { TextField } from "@mui/material";
import { useFormik } from "formik";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import NativeButton from "../../../../components/Buttons/NativeButton";
import Indicator from "../../../../components/Indicator/Indicator";
import Timer from "../../../../components/Timer/Timer";
import { defaults } from "../../../../defaults";
import { signUpSession2 } from "../../../../service/Auth/Creator/endpoints";
import { routes } from "../../../../service/internal-routes";
import { getTempToken } from "../../../../service/miscellaneous/tempTokenUtils";
import { totalSteps, verificationStep } from "../SignUp";

const Verification = ({ state }: any) => {
  const { t } = useTranslation();
  const history = useHistory();

  const [verification, setVerification] = state;

  const errorsInitialState = {
    phoneNumber: "",
    "*": "",
  };

  const [errors, setErrors] = useState(errorsInitialState);

  type errorFieldTypes = "phoneNumber" | "*";

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

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;


  const _temptoken = getTempToken()

  const formik = useFormik({
    initialValues: {
      phoneNumber: verification.phoneNumber,
    },
    validationSchema: Yup.object({
      phoneNumber: Yup.string()
        .matches(phoneRegExp, t("invalidPhoneNumber"))
        .max(9, t("invalidPhoneNumber"))
        .required(t("required")),
    }),
    onSubmit: async function (values) {
      if (!_temptoken) return
      setVerification({ ...verification, phoneNumber: values.phoneNumber });
      try {
        const { token } = await signUpSession2(
          {
            phoneNumber: `+373${values.phoneNumber}`,
            lang: localStorage.getItem("i18nextLng") || defaults.lang,
          },
          {
            _temptoken,
          }
        );
        localStorage.setItem("_temptoken", token);
        history.push(`${routes.SignUp}/2`);
        if (hasErrors()) {
          resetAllErrors();
        }
      } catch (e: any) {
        if (e.message === "Network Error") {
          setError("*", t("networkError"));
        } else if (
          e.response?.status === 403 &&
          e.response.data?.field === "phoneNumber"
        ) {
          setError("phoneNumber", t("invalidPhoneNumber"));
        }
      }
    },
  });
  const error =
    (formik.errors.phoneNumber && formik.touched.phoneNumber) ||
    errors.phoneNumber === t("invalidPhoneNumber")
      ? true
      : false;

  //Remove error message when user starts typing again.
  // eslint-disable-next-line
  useEffect(() => setError("phoneNumber", ""), [formik.values.phoneNumber]);
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
      <h4 className="mb-4 form-title">{t("verification")}</h4>
      <Indicator
        className="mb-4"
        value={verificationStep}
        counts={totalSteps}
      />
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
