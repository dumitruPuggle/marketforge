import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import LoadingForeground from "../../../components/LoadingForeground/LoadingForeground";

function SignInRoot() {
  const formik = useFormik({
		onSubmit: () => {},
		initialValues: {}
	});
	const {t} = useTranslation();
  return (
    <form className="form-global" onSubmit={formik.handleSubmit}>
      {formik.isSubmitting && <LoadingForeground />}
			<h4 className="form-title">{t("signin")}</h4>
    </form>
  );
}

export default SignInRoot;
