import { Classes, Dialog } from "@blueprintjs/core";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SRadar } from "../../service/ServerRadar/ServerRadar.Service";
import CocoaButton from "../CocoaButton/CocoaButton";
import successIcon from "../../assets/success.svg";
import "./RadarDialog.css";
import { useTranslation } from "react-i18next";
import CocoaButtonSection from "../CocoaButtonSection/CocoaButtonSection";
import i18n from "../../i18next";
import CocoaList from "../CocoaList/CocoaList";
import { atomWithStorage } from "jotai/utils";
import { useAtom } from "jotai";

function RadarDialog({
  state,
}: {
  state: [boolean, Dispatch<SetStateAction<boolean>>];
}) {
  const [logs, setLog] = useState([
    {
      id: 1,
      text: "Search process started",
      bold: true,
    },
    {
      id: 2,
      text: "Creating chunk state #0205052",
      bold: false,
    },
  ]);
  const [radarDialog, setRadarDialog] = state;
  const [found, setFound] = useState(false);
  const [dots, setDots] = useState([[50, 20, 0]]);
  const randomNumber = (max: number) => {
    return Math.floor(Math.random() * max);
  };
  useEffect(() => {
    const Radar = new SRadar();
    if (radarDialog) {
      console.log("Calling....");
    }
  }, [radarDialog]);

  useEffect(() => {
    setTimeout(() => {
      if (found) {
        setRadarDialog(false);
      }
    }, 2000);
  }, [found]);

  // const { t } = useTranslation();

  const handleStopSearch = () => {
    setAreYouSureDialog(true);
  };

  const [viewLogs, setViewLogs] = useState(false);

  const handleViewLogs = () => {
    setViewLogs(!viewLogs);
  };

  const { t } = useTranslation();

  const lang = i18n.language;

  const [areYouSure, setAreYouSureDialog] = useState(false);

  const handleAreYouSureToCancel = () => {
    setAreYouSureDialog(false);
    setRadarDialog(false);
  };


  const popUpAtom = atomWithStorage('popup-not-seen', true)
  const [logsHandleWindowDescriptionPopUp, setLogsWindowDescPopUp] = useAtom(popUpAtom)

  return (
    <>
      <Dialog
        isOpen={viewLogs}
        title={"Log console"}
        style={{ width: 350 }}
        onClose={() => setViewLogs(false)}
      >
        <div className={Classes.DIALOG_BODY}>
          <div className="flex-column flex-align-left">
            <small className="mb-2" style={{ fontSize: 11 }}>
              Details
            </small>
            <CocoaList data={logs} setData={setLog} height={300} />
          </div>
        </div>
        {
          logsHandleWindowDescriptionPopUp &&
          <div className={Classes.DIALOG_FOOTER}>
            <CocoaButtonSection
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="mt-4"
            >
              <small>{t('logs-window-description')}</small>
              <CocoaButton
                onClick={() => setLogsWindowDescPopUp(false)}
                title={t("ok")}
                width={80}
                style={{ marginLeft: 10 }}
              />
            </CocoaButtonSection>
          </div>
        }
      </Dialog>
      <Dialog
        isOpen={areYouSure}
        title={t("areYouSureToCancel")}
        style={{ width: 300 }}
        onClose={() => setAreYouSureDialog(false)}
      >
        <div className={Classes.DIALOG_FOOTER}>
          <CocoaButtonSection
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="mt-4"
          >
            <small>{t("stop-searching-warning")}</small>
            <CocoaButton
              onClick={handleAreYouSureToCancel}
              title={t("ok")}
              width={80}
              style={{ marginLeft: 10 }}
            />
          </CocoaButtonSection>
        </div>
      </Dialog>
      <Dialog
        isOpen={radarDialog}
        title={!found ? t("service-check") : t("voila")}
        style={{ height: 500 }}
        isCloseButtonShown={false}
      >
        {!found ? (
          <>
            <div
              className={Classes.DIALOG_BODY}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div className="spinner mt-4 mb-4 radar-background shine">
                <img
                  draggable={false}
                  className="map"
                  src="https://static.gosquared.com/images/ui/neo/bg_map_01@3x.png"
                />
                {dots.map((position) => {
                  return (
                    <span
                      key={position[0] + (position[1] / position[2]) * 2000}
                      className="dot"
                      style={{
                        top: position[0],
                        left: position[1],
                        right: position[2],
                      }}
                    />
                  );
                })}
              </div>
            </div>
            <div className={Classes.DIALOG_FOOTER}>
              <small>{t("service-check-message")}</small>
              <CocoaButtonSection
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
                className="mt-4"
              >
                <CocoaButton
                  onClick={handleStopSearch}
                  title={t("stop-searching")}
                  width={lang.includes("ru") ? 200 : 120}
                />
                <CocoaButton
                  style={{ marginLeft: 10 }}
                  onClick={handleViewLogs}
                  title={t("view-logs")}
                  width={lang.includes("ru") ? 200 : 120}
                />
              </CocoaButtonSection>
            </div>
          </>
        ) : (
          <div
            className={Classes.DIALOG_BODY}
            style={{ height: 400, position: "relative" }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div>
                <img
                  draggable={false}
                  className="mb-4"
                  src={successIcon}
                  alt="success"
                />
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </>
  );
}

export default RadarDialog;
