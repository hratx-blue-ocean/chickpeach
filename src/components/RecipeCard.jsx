import React from 'react';
import { useDispatch } from 'react-redux';
import { updateView } from './actions';
import { withRouter } from "react-router-dom";
import axios from 'axios';
import { Button } from 'grommet';

const RecipeCard = (props) => {
  const dispatch = useDispatch();

  const onPreviewClick = (id) => {
    dispatch(updateView('Search'));
    props.history.replace({
      pathname: '/recipeView',
      state: {id: id}
    })
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
            onClick={() => {}}>
            Add to Menu
          </Button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(RecipeCard);