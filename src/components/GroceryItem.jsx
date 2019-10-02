import React from 'react';
import { withRouter } from 'react-router-dom';


const GroceryItem = (props) => {
  return (
  <div> 
    {props.recipe.ingredients.map((ingredient) => {
      return (
        <div className='grocery_line' key={ingredient.name}>
            <span className='list_item list_item_left'>{ingredient.name}</span>
            <span className='list_item list_item_right'>{`${ingredient.quantity} ${ingredient.unit}`}</span>
        </div>
      )
    })} 
  </div>
  )
}

export default withRouter(GroceryItem);