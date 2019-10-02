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
          <Button primary className={'primary_button'}>Login with Google</Button>
          <NavLink to='/LogIn'>
            <Button primary className={'primary_button'}>
              Login with email
            </Button>
          </NavLink>
          <NavLink to='/signUp'>Create an account</NavLink>
          <NavLink to='/recipes'>Login as guest</NavLink>
        </div>
      </div>
    </>
  )
}

export default withRouter(Splash);