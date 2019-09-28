import React from 'react';
import { Box } from "grommet";


const GroceryItem = (props) => {
  console.log(props)
  return (
  <div>
    <Box key='topLine' pad='small' border='bottom'></Box>
    {props.ingredients.map((line) => {
      return (
        <div className="groceryItem">
          <Box key={line[0]} pad='small' border='bottom'>
            <span className='listItemLeft'>{line[0]}</span>
            <span className='listItemRight'>{line[1]}</span>
          </Box>
        </div>
      )
    })}
  </div>
  )
}

export default GroceryItem;