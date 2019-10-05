import React from 'react';
import Ingredient from  './Ingredient.jsx';
import { withRouter } from 'react-router-dom';


const GroceryItem = (props) => { 
  return (
  <div> 
    <div className="aisle_text">{props.aisle}</div>
    {props.ingredients.map((ingredient) => {
      if (ingredient.aisle === props.aisle) {
        return (
          <div key={ingredient.id} value={ingredient.id} >
            <Ingredient ingredient={ingredient} />
          </div>
        )
      }
    })} 
  </div>
  )
}

export default withRouter(GroceryItem);