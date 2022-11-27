import { Classes, Dialog } from "@blueprintjs/core";
import { getAnalytics, setUserProperties } from "firebase/analytics";
import "./LanguagePopUp.css";
import globe from "./globe.svg";
import globe500 from "./globe500.svg";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../i18next";
import checkmark from "../../assets/success.svg";
import { atomWithStorage } from "jotai/utils";
import { useAtom } from "jotai";
import i18next from "i18next";
// import us from "../../assets/us.png";
// import ro from "../../assets/ro.png";
// import ru from "../../assets/ru.png";

export const userChangedLanguageManually = atomWithStorage(
  "cx_lng-m14n-e014",
  false
);

interface ILanguagePopUp {
  style?: any;
}

function LanguagePopUp({ style }: ILanguagePopUp) {
  const [userChangedLanguageYet, setUserChangedLanguage] = useAtom(
    userChangedLanguageManually
  );
  const [dialog, setDialog] = useState(false);

  const { t } = useTranslation();
  const analytics = getAnalytics();
  const languages = [
    {
      name: t("english"),
      code: "en",
      hyphenCase: "en-US",
      // icon: us,
    },
    {
      name: t("romanian"),
      code: "ro",
      hyphenCase: "ro-MD",
      // icon: ro,
    },
    {
      name: t("russian"),
      code: "ru",
      hyphenCase: "ru-MD",
      // icon: ru,
    },
  ];
  const handleLangClick = (lang: string) => {
    setUserProperties(analytics, { language: lang });
    i18n.changeLanguage(lang);
    // setDialog(false);
    setUserChangedLanguage(true);
  };

  return (
    <>
      <Dialog
        isOpen={dialog}
        onClose={() => setDialog(false)}
        style={{
          width: 320,
          backdropFilter: "blur(10px)",
          background: "rgba(255, 255, 255, 0.8)",
          userSelect: "none",
          borderRadius: 20,
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <div
          style={{
            background: "transparent",
            boxShadow: "none",
          }}
          className={`${Classes.DIALOG_HEADER} dialog-title-header`}
        >
          <img
            style={{
              width: "64px",
              cursor: "pointer",
            }}
            draggable={false}
            src={globe500}
            className="mb-2"
            alt=""
          />
          <h5>{t("chooseLanguage")}</h5>
          {!userChangedLanguageYet ? (
            <small>{t("languageIsYourDefaultLanguage")}</small>
          ) : (
            <small>{t("youSelectedManuallyLang")}</small>
          )}
        </div>
        <div style={{ marginBottom: 0 }} className={Classes.DIALOG_BODY}>
          <div className="lang-list">
            {languages.map(({ name, code, hyphenCase }) => (
              <div
                onClick={() => handleLangClick(code)}
                className="lang-list-item"
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <small style={{ fontWeight: 600 }}>{name}</small>
                  <small>{hyphenCase}</small>
                </div>
                {i18n.language === code && (
                  <img
                    className="lang-list-item-checkmark"
                    src={checkmark}
                    alt=""
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </Dialog>
      <div
        className="lang-popup"
        style={{
          left: 10,
          padding: 10,
          bottom: 10,
          ...style,
        }}
      >
        <img
          style={{
            width: "20px",
            cursor: "pointer",
          }}
          draggable={false}
          src={globe}
          onClick={() => setDialog(true)}
          alt=""
        />
      </div>
    </>
  );
}

export default LanguagePopUp;
