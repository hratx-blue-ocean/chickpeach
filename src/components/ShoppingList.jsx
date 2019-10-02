import React, { useState } from 'react';
import GroceryItem from  './GroceryItem.jsx';
import NavBar from './NavBar.jsx';
// import { useStore } from 'react-redux';

// let store = useStore()
// userInfo = store.getState().ingredients

const ShoppingList = (props) => {
  const [ingredients, updateIngredients] = useState(props.ingredients)
  return (
    <div>
      <div>
        <div id='shopping_list'>
          <h1 className='ShoppingList_text'>Shopping List</h1>
          <div className='grocery_line_top'>
          {ingredients.map((recipe) => {
            return (
            <div key={recipe.name} className='grocery_item_container'>
              <GroceryItem recipe={recipe} />
            </div>   
            )
          })}
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