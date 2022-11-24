import { useHistory } from "react-router-dom";
import "./Back.css";
import back from "./back.svg";
import { useTranslation } from "react-i18next";
import { accentColor } from "../../constant/colors";
import React from "react";
function Back({ right }: { right?: React.ReactNode }) {
  const history = useHistory();
  const { t } = useTranslation();
  return (
    <div style={{ color: accentColor }} className="back-button">
      <div onClick={() => history.goBack()} className="back-inner">
        <img className="mr-3 mb-0" alt="" src={back} />
        <small className="back-text">{t("back")}</small>
      </div>
      <div className="back-inner-right">{right}</div>
    </div>
  );
}
export default Back;
