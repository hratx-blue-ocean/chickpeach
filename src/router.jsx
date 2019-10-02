import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Template from './components/Template.jsx';
import Preferences from "./components/Preferences.jsx";
import ShoppingList from './components/ShoppingList.jsx';
import RecipeView from './components/RecipeView.jsx';
import RecipeLanding from './components/RecipeLanding.jsx';
import Menu from './components/Menu.jsx';
import CreateRecipe from './components/CreateRecipe.jsx';
import SignUp from './components/SignUp.jsx'
import LogIn from './components/Login.jsx'
import Splash from './components/Splash.jsx'

//Initial Data
import { dummyIngredients } from '../db/initialData.js'
import { useStore } from 'react-redux'

function RouteManager() {

  let store = useStore()
  let recipes = store.getState().Recipes;
  return (
    <Router>
      <div>
        <Route exact path="/" component={Splash} />
        <Route exact path="/template" component={Template} />
        <Route exact path="/preferences" component={Preferences} />
        <Route exact path="/shoppingList" 
               render={(props) => (<ShoppingList {...props} ingredients={dummyIngredients} />)} />
        <Route exact path="/recipeView" 
                     render={(props) => (<RecipeView {...props} recipe={recipes[0]} />)} />
        <Route exact path="/recipeSearch" 
                     render={(props) => (<RecipeLanding {...props} recipes={recipes} />)} />
        <Route exact path="/menu" 
                     render={(props) => (<Menu {...props} recipes={recipes} />)} />
        <Route exact path="/createRecipe" 
                     render={(props) => (<CreateRecipe {...props} recipe={dummyRecipe} />)} />
        <Route exact path="/signUp" component={SignUp} />
        <Route exact path="/LogIn" component={LogIn} />
      </div>
    </Router>
  );
}

export default RouteManager;