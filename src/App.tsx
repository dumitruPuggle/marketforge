// import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { getAnalytics } from "firebase/analytics";
import { getRemoteConfig } from "firebase/remote-config";
import { routes } from "./service/internal-routes";
import SignUp from "./views/SignUp/SignUp";
// import Home from "./views/Home/Home";
import DashboardLayout from "./components/DashboardLayout/DashboardLayout";
// import { SRadar } from "./service/ServerRadar/ServerRadar.Service";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
// import RadarDialog from "./components/RadarDialog/RadarDialog";
// import StatsDialog from "./components/StatsDialog/StatsDialog";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import AppIcon from "./assets/app-icon.png";
import SignIn from "./views/SignIn/SignIn";
import "./views/SignUp/SignUp.css";
import "./views/SignIn/SignIn.css";
import LanguagePopUp from "./components/LanguagePopUp/LanguagePopUp";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";

// export const useBackupApi = atomWithStorage('useBackupApi', false)
export const statisticsDialog = atomWithStorage("statsDialogShown", true);

function App() {
  // const [, setBackupApi] = useAtom(useBackupApi)
  // const [radarDialog, setRadarDialog] = useState(false)
  // useEffect(() => {
  //   /*
  //   Scan process:
  //   This procedure is used to scan the regular base back-end.
  //   In case if it refuses to work, this mechanism will automatically
  //   switch to the backup backend, in order to avoid system failures.
  //   */
  //   const Radar = new SRadar();
  //   const getStatus = async () => {
  //     try {
  //       const scanResult = await Radar.scan();
  //       if (scanResult.baseApiOK){
  //         setBackupApi(false)
  //       } else if (!scanResult.baseApiOK && scanResult.backupApiOk){
  //         // If the backup api is the only available backend
  //         setBackupApi(true)

  //       } else if (!scanResult.baseApiOK && !scanResult.backupApiOk) {
  //         setRadarDialog(true)
  //       }
  //     } catch (e) {
  //       // If it didn't work to get the results, then we'll consider the base api as primary
  //       setBackupApi(false)
  //     }
  //   }
  //   getStatus()
  // }, [navigator.onLine])

  getAnalytics();
  const remoteConfig = getRemoteConfig();

  remoteConfig.defaultConfig = {
    home_image: require("./assets/homepage/under_construction.jpeg"),
    auth_provider: "phone",
  };

  const [statsShow, setStats] = useAtom(statisticsDialog);

  const handleStatsDialogClose = () => {
    setStats(false);
  };

  const auth = getAuth()
  console.log(auth.currentUser)
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path={routes.root} exact>
            {/* <Home /> */}
            <div className="center" style={{ position: "fixed", inset: 0 }}>
              <img
                draggable={false}
                style={{ width: 180 }}
                alt=""
                src={AppIcon}
              />
            </div>
          </Route>
          <Route path={routes.SignIn}>
            <LanguagePopUp
              style={{
                position: "fixed",
                top: "20px",
                right: "20px",
                bottom: "none",
                left: "none",
                zIndex: 100
              }}
            />
            <SignIn />
          </Route>
          <Route path={routes.SignUp}>
            {/* <RadarDialog state={[radarDialog, setRadarDialog]} /> */}
            {/* <StatsDialog isOpen={statsShow} onClose={handleStatsDialogClose} /> */}
            <SignUp />
          </Route>
          <Route path={routes.SetupAccount}>
            <DashboardLayout />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
