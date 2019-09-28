import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './components/Home.jsx'
import Template from './components/Template.jsx'

function RouteManager() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/template" component={Template} />
      </div>
    </Router>
  );
}

export default RouteManager;