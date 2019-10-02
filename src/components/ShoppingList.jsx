import React, { useState } from 'react';
import GroceryItem from  './GroceryItem.jsx';
import NavBar from './NavBar.jsx';


const ShoppingList = (props) => {
  const [ingredients, updateIngredients] = useState(props.ingredients)
  return (
    <div>
    <div id='shopping_list'>
      <h1 className='ShoppingList_text'>Shopping List</h1>
      <div className='grocery_item_container'>
        <GroceryItem ingredients={ingredients} />
      </div>   
    </div>
    <div>
      <NavBar />
    </div>
    </div>
  )
}

export default ShoppingList;