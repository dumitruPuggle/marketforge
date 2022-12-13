import { TextField } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, getFirestore } from "firebase/firestore";
import { Prompt, useHistory } from "react-router-dom";
import * as Yup from "yup";
import NativeButton from "../../../components/Buttons/NativeButton";
import ErrorBubble from "../../../components/ErrorBubble/ErrorBubble";
import Indicator from "../../../components/Indicator/Indicator";
import LoadingForeground from "../../../components/LoadingForeground/LoadingForeground";
import StrengthBox from "../../../components/StrengthBox/StrengthBox";
import { SessionFour } from "../../../service/Auth/SignUp/SessionFour.Service";
import Error from "../../../service/Auth/SignUp/ErrorHandler";
import { routes } from "../../../service/internal-routes";
import { version } from "../../../constant/version";
import { useAtom } from "jotai";
import { backShown, backTitle } from "../SignUp";

interface IPasswordServiceProps {
  state: [object, Function];
  submitToken: string;
  indicator: {
    value: number;
    counts: number;
  };
  otherState: {
    email: string;
  };
}

function PasswordService({
  indicator,
  state,
  submitToken,
  otherState,
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
    validationSchema: Yup.object({
      password: Yup.string()
        .required(t("required"))
        .min(8, t("passwordTooShort"))
        .max(100, t("passwordTooLong")),
    }),
    onSubmit: async function (values) {
      setState({ ...passwordState, password: values.password });
      const appVersion = {
        version,
      };
      const db = getFirestore();
      try {
        await new SessionFour().submit(
          { password: values.password },
          { _temptoken: submitToken }
        );
        // Sign In using Firebase
        const auth = getAuth();
        await signInWithEmailAndPassword(
          auth,
          otherState.email,
          values.password
        );

        // Include app version
        const uid = auth?.currentUser?.uid;
        try {
          await setDoc(doc(db, `/users/${uid}/other-data/app`), {
            ...appVersion,
          });
        } catch (e) {
          console.log(e);
          ErrorHandler.setFieldError("*", t("unknownError"));
        }
        if (indicator.counts === 5) {
          history.push(`${routes.SignUp}/${routes.SignUpSteps.optionalQuiz}`);
        } else {
          history.push(`${routes.SignUp}/${routes.SignUpSteps.finish}`);
        }
      } catch (e: any) {
        const message = e.response?.data?.message;
        if (e.message === "Network Error") {
          ErrorHandler.setFieldError("*", t("networkError"));
        } else if (message === "Token expired") {
          window.location.reload()
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

  const [, setBackShown] = useAtom(backShown);
  const [, setBackTitle] = useAtom(backTitle);
  useEffect(() => {
    setBackShown(false)
    setBackTitle('default')
  }, [])

  return (
    <form className="form-global" onSubmit={formik.handleSubmit}>
      <Prompt
        message={(location, action) => {
          if (location.pathname.endsWith(routes.SignUpSteps.finish)) {
            return true;
          }
          if (location.pathname.endsWith(routes.SignUpSteps.optionalQuiz)) {
            return true;
          }
          return false;
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
      {/* <hr />
      <small className="w-100 form-disclaimer">
        {t("disclaimerVerification")}
      </small> */}
    </form>
  );
}

export default PasswordService;
