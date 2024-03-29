import { InputAdornment, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import NativeButton from "../../../components/Buttons/NativeButton";
import ErrorBubble from "../../../components/ErrorBubble/ErrorBubble";
import Indicator from "../../../components/Indicator/Indicator";
import LoadingForeground from "../../../components/LoadingForeground/LoadingForeground";
import { SessionTwo } from "../../../service/Auth/SignUp/SessionTwo.Service";
import Error from "../../../service/Auth/SignUp/ErrorHandler";
import { routes } from "../../../service/internal-routes";
import { IMaskInput } from "react-imask";
import {
  indicatorTotalSteps,
  verificationStep,
} from "../../../constant/SignUp.Constant";
import i18next from "i18next";
import { useAtom } from "jotai";
import { backTitle, isImageShown } from "../SignUp";

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

const TextMaskCustom = React.forwardRef<HTMLElement>(function TextMaskCustom(
  props: any,
  ref
) {
  const { onChange, ...other }: any = props;
  return (
    <IMaskInput
      {...other}
      mask="(#00) 000-0000"
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value: any, mask) =>
        onChange({ target: { name: props.name, value: mask.unmaskedValue } })
      }
      overwrite
    />
  );
});

const Verification = ({
  state,
  submitToken,
  setToken,
}: VerificationInterface) => {
  const [totalSteps] = useAtom(indicatorTotalSteps);
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
            provider: "phone_provider",
            phoneNumber: `+3730${values.phoneNumber}`,
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
        const message = e.response?.data?.message;
        if (e.message === "Network Error") {
          ErrorHandler.setFieldError("*", t("networkError"));
        } else if (message === "Token expired") {
          window.location.reload()
        } else {
          ErrorHandler.setFieldError("phoneNumber", e.response.data.message);
        }
      }
    },
  });
  const error =
    (formik.errors.phoneNumber && formik.touched.phoneNumber) ||
    errors.phoneNumber?.length > 0;

  //Remove error message when user starts typing again.
  // eslint-disable-next-line
  useEffect(
    () => ErrorHandler.setFieldError("phoneNumber", ""),
    [formik.values.phoneNumber]
  );
  useEffect(() => {
    document.title = `${t("verification")} - Fluency`;
  }, [i18next.language]);

  const [, setLogoShown] = useAtom(isImageShown);
  const [, setBackTitle] = useAtom(backTitle);

  useEffect(() => {
    setLogoShown(false);
    setBackTitle("default")
  }, []);
  return (
    <form className="form-global" onSubmit={formik.handleSubmit}>
      {ErrorHandler.hasErrors() && (
        <ErrorBubble errorList={ErrorHandler.listErrors()} />
      )}
      {formik.isSubmitting && <LoadingForeground />}
      <h4 className="mb-4 form-title">{t("verification")}</h4>
      <Indicator
        className="mb-4"
        value={verificationStep}
        counts={totalSteps}
      />
      <TextField
        helperText={formik.errors.phoneNumber}
        id="demo-helper-text-misaligned"
        label={`${t("phoneNumber")}`}
        name="phoneNumber"
        className="mb-3"
        placeholder="(000)-000-00"
        type="phone"
        error={error}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.phoneNumber}
        InputProps={{
          inputComponent: TextMaskCustom as any,
          startAdornment: (
            <InputAdornment position="start">+373</InputAdornment>
          ),
        }}
      />
      <NativeButton className="mt-3" type="submit" title={t("next")} />
      {/* <hr />
      <small className="w-100 form-disclaimer">
        {t("disclaimerVerification")}
      </small> */}
    </form>
  );
};

export default Verification;
