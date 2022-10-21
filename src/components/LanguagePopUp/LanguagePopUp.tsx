import { Dialog } from "@blueprintjs/core";
import { getAnalytics, setUserProperties } from "firebase/analytics";
import "./LanguagePopUp.css";
import globe from "./globe.svg";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../i18next";
import checkmark from '../../assets/checkmark.svg';
import us from '../../assets/us.png'
import ro from '../../assets/ro.png'
import ru from '../../assets/ru.png'
import i18next from "i18next";

function LanguagePopUp() {
  const [dialog, setDialog] = useState(false);
	const {t} = useTranslation()
	const analytics = getAnalytics();
	const languages = [
		{
			name: t("english"),
			code: "en",
			hyphenCase: "en-US",
			icon: us
		},
		{
			name: t('romanian'),
			code: "ro",
			hyphenCase: "ro-MD",
			icon: ro
		},
		{
			name: t('russian'),
			code: "ru",
			hyphenCase: "ru-MD",
			icon: ru
		}
	]
	const handleLangClick = (lang: string) => {
		setUserProperties(analytics, {language: lang})
		i18n.changeLanguage(lang);
		setDialog(false)
	}
  return (
		<>
			<Dialog 
				isOpen={dialog}
				onClose={() => setDialog(false)}
				title={t('chooseLanguage')}
				>
					<div className="lang-list">
						{
							languages.map(({name, code, icon, hyphenCase}) => (
								<div onClick={() => handleLangClick(code)} className="lang-list-item">
									<img style={{width: 38}} src={icon} alt="" /> 
									<div style={{display: 'flex', flexDirection: 'column'}}>
										<small style={{fontWeight: 600}}>{name}</small>
										<small>{hyphenCase}</small>
									</div>
									{
										i18n.language === code && <img className="lang-list-item-checkmark" src={checkmark} alt=""/>
									}
								</div>
							))
						}
					</div>
				</Dialog>
			<div className="lang-popup">
				<img
					style={{
						width: "20px",
						cursor: "pointer"
					}}
					src={globe}
					onClick={() => setDialog(true)}
					alt=""
				/>
			</div>
		</>
  );
}

export default LanguagePopUp;
