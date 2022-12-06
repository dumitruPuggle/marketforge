import i18next from "i18next";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AppIcon from "../../assets/app-icon.png";
import SignInRoot from "./views/SignInRoot";

function SignIn() {
	const {t} = useTranslation();
  const signInRootState = useState({
    email: "",
    password: "",
  });

	useEffect(() => {
		document.title = `${t('signin')} - Fluency`
	}, [i18next.language])
  return (
    <div
      style={{ position: "absolute", inset: 0, top: -80 }}
      className="form-center-flex mt-5"
    >
      <img
        draggable={false}
        alt=""
        src={AppIcon}
        style={{ width: 100, height: 100 }}
      />
      <SignInRoot state={signInRootState} />
    </div>
  );
}

export default SignIn;
