import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import NativeButton from "../../components/Buttons/NativeButton";
import CodeInput from "../../components/CodeInput/CodeInput";
import Indicator from "../../components/Indicator/Indicator";
import { totalSteps } from "./SignUp";

function CodeValidation({ onSubmit, defValues }: any) {
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      code: defValues.code,
    },
    validationSchema: Yup.object({
      code: Yup.array().of(Yup.number().required(t("required"))),
    }),
    onSubmit: (values) => {
      onSubmit(values);
    },
  });
  const handleValueChange = (value: Array<number | null>) => {
    formik.setFieldValue("code", value);
  };
  return (
    <form className="form-global" onSubmit={formik.handleSubmit}>
      <h4 className="mb-4 form-title">{t("verification")}</h4>
      <Indicator className="mb-4" value={2} counts={totalSteps} />
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
