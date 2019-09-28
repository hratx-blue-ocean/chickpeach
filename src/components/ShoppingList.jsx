import React from 'react';

class ShoppingList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {};
  }

  render() {
    return (
      <div id='shopping_list_container'>
        <h1 className={'ShoppingList_text'}>Shopping List</h1>
      </div>
    )
  }
}

export default ShoppingList;