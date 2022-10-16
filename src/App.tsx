import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css'
import { getAnalytics } from "firebase/analytics";
import { getRemoteConfig } from "firebase/remote-config";
import { routes } from "./service/internal-routes";
import SignUp from "./views/SignUp/Creator/SignUp";
import Home from "./views/Home/Home";
import DashboardLayout from "./components/DashboardLayout/DashboardLayout";
import { useEffect, useState } from "react";
import { SRadar } from "./service/ServerRadar/ServerRadar.Service";
import { useAtom } from "jotai";
import {atomWithStorage} from "jotai/utils"
import RadarDialog from "./components/RadarDialog/RadarDialog";

export const useBackupApi = atomWithStorage('useBackupApi', false)

function App() {
  const [, setBackupApi] = useAtom(useBackupApi)
  const [radarDialog, setRadarDialog] = useState(false)
  useEffect(() => {
    /* 
    Scan process:
    This procedure is used to scan the regular base back-end.
    In case if it refuses to work, this mechanism will automatically
    switch to the backup backend, in order to avoid system failures.
    */
    const Radar = new SRadar();
    const getStatus = async () => {
      try {
        const scanResult = await Radar.scan();
        if (scanResult.baseApiOK){
          setBackupApi(false)
        } else if (!scanResult.baseApiOK && scanResult.backupApiOk){
          // If the backup api is the only available backend
          setBackupApi(true)

        } else if (!scanResult.baseApiOK && !scanResult.backupApiOk) {
          setRadarDialog(true)
        }
      } catch (e) {
        // If it didn't work to get the results, then we'll consider the base api as primary
        setBackupApi(false)
      }
    }
    getStatus()
  }, [navigator.onLine])
  
  getAnalytics();
  const remoteConfig = getRemoteConfig();

	remoteConfig.defaultConfig = {
    home_image: require("./assets/homepage/under_construction.jpeg"),
    auth_provider: "phone"
  };
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path={routes.root} exact>
            <Home />
          </Route>
          <Route path={routes.SignUp}>
            <RadarDialog state={[radarDialog, setRadarDialog]} />
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
