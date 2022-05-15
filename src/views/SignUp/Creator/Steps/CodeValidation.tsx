import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import NativeButton from "../../../../components/Buttons/NativeButton";
import CodeInput from "../../../../components/CodeInput/CodeInput";
import Indicator from "../../../../components/Indicator/Indicator";
import { codeValidationStep, totalSteps } from "../SignUp";
import { signUpSession3 } from "../../../../service/Auth/Creator/endpoints";
import { routes } from "../../../../service/internal-routes";
import { useHistory } from "react-router-dom";
import { getTempToken } from "../../../../service/miscellaneous/tempTokenUtils";
import Timer from "../../../../components/Timer/Timer";
import jwtDecode from "jwt-decode";

interface ICodeVerification {
  code: number[];
}

function CodeValidation({ state }: any) {
  const history = useHistory()
  const { t } = useTranslation();

  const [codeValidation] = state;

  const _temptoken = getTempToken()

  const expirationTime = () => {
    if (!_temptoken) return 0;
    const decodedToken: any = jwtDecode(_temptoken);
    return decodedToken["exp"] * 1000;
  };

  const formik = useFormik({
    initialValues: {
      code: codeValidation.code,
    },
    validationSchema: Yup.object({
      code: Yup.array().of(Yup.number().required(t("required"))),
    }),
    onSubmit: async function (values: ICodeVerification) {
      if (!_temptoken) return
      try {
        await signUpSession3(
          {
            code: values.code.join(""),
          },
          { _temptoken }
        );
        history.push(`${routes.SignUp}/password-service`);
      } catch (e: any) {
        alert(e.response.data.message);
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
      {_temptoken && <Timer endTime={expirationTime()}/>}
    </form>
  );
}

export default CodeValidation;
