import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './components/Home.jsx'
import Template from './components/Template.jsx'
import Preferences from "./components/Preferences.jsx";

function RouteManager() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/template" component={Template} />
        <Route exact path="/preferences" component={Preferences} />
      </div>
    </Router>
  );
}

export default RouteManager;