import { useHistory } from "react-router-dom";
import "./Back.css";
import back from "./back.svg";
import { useTranslation } from "react-i18next";
import { accentColor } from "../../constant/colors";
import React from "react";

function Back({
  value,
  right,
  hideBackNavigation,
}: {
  value?: string;
  right?: React.ReactNode;
  hideBackNavigation: boolean;
}) {
  const history = useHistory();
  const { t } = useTranslation();

  const isBackHidden = hideBackNavigation ? hideBackNavigation : false;
  const backValue = value ? value : t("back");
  return (
    <div style={{ color: accentColor }} className="back-button">
      <div
        style={{
          opacity: hideBackNavigation ? 0 : 1,
          transition: "200ms linear",
        }}
        onClick={() => !isBackHidden && history.goBack()}
        className="back-inner"
      >
        <img className="mr-3 mb-0" alt="" src={back} />
        <small className="back-text">
          {backValue === "default" ? t("back") : backValue}
        </small>
      </div>
      <div className="back-inner-right">{right}</div>
    </div>
  );
}

function BackItem({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: object;
}) {
  return (
    <div
      style={{
        position: "static",
        inset: "none",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export { Back, BackItem };
