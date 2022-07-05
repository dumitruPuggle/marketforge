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
      title={t("sessionExpired")}
      canOutsideClickClose={false}
      canEscapeKeyClose={false}
    >
      <div className={Classes.DIALOG_BODY}>
        <pre className="mb-0">{t("sessionExpiredMessage")}</pre>
      </div>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}} className={Classes.DIALOG_FOOTER}>
        <Button onClick={() => handleRetryButton()} autoFocus>
          {t("retry")}
        </Button>
      </div>
    </Dialog>
  );
}
