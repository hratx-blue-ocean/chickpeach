import React, { Component } from 'react';
import { Button } from 'grommet';
import MaterialIcon from 'material-icons-react';

const RecipeCard = (props) => {
  return (
    <div className="recipe_container">
      <div className="recipe_image">
        <img src="https://shazamazon.s3.us-east-2.amazonaws.com/wands/chickpeach/yum.png"></img>
      </div>
      <div className="recipe_bottom">
        <div className="recipe_text">
          <h4 className="recipe_name">
            Street Corn
          </h4>
          <p className="recipe_servings">
            4 servings
          </p>
        </div>
        <div className="recipe_footer">
          <Button
            className="recipe_button recipe_preview"
            icon={'Preview'}
            label
            onClick={() => {}}
          />
          <Button
            className="recipe_button recipe_save"
            icon={ <MaterialIcon icon="archive" color='whitesmoke' size={24} /> }
            label
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;