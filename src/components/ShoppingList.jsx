import React, { useState } from 'react';
import GroceryItem from  './GroceryItem.jsx';
import NavBar from './NavBar.jsx';


const ShoppingList = (props) => {
  const [ingredients, updateIngredients] = useState(props.ingredients)

  const individualIngredientsArray = function(arrOfRecipes) {
    let allIngredients = []
    arrOfRecipes.map((recipe) => {
      allIngredients.push(recipe.ingredients);
    })
    return allIngredients.flat();
  }

  const allIngredients = individualIngredientsArray(ingredients.recipes);
 
  function consolodateIngredients(ingredientsToConsolodate) {
    const consolodated = ingredientsToConsolodate.reduce((accumulator, ingredient, index) => {
      for (let val of accumulator) {
        if (
          ingredient.name === val.name &&
          ingredient.unit === val.unit
        ) {
          val.quantity = val.quantity + ingredient.quantity;
          return accumulator;
        } 
        // else if (ingredient.name === val.name) {
        //   maybe do something
        // } 
      }
      
      ingredient.isCrossedOut = false;
      ingredient.id = index;
      accumulator.push(ingredient);
      return accumulator;   

    }, [])

    return consolodated;
  }

  const ingredientsForList = consolodateIngredients(allIngredients);

  const makeAisleList = function(arrOfIngredients) {
    let allAisles = []
    arrOfIngredients.map((ingredient) => {
      if (!allAisles.includes(ingredient.aisle))
      allAisles.push(ingredient.aisle);
    })
    return allAisles;
  }
  
  const aisleList = makeAisleList(ingredientsForList);

  return (
    <div>
      <div>
        <div id='shopping_list'>
          <h1 className='ShoppingList_text'>Shopping List</h1>
          <div className='grocery_line_top'>
            <div className='grocery_item_container'>
            <div> 
            {aisleList.map((aisle) => {
              return (
                <div key={aisle} className={aisle}>
                  <GroceryItem aisle={aisle} ingredients={ingredientsForList} />
                </div>
              )
            })} 
            </div>
            </div>   
          </div>
        </div>
      </div>
      <div>
        <NavBar />
      </div>
    </div>
  )
}

export default ShoppingList;