import React, { useState, useEffect, useMemo } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { Button } from "grommet";
import NavBar from './NavBar.jsx';

const RecipeView = (props) => {
  const [recipe, updateRecipe] = useState({});
  
  const getRecipe = (cb) => {
    axios.get('/getSingleRecipe', {
      params: {
        recipeID: 1 // props.recipe.id <- Replace once there are more items in database
      }
    })
    .then(({ data }) => {
      updateRecipe(data);
    })
    .finally(cb())
  };

  useMemo(() => { // If useMemo doens't work with all items, replace with useEffect
    getRecipe(() => console.log(recipe.ingredients));
  }, [recipe.id])

  // Render empty div if axios request has not yet updated recipe
  if (Object.entries(recipe).length === 0 && recipe.constructor === Object) {
    return <div />
  }

  return (
    <div id='recipeView_container'>
      <h1 className={'header1'}>{recipe.title}</h1>
      <img className={'recipe_hero'} src={recipe.image} />
      <div className={'grey_container'}>
        <h3>Ingredients</h3>
        {
          recipe.ingredients.map((ingredient, index) => {
            return <p className={'recipe_ingredient'} key={index}>
              {
                `${ingredient.quantity} ${ingredient.unit} ${ingredient.name}`
              }
            </p>
          })
        }
      </div>

      <div id={'recipe_directions_container'}>
        <h3 className={'recipe_directions_label'}>Directions</h3>
        <p>{`${recipe.prep_time} minutes`}</p>
        {
          recipe.steps.map((step, index) => {
            return (
              <div className={'recipe_step'} key={index}>
                <div className={'recipe_step_number'}>{index + 1 + '.'}</div>
                <div>{step}</div>
              </div>
            )
          })
        }
      </div>

      <div className={'grey_container'}>
        <h3>Nutritional Information</h3>
        <div>Servings Per Recipe: {recipe.servings}</div>
        <div>Amount Per Serving</div>
        <div>{`Calories: ${recipe.calories}`}</div>
        <div className={'nutrient_row'}>{`Sodium: ${recipe.sodium}`}</div>
        <div className={'nutrient_row'}>{`Total Carbohydrates: ${recipe.carbs}`}</div>
        <div className={'nutrient_row'}>{`Protein: ${recipe.protein}`}</div>
        <div className={'nutrient_row'}>{`Sugars: ${recipe.sugar}`}</div>
        <div className={'nutrient_row'}>{`Fiber: ${recipe.fiber}`}</div>
      </div>

      <div className='recipe_buttons'>
        <Button className={'primary_button recipe_button'} primary >I cooked this!</Button>
        <Button className={'secondary_button recipe_button'} primary >Remove from menu</Button>
      </div>

      <NavBar />
    </div>
  )
}

export default withRouter(RecipeView);