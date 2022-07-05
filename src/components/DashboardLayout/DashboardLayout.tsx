import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Indicator from "../Indicator/Indicator";
import LanguagePopUp from "../LanguagePopUp/LanguagePopUp";
import Platforms, { PlatformsEnum } from "../Platforms/Platforms";
import "./Dashboard.css";
import spiderSpringPattern from "../../assets/spider-spring-background.webp";
import UserCircle from "../UserCircle/UserCircle";
import InstagramSetup from "./SearchInstagram";

function DashboardLayout() {
  const instagramDialogState = useState(false)
  const [, setInstagramDialog] = instagramDialogState

  let { path } = useRouteMatch();
  const { t } = useTranslation();
  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  const handlePlatformClick = (input: PlatformsEnum) => {
    if (input === PlatformsEnum.Instagram){
      setInstagramDialog(true)
    }
  };
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${spiderSpringPattern}`,
          backgroundSize: "100% 20%",
        }}
        className="dashboard-container-foreground"
      >
        <InstagramSetup state={instagramDialogState} />
        <LanguagePopUp />
        <UserCircle />
        <Container style={{ overflow: "auto" }}>
          <Indicator value={0} counts={3} className="mt-3" showHighlight />
          {/* <img
          draggable={false}
          className="mt-4"
          style={{ width: 50 }}
          alt={""}
          src={ConfigureUserIcon}
        /> */}
          <h4 className="bold-title mt-3">{t("setupAccount")}</h4>
          <Switch>
            <Route exact path={`${path}`}>
              <p className="mb-2">{t("selectPlatform")}</p>
              <Platforms onSelect={handlePlatformClick} />
            </Route>
          </Switch>
        </Container>
      </div>
    </>
  );
}

export default DashboardLayout;
