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
  const getMenu = () => {
    axios.get('/menuitems', {
        params: {
          id: 'a123'
          // preferences.uid
        }
      })
      .then(({ data }) => {
        dispatch(updateMenu(data));
      })
      .catch(error => console.log(error));
  }

  const getFavorites = () => {
    axios.get('/favoriteitems', {
        params: {
          id: 'a123'
          // preferences.uid
        }
      })
      .then(({ data }) => {
        dispatch(updateMenu(data));
      })
      .catch(error => console.log(error));
  }

  const getHistory = () => {
    axios.get('/saveditems', {
        params: {
          id: 'a123'
          // preferences.uid
        }
      })
      .then(({ data }) => {
        dispatch(updateMenu(data));
      })
      .catch(error => console.log(error));
  }

  useEffect(() => {
    if (currentView.view === 'Menu') {
      getMenu();
    }
    if (currentView.view === 'Favorites') {
      getFavorites();
    }
    if (currentView.view === 'History') {
      getHistory();
    }
  }, [currentView.view]);

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
            recipes.recipes.map((recipe, index) => {
              return <MenuCard recipe={recipe} key={index} />
            })
          }
          {currentView.view === 'Favorites' &&
            recipes.recipes.map((recipe, index) => {
              return <MenuCard recipe={recipe} key={index} />
            })
          }
          {currentView.view === 'History' &&
            recipes.recipes.map((recipe, index) => {
              return <MenuCard recipe={recipe} key={index} />
            })
          }
        </div>
      </div>
      <NavBar />
    </div>
  )
}

export default withRouter(Menu);