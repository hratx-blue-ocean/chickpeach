import React, {useState} from 'react';
import { Grommet, grommet, Box, Button, FormField, TextInput } from 'grommet'

const SignUp = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
      <div id='signup_container'>
        <Grommet >
            <FormField name="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)}>
              <TextInput />
            </FormField>
            <FormField name="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)}>
              <TextInput />
            </FormField>
            <Button type="submit" primary label="Submit" />
        </Grommet>
      </div>
    )
}

export default SignUp;