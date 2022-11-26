import { Button, Classes, Dialog } from "@blueprintjs/core";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { routes } from "../../service/internal-routes";

export default function DialogTokenExpired({
  state,
  setState,
  onRetry,
}: {
  state: boolean;
  setState: Function;
  onRetry?: () => void;
}) {
  const { t } = useTranslation();
  const history = useHistory();

  const handleClose = () => {
    setState(false);
  };

  const handleRetryButton = () => {
    handleClose();
    if (onRetry) {
      onRetry();
    }
    history.push(`${routes.SignUp}${routes.root}`);
  };

  return (
    <Dialog
      isOpen={state}
      onClose={() => setState(false)}
      canOutsideClickClose={false}
      canEscapeKeyClose={false}
      style={{
        width: 320,
        backdropFilter: "blur(10px)",
        background: "rgba(255, 255, 255, 0.8)",
        userSelect: "none",
        borderRadius: 20,
        WebkitBackdropFilter: 'blur(10px)',
        paddingBottom: 0
      }}
    >
      <div
          style={{
            background: "transparent",
            boxShadow: "none",
          }}
          className={`${Classes.DIALOG_HEADER} dialog-title-header`}
        >
          <h5>{t("sessionExpired")}</h5>
          <small>{t("sessionExpiredMessage")}</small>
          <button
            style={{ fontSize: 18 }}
            className="w-100 mt-3 outline-button"
            onClick={() => handleRetryButton()}
          >
            {t('retry')}
          </button>
        </div>
    </Dialog>
  );
}
