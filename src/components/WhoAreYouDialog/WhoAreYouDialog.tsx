import { Classes, Dialog } from "@blueprintjs/core";
import { useTranslation } from "react-i18next";
import AccountCircleVector from "../../assets/person.crop.circle.fill.svg";
import { userTypes } from "../../constant/SignUp.Constant";
import checkmark from "../../assets/success.svg";
import { useState } from "react";

export default function WhoAreYouDialog({
  state,
  onCloseDialog,
  onSelectOption
}: {
  state: boolean;
  onCloseDialog: Function;
  onSelectOption: Function;
}) {
  const { t } = useTranslation();
  // const history = useHistory();

  const [userTypesPrc, setUserTypes] = useState(userTypes.map((nameid: string, index) => ({
    id: index,
    nameid,
    selected: false
  })))


  const setSelected = (id: number) => {
    setUserTypes((prev: any) => prev.map((obj: any) => {
      if (obj.id === id){
        onSelectOption(obj.nameid)
        return {
          ...obj,
          selected: true
        }
      }
      return {
        ...obj,
        selected: false
      }
    }))
  }

  return (
    <Dialog
      isOpen={state}
      onClose={() => onCloseDialog()}
      canOutsideClickClose={true}
      canEscapeKeyClose={true}
      style={{
        width: 320,
        backdropFilter: "blur(10px)",
        background: "rgba(255, 255, 255, 0.8)",
        userSelect: "none",
        borderRadius: 20,
        WebkitBackdropFilter: "blur(10px)",
        paddingBottom: 0,
      }}
    >
      <div
        style={{
          background: "transparent",
          boxShadow: "none",
          paddingLeft: 10,
          paddingRight: 10
        }}
        className={`${Classes.DIALOG_HEADER} dialog-title-header`}
      >
        <img
          style={{
            width: "64px",
            cursor: "pointer",
            padding: 10,
            paddingTop: 0,
          }}
          draggable={false}
          src={AccountCircleVector}
          className="mb-2"
          alt=""
        />
        <h5>{t("whoAreYou")}</h5>
        <small>{t("selectACategory")}</small>
        <div style={{ marginBottom: 0, width: '100%' }} className={Classes.DIALOG_BODY}>
          <div className="lang-list">
            {userTypesPrc.map(({id, nameid, selected}) => (
              <div onClick={() => setSelected(id)} style={{width: '100%'}} className="lang-list-item">
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <small style={{ fontWeight: 600 }}>{t(nameid.split('-')[1])}</small>
                </div>
                {selected && (
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
        <button
          style={{ fontSize: 18 }}
          className="w-100 mt-3 outline-button"
          onClick={() => onCloseDialog()}
        >
          {t("ok")}
        </button>
      </div>
    </Dialog>
  );
}
