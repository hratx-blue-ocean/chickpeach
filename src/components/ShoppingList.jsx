import React from 'react';
import { Grommet } from 'grommet';
import GroceryItem from  './GroceryItem.jsx'


class ShoppingList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ingredients: [['soymilk', '2 cups'], ['bananas', 2], ['flaxseed', '1 tbs']]
    };
  }

  render() {
    return (
      <div id='shopping_list'>
        <h1 className='ShoppingList_text'>Shopping List</h1>
        <div className='grocery_item_container'>
          <GroceryItem ingredients={this.state.ingredients} />
        </div>   
      </div>
    )
  }
}

export default ShoppingList;