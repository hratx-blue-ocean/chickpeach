import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateMenu, updateView, updateServings, updateSearch, updateQuery } from './actions';
import { withRouter, NavLink } from 'react-router-dom';
import axios from 'axios';
import { Heading, Select, Button } from 'grommet';
import MenuCard from './MenuCard.jsx';
import NavBar from './NavBar.jsx';

const Menu = (props) => {
  const dispatch = useDispatch();
  const preferences = useSelector(state => state.Preferences);
  const recipes = useSelector(state => state.Menu);

  const getTotalServings = (recipes) => {
    let servings = 0;
    recipes.forEach(recipe => {
      servings += recipe.servings
    });
    return servings;
  }

  // Get all recipes associated with user from database
  const getMenu = () => {
    axios.get('/menuitems', {
        params: {
          user_id: 'a123'
          // preferences.uid
        }
      })
      .then(({ data }) => {
        const servingCount = getTotalServings(data)
        dispatch(updateServings(servingCount));
        dispatch(updateMenu(data));
      })
      .catch(error => console.log(error));
  };

  const getFavorites = () => {
    axios.get('/favoriteitems', {
        params: {
          user_id: 'a123'
          // preferences.uid
        }
      })
      .then(({ data }) => {
        dispatch(updateMenu(data));
      })
      .catch(error => console.log(error));
  };

  const getHistory = () => {
    axios.get('/saveditems', {
        params: {
          user_id: 'a123'
          // preferences.uid
        }
      })
      .then(({ data }) => {
        dispatch(updateMenu(data));
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    dispatch(updateSearch([]));
    dispatch(updateQuery(''));
    
    if (recipes.view === 'Menu') {
      getMenu();
    }
    if (recipes.view === 'Favorites') {
      getFavorites();
    }
    if (recipes.view === 'History') {
      getHistory();
    }
    if (recipes.view === 'Search') {
      dispatch(updateView('Menu'));
    }
  }, [recipes.view]);

  return (
    <div id={'menu_container'}>
      <Heading className="header1">Menus</Heading>
      <NavLink to='/profile'><Button className={'primary_button logout'}>Profile</Button></NavLink>
      <div className="menu">
        <div className="menu_text">
          <p className="menu_recipeCount">You have <b>4</b> recipes serving <b>{recipes.servings}</b> portions.</p>
          <Select
            id="menu_select"
            options={['Menu', 'Favorites', 'History']}
            size={'small'}
            value={recipes.view}
            onChange={({ option }) => dispatch(updateView(option))}
          />
        </div>
        <div className="card_container">
          {recipes.view === 'Menu' &&
            recipes.recipes.map((recipe, index) => {
              return <MenuCard recipe={recipe} key={index} />
            })
          }
          {recipes.view === 'Favorites' &&
            recipes.recipes.map((recipe, index) => {
              return <MenuCard recipe={recipe} key={index} />
            })
          }
          {recipes.view === 'History' &&
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