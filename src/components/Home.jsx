import React, {Component} from 'react';
import CreateRecipe from './CreateRecipe.jsx'
import { withRouter } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {};
  }
  
  render() {
    return (
      <CreateRecipe />
    )
  }
}

export default withRouter(Home);