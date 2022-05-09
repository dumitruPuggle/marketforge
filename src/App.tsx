import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import { routes } from "./service/internal-routes";
import SignUp from "./views/SignUp/Creator/SignUp";
import Home from "./views/Home/Home";
import SignUpTest from "./views/SignUp/Creator/Test_test";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path={routes.root} exact>
            <Home />
          </Route>
          <Route path={routes.SignUp}>
            <SignUp />
          </Route>
          <Route path={routes.test}>
            <SignUpTest />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
