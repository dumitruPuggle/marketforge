import { TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

function EmailBox({email}: {email: string}) {
  const {t} = useTranslation()
  return (
    <div style={{ position: "relative" }}>
      <TextField
        // helperText={formik.errors.email}
        id="demo-helper-text-misaligned"
        label={t("email")}
        name="email"
        type="email"
        className="w-100 mt-2 mb-2"
        // error={emailError}
        // onChange={formik.handleChange}
        // onBlur={formik.handleBlur}
        defaultValue={email}
      />
      <small
        className="outline-button"
        style={{
          bottom: "15px",
          right: "10px",
          position: "absolute",
          color: "#BDBDBD",
          fontWeight: 400,
        }}
      >
        (Valid) Certifier: Apple Public EV Server RSA CA 2 - G1
      </small>
    </div>
  );
}

export default EmailBox;
