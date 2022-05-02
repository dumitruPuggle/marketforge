import { TextField } from "@mui/material";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import NativeButton from "../../../../components/Buttons/NativeButton";
import Indicator from "../../../../components/Indicator/Indicator";
import StrengthBox from "../../../../components/StrengthBox/StrengthBox";

interface IPasswordServiceProps {
  onSubmit: (values: any) => void;
  indicator?: {
    value: number;
    counts: number;
  };
}

function PasswordService({ onSubmit, indicator }: IPasswordServiceProps) {
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: Yup.object({}),
    onSubmit: (values) => {
      onSubmit(values);
    },
  });
  return (
    <form className="form-global" onSubmit={formik.handleSubmit}>
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
        error={formik.errors.password && formik.touched.password ? true : false}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
      />
      <NativeButton className="mt-3" type="submit" title={t("createAccount")} />
      <hr />
      <small className="w-100 form-disclaimer">
        {t("disclaimerVerification")}
      </small>
    </form>
  );
}

export default PasswordService;
