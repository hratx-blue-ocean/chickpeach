import React from 'react';
import NavBar from './NavBar.jsx'
import { withRouter, NavLink } from 'react-router-dom';
import { Button } from 'grommet';

const Splash = (props) => {
  return (
    <>
      <div id='splash_container'>
        <div id='splash_content'>
          <h1 id='splash_logo'>chickpeach</h1>
          <NavLink to='/LogIn'>
            <Button primary className={'primary_button'}>
              Login with email
            </Button>
          </NavLink>
          <NavLink to='/signUp'>
            <Button primary className={'primary_button'}>
              Create an account
            </Button>
          </NavLink>
          <NavLink to='/menu'>Demo Mode</NavLink>
        </div>
      </div>
    </>
  )
}

export default withRouter(Splash);