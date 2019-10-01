import React, {Component} from 'react';
import { Box, Button, Grommet } from 'grommet';
import RecipeLanding from './RecipeLanding.jsx'
import { withRouter } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {};
  }
  
  render() {
    return (
      <RecipeLanding />
    )
  }
}

export default withRouter(Home);