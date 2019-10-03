import React, { useState } from 'react';
import NavBar from './NavBar.jsx'
import { Button } from "grommet";
import { withRouter } from 'react-router-dom';
import axios from 'axios'

const formatter = {
  calories: 'Calories',
  carbs: 'Carbs',
  sugar: 'Sugar',
  fat: 'Fat',
  sodium: 'Sodium',
  fiber: 'Fiber',
  net_carbs: 'Net Carbs',
  added_sugar: 'Added Sugar',
  saturated_fat: 'Saturated Fat',
  protein: 'Protein'
}

const RecipeView = (props) => {

  const [recipe, updateRecipe] = useState(props.recipe)
  // axios.get('/', {
  //   params: {
  //     recipeID: props.recipe.id
  //   }
  // })
  // .then((recipe) => {
  //   console.log(recipe)
  //   //updateRecipe(recipe)
  // })

  let nutrientArray = Object.keys(recipe.nutrition_info)

  return (
    <div id='recipeView_container'>
      <h1 className={'header1'}>{recipe.title}</h1>
      <img className={'recipe_hero'} src={recipe.images[0]} />
      <div className={'grey_container'}>
        <h3>Ingredients</h3>
        {
          recipe.ingredients.map(ingredient => {
            return <p className={'recipe_ingredient'} key={ingredient}>
              {
                `${ingredient.quantity} ${ingredient.unit} ${ingredient.name}`
              }
            </p>
          })
        }
      </div>

      <div id={'recipe_directions_container'}>
        <h3 className={'recipe_directions_label'}>Directions</h3>
        {
          recipe.directions.map((step, index) => {
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
        <h3>Nutrition Info</h3>
        {
          nutrientArray.map((nutrient, index) => {
            return (
              <div className={'nutrient_row'} key={index}>
                <div>{formatter[nutrient]}</div>
                <div>{recipe.nutrition_info[nutrient]}</div>
              </div>
            )
          })
        }
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