import React, { Component } from 'react';
import { Heading, Select } from 'grommet';
import { withRouter } from 'react-router-dom';
import MenuCard from './MenuCard.jsx';
import NavBar from './NavBar.jsx';

class Menu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      view: 'Menu'
    };
  }

  render() {
    return (
      <div>
        <Heading className="header1">Menu</Heading>
        <div className="menu">
          <div className="menu_text">
            <p className="menu_recipeCount">You have <b>4</b> recipes serving <b>12</b> portions.</p>
            <Select
              id="menu_select"
              options={['Menu', 'Favorites']}
              size={'small'}
              value={this.state.view}
              onChange={({ option }) => this.setState({view: option})}
            />
          </div>
          <div className="card_container">
            <MenuCard />
            <MenuCard />
          </div>
        </div>
        <NavBar />
      </div>
    )
  }
}

export default withRouter(Menu);