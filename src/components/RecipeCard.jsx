import React from 'react';
import { useDispatch } from 'react-redux';
import { updateView } from './actions';
import { withRouter } from "react-router-dom";
import axios from 'axios';
import { Button } from 'grommet';

const RecipeCard = (props) => {
  const dispatch = useDispatch();

  const onPreviewClick = (id) => {
    dispatch(updateView('Search'))
    props.history.replace({
      pathname: '/recipeView',
      state: {id: id}
    })
  };

  return (
    <div className="card">
      <div>
        <img src={`https://webknox.com/recipeImages/${props.recipe.image}`}></img>
      </div>
      <div className="card_bottom">
        <div className="card_text">
          <h4 className="card_name">
            {props.recipe.title}
          </h4>
          <p className="card_servings">
            {`${props.recipe.servings} servings`}
          </p>
        </div>
        <div className="card_footer recipe_footer">
          <Button
            className="recipe_preview"
            label={'Preview'}
            onClick={() => {onPreviewClick(props.recipe.id)}}
          />
          <Button
            className="recipe_save"
            label={'Add to menu'}
            onClick={() => {}}>
          />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(RecipeCard);