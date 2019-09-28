import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './components/Home.jsx'
import Template from './components/Template.jsx'
import ShoppingList from './components/ShoppingList.jsx'

function RouteManager() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/template" component={Template} />
        <Route exact path="/shoppinglist" component={ShoppingList} />
      </div>
    </Router>
  );
}

export default RouteManager;