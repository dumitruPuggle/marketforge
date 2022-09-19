import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import NativeButton from "../../../../components/Buttons/NativeButton";
import CodeInput from "../../../../components/CodeInput/CodeInput";
import Indicator from "../../../../components/Indicator/Indicator";
import { codeValidationStep, totalSteps } from "../SignUp";
import { routes } from "../../../../service/internal-routes";
import { useHistory } from "react-router-dom";
import Timer from "../../../../components/Timer/Timer";
import jwtDecode from "jwt-decode";
import { useState } from "react";
import Error from "../../../../service/Auth/Creator/ErrorHandler";
import ErrorBubble from "../../../../components/ErrorBubble/ErrorBubble";
import LoadingForeground from "../../../../components/LoadingForeground/LoadingForeground";
import { SessionThree } from "../../../../service/Auth/Creator/SessionThree.Service";

type CodeVerificationState = {
  code: Array<any>;
}

interface ICodeVerificationError {
  code: string;
  "*": string;
}

interface CodeVerificationInterface {
  state: [CodeVerificationState, React.Dispatch<React.SetStateAction<CodeVerificationState>>];
  submitToken: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  onApproved: () => void;
}

function CodeValidation({ state, submitToken, setToken, onApproved }: CodeVerificationInterface) {
  const history = useHistory();
  const { t } = useTranslation();

  const [codeValidation] = state;

  const errorsInitialState = {
    code: "",
    "*": "",
  };
  const [errors, setErrors] =
    useState<ICodeVerificationError>(errorsInitialState);
  const ErrorHandler = new Error(errors, setErrors, errorsInitialState);

  const expirationTime = () => {
    if (!submitToken) return 0;
    const decodedToken: any = jwtDecode(submitToken);
    return decodedToken["exp"] * 1000;
  };

  const formik = useFormik({
    initialValues: {
      code: codeValidation.code,
    },
    validationSchema: Yup.object({
      code: Yup.array().of(Yup.number().required(t("required"))),
    }),
    onSubmit: async function (values: CodeVerificationState): Promise<void> {
      if (!submitToken) return;
      try {
        const { token } = await new SessionThree().submit(
          {
            code: values.code.join(""),
          },
          { _temptoken: submitToken }
        );
        setToken(token);
        onApproved();
        history.push(`${routes.SignUp}/${routes.SignUpSteps.passwordService}`);
      } catch (e: any) {
        const message = e.response?.data?.message;
        if (message === "Invalid code") {
          ErrorHandler.setFieldError("code", t("invalidCode"));
        } else if (message === "Token expired") {
          ErrorHandler.setFieldError("*", t("sessionExpired"));
          history.push('?token=expired');
        }
      }
    },
  });
  const handleValueChange = (value: Array<number | null>) => {
    formik.setFieldValue("code", value);
  };
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
        value={codeValidationStep}
        counts={totalSteps}
      />
      {
        <CodeInput
          value={formik.values.code}
          onValueChange={handleValueChange}
        />
      }
      <NativeButton className="mt-3" type="submit" title={t("next")} />
      <hr />
      <small className="w-100 form-disclaimer">
        {t("disclaimerVerification")}
      </small>
      {submitToken && <Timer endTime={expirationTime()} />}
    </form>
  );
}

export default CodeValidation;
