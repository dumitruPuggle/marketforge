import { useTranslation } from "react-i18next";
import GoogleIcon from "../../assets/google-small-logo.svg";

type signInType = "sign-in" | "sign-up";

export default function GoogleSignInButton({
  onClick,
  type,
}: {
  onClick: Function;
  type: signInType;
}) {
  const { t } = useTranslation();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <div
        draggable={false}
        onClick={() => onClick()}
        className="auth-provider"
      >
        <img
          draggable={false}
          src={GoogleIcon}
          className="auth-provider-icon"
        />
        <small className="mt-2 auth-provider-description">
					{
						type === "sign-in" ?
						t("signInUsingGoogle")
						:
          	t("createAccountUsingGoogle")
					}
        </small>
      </div>
    </div>
  );
}
