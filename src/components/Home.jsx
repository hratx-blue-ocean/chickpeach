import React, {Component} from 'react';
import { Box, Button, Grommet } from 'grommet';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {};
  }
  
  render() {
    return (
      <Grommet>
        <Box align="center" background="neutral-2">
          <Button
            label="testing, may delete"
          />
        </Box>
      </Grommet>
    )
  }
}

export default Home;