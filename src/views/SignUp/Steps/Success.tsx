import { useAtom } from "jotai";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Prompt } from "react-router-dom";
import successIcon from "../../../assets/success.svg";
import NativeButtonPillow from "../../../components/Buttons/NativeButtonPillow";
import { routes } from "../../../service/internal-routes";
import { barLoadingProgress, isImageShown } from "../SignUp";
import "../Success.css";
import ProgressAnimation from "./useAnimation";

function Success() {
  const { t } = useTranslation();
  const [, setLogoShown] = useAtom(isImageShown)
  const [, setProgress] = useAtom(barLoadingProgress);
  const handleSetupAccount = () => {
    window.location.href = routes.SetupAccount;
  };
  useEffect(() => {
    ProgressAnimation({
      setProgress,
      onEnd: () => console.log("finished"),
      animationDuration: 3600,
      offset: 200,
      incrementAmount: 6.58,
    });
    setLogoShown(false);
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
