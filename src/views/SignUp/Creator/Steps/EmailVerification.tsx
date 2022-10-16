import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import NativeButton from "../../../../components/Buttons/NativeButton";
import EmailBox from "../../../../components/EmailBox/EmailBox";
import Indicator from "../../../../components/Indicator/Indicator";
import LoadingForeground from "../../../../components/LoadingForeground/LoadingForeground";
import { useHistory } from "react-router-dom";
import { routes } from "../../../../service/internal-routes";
import { useState } from "react";
import { totalSteps, verificationStep } from "../../../../constant/SignUp.Constant";

type VerificationState = {
  email: string;
};

interface VerificationInterface {
  state: [
    VerificationState,
    React.Dispatch<React.SetStateAction<VerificationState>>
  ];
  submitToken: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

function EmailVerification({
  state,
  submitToken,
  setToken,
}: VerificationInterface) {
	const history = useHistory();
  const { t } = useTranslation();
	const [verification, setVerification] = state;

	const errorsInitialState = {
    email: "",
    "*": "",
  };

	const [errors, setErrors] = useState(errorsInitialState);
	// const ErrorHandler = new Error(errors, setErrors, errorsInitialState);

  const formik = useFormik({
    initialValues: {},
    onSubmit: () => {
			setVerification({
				email: "dumitruiurie@gmail.com"
			})
			setTimeout(() => {
				history.push(`${routes.SignUp}/${routes.SignUpSteps.confirmation}`);
			}, 1200)
		},
  });
  return (
    <form className="form-global" onSubmit={formik.handleSubmit}>
      {formik.isSubmitting && <LoadingForeground />}
      <h4 className="mb-4 form-title">{t("verification")}</h4>
      <Indicator
        className="mb-4"
        value={verificationStep}
        counts={totalSteps}
      />
      <p> Make sure that this is your real email address.</p>
			<EmailBox email={'teamdiggle2@gmail.com'}/>
      <NativeButton className="mt-3" type="submit" title={t("next")} />
      <hr />
      <small className="w-100 form-disclaimer">
        {t("disclaimerVerification")}
      </small>
    </form>
  );
}

export default EmailVerification;
