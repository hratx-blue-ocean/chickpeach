import React, { Component, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateMenu } from './actions';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { Heading, Select } from 'grommet';
import MenuCard from './MenuCard.jsx';
import NavBar from './NavBar.jsx';

const Menu = (props) => {
  const [currentView, updateCurrentView] = useState({
    view: 'Select recipes'
  });
  const dispatch = useDispatch();
  const preferences = useSelector(state => state.Preferences);
  const recipes = useSelector(state => state.Menu);

  // Get all recipes associated with user from database
  const getRecipes = () => {
    axios.get('/menuitems', {
        params: {
          id: preferences.uid
        }
      })
      .then(({ data }) => {
        console.log(data); // May remove once data is confirmed to be an array of recipes
        dispatch(updateMenu(data));
      })
      .catch(error => console.log(error));
  }

  let menu = [];
  // Get all recipes from user's menu
  const getMenu = (recipes) => {
    for (let i = 0; i < recipes.length; i++) {
      if (recipes[i].is_on_menu) {
        menu.push(recipes[i]);
      }
    }
    return menu;
  };

  let favorites = [];
  // Get all recipes from user's favorites
  const getFavorites = (recipes) => {
    for (let i = 0; i < recipes.length; i++) {
      if (recipes[i].is_favorited) {
        favorites.push(recipes[i]);
      }
    }
    return favorites;
  };

  return (
    <div>
      <Heading className="header1">Menu</Heading>
      <div className="menu">
        <div className="menu_text">
          <p className="menu_recipeCount">You have <b>4</b> recipes serving <b>{preferences.numberOfMeals}</b> portions.</p>
          <Select
            id="menu_select"
            options={['Menu', 'Favorites', 'History']}
            size={'small'}
            value={currentView.view}
            onChange={({ option }) => updateCurrentView({view: option})}
          />
        </div>
        <div className="card_container">
          {currentView.view === 'Menu' &&
            getMenu(recipes).map(recipe => {
              return <MenuCard recipe={recipe} />
            })
          }
          {currentView.view === 'Favorites' &&
            getFavorites(recipes).map(recipe => {
              return <MenuCard recipe={recipe} />
            })
          }
        </div>
      </div>
      <NavBar />
    </div>
  )
}

export default withRouter(Menu);