import { TextField } from "@mui/material";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import LoadingForeground from "../../../components/LoadingForeground/LoadingForeground";
import NativeButton from "../../../components/Buttons/NativeButton";
import { useMediaQuery } from "react-responsive";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
					
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        })
    },
  });
  const { t } = useTranslation();
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
    </form>
  );
}

export default SignInRoot;
