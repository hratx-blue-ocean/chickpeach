import React from 'react';
import NavBar from './NavBar.jsx'
import { withRouter, NavLink } from 'react-router-dom';
import { Button } from 'grommet';
import firebase from './firebase.js'
import { useSelector, useDispatch, useStore } from 'react-redux';
import { logout } from './actions';

const allergens = [
  'peanut',
  'egg',
  'grain',
  'seafood',
  'shellfish',
  'soy',
  'sulfite',
  'treeNut',
  'wheat',
  'dairy',
  'gluten',
  'sesame'
];

const diets =[
  'vegan',
  'vegetarian',
  'keto',
  'whole30'
];

const greetings = [
  'Thanks for being a chickpeach!',
  'Hope your day has been chickpeachy!',
  'You\'re looking chickpeachy!'
]

const Profile = (props) => {

  const dispatch = useDispatch();
  const store = useStore().getState();
  const details = store.Preferences;
  console.log(details);

  const allergies = Object.keys(details).map(detail => (allergens.includes(detail) && details[detail]) ? detail === 'treeNut' ? 'tree nut' : detail : undefined).filter(detail => !!detail).concat(details.addedAllergies).join(', ')
  const dietPrefs = Object.keys(details).map(detail => (diets.includes(detail) && details[detail] ) ? detail : undefined).filter(detail => !!detail).join(', ');
  //Super long array method is to make first letter of each word uppercase
  const casedName = details.displayName.split(' ').map(word => word.split('')[0].toUpperCase().concat(word.split('').slice(1).join(''))).join(' ');

  function signOut() {
    firebase.signOut();
    dispatch(logout())
    props.history.replace('/')
  }

  return (
    <div id='profile_container'>
      <h1 className={'header1 profile_header'}>Profile</h1>
        <div className={'profile_container'} >
          <div className={'profile_content'}>
            <div className={'profile_info'}>
              <h3>{`Hi ${casedName},`}</h3>
              <p>{`${greetings[Math.floor(Math.random() * 3)]} Here are your account details:`}</p>
              <p><strong>e-mail:</strong>{` ${details.email}`}</p>
              <p>You are cooking <strong>{` ${details.numberOfMeals} `}</strong> meals for <strong>{` ${details.peopleToPrepFor} `}</strong> {details.peopleToPrepFor === 1 ? ' chickpeach ' : ' chickpeaches '} in a week.</p>
              <p><strong>Allergies:</strong>{` ${allergies.length > 0 ? allergies : 'none'}`}
              </p>
              <p><strong>Diet Preference:</strong>{` ${dietPrefs.length > 0 ? dietPrefs : 'none'}`}
              </p>
            </div>
            <NavLink to='/preferences'>
              <Button className={'primary_button profile_preferences_button'}>Edit Preferences</Button>
            </NavLink>
            <Button className={'primary_button'}
                    onClick={() => signOut()}>Logout</Button>
          </div>
        </div>
      <NavBar />
    </div>
  )
}

export default withRouter(Profile);