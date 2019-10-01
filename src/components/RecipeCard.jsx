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
            Street Corn
          </h4>
          <p className="card_servings">
            4 servings
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