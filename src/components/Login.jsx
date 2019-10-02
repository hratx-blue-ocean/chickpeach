import React, {useState} from 'react';
import { Grommet, Button, FormField, TextInput } from 'grommet';
import firebase from './firebase.js';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addAccountInfo } from './actions';

const LogIn = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //const dispatch= useDispatch();

    function onRegister() {

      const reg = new Promise((resolve, reject) => {
        resolve(firebase.login(email, password))
        dispatch(addAccountInfo(firebase.auth.currentUser.uid, firebase.auth.currentUser.displayName, firebase.auth.currentUser.email))
      }, 300)
      .then(props.history.replace('/recipes'))
      
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