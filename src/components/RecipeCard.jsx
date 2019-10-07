import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateView, updateServings, updateMenu } from './actions';
import { withRouter } from "react-router-dom";
import axios from 'axios';
import { Button } from 'grommet';

const RecipeCard = (props) => {
  const dispatch = useDispatch();
  const preferences = useSelector(state => state.Preferences);

  const onPreviewClick = (id) => {
    dispatch(updateView('Search'));
    props.history.replace({
      pathname: '/recipeView',
      state: {id: id}
    })
  };

  const getTotalServings = (recipes) => {
    let servings = 0;
    recipes.forEach(recipe => {
      servings += recipe.servings
    });
    return servings;
  };

  const getMenu = () => {
    axios.get('/menuitems', {
        params: {
          user_id: preferences.uid
        }
      })
      .then(({ data }) => {
        const servingCount = getTotalServings(data)
        dispatch(updateServings(servingCount));
        dispatch(updateMenu(data));
      })
      .catch(error => console.log(error));
  };

  const addToMenuFromSearch = () => {
    axios.get('/getSingleRecipe', {
      params: {
        recipeID: props.recipe.id
      }
    })
    .then(({ data }) => {
      axios.post('/addrecipe', {
        params: {
          action: 'menu',
          user: preferences.uid
        },
        data: data
      })
      .then(getMenu())
      .then(alert('Successfully added recipe to menu'))
      .then(dispatch(updateView('Menu')))
      .then(
        props.history.replace('/menu')
      )
      .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
  };

  return (
    <div className="card">
      <div>
        <img className={'card_image'} src={`https://webknox.com/recipeImages/${props.recipe.image}`}></img>
      </div>
      <div className="card_bottom">
        <div className="card_text">
          <h4 className="card_name">
            {props.recipe.title}
          </h4>
          <p className="card_servings">
            {`${props.recipe.servings} servings • ${props.recipe.readyInMinutes} minutes`}
          </p>
        </div>
        <div className="card_footer">
          <Button
            className="primary_button card_button"
            onClick={() => {onPreviewClick(props.recipe.id)}}
          >
          Preview
          </Button>
          <Button
            className="primary_button card_button"
            onClick={addToMenuFromSearch}>
            Add to Menu
          </Button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(RecipeCard);