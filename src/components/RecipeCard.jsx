import React, { Component } from 'react';
import { Button } from 'grommet';
import MaterialIcon from 'material-icons-react';

const RecipeCard = (props) => {
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
            icon={'Preview'}
            label
            onClick={() => {}}
          />
          <Button
            className="recipe_save"
            onClick={() => {}}>
            <MaterialIcon icon="create" color='whitesmoke' size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;