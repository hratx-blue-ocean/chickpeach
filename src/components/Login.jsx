import React, {useState} from 'react';
import { Grommet, Button, FormField, TextInput } from 'grommet';
import firebase from './firebase.js';
import { withRouter } from 'react-router-dom';

const LogIn = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function onRegister() {

      const reg = new Promise((resolve, reject) => {
        resolve(firebase.login(email, password))
      }, 300)
      .then(props.history.replace('/recipes'))
      
    }


    return (
      <div id='signup_container'>
        <Grommet >
            <FormField name="email" label="Email" >
              <TextInput value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormField>
            <FormField name="password" label="Password" >
              <TextInput value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormField>
            <Button type="submit" primary label="Submit" onClick={onRegister}/>
        </Grommet>
      </div>
    )
}

export default withRouter(LogIn);