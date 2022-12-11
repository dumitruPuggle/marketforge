import { useAtom } from "jotai";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Prompt } from "react-router-dom";
import successIcon from "../../../assets/success.svg";
import NativeButtonPillow from "../../../components/Buttons/NativeButtonPillow";
import { routes } from "../../../service/internal-routes";
import { barLoadingProgress } from "../SignUp";
import "../Success.css";

function Success() {
  const { t } = useTranslation();
  const [progress, setProgress] = useAtom(barLoadingProgress);
  const handleSetupAccount = () => {
    window.location.href = routes.SetupAccount;
  };
  useEffect(() => {
    setTimeout(() => {
      setProgress(10);
    }, 400);
    setTimeout(() => {
      setProgress(20);
    }, 600);
    setTimeout(() => {
      setProgress(30);
    }, 800);
    setTimeout(() => {
      setProgress(40);
    }, 1000);
    setTimeout(() => {
      setProgress(50);
    }, 1200);
    setTimeout(() => {
      setProgress(60);
    }, 1400);
    setTimeout(() => {
      setProgress(70);
    }, 1600);
    setTimeout(() => {
      setProgress(80);
    }, 1800);
    setTimeout(() => {
      setProgress(90);
    }, 2000);
    setTimeout(() => {
      handleSetupAccount();
    }, 3500);
  }, []);
  return (
    <div>
      <Prompt
        message={() => {
          return false;
        }}
      />
      <img draggable={false} className="mb-4" src={successIcon} alt="success" />
      <div>
        {/* <h3>{t("voila")}</h3> */}
        <small>{t("accountHasBeenCreated")}</small>
      </div>
      <NativeButtonPillow
        onClick={handleSetupAccount}
        className="mt-4 fade-in-btn"
        style={{ backgroundColor: "black", color: "black" }}
        title={t("setupAccount")}
      />
    </div>
  );
}
export default Success;
