import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { routes } from "../../service/internal-routes";
import "./FormHighlights.css";

function FormHighlights() {
  const history = useHistory();
  const { t } = useTranslation();
  const handleRedirectToSignIn = () => {
    history.push(routes.SignIn)
  }
  return (
    <small className="form-highlight-label">
      {t("doYouHaveAnAccount")}{" "}
      <strong onClick={handleRedirectToSignIn} style={{ cursor: "pointer" }}>
        {t("signin")}
      </strong>
    </small>
  );
}

export default FormHighlights;
