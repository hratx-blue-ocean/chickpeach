import React from 'react';
import NavBar from './NavBar.jsx'
import { withRouter } from 'react-router-dom';
import { Button } from 'grommet';
import firebase from './firebase.js'
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './actions'

const Profile = () => {

  const dispatch = useDispatch();

  function signOut() {
    firebase.signOut();
    dispatch(logout())
  }

  return (
    <div id='changethis_container'>
      <h1 className={'header1'}>Profile</h1>
        <div className={'profile_container'} >
          <div className={'profile_content'}>
            <Button className={'primary_button'}
                    onClick={() => signOut()}>Logout</Button>
          </div>
        </div>
      <NavBar />
    </div>
  )
}

export default withRouter(Profile);