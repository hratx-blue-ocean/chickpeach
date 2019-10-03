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

    function onRegister() {
      let uid = '';

      const reg = new Promise((resolve, reject) => {
        resolve(firebase.login(email, password));

        dispatch(addAccountInfo(firebase.auth.currentUser.uid, firebase.auth.currentUser.displayName, firebase.auth.currentUser.email))
      }, 300)
      reg.then(() => {
        props.history.replace('/menu')
        getUserData(firebase.auth.currentUser.uid);
      })
    }

    function getUserData(userId) {
      console.log(userId)
      axios.get('/userpreferences', {
        params: {
          id: 'a123' //replace with userId
        }
      })
      .then(({data}) => {
        dispatch(addPreferences(data))
      });
    }

    return (
      <Grommet >
        <div className='signup_container'>
          <div className='signup_content'>
            <FormField name="email" label="Email" >
              <TextInput value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormField>
            <FormField name="password" label="Password" >
              <TextInput value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormField>
            <Button className={'primary_button'} type="submit" primary label="Submit" onClick={onRegister}/>
          </div>
        </div>
      </Grommet>
    )
}

export default withRouter(LogIn);