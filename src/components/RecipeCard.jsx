import React, { Component } from 'react';
import { Button } from 'grommet';
import MaterialIcon from 'material-icons-react';

const RecipeCard = (props) => {
  return (
    <div className="card">
      <div>
        <img src="https://shazamazon.s3.us-east-2.amazonaws.com/wands/chickpeach/yum.png"></img>
      </div>
      <div className="card_bottom">
        <div className="card_text">
          <h4 className="card_name">
            {props.recipe.title}
          </h4>
          <p className="card_servings">
            {props.recipe.servings}
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