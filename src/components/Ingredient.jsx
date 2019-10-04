import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';


const Ingredient= (props) => { 

  const [isCrossedOut, setCrossedOut] = useState(false);

  if (isCrossedOut === true) {
    return (
      <div onClick={() => setCrossedOut(!isCrossedOut)}> 
        <div key={props.ingredient.id} className='crossed_out'>
          <span className='list_item list_item_left'>{props.ingredient.name}</span>
          <span className='list_item list_item_right'>{`${props.ingredient.quantity} ${props.ingredient.unit}`}</span>
        </div>
      </div>
    )
  } else if (isCrossedOut === false) {
    return (
      <div onClick={() => setCrossedOut(!isCrossedOut)}> 
        <div key={props.ingredient.id} className='grocery_line'>
          <span className='list_item list_item_left'>{props.ingredient.name}</span>
          <span className='list_item list_item_right'>{`${props.ingredient.quantity} ${props.ingredient.unit}`}</span>
        </div>
      </div>
      )
    }
  }

export default withRouter(Ingredient);