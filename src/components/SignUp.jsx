import React, {useState} from 'react';
import { Grommet, Button, FormField, TextInput } from 'grommet';
import firebase from './firebase.js';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addAccountInfo } from './actions';
import axios from 'axios';

const SignUp = (props) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch= useDispatch();

    function onRegister() {
      let uid = '';

      const reg = new Promise((resolve, reject) => {
        resolve(firebase.register(name, email, password))
        var user = firebase.auth.currentUser;
        console.log(user);
        // props.history.replace('/menu')
        uid = user.uid;
      }, 300);
      
      reg.then(axios.get('/register', {
        params: { 
          id: uid,
          name: name
        }
      })
      .then(function () {
        dispatch(addAccountInfo(uid, name, email))
      })
      .catch(function (error) {
        console.log(error);
      }));
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
              <TextInput value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormField>
            <Button type="submit" className={'primary_button'} primary label="Submit" onClick={onRegister}/>
          </div>
        </div>
      </Grommet>
    )
}

export default withRouter(SignUp);