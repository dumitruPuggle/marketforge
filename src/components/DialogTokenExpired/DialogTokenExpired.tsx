import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { routes } from "../../service/internal-routes";

export default function DialogTokenExpired({
  state,
  setState,
  onRetry
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
      open={state}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle title={t("sessionExpired")}>
        {t("sessionExpired")}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {t("sessionExpiredMessage")}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleRetryButton()} autoFocus>
          {t("retry")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
