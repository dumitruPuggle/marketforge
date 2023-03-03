import { TextField } from "@mui/material";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import LoadingForeground from "../../../components/LoadingForeground/LoadingForeground";
import NativeButton from "../../../components/Buttons/NativeButton";
import { useMediaQuery } from "react-responsive";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import GoogleSignInButton from "../../../components/GoogleSignInButton/GoogleSignInButton";
import i18next from "i18next";
import { useState } from "react";
import Error from "../../../service/Auth/SignUp/ErrorHandler";
import ErrorBubble from "../../../components/ErrorBubble/ErrorBubble";
import * as Yup from "yup";
import { isUserAuthed } from "../../../App";
import { useAtom } from "jotai";

type SignInRootState = {
  email: string;
  password: string;
};

interface SignInRoot {
  state: [SignInRootState, Function];
}

function SignInRoot({ state }: SignInRoot) {
  const { t } = useTranslation();
  const [signInRoot, setSignInRoot] = state;

  const isMobile = useMediaQuery({ maxWidth: 767 });

  const errorsInitialState = {
    email: "",
    password: "",
    "*": "",
  };

  const [errors, setErrors] = useState(errorsInitialState);
  const ErrorHandler = new Error(errors, setErrors, errorsInitialState);

  const [isUserAuthenticated,] = useAtom(isUserAuthed)

  const formik = useFormik({
    initialValues: {
      email: signInRoot.email,
      password: signInRoot.password,
    },
    validationSchema: Yup.object({
      email: Yup.string().email(t("invalidAddress")).required(t("required")),
      password: Yup.string().required(t('required'))
    }),
    onSubmit: async function (values) {
      const auth = getAuth();
      setSignInRoot(values);
      signInWithEmailAndPassword(auth, values.email, values.password).catch(
        (error) => {
          const errorCode = error.code;
          // const errorMessage = error.message;

          const USER_NOT_FOUND = "auth/user-not-found";
          const WRONG_PASSWORD = "auth/wrong-password";
          const TOO_MANY_REQUESTS = "auth/too-many-requests";

          if (errorCode === USER_NOT_FOUND || errorCode === WRONG_PASSWORD) {
            ErrorHandler.setFieldError(
              "*",
              t("incorrectLoginOrPassword")
            );
          }
          if (errorCode === TOO_MANY_REQUESTS) {
            ErrorHandler.setFieldError("*", t('unknownError'));
          } else {
            ErrorHandler.setFieldError("*", t('unknownError'));
          }
        }
      );
    },
  });

  const handleGoogleSignInButton = () => {
    const auth = getAuth();
    auth.languageCode = i18next.language;

    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // Check if user is valid:
        console.log(isUserAuthenticated)
      })
      .catch((error) => {
        // setBackgroundBlurred(false);
        // setVerifyExistingAccount(false);
        // // Handle Errors here.
        const errorCode = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.customData.email;
        // // The AuthCredential type that was used.
        // const credential =
        //   GoogleAuthProvider.credentialFromError(error);
        // // ...
        console.log(errorCode);
        ErrorHandler.setFieldError("*", errorCode);
      });
  };

  const emailError = formik.errors.email && formik.touched.email ? true : false;
  const passwordError = formik.errors.password && formik.touched.password ? true : false;
  return (
    <form className="form-global" onSubmit={formik.handleSubmit}>
      {formik.isSubmitting && <LoadingForeground />}
      {ErrorHandler.hasErrors() && (
        <ErrorBubble errorList={ErrorHandler.listErrors()} />
      )}
      <h4 className="form-title mt-3">{t("signin")}</h4>
      <TextField
        variant="outlined"
        helperText={formik.errors.email}
        id="demo-helper-text-misaligned"
        label={t("email")}
        name="email"
        type="email"
        className="mb-3 mt-3"
        size={"medium"}
        error={emailError}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
      />
      <TextField
        variant="outlined"
        helperText={formik.errors.password}
        id="demo-helper-text-misaligned"
        label={t("password")}
        name="password"
        type="password"
        className="mb-3"
        size={"medium"}
        error={passwordError}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
      />
      <NativeButton
        style={
          isMobile
            ? {
                position: "fixed",
                bottom: "40px",
                left: "20px",
                right: "20px",
              }
            : {}
        }
        className="mt-3"
        type="submit"
        title={t("next")}
      />
      <hr />
      <GoogleSignInButton type="sign-in" onClick={handleGoogleSignInButton} />
    </form>
  );
}

export default SignInRoot;
