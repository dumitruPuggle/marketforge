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

type SignInRootState = {
  email: string;
  password: string;
};

interface SignInRoot {
  state: [SignInRootState, Function];
}

function SignInRoot({ state }: SignInRoot) {
  const [signInRoot, setSignInRoot] = state;

  const isMobile = useMediaQuery({ maxWidth: 767 });

  const formik = useFormik({
    initialValues: {
      email: signInRoot.email,
      password: signInRoot.password,
    },
    onSubmit: async function (values) {
      const auth = getAuth();
      setSignInRoot(values);
      signInWithEmailAndPassword(auth, values.email, values.password).catch(
        (error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          console.log(errorCode);
        }
      );
    },
  });
  const { t } = useTranslation();

  const handleGoogleSignInButton = () => {
    const auth = getAuth();
    auth.languageCode = i18next.language;

    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // Check if user is valid:  
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
      });
  };
  return (
    <form className="form-global" onSubmit={formik.handleSubmit}>
      {formik.isSubmitting && <LoadingForeground />}
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
        // error={emailError}
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
        // error={emailError}
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
