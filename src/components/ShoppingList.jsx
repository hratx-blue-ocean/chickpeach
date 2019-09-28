import React from 'react';
import { Grommet, Box } from "grommet";


class ShoppingList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {};
  }

  render() {
    return (
      <Grommet>
        <div id='shopping_list_container'>
          <h1 className='ShoppingList_text'>Shopping List</h1>
        </div>
      </Grommet>
    )
  }
}

export default ShoppingList;