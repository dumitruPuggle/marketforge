import { LinearProgress, LinearProgressProps } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./StrengthBox.css";
import StrengthBoxBrain from "./StrengthBoxBrain";

interface IStrengthBoxProps {
  password: string;
  firstName: string;
  lastName: string;
  className: string;
}

function StrengthBox({
  password,
  firstName,
  lastName,
  ...props
}: IStrengthBoxProps) {
  const { t } = useTranslation();
  const [level, setLevel] = useState(0);
  const [color, setColor] = useState<LinearProgressProps["color"]>("primary");
  const [levelWord, setWord] = useState("");

  useEffect(() => {
    const StrengthBoxHandler = new StrengthBoxBrain();
    const output = StrengthBoxHandler.getStrength(password);
    // StrengthBoxHandler.createTrainingData(password);
    output.then((level) => {
      setLevel(level);
    });
  }, [password]);

  useEffect(() => {
    if (level < 2) {
      setColor("error");
      setWord("");
    } else if (level < 25) {
      setColor("error");
      setWord(t("weak"));
    } else if (level < 50) {
      setColor("warning");
      setWord(t("fair"));
    } else if (level < 75) {
      setColor("primary");
      setWord(t("strong"));
    } else {
      setColor("primary");
      setWord(t("strong"));
    }
  }, [level]);

  return (
    <div {...props} className={"strength-box " + props?.className}>
      <div className="strength-box-title-layout">
        <small className="strength-box-title">
          {t('securityLevel')} <strong>{levelWord}</strong>
        </small>
      </div>
      {levelWord !== "👍" && (
        <>
          <LinearProgress color={color} variant="determinate" value={level} />
          <div className="strength-box-layout">
            <small className="strength-box-text">
              {t('shouldNotIncludeNames')}
            </small>
            <small className="strength-box-text">{t('oneCapitalLetter')}</small>
            <small className="strength-box-text">{t('specialCharacter')}</small>
          </div>
        </>
      )}
    </div>
  );
}

export default StrengthBox;
