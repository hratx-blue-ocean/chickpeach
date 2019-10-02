import React, { useState } from 'react';
import GroceryItem from  './GroceryItem.jsx';
import NavBar from './NavBar.jsx';


const dummyIngredients = [['soymilk', '2 cups'], ['bananas', 2], ['flaxseed', '1 tbs']];

const ShoppingList = (props) => {
  const [ingredients, updateIngredients] = useState(dummyIngredients)
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