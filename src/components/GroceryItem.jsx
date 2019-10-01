import React from 'react';
import { Box } from "grommet";
import { withRouter } from 'react-router-dom';


const GroceryItem = (props) => {
  return (
  <div>
    <div className='grocery_line_top'>
    {props.ingredients.map((line) => {
      return (
        <div className='grocery_line' key={line[0]}>
            <span className='list_item' className='list_item_left'>{line[0]}</span>
            <span className='list_item' className='list_item_right'>{line[1]}</span>
        </div>
      )
    })}
    </div>
  </div>
  )
}

export default withRouter(GroceryItem);