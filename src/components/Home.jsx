import React, {Component} from 'react';
import Menu from './Menu.jsx'
import { withRouter } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {};
  }
  
  render() {
    return (
      <Menu />
    )
  }
}

export default withRouter(Home);