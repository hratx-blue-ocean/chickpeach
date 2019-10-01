import React, { Component } from 'react';
import { Heading, Select } from 'grommet';
import { withRouter } from 'react-router-dom';
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
          <p>You have 4 recipes serving 12 portions.</p>
          <Select
            options={['Menu', 'Favorites']}
            size={'small'}
            value={this.state.view}
            onChange={({ option }) => this.setState({view: option})}
          />
          <div className="menu_container"></div>
        </div>
        <NavBar />
      </div>
    )
  }
}

export default withRouter(Menu);