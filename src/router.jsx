import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './components/Home.jsx';
import Template from './components/Template.jsx';
import Preferences from "./components/Preferences.jsx";
import ShoppingList from './components/ShoppingList.jsx';
import RecipeView from './components/RecipeView.jsx';
import RecipeLanding from './components/RecipeLanding.jsx';
import Menu from './components/Menu.jsx';
import SignUp from './components/SignUp.jsx'
import LogIn from './components/Login.jsx'

function RouteManager() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/template" component={Template} />
        <Route exact path="/preferences" component={Preferences} />
        <Route exact path="/shoppinglist" component={ShoppingList} />
        <Route exact path="/recipeView" component={RecipeView} />
        <Route exact path="/recipes" component={RecipeLanding} />
        <Route exact path="/menu" component={Menu} />
        <Route exact path="/signUp" component={SignUp} />
        <Route exact path="/LogIn" component={LogIn} />
      </div>
    </Router>
  );
}

export default RouteManager;