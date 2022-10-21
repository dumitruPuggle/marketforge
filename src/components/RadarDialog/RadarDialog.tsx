import { Classes, Dialog } from "@blueprintjs/core";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SRadar } from "../../service/ServerRadar/ServerRadar.Service";
import CocoaButton from "../CocoaButton/CocoaButton";
import successIcon from "../../assets/success.svg";
import "./RadarDialog.css";
import { useTranslation } from "react-i18next";
import CocoaButtonSection from "../CocoaButtonSection/CocoaButtonSection";

function RadarDialog({
  state,
}: {
  state: [boolean, Dispatch<SetStateAction<boolean>>];
}) {
  const [radarDialog, setRadarDialog] = state;
  const [found, setFound] = useState(false);
  const [dots, setDots] = useState([[50, 20, 0]]);
  const randomNumber = (max: number) => {
    return Math.floor(Math.random() * max);
  };
  useEffect(() => {
    if (radarDialog) {
      const Radar = new SRadar();
      const interval = setInterval(async () => {
        const result = await Radar.scan();
        const isWorking = [result.baseApiOK, result.backupApiOk].some(
          (value) => value === true
        );
        for (let i = 0; i < 5; i++) {
          setDots([
            ...dots,
            [randomNumber(100), randomNumber(100), randomNumber(100)],
          ]);
        }
        if (isWorking) {
          setFound(true);
        }
      }, 1000);
      return () => clearInterval(interval);
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
    setRadarDialog(false)
  }

  return (
    <Dialog
      isOpen={radarDialog}
      title={!found ? "Service check..." : "Success!"}
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
            <small>
              We apologise for the delay, you should wait. The server is
              currently down, the inbuilt application engine is trying to find
              the most suitable service.
            </small>
						<CocoaButtonSection center={true} className="mt-4">
              <CocoaButton onClick={handleStopSearch} title={"Stop searching"} width={120} />
						</CocoaButtonSection>
          </div>
        </>
      ) : (
        <div className={Classes.DIALOG_BODY} style={{ height: 400, position: 'relative' }}>
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center'
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
  );
}

export default RadarDialog;
