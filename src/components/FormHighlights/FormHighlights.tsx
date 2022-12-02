import { useTranslation } from "react-i18next";
import "./FormHighlights.css";

function FormHighlights() {
  const { t } = useTranslation();
  return (
    <small>
      {t("doYouHaveAnAccount")} <strong>{t("signin")}</strong>
    </small>
  );
}

export default FormHighlights;
