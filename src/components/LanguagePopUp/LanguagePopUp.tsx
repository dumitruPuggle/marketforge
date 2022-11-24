import { Classes, Dialog } from "@blueprintjs/core";
import { getAnalytics, setUserProperties } from "firebase/analytics";
import "./LanguagePopUp.css";
import globe from "./globe.svg";
import globe500 from "./globe500.svg";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../i18next";
import checkmark from "../../assets/checkmark.svg";
// import us from "../../assets/us.png";
// import ro from "../../assets/ro.png";
// import ru from "../../assets/ru.png";

interface ILanguagePopUp {
  style?: any;
}

function LanguagePopUp({ style }: ILanguagePopUp) {
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
    setDialog(false);
  };
  return (
    <>
      <Dialog
        isOpen={dialog}
        onClose={() => setDialog(false)}
        title={t("chooseLanguage")}
        style={{ width: 320 }}
      >
        <div className="lang-list">
          {languages.map(({ name, code, hyphenCase }) => (
            <div
              onClick={() => handleLangClick(code)}
              className="lang-list-item"
            >
              <img
                draggable={false}
                style={{ width: 20, marginRight: 8, marginLeft: 3 }}
                src={globe500}
                alt=""
              />
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
