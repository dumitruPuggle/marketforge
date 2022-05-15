import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import NativeButton from "./Buttons/NativeButton";
import CodeInput from "./CodeInput/CodeInput";
import Indicator from "./Indicator/Indicator";
import { codeValidationStep, tempToken, totalSteps } from "../views/SignUp/Creator/SignUp";
import { signUpSession3 } from "../service/Auth/Creator/endpoints";
import { routes } from "../service/internal-routes";
import { useHistory } from "react-router-dom";

interface ICodeVerification {
  code: number[];
}

function CodeValidation({ state }: any) {
  const history = useHistory()
  const { t } = useTranslation();

  const [codeValidation] = state;

  const formik = useFormik({
    initialValues: {
      code: codeValidation.code,
    },
    validationSchema: Yup.object({
      code: Yup.array().of(Yup.number().required(t("required"))),
    }),
    onSubmit: async function (values: ICodeVerification) {
      try {
        await signUpSession3(
          {
            code: values.code.join(""),
          },
          { _temptoken: tempToken }
        );
        history.push(`${routes.SignUp}/password-service`);
      } catch (e: any) {
        alert("error");
      }
    },
  });
  const handleValueChange = (value: Array<number | null>) => {
    formik.setFieldValue("code", value);
  };
  return (
    <form className="form-global" onSubmit={formik.handleSubmit}>
      <h4 className="mb-4 form-title">{t("verification")}</h4>
      <Indicator className="mb-4" value={codeValidationStep} counts={totalSteps} />
      <CodeInput value={formik.values.code} onValueChange={handleValueChange} />
      <NativeButton className="mt-3" type="submit" title={t("next")} />
      <hr />
      <small className="w-100 form-disclaimer">
        {t("disclaimerVerification")}
      </small>
    </form>
  );
}

export default CodeValidation;
