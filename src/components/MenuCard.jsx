import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateMenu, updateServings } from './actions';
import { withRouter } from "react-router-dom";
import axios from 'axios';
import { Button } from 'grommet';

const MenuCard = (props) => {
  const dispatch = useDispatch();
  const { view, servings } = useSelector(state => state.Menu);

  const getImageURL = () => {
    if (props.recipe.image.includes('https')) {
      return props.recipe.image;
    } else {
      return `https://webknox.com/recipeImages/${props.recipe.image}`
    }
  }

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
  };

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
  };

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
  };

  const onCookClick = (id) => {
    props.history.replace({
      pathname: '/recipeView',
      state: {
        id: id,
        servings: props.recipe.servings
      }
    })
  };

  const onViewClick = (id) => {
    props.history.replace({
      pathname: '/recipeView',
      state: {id: id}
    })
  };

  const onRemoveClick = () => {
    if (view === 'Menu') {
      axios.put('/removemenuitem', {
        user_id: 'a123', // preferences.uid <- Replace once there are more users in database
        recipe_id: props.recipe.id
      })
      .then(alert('Successfully removed recipe from menu'))
      .then(() => {
        console.log(props.recipe.servings)
        const servingCount = servings - props.recipe.servings;
        dispatch(updateServings(servingCount));
      })
      .then(getMenu())
      .catch(error => console.log(error));
    }

    if (view === 'Favorites') {
      axios.put('/removefromfavorites', {
        user_id: 'a123', // preferences.uid <- Replace once there are more users in database
        recipe_id: props.recipe.id
      })
      .then(alert('Successfully removed recipe from favorites'))
      .then(getFavorites())
      .catch(error => console.log(error));
    }

    if (view === 'History') {
      axios.put('/removefromhistory', {
        user_id: 'a123', // preferences.uid <- Replace once there are more users in database
        recipe_id: props.recipe.id
      })
      .then(alert('Recipe removed from history'))
      .then(getHistory())
      .catch(error => console.log(error));
    }
  }

  return (
    <div className="card">
      <div>
        <img src={props.recipe.image}></img>
      </div>
      <div className="card_bottom">
        <div className="card_text">
          <h4 className="card_name">
            {props.recipe.title.length > 50 ? props.recipe.title.substring(0, 35) + '...' : props.recipe.title}
          </h4>
          <p className="card_servings">
            {`${props.recipe.servings} servings`}
          </p>
        </div>
        {view === 'Menu' ? (
          <div className="card_footer menu_footer">
            <Button className={'primary_button'} onClick={() => {onCookClick(props.recipe.id)}}>Cook</Button>
            <Button className={'primary_button'} onClick={onRemoveClick}>Remove</Button>
          </div>
        ) : (
          <div className="card_footer menu_footer">
            <Button className={'primary_button'} onClick={() => {onViewClick(props.recipe.id)}}>View</Button>
            <Button className={'primary_button'} onClick={onRemoveClick}>Remove</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default withRouter(MenuCard);