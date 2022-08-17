import { TextField } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Prompt, useHistory } from "react-router-dom";
import * as Yup from "yup";
import NativeButton from "../../../../components/Buttons/NativeButton";
import ErrorBubble from "../../../../components/ErrorBubble/ErrorBubble";
import Indicator from "../../../../components/Indicator/Indicator";
import LoadingForeground from "../../../../components/LoadingForeground/LoadingForeground";
import StrengthBox from "../../../../components/StrengthBox/StrengthBox";
import { SessionFour } from "../../../../service/Auth/Creator/Auth.SessionFour";
import Error from "../../../../service/Auth/Creator/ErrorHandler";
import { routes } from "../../../../service/internal-routes";

interface IPasswordServiceProps {
  state: [object, Function];
  submitToken: string;
  indicator?: {
    value: number;
    counts: number;
  };
}

function PasswordService({
  indicator,
  state,
  submitToken,
}: IPasswordServiceProps) {
  const history = useHistory();
  const { t } = useTranslation();

  const [passwordState, setState] = state;

  const errorsInitialState = {
    password: "",
    "*": "",
  };
  const [errors, setErrors] = useState(errorsInitialState);
  const ErrorHandler = new Error(errors, setErrors, errorsInitialState);

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: Yup.object({}),
    onSubmit: async function (values) {
      setState({ ...passwordState, password: values.password });
      try {
        const {token} = await new SessionFour().submit(
          { password: values.password },
          { _temptoken: submitToken }
        );
        localStorage.setItem("authToken", token);
        history.push(`${routes.SignUp}/${routes.SignUpSteps.finish}`);
      } catch (e: any) {
        if (e.message === "Network Error") {
          ErrorHandler.setFieldError("*", t("networkError"));
        } else {
          ErrorHandler.setFieldError("password", e.response.data.message);
        }
      }
    },
  });

  // Remove error message when user starts typing again.
  useEffect(
    () => ErrorHandler.setFieldError("password", ""),
    [formik.values.password]
  );

  return (
    <form className="form-global" onSubmit={formik.handleSubmit}>
      <Prompt
        message={(location, action) => {
          if (location.pathname.endsWith("finish")){
            return true;
          }
          return false
          // return location.pathname.endsWith("finish")
          //   ? true
          //   : `${t("areYouSureToCancel")}`;
        }}
      />
      {ErrorHandler.hasErrors() && (
        <ErrorBubble errorList={ErrorHandler.listErrors()} />
      )}
      {formik.isSubmitting && <LoadingForeground />}
      <h4 className="mb-4 form-title">{t("createPassword")}</h4>
      {indicator && (
        <Indicator
          className="mb-4"
          value={indicator?.value}
          counts={indicator?.counts}
        />
      )}
      <StrengthBox
        className="mb-4"
        password={formik.values.password}
        firstName={""}
        lastName={""}
      />
      <TextField
        helperText={formik.errors.password}
        variant="filled"
        label={t("password")}
        name="password"
        className="mb-3"
        type="password"
        error={
          (formik.errors.password && formik.touched.password) ||
          errors.password?.length > 0
            ? true
            : false
        }
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
      />
      <NativeButton className="mt-3" type="submit" title={t("createAccount")} />
      <hr />
      <small className="w-100 form-disclaimer">
        {t("disclaimerVerification")}
      </small>
    </form>
  );
}

export default PasswordService;
