import React, { Children } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './components/Login';
import Automation from "./components/Automation";
import Dashboard from "./components/Dashboard";
import Portfolio from "./components/Portfolio";
import Taskbar from "./components/Taskbar";

function App() {
  const testImg = [
    {
      img:
        "https://fontmeme.com/temporary/ccc238be3e209150225e4efdc810d920.png",
    },
  ];
  return (
      <Router>
        {/* {} */}
        <Switch>
          <Route path="/login">
            {/* <p>{welcomeMessage}</p> */}
            <Login />
          </Route>
          <Route path="/dashboard">
            
            <Dashboard name="rashad" />
          </Route>
          <Route path="/portfolio"> 
            <Portfolio  />
          </Route>
          <Route path="/automation">
            <Taskbar  />
            <Automation />
          </Route>
          <Route path="/social">
            <Taskbar />
          </Route>
          {/* default route needs to go at bottom of switch */}
          <Route path="/">
          </Route>
        </Switch>
      </Router>
  );
}

export default App;
