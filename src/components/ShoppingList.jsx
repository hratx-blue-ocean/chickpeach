import React, { useState } from 'react';
import GroceryItem from  './GroceryItem.jsx';
import NavBar from './NavBar.jsx';
// import { useStore } from 'react-redux';

// let store = useStore()
// userInfo = store.getState().ingredients

const ShoppingList = (props) => {
  const [ingredients, updateIngredients] = useState(props.ingredients)

  const individualIngredientsArray = function(arrOfRecipes) {
    let allIngredients = []
    arrOfRecipes.map((recipe) => {
      allIngredients.push(recipe.ingredients);
    })
    return allIngredients.flat();
  }

  const allIngredients = individualIngredientsArray(props.ingredients);
 
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

      ingredient.id = index;
      accumulator.push(ingredient);
      return accumulator;   

    }, [])

    return consolodated;
  }

  const ingredientsForList = consolodateIngredients(allIngredients);

  return (
    <div>
      <div>
        <div id='shopping_list'>
          <h1 className='ShoppingList_text'>Shopping List</h1>
          <div className='grocery_line_top'>
            <div className='grocery_item_container'>
            <div> 
              {ingredientsForList.map((ingredient) => {
                return (
                  <div key={ingredient.id} className='grocery_line'>
                    <span className='list_item list_item_left'>{ingredient.name}</span>
                    <span className='list_item list_item_right'>{`${ingredient.quantity} ${ingredient.unit}`}</span>
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