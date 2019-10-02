import React, { Component, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Heading, Select } from 'grommet';
import MenuCard from './MenuCard.jsx';
import NavBar from './NavBar.jsx';

const Menu = (props) => {
  const [currentView, updateCurrentView] = useState({
    view: 'menu'
  });
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
            value={currentView.view}
            onChange={({ option }) => updateCurrentView({view: option})}
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

export default withRouter(Menu);