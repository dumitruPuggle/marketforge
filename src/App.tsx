import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import SignUp from "./views/CreateAccount/SignUp";
import Home from "./views/Home/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/sign-up" exact>
            <SignUp />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
