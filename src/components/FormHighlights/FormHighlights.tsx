import { useTranslation } from "react-i18next";
import "./FormHighlights.css";

function FormHighlights() {
  const { t } = useTranslation();
  return (
    <small className="form-highlight-label">
      {t("doYouHaveAnAccount")}{" "}
      <strong style={{ cursor: "pointer" }}>{t("signin")}</strong>
    </small>
  );
}

export default FormHighlights;
