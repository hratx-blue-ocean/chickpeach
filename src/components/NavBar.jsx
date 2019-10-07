import { Link } from "react-router-dom";
import React from 'react'
import MaterialIcon from 'material-icons-react';

const NavBar = () => {
  return (
    <div id='navBar'>
      <Link to='/recipeSearch' aria-label={'Search for recipes'}><MaterialIcon icon="search" color='whitesmoke'size={38} /></Link>
      <Link to='/menu' aria-label={'View menu, favorites and history'}><MaterialIcon icon="restaurant" color='whitesmoke'size={38} /></Link>
      <Link to='/shoppinglist' aria-label={'Shopping list'}><MaterialIcon icon="assignment" color='whitesmoke'size={38} /></Link>
    </div>
  )
}

export default NavBar;