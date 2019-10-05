import React, {useState} from 'react';
import { Grommet, Button, FormField, TextInput } from 'grommet';
import firebase from './firebase.js';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addAccountInfo, addPreferences } from './actions';
import axios from 'axios';

const LogIn = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch= useDispatch();
    const userpreferences = useSelector(state => state.Preferences);
    const [submitPressed, changeSubmitState] = useState(false)

    function onRegister() {
      const reg = new Promise((resolve, reject) => {
        firebase.signOut()
        resolve(firebase.login(email, password));
        changeSubmitState(true)
      })
      .then(() => {
        dispatch(addAccountInfo(firebase.auth.currentUser.uid, firebase.auth.currentUser.displayName, firebase.auth.currentUser.email))
        let userId = firebase.auth.currentUser.uid;

        setTimeout(function() {
          axios.get('/userpreferences', {
            params: {
              id: userId
            }
          })
          .then(({data}) => {
            dispatch(addPreferences(data))
            props.history.replace('/menu')
          });
        }, 2000)
      })
    }


    return (
      <Grommet >
        <div className='signup_container'>
          <div className='signup_content'>
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
              <Button className={'primary_button'} type="submit" primary label="Submit" onClick={onRegister}/>
            }
          </div>
        </div>
      </Grommet>
    )
}

export default withRouter(LogIn);