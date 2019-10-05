import React, {useState} from 'react';
import { Grommet, Button, FormField, TextInput } from 'grommet';
import firebase from './firebase.js';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addAccountInfo, resetPage } from './actions';
import axios from 'axios';

const SignUp = (props) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch= useDispatch();
    const [submitPressed, changeSubmitState] = useState(false)

    function onRegister() {

      const reg = new Promise((resolve, reject) => {
        firebase.signOut()
        resolve(firebase.register(name, email, password))
        changeSubmitState(true)
      })
      reg.then(() => {
        setTimeout(function() {
          var user = firebase.auth.currentUser;
          
          let uid = user.uid;
          axios.get('/register', {
            params: { 
              id: uid,
              name: name
            }
          })

          axios.get('/createpreferences', {
            params: {
              uid: uid
            }
          })
          dispatch(addAccountInfo(uid, name, email))
          dispatch(resetPage())
          props.history.replace('/preferences')
        }, 2000)
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    return (
      <Grommet >
        <div className='signup_container'>
          <div className='signup_content signup_height_mod'>
            <FormField name="name" label="Name" >
              <TextInput value={name} onChange={(e) => setName(e.target.value)} />
            </FormField>
            <FormField name="email" label="Email" >
              <TextInput value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormField>
            <FormField name="password" label="Password" >
              <TextInput type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormField>
            {
              submitPressed ?
              <Button type="submit" className={'primary_button'} primary label="Loading" />
              :
              <Button type="submit" className={'primary_button'} primary label="Submit" onClick={() => onRegister()}/>
            }
          </div>
        </div>
      </Grommet>
    )
}

export default withRouter(SignUp);