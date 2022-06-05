import "./LanguagePopUp.css";
import globe from "./globe.svg";
import { useState } from "react";
import { Dialog } from "@blueprintjs/core";
import { useTranslation } from "react-i18next";
import i18n from "../../i18next";
import checkmark from '../../assets/checkmark.svg';

function LanguagePopUp() {
  const [dialog, setDialog] = useState(false);
	const {t} = useTranslation()
	const languages = [
		{
			name: t("english"),
			code: "en"
		},
		{
			name: t('romanian'),
			code: "ro"
		},
		{
			name: t('russian'),
			code: "ru"
		}
	]
	const handleLangClick = (lang: string) => {
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
							languages.map(({name, code}) => (
								<div onClick={() => handleLangClick(code)} className="lang-list-item">
									<small>{name}</small>
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
